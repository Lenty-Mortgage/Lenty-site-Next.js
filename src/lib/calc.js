/**
 * Calculator logic. Pure functions, shared by the server render (components/Calculator.tsx, default result in the HTML) and calculator.js (browser).
 * Cash-to-close is a 1:1 port of prototype v1.03 (ltvFor + fees + DBR at the stress rate).
 */
export const fmt = (n) => Math.round(n).toLocaleString('en-US');
export const parse = (v) => { const n = parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')); return isNaN(n) ? 0 : n; };

export function ltvFor(P, status, home, stage, price) {
  let ltv, note = '';
  if (status === 'nonresident') { ltv = P.ltv.nonResident; note = 'Non-residents: banks lend 50–60%. We calculate with 50% to be safe.'; }
  else if (status === 'national') { ltv = home === 'second' ? P.ltv.national.second : (price > P.ltv.priceThreshold ? P.ltv.national.firstAbove5M : P.ltv.national.first); }
  else { ltv = home === 'second' ? P.ltv.expat.second : (price > P.ltv.priceThreshold ? P.ltv.expat.firstAbove5M : P.ltv.expat.first); }
  if (stage === 'offplan' && ltv > P.ltv.offPlanCap) { ltv = P.ltv.offPlanCap; note = 'Off-plan properties are financed up to 50% until completion.'; }
  return { ltv, note };
}

export const annuity = (loan, annualRatePct, years) => {
  const r = annualRatePct / 100 / 12, n = Math.max(1, Math.round(years * 12));
  return r > 0 ? loan * r / (1 - Math.pow(1 + r, -n)) : loan / n;
};

export function cashToClose(P, i) {
  const price = i.price, status = i.status, home = i.home, stage = i.stage;
  const rate = i.rate, term = Math.min(P.maxTerm, Math.max(P.minTerm, i.term || P.maxTerm));
  if (!price) return null;
  const { ltv, note } = ltvFor(P, status, home, stage, price);
  const F = P.fees, VAT = P.vat;
  const loan = price * ltv, down = price - loan;
  const dld = price * F.dldPct + F.dldFixed;
  const trustee = (price >= F.trusteeThreshold ? F.trusteeAbove500k : F.trusteeBelow500k) * (1 + VAT);
  const mreg = loan * F.mortgageRegPct + F.mortgageRegFixed;
  const agentFee = i.agent ? price * F.agentPct * (1 + VAT) : 0;
  const valuation = F.valuation;
  const bankPct = status === 'nonresident' ? F.bankFeeNonResident : F.bankFeeResident;
  const bankFee = loan * bankPct * (1 + VAT);
  const lines = [
    ['Down payment (' + Math.round((1 - ltv) * 100) + '%)', down],
    ['DLD transfer fee (4% + AED 580)', dld],
    ['Trustee office fee (incl. VAT)', trustee],
    ['Mortgage registration (0.25% of loan + AED 290)', mreg],
    ['Agent commission (2% + VAT)', agentFee],
    ['Property valuation', valuation],
    ['Bank processing fee (≈' + (bankPct * 100) + '% + VAT)', bankFee],
  ].filter((l) => l[1] > 0);
  const fees = dld + trustee + mreg + agentFee + valuation + bankFee;
  const total = down + fees;
  const pay = annuity(loan, rate, term);
  const stress = annuity(loan, P.stressRate, term);
  let dbr = null;
  if (i.income > 0) { const ratio = (stress + i.debts) / i.income; dbr = { ratio, ok: ratio <= P.dbr, stress }; }
  return { price, ltv, note, loan, down, lines, fees, total, pct: total / price, pay, rate, term, dbr, stress, nonresident: status === 'nonresident' };
}

export function monthlyPayment(P, i) {
  const price = i.price; if (!price) return null;
  const down = Math.min(price, Math.max(0, i.down));
  const loan = price - down, ltv = loan / price;
  const term = Math.min(P.maxTerm, Math.max(P.minTerm, i.term || P.maxTerm));
  const pay = annuity(loan, i.rate, term);
  const stress = annuity(loan, P.stressRate, term);
  const totalInterest = pay * term * 12 - loan;
  return { price, loan, down, ltv, term, rate: i.rate, pay, stress, totalInterest };
}

export function ageFrom(dob, today = new Date()) {
  if (!dob) return null;
  const d = new Date(dob); if (isNaN(d.getTime())) return null;
  let a = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) a--;
  return a;
}

export function affordability(P, i) {
  const income = (i.income || 0) + (i.other || 0);
  if (!income) return null;
  const maxAge = i.status === 'national' ? P.maxAge.national : (i.incomeType === 'self-employed' ? P.maxAge.selfEmployed : P.maxAge.salaried);
  const age = ageFrom(i.dob);
  let term = Math.min(P.maxTerm, Math.max(1, i.term || P.maxTerm));
  let cappedByAge = false;
  if (age !== null) { const left = maxAge - age; if (left < term) { term = Math.max(1, left); cappedByAge = true; } }
  const cardPay = (i.cardLimit || 0) * P.cardLimitPct;
  const room = income * P.dbr - (i.debts || 0) - cardPay;
  const r = P.stressRate / 100 / 12, n = term * 12;
  const factor = r > 0 ? r / (1 - Math.pow(1 + r, -n)) : 1 / n;
  const loan = Math.max(0, room / factor);
  const ltvFirst = i.status === 'nonresident' ? P.ltv.nonResident : i.status === 'national' ? P.ltv.national.first : P.ltv.expat.first;
  const ltvAbove = i.status === 'nonresident' ? P.ltv.nonResident : i.status === 'national' ? P.ltv.national.firstAbove5M : P.ltv.expat.firstAbove5M;
  const pAbove = loan / ltvAbove;
  const priceMax = pAbove > P.ltv.priceThreshold ? pAbove : Math.min(loan / ltvFirst, P.ltv.priceThreshold);
  const ltv = loan > 0 ? loan / priceMax : ltvFirst;
  const pay = annuity(loan, i.rate ?? P.rate, term);
  return { income, loan, priceMax, ltv, term, cappedByAge, maxAge, age, room, cardPay, pay, selfEmployed: i.incomeType === 'self-employed' };
}
