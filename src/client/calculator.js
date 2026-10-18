import { cashToClose, monthlyPayment, affordability, ltvFor, fmt, parse } from '../lib/calc.js';

(function () {
  const root = document.getElementById('calc');
  if (!root) return;
  const P = JSON.parse(root.dataset.params);
  const tab = root.dataset.tab;
  const $ = (id) => document.getElementById(id);
  const form = $('calcForm');
  const radio = (name) => (form.querySelector(`input[name=${name}]:checked`) || {}).value;
  document.body.classList.add('has-calc');

  /* prefill from the query string (?status=nonresident&stage=offplan&home=second&income=self-employed&price=…) */
  const q = new URLSearchParams(location.search);
  const pick = (name, v) => { const el = form.querySelector(`input[name=${name}][value="${v}"]`); if (el) el.checked = true; };
  if (q.get('status')) pick('status', q.get('status'));
  if (q.get('stage')) pick('stage', q.get('stage'));
  if (q.get('home')) pick('home', q.get('home'));
  if (q.get('income') === 'self-employed') pick('incomeType', 'self-employed');
  if (q.get('price') && $('price')) $('price').value = fmt(parse(q.get('price')));

  /* dataLayer calc_result, throttled to 1 s */
  let last = 0, pending = null;
  function track(data) {
    const now = Date.now();
    const send = () => { last = Date.now(); pending = null; (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: 'calc_result', calculator: tab }, data)); };
    if (now - last >= 1000) send(); else if (!pending) pending = setTimeout(send, 1000 - (now - last));
  }
  const setSticky = (v) => { const s = $('stickyTotal'); if (s) s.textContent = v; };
  const checkLink = () => { const a = $('calcCheck'); if (a) { const u = new URL(a.href); u.searchParams.set('status', radio('status')); a.href = u.toString(); } };

  function renderCash() {
    const r = cashToClose(P, {
      price: parse($('price').value), status: radio('status'), home: radio('home'), stage: radio('stage'),
      rate: parse($('rate').value), term: parse($('term').value), agent: $('agent').checked,
      income: parse($('income').value), debts: parse($('debts').value),
    });
    if (!r) { $('outTotal').textContent = 'Enter a price'; $('outLines').innerHTML = ''; setSticky('–'); return; }
    let html = r.lines.map((l) => `<tr><td>${l[0]}</td><td class="num">${fmt(l[1])}</td></tr>`).join('');
    html += `<tr class="sub"><td>Fees the bank won't finance</td><td class="num">${fmt(r.fees)}</td></tr>`;
    if (r.nonresident) html += $('tplNrFee').innerHTML;
    $('outLines').innerHTML = html;
    $('outTotal').textContent = 'AED ' + fmt(r.total);
    $('outPct').textContent = Math.round(r.pct * 100) + '% of the price · loan AED ' + fmt(r.loan) + ' (' + Math.round(r.ltv * 100) + '% LTV)';
    $('outMonthly').textContent = 'AED ' + fmt(r.pay);
    $('outLoan').textContent = r.rate.toFixed(2) + '% over ' + r.term + ' years';
    $('outLtvNote').textContent = r.note;
    if (r.dbr) {
      $('outDbr').innerHTML = `<span class="pill ${r.dbr.ok ? 'ok' : 'warn'}">${r.dbr.ok ? 'Within' : 'Above'} the ${Math.round(P.dbr * 100)}% debt-burden limit</span> <span class="small">Banks test the payment at a higher rate (≈${P.stressRate}%): AED ${fmt(r.dbr.stress)} + other debts AED ${fmt(parse($('debts').value))} = ${Math.round(r.dbr.ratio * 100)}% of income.</span>`;
    } else $('outDbr').innerHTML = '';
    setSticky('AED ' + fmt(r.total));
    track({ status: radio('status'), home: radio('home'), stage: radio('stage'), price: r.price, total: Math.round(r.total), loan: Math.round(r.loan), ltv: r.ltv, dbr_ok: r.dbr ? r.dbr.ok : null });
  }

  let syncing = false;
  function syncDown(from) {
    if (syncing) return; syncing = true;
    const price = parse($('price').value);
    if (from === 'pct') $('downAed').value = fmt(price * parse($('downPct').value) / 100);
    else if (from === 'aed') $('downPct').value = price ? Math.round(parse($('downAed').value) / price * 100) : 0;
    else { const { ltv } = ltvFor(P, radio('status'), 'first', 'ready', price); $('downPct').value = Math.round((1 - ltv) * 100); $('downAed').value = fmt(price * (1 - ltv)); }
    syncing = false;
  }
  function renderMonthly() {
    const r = monthlyPayment(P, { price: parse($('price').value), down: parse($('downAed').value), rate: parse($('rate').value), term: parse($('term').value) });
    if (!r) { $('outTotal').textContent = 'Enter a price'; $('outPct').textContent = ''; setSticky('–'); return; }
    $('outTotal').textContent = 'AED ' + fmt(r.pay);
    $('outPct').textContent = `Loan AED ${fmt(r.loan)} · ${Math.round(r.ltv * 100)}% LTV · total interest over the term AED ${fmt(r.totalInterest)}`;
    $('outStress').textContent = `At the bank's stress rate (≈${P.stressRate}%) the payment would be AED ${fmt(r.stress)} — this is what the bank tests against your income.`;
    setSticky('AED ' + fmt(r.pay));
    track({ status: radio('status'), price: r.price, loan: Math.round(r.loan), payment: Math.round(r.pay), term: r.term });
  }

  function renderAfford() {
    const r = affordability(P, {
      status: radio('status'), incomeType: radio('incomeType'), income: parse($('income').value), other: parse($('other').value),
      dob: $('dob').value, debts: parse($('debts').value), cardLimit: parse($('cards').value), term: parse($('term').value), rate: parse($('rate').value),
    });
    if (!r) { $('outTotal').textContent = 'Enter your income'; $('outPct').textContent = ''; setSticky('–'); return; }
    $('outTotal').textContent = 'AED ' + fmt(r.loan);
    $('outPct').textContent = `Property up to AED ${fmt(r.priceMax)} (${Math.round(r.ltv * 100)}% LTV) · payment ≈ AED ${fmt(r.pay)} over ${r.term} years`;
    $('outTermNote').textContent = r.cappedByAge ? `Term capped at ${r.term} years by your age (loan repaid by ${r.maxAge}).` : (r.room <= 0 ? 'Existing payments and card limits already use the 50% debt-burden room.' : '');
    $('outSeNote').innerHTML = r.selfEmployed ? 'Self-employed: banks average 2 years of income. <span class="tbc">to confirm</span>' : '';
    setSticky('AED ' + fmt(r.loan));
    track({ status: radio('status'), incomeType: radio('incomeType'), income: Math.round(r.income), loan: Math.round(r.loan), priceMax: Math.round(r.priceMax), term: r.term, cappedByAge: r.cappedByAge });
  }

  const render = tab === 'cash-to-close' ? renderCash : tab === 'monthly-payment' ? renderMonthly : renderAfford;
  form.addEventListener('submit', (e) => e.preventDefault());
  /* calc_start: once per page, on the visitor's first change (calc_result also fires on load) */
  let started = false;
  const start = () => { if (started) return; started = true; (window.dataLayer = window.dataLayer || []).push({ event: 'calc_start', calculator: tab }); };
  form.addEventListener('input', start);
  form.addEventListener('change', start);
  form.addEventListener('input', (e) => {
    if (tab === 'monthly-payment') {
      if (e.target.id === 'downPct') syncDown('pct'); else if (e.target.id === 'downAed') syncDown('aed'); else if (e.target.id === 'price') syncDown('pct');
    }
    render(); checkLink();
  });
  form.addEventListener('change', (e) => {
    if (tab === 'monthly-payment' && e.target.name === 'status') syncDown('status');
    render(); checkLink();
  });
  ['price', 'income', 'debts', 'other', 'cards', 'downAed'].forEach((id) => { const el = $(id); if (el) el.addEventListener('blur', (e) => { const v = parse(e.target.value); if (v || ['debts', 'other', 'cards'].includes(id)) e.target.value = fmt(v); }); });
  if (tab === 'monthly-payment') syncDown('status');
  render(); checkLink();
})();
