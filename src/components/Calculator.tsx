/** Calculators (cash to close / monthly payment / affordability). Server-rendered form + default result; client/calculator.js recalculates in the browser. */
import { url } from '../lib/url';
import { site, calcParams } from '../config/site';
import { cashToClose, fmt } from '../lib/calc.js';
import { ModuleScript } from '../lib/assets';
import { esc } from '../lib/rich';
import WhatsAppLink from './WhatsAppLink';

export type Tab = 'cash-to-close' | 'monthly-payment' | 'affordability';
interface Props { tab: Tab; page: string; slug: string }

const tabs: { id: Tab; label: string; href: string }[] = [
  { id: 'monthly-payment', label: 'Monthly payment', href: '/calculators/monthly-payment/' },
  { id: 'affordability', label: 'How much can I borrow', href: '/calculators/affordability/' },
  { id: 'cash-to-close', label: 'Cash to close', href: '/calculators/cash-to-close/' },
];

export default function Calculator({ tab, page, slug }: Props) {
  const P = calcParams();
  // SSR default for cash-to-close (resident, first, ready, 2,000,000, agent on) so the key figure is in the HTML.
  const d = cashToClose(P, { price: 2_000_000, status: 'resident', home: 'first', stage: 'ready', rate: P.rate, term: P.maxTerm, agent: true, income: 0, debts: 0 });
  const ratesDate = site.calc.ratesDate;
  const nrFee = site.fees.nonResident;
  /* <template> content is inert markup for calculator.js (non-resident fee row) */
  const tplNrFee = `<tr><td>Lenty advisory fee (non-residents)</td><td>${nrFee ? esc(nrFee) : '<span class="tbc">fee</span>'}</td></tr>`;
  return (
    <div className="calc-root" id="calc" data-tab={tab} data-params={JSON.stringify(P)}>
      <div className="tabs" role="tablist" aria-label="Calculators">
        {tabs.map((t) => <a key={t.id} role="tab" aria-selected={t.id === tab ? 'true' : 'false'} aria-current={t.id === tab ? 'page' : undefined} href={url(t.href)}>{t.label}</a>)}
      </div>

      <div className="calc">
        <form className="panel" id="calcForm" autoComplete="off" noValidate>
          <div className="calc-common">
            <div className="field">
              <span className="lbl" id="lbl-status">Your status</span>
              <div className="seg" role="radiogroup" aria-labelledby="lbl-status">
                <input type="radio" name="status" id="st-res" value="resident" defaultChecked /><label htmlFor="st-res">UAE resident (expat)</label>
                <input type="radio" name="status" id="st-nr" value="nonresident" /><label htmlFor="st-nr">Non-resident</label>
                <input type="radio" name="status" id="st-nat" value="national" /><label htmlFor="st-nat">UAE national</label>
              </div>
            </div>
            <div className="field">
              <span className="lbl" id="lbl-itype">Income type</span>
              <div className="seg" role="radiogroup" aria-labelledby="lbl-itype">
                <input type="radio" name="incomeType" id="it-sal" value="salaried" defaultChecked /><label htmlFor="it-sal">Salaried</label>
                <input type="radio" name="incomeType" id="it-se" value="self-employed" /><label htmlFor="it-se">Self-employed</label>
              </div>
            </div>
          </div>

          {tab === 'cash-to-close' && (
            <div data-fields="cash-to-close">
              <div className="field"><label htmlFor="price">Property price (AED)</label><input id="price" name="price" type="text" inputMode="numeric" defaultValue="2,000,000" /></div>
              <div className="two">
                <div className="field"><span className="lbl" id="lbl-home">Which home</span>
                  <div className="seg" role="radiogroup" aria-labelledby="lbl-home"><input type="radio" name="home" id="h1" value="first" defaultChecked /><label htmlFor="h1">First</label><input type="radio" name="home" id="h2" value="second" /><label htmlFor="h2">Second+</label></div></div>
                <div className="field"><span className="lbl" id="lbl-stage">Property</span>
                  <div className="seg" role="radiogroup" aria-labelledby="lbl-stage"><input type="radio" name="stage" id="sr" value="ready" defaultChecked /><label htmlFor="sr">Ready</label><input type="radio" name="stage" id="so" value="offplan" /><label htmlFor="so">Off-plan</label></div></div>
              </div>
              <div className="two">
                <div className="field"><label htmlFor="rate">Interest rate (%)</label><input id="rate" name="rate" type="number" step="0.05" min="1" max="12" defaultValue={P.rate} /><span className="hint">Illustrative. Your advisor confirms live rates.</span></div>
                <div className="field"><label htmlFor="term">Term (years)</label><input id="term" name="term" type="number" min={P.minTerm} max={P.maxTerm} defaultValue={P.maxTerm} /><span className="hint">UAE maximum is {P.maxTerm} years.</span></div>
              </div>
              <div className="field"><label htmlFor="income">Monthly income, AED (optional)</label><input id="income" name="income" type="text" inputMode="numeric" placeholder="e.g. 45,000" /><span className="hint">Lets us check the 50% debt-burden limit. Include other loan and card payments below.</span></div>
              <div className="field"><label htmlFor="debts">Other monthly loan &amp; card payments, AED</label><input id="debts" name="debts" type="text" inputMode="numeric" defaultValue="0" /></div>
              <label className="check"><input type="checkbox" id="agent" name="agent" defaultChecked /> Buying through a real-estate agent (2% + VAT)</label>
            </div>
          )}

          {tab === 'monthly-payment' && (
            <div data-fields="monthly-payment">
              <div className="field"><label htmlFor="price">Property price (AED)</label><input id="price" name="price" type="text" inputMode="numeric" defaultValue="2,000,000" /></div>
              <div className="two">
                <div className="field"><label htmlFor="downPct">Down payment (%)</label><input id="downPct" name="downPct" type="number" min="0" max="100" step="1" defaultValue="20" /><span className="hint">Set automatically from your status. Change it if you want.</span></div>
                <div className="field"><label htmlFor="downAed">Down payment (AED)</label><input id="downAed" name="downAed" type="text" inputMode="numeric" defaultValue="400,000" /></div>
              </div>
              <div className="two">
                <div className="field"><label htmlFor="rate">Interest rate (%)</label><input id="rate" name="rate" type="number" step="0.05" min="1" max="12" defaultValue={P.rate} /><span className="hint">Illustrative. Your advisor confirms live rates.</span></div>
                <div className="field"><label htmlFor="term">Term (years)</label><input id="term" name="term" type="number" min={P.minTerm} max={P.maxTerm} defaultValue={P.maxTerm} /></div>
              </div>
            </div>
          )}

          {tab === 'affordability' && (
            <div data-fields="affordability">
              <div className="two">
                <div className="field"><label htmlFor="income">Monthly income, AED</label><input id="income" name="income" type="text" inputMode="numeric" defaultValue="30,000" /></div>
                <div className="field"><label htmlFor="other">Other income (commission, bonus, rent)</label><input id="other" name="other" type="text" inputMode="numeric" defaultValue="0" /></div>
              </div>
              <div className="two">
                <div className="field"><label htmlFor="dob">Date of birth</label><input id="dob" name="dob" type="date" max="2010-12-31" /><span className="hint">Banks want the loan repaid by {P.maxAge.salaried} (salaried) or {P.maxAge.selfEmployed} (self-employed and nationals).</span></div>
                <div className="field"><label htmlFor="term">Term (years)</label><input id="term" name="term" type="number" min="1" max={P.maxTerm} defaultValue={P.maxTerm} /></div>
              </div>
              <div className="two">
                <div className="field"><label htmlFor="debts">Monthly loan payments, AED</label><input id="debts" name="debts" type="text" inputMode="numeric" defaultValue="0" /></div>
                <div className="field"><label htmlFor="cards">Total credit-card limit, AED</label><input id="cards" name="cards" type="text" inputMode="numeric" defaultValue="0" /><span className="hint">Banks count ≈5% of the limit as a payment</span></div>
              </div>
              <div className="field"><label htmlFor="rate">Interest rate (%)</label><input id="rate" name="rate" type="number" step="0.05" min="1" max="12" defaultValue={P.rate} /><span className="hint">Illustrative. The bank tests at ≈{P.stressRate}%.</span></div>
            </div>
          )}
        </form>

        <div className="panel calc-result" aria-live="polite" id="calcOut">
          {tab === 'cash-to-close' && d && (
            <>
              <div className="res-total aur">
                <span className="eyebrow">Cash you need on day one</span>
                <span className="big num" id="outTotal">AED {fmt(d.total)}</span>
                <span className="pct num" id="outPct">{Math.round(d.pct * 100)}% of the price · loan AED {fmt(d.loan)} ({Math.round(d.ltv * 100)}% LTV)</span>
              </div>
              <table className="lines"><tbody id="outLines">
                {d.lines.map((l) => <tr key={String(l[0])}><td>{l[0]}</td><td className="num">{fmt(l[1])}</td></tr>)}
                <tr className="sub"><td>Fees the bank won&apos;t finance</td><td className="num">{fmt(d.fees)}</td></tr>
              </tbody></table>
              <div className="monthly"><span>Estimated monthly payment<br /><span className="small muted" id="outLoan">{d.rate.toFixed(2)}% over {d.term} years</span></span><b className="num" id="outMonthly">AED {fmt(d.pay)}</b></div>
              <div className="note">
                <div id="outDbr"></div>
                <span id="outLtvNote"></span>
              </div>
            </>
          )}
          {tab === 'monthly-payment' && (
            <>
              <div className="res-total aur">
                <span className="eyebrow">Monthly payment</span>
                <span className="big num" id="outTotal">–</span>
                <span className="pct num" id="outPct">–</span>
              </div>
              <div className="note"><span id="outStress"></span></div>
            </>
          )}
          {tab === 'affordability' && (
            <>
              <div className="res-total aur">
                <span className="eyebrow">You could borrow up to</span>
                <span className="big num" id="outTotal">–</span>
                <span className="pct num" id="outPct">–</span>
              </div>
              <div className="note">
                <span id="outTermNote"></span>
                <span id="outSeNote"></span>
                <span>Your real number could be higher or lower — the bank decides. This is the range an advisor starts from.</span>
              </div>
            </>
          )}
          <div className="note">
            <span>Illustrative rate {P.rate}%{ratesDate && ` as of ${ratesDate}`}. Your advisor confirms live rates.</span>
            <div className="callout"><b>Valuation gap.</b> If the bank values the property below the price, the bank lends on the lower figure and you pay the difference in cash. We order a valuation check before you sign where possible.</div>
            <span>Fees are typical Dubai figures. Your advisor confirms the exact numbers for your bank.</span>
          </div>
          <div className="res-acts">
            <a className="btn btn-primary" href={url('/check/')} data-event="cta_check_click" data-cta="calculator" id="calcCheck">{tab === 'cash-to-close' ? 'Discuss my case' : 'Check my chances'}</a>
            {tab === 'cash-to-close'
              ? <a className="btn btn-ghost" href={url('/how-it-works/')}>What happens next</a>
              : <WhatsAppLink cta="calculator" page={page} slug={slug} className="btn btn-ghost" label="Send me this estimate" icon={false} />}
          </div>
        </div>
      </div>

      <div className="calc-sticky">
        <span className="sl" id="stickyLabel">{tab === 'cash-to-close' ? 'Cash on day one' : tab === 'monthly-payment' ? 'Monthly payment' : 'You could borrow'}</span>
        <b className="num" id="stickyTotal">{tab === 'cash-to-close' && d ? `AED ${fmt(d.total)}` : '–'}</b>
        <a className="btn btn-primary btn-sm" href={url('/check/')} data-event="cta_check_click" data-cta="calculator_sticky">Check my chances</a>
      </div>
      <template id="tplNrFee" dangerouslySetInnerHTML={{ __html: tplNrFee }} />
      <ModuleScript name="calculator" />
    </div>
  );
}
