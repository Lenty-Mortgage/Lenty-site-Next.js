/** /check form. All text is server-rendered; client/check-form.js only shows/hides steps and submits. */
import { Fragment } from 'react';
import { url } from '../lib/url';
import { site, showGoogleReviews } from '../config/site';
import { waLink } from '../lib/whatsapp';
import { ModuleScript } from '../lib/assets';
import { advisorLanguages, langName } from '../content/advisors';
import Tbc from './Tbc';

interface Props { intro?: boolean; page: string; slug: string }

const TOTAL = 7;
const countries = ['United Kingdom','France','Germany','Italy','Spain','Netherlands','Switzerland','United States','Canada','India','Pakistan','Saudi Arabia','Qatar','Kuwait','Egypt','Russia','Ukraine','Kazakhstan','China','Australia','South Africa','Nigeria','Other'];
const codes = [['+971','UAE'],['+44','United Kingdom'],['+33','France'],['+49','Germany'],['+39','Italy'],['+34','Spain'],['+31','Netherlands'],['+41','Switzerland'],['+1','USA / Canada'],['+91','India'],['+92','Pakistan'],['+966','Saudi Arabia'],['+974','Qatar'],['+965','Kuwait'],['+20','Egypt'],['+7','Russia / Kazakhstan'],['+380','Ukraine'],['+86','China'],['+61','Australia'],['+27','South Africa'],['+234','Nigeria']];

/** Single-choice option button (role=radio). */
function Opt({ value, sub, needs }: { value: string; sub?: string; needs?: string }) {
  return (
    <button className="opt" type="button" role="radio" aria-checked="false" value={value} data-needs={needs}>
      {sub ? <span>{value}<span className="sub">{sub}</span></span> : value}
    </button>
  );
}
/** Multi-choice option button (role=checkbox). */
function Check({ value, exclusive }: { value: string; exclusive?: boolean }) {
  return <button className="opt" type="button" role="checkbox" aria-checked="false" value={value} data-exclusive={exclusive ? '' : undefined}><span className="box" aria-hidden="true"></span>{value}</button>;
}
const Back = () => <button className="linkbtn" type="button" data-back="">← Back</button>;
const Next = ({ hidden }: { hidden?: boolean }) => <button className="btn btn-primary btn-sm" type="button" data-next="" hidden={hidden}>Continue</button>;

export default function CheckForm({ intro = true, page, slug }: Props) {
  const sla = site.sla.firstReplyMinutes;
  return (
    <div className="quiz" id="check" data-total={TOTAL} data-intro={intro ? '1' : '0'} data-thanks={url('/thanks/')}>
      <div className="progress" aria-hidden="true"><i id="qbar"></i></div>

      {intro && (
        <section className="qstep intro-screen" data-screen="0">
          <p className="eyebrow">Check my chances</p>
          <h1>Two minutes. Then a real person.</h1>
          <p className="marks"><span>2 minutes</span><span>Reply within {sla ?? <Tbc label="X" />} min in working hours</span><span>No credit-file enquiry</span><span>No documents yet</span></p>
          <p className="lead">Five quick questions about your situation, then where to reach you. Nothing is sent to any bank or credit bureau until you say so. A named advisor reads your answers before the call.</p>
          <div><button className="btn btn-primary" type="button" data-start="">Let&apos;s start</button></div>
          <p className="small muted">Prefer to talk? <a href={waLink(page, slug)} target="_blank" rel="noopener" data-event="whatsapp_click" data-page={slug}>Message an advisor on WhatsApp</a></p>
          {showGoogleReviews() && <p className="small muted">{site.google.rating}★ Google ({site.google.reviews} reviews)</p>}
        </section>
      )}

      <form id="checkForm" noValidate data-endpoint-fallback="console">
        <input type="hidden" name="situation" id="f-situation" defaultValue="" />
        <input type="hidden" name="page" id="f-page" defaultValue={slug} />
        <input type="hidden" name="utm_source" id="f-utm_source" /><input type="hidden" name="utm_medium" id="f-utm_medium" /><input type="hidden" name="utm_campaign" id="f-utm_campaign" /><input type="hidden" name="utm_term" id="f-utm_term" /><input type="hidden" name="utm_content" id="f-utm_content" /><input type="hidden" name="gclid" id="f-gclid" />

        <section className="qstep" data-step="1" hidden>
          <p className="eyebrow">Step 1 of {TOTAL}</p>
          <h2 tabIndex={-1}>What brings you here?</h2>
          <p className="why">Timing decides what we do first.</p>
          <div className="opts" role="radiogroup" aria-label="What brings you here?" data-single="stage">
            <Opt value="I've found a property and need a mortgage" />
            <Opt value="I want a pre-approval, then I'll look" />
            <Opt value="My off-plan handover payment is due" />
            <Opt value="I want to refinance or release equity" />
          </div>
          <div className="qnav"><a className="linkbtn" href={url('/')}>← Home</a><span className="small muted">No credit check · no documents yet</span></div>
        </section>

        <section className="qstep" data-step="2" hidden>
          <p className="eyebrow">Step 2 of {TOTAL}</p>
          <h2 tabIndex={-1}>Where do you live today?</h2>
          <p className="why">Banks have separate rules for residents and non-residents.</p>
          <div className="opts" role="radiogroup" aria-label="Where do you live today?" data-single="status">
            <Opt value="UAE resident" sub="I have a residence visa" />
            <Opt value="Non-resident" sub="I live outside the UAE" needs="country" />
            <Opt value="UAE national" />
          </div>
          <div className="field" data-extra="country" hidden style={{ marginTop: 16 }}>
            <label htmlFor="f-country">Country of residence</label>
            <select id="f-country" name="country"><option value="">Choose a country</option>{countries.map((c) => <option key={c}>{c}</option>)}</select>
            <span className="err">Please choose your country of residence.</span>
          </div>
          <div className="qnav"><Back /><Next hidden /></div>
        </section>

        <section className="qstep" data-step="3" hidden>
          <p className="eyebrow">Step 3 of {TOTAL}</p>
          <h2 tabIndex={-1}>How do you earn your income?</h2>
          <p className="why">This decides which banks and which documents fit you.</p>
          <div className="opts" role="radiogroup" aria-label="How do you earn your income?" data-single="work">
            <Opt value="Salaried" />
            <Opt value="Business owner" />
            <Opt value="Self-employed / freelancer" />
            <Opt value="Mixed or other" sub="Rental, commission, bonus-heavy" />
          </div>
          <div className="field" style={{ marginTop: 18 }}>
            <span className="lbl" id="lbl-cur">Currency of income</span>
            <div className="seg" role="radiogroup" aria-labelledby="lbl-cur">
              {['AED', 'EUR', 'GBP', 'USD', 'Other'].map((c, i) => <Fragment key={c}><input type="radio" name="currency" id={`cur-${c}`} value={c} defaultChecked={i === 0} /><label htmlFor={`cur-${c}`}>{c}</label></Fragment>)}
            </div>
          </div>
          <div className="qnav"><Back /><Next /></div>
          <p className="form-err" data-err="" hidden>Please choose how you earn your income.</p>
        </section>

        <section className="qstep" data-step="4" hidden>
          <p className="eyebrow">Step 4 of {TOTAL}</p>
          <h2 tabIndex={-1}>Roughly how much per month, and what price range?</h2>
          <p className="why">This sets the down payment and the cash you need.</p>
          <p className="lbl" style={{ fontWeight: 600, marginBottom: 8 }}>Monthly income <span className="muted" style={{ fontWeight: 400 }}>(AED or the equivalent)</span></p>
          <div className="opts" role="radiogroup" aria-label="Monthly income" data-single="income" style={{ marginBottom: 18 }}>
            <Opt value="Under AED 15,000" />
            <Opt value="AED 15–30k" />
            <Opt value="AED 30–50k" />
            <Opt value="Over AED 50k" />
          </div>
          <p className="lbl" style={{ fontWeight: 600, marginBottom: 8 }}>Price range</p>
          <div className="opts" role="radiogroup" aria-label="Price range" data-single="price">
            <Opt value="Under AED 1M" />
            <Opt value="AED 1–2M" />
            <Opt value="AED 2–5M" />
            <Opt value="Over AED 5M" />
          </div>
          <div className="qnav"><Back /><Next /></div>
          <p className="form-err" data-err="" hidden>Please pick an income range and a price range.</p>
        </section>

        <section className="qstep" data-step="5" hidden>
          <p className="eyebrow">Step 5 of {TOTAL}</p>
          <h2 tabIndex={-1}>Has anything made banks hesitate before?</h2>
          <p className="why">Honest answers help us avoid a second decline.</p>
          <div className="opts" role="group" aria-label="Has anything made banks hesitate before?" data-multi="history">
            <Check value="A bank declined me" />
            <Check value="Credit cards or loans are high" />
            <Check value="Business is under 2 years old" />
            <Check value="I'm 55 or older" />
            <Check value="Nothing I know of" exclusive />
          </div>
          <div className="qnav"><Back /><Next /></div>
          <p className="form-err" data-err="" hidden>Pick at least one — &quot;Nothing I know of&quot; is fine.</p>
        </section>

        <section className="qstep" data-step="6" hidden>
          <p className="eyebrow">Step 6 of {TOTAL}</p>
          <h2 tabIndex={-1}>This is what we know about you</h2>
          <p className="why">Based on your answers. A named advisor reviews them before the call.</p>
          <div className="summary-box" id="summary" aria-live="polite">
            <div className="row"><span>What brings you here</span><span data-sum="stage"></span></div>
            <div className="row"><span>Where you live</span><span data-sum="status"></span></div>
            <div className="row" data-sum-row="country" hidden><span>Country</span><span data-sum="country"></span></div>
            <div className="row"><span>Income</span><span data-sum="work"></span></div>
            <div className="row"><span>Currency</span><span data-sum="currency"></span></div>
            <div className="row"><span>Monthly income</span><span data-sum="income"></span></div>
            <div className="row"><span>Price range</span><span data-sum="price"></span></div>
            <div className="row"><span>History</span><span data-sum="history"></span></div>
          </div>
          <div className="callout" data-callout="nonresident" hidden style={{ marginBottom: 12 }}><b>Non-resident:</b> plan for 50–60% financing and the fees banks don&apos;t finance. {site.fees.nonResident ?? <Tbc label="fee" />}.</div>
          <div className="callout" data-callout="resident" hidden style={{ marginBottom: 12 }}><b>Resident:</b> our service is free. You pay only the standard bank and government fees.</div>
          <div className="callout" data-callout="declined" hidden style={{ marginBottom: 12 }}>We&apos;ll start by finding out what held the last application back.</div>
          <p className="small muted" style={{ marginBottom: 16 }}>Next: your advisor writes on WhatsApp within {sla ?? <Tbc label="X" />} min during working hours, then a 15-minute call. No documents needed yet.</p>
          <button className="btn btn-primary" type="button" data-next="">Continue to contact details</button>
          <div className="qnav"><Back /></div>
        </section>

        <section className="qstep" data-step="7" hidden>
          <p className="eyebrow">Step 7 of {TOTAL}</p>
          <h2 tabIndex={-1}>Where should your advisor reach you?</h2>
          <p className="why">We use these details only to contact you about your mortgage.</p>
          <div className="field"><label htmlFor="f-name">First name</label><input id="f-name" name="firstName" type="text" autoComplete="given-name" required /><span className="err">Please tell us your first name so the advisor knows how to address you.</span></div>
          <div className="two">
            <div className="field"><label htmlFor="f-cc">Country code</label><select id="f-cc" name="countryCode">{codes.map(([c, n]) => <option key={c} value={c}>{c} {n}</option>)}</select></div>
            <div className="field"><label htmlFor="f-phone">Mobile number</label><input id="f-phone" name="mobile" type="tel" inputMode="tel" autoComplete="tel-national" required /><span className="err">We need a mobile number to reach you — digits only, without the country code.</span></div>
          </div>
          <div className="field"><span className="lbl" id="lbl-ch">Preferred contact</span>
            <div className="seg" role="radiogroup" aria-labelledby="lbl-ch">
              <input type="radio" name="channel" id="ch-wa" value="WhatsApp" defaultChecked /><label htmlFor="ch-wa">WhatsApp</label>
              <input type="radio" name="channel" id="ch-call" value="Phone call" /><label htmlFor="ch-call">Phone call</label>
              <input type="radio" name="channel" id="ch-mail" value="Email" /><label htmlFor="ch-mail">Email</label>
            </div>
          </div>
          <div className="field"><label htmlFor="f-email">Email (optional)</label><input id="f-email" name="email" type="email" autoComplete="email" /><span className="err">That email doesn&apos;t look right — check for a typo, or leave it empty.</span></div>
          <div className="two">
            <div className="field"><label htmlFor="f-lang">Language for your advisor</label><select id="f-lang" name="language">{advisorLanguages().map((l) => <option key={l}>{langName(l)}</option>)}</select><span className="hint">Your advisor speaks with you in this language from the first message.</span></div>
            <div className="field"><label htmlFor="f-time">Best time to call (Dubai time)</label><select id="f-time" name="bestTime"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div>
          </div>
          <div className="field"><label className="check"><input type="checkbox" id="f-privacy" name="privacy" value="yes" required /> <span>I agree to the <a href={url('/privacy/')} target="_blank">Privacy Policy</a></span></label><span className="err">Please agree to the Privacy Policy so we can contact you.</span></div>
          <button className="btn btn-primary" type="submit" id="submitBtn">Send to my advisor</button>
          <p className="small muted" style={{ marginTop: 10 }}>Licensed in Dubai · {site.company.license}. Your answers go only to your Lenty advisor — nothing reaches a bank until you say so.</p>
          <p className="form-err" data-err="" hidden></p>
          <div className="qnav"><Back /><span className="small muted">No credit check · no documents yet</span></div>
        </section>
      </form>
      <ModuleScript name="check-form" />
    </div>
  );
}
