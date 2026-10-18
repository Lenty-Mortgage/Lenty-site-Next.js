import Base from '../../components/Base';
import WhatsAppLink from '../../components/WhatsAppLink';
import Tbc from '../../components/Tbc';
import Html from '../../components/Html';
import FAQ from '../../components/FAQ';
import { partnersFaq } from '../../content/partnersFaq';
import { site } from '../../config/site';
import { faqPageLd } from '../../lib/rich';
import { InlineModule } from '../../lib/assets';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Mortgage partner for UAE real-estate agents | Lenty',
  description: 'Send us the files other brokers hand back: non-residents, business owners, tight handover dates. Referral commission, clear status, and your client stays yours.',
  path: '/partners/',
});

const ways = [
  { t: 'Agents', items: ['Pre-approval before the viewing', 'One WhatsApp message to refer', 'Status without chasing', 'Your client stays yours'] },
  { t: 'Brokers', items: ['Overflow and complex files', 'No exclusivity'] },
  { t: 'Developers', items: ['On-site advisory at show suites', 'Off-plan and handover financing', 'Payment-plan structuring'] },
];
const heroInk = { color: 'var(--hero-ink)' };

export default function Page() {
  const page = 'For agents and developers', slug = 'partners';
  const commission = site.partners.commissionPublish ? site.partners.commission : null;
  const faqLd = faqPageLd(partnersFaq);
  const app = site.partners.appUrl;
  return (
    <Base path="/partners/" pageName={page} breadcrumbs={[{ label: 'For agents and developers', href: '/partners/' }]} jsonLd={[faqLd]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="eyebrow">Lenty partner programme</p>
          <h1>Close the deal, not just the mortgage.</h1>
          <p className="lead">Your clients deserve a mortgage advisor who stays when cases get difficult. Send us the files other brokers hand back: non-residents, business owners, tight handover dates.</p>
          <div className="facts-grid">
            <div className="fact"><span className="v">{commission ? commission.split(' ')[0] : <Tbc label="0.3%" />}</span><span className="k">of every loan you refer</span></div>
            <div className="fact"><span className="v">{site.partners.payoutDays} days</span><span className="k">after disbursal, with a date you can see</span></div>
            <div className="fact"><span className="v">AED 0</span><span className="k">for your client (residents)</span></div>
            <div className="fact"><span className="v">1 business day</span><span className="k">first answer on every referral</span></div>
          </div>
          <div className="hero-ctas">
            <WhatsAppLink cta="partners" page={page} slug={slug} className="btn btn-wa" label="Send a case on WhatsApp" />
            <a className="btn btn-primary" href={app ?? '#partner-form'} data-event={app ? 'partner_app_click' : undefined} data-cta="register">Become a partner</a>
          </div>
          <p className="small muted" style={{ marginTop: 12 }}>{app ? <><a href={app} data-event="partner_app_click" data-cta="login">I already have an account →</a> · <a href="#partner-form">Prefer we set it up for you?</a></> : <>I already have an account → <Tbc label="app link to come" /></>}</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap grid-2">
          <div className="prose">
            <p className="eyebrow">Why this matters</p>
            <h2>Deals don&apos;t fall through on the buyer</h2>
            <p>Most deals don&apos;t fall through because the buyer changed their mind. They fall through because the wrong broker, the wrong bank or a late document stalled the financing. The agent loses the commission, the developer loses the unit, the buyer loses the home.</p>
          </div>
          <div className="prose">
            <h3>Four cases we take</h3>
            <ul><li>Non-resident buyers</li><li>Self-employed and business owners</li><li>Documents that arrive late</li><li>The wrong bank that damages the credit profile</li></ul>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="aur" style={{ borderRadius: 'var(--radius)', padding: 28 }}>
            <p className="eyebrow">How we work</p>
            <div style={{ marginTop: 14 }}>
              <ul className="prose" style={{ listStyle: 'none', padding: 0, color: 'var(--hero-muted)' }}>
                <li><b style={heroInk}>Structured before submission.</b> The file goes in once, the way the bank reads it.</li>
                <li><b style={heroInk}>The right bank, not the nearest one.</b></li>
                <li><b style={heroInk}>One advisor on the whole case,</b> never passed between desks.</li>
                <li><b style={heroInk}>Honest timelines:</b> salaried with full documents {site.sla.bankMatching ?? <Tbc label="24–48 h" />}{site.sla.complexCases && <>; complex cases {site.sla.complexCases}</>}.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><h2>Three ways we work</h2></div>
          <div className="steps n3">
            {ways.map((w) => <div key={w.t} className="step"><h3>{w.t}</h3><ul className="prose" style={{ fontSize: '.92rem', color: 'var(--muted)' }}>{w.items.map((i) => <Html key={i} as="li" html={i.replace(/\[\[tbc:([^\]]+)\]\]/g, '<span class="tbc">$1</span>')} />)}</ul></div>)}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><h2>How referrals work</h2></div>
          <ol className="steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="step"><span className="when">01</span><h3>Send the basics</h3><p>By WhatsApp or email, no forms.</p></li>
            <li className="step"><span className="when">02</span><h3>Honest first answer</h3><p>We assess the profile and give an honest first answer.</p></li>
            <li className="step"><span className="when">03</span><h3>We run the case</h3><p>Bank selection to status updates.</p></li>
            <li className="step"><span className="when">04</span><h3>A clear result</h3><p>Or a clear explanation of what to change.</p></li>
          </ol>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><h2>Four guarantees</h2></div>
          <div className="principles">
            <div className="panel">No exclusivity for standard partnerships</div>
            <div className="panel">Client data stays confidential</div>
            <div className="panel"><em>Your client relationship is ours to protect, not to replace</em></div>
            <div className="panel">A reply to every referral within one business day</div>
          </div>
        </div>
      </section>

      <FAQ groups={[{ id: 'partners', title: 'Partner questions', items: partnersFaq }]} title="Partner questions" eyebrow="FAQ" link={false} id="partner-faq" cols={false} groupTag="h3" />

      <section className="block" id="partner-form">
        <div className="wrap grid-2">
          <div className="sec-head" style={{ alignContent: 'start' }}>
            <p className="eyebrow">No time to register?</p><h2>We&apos;ll set up your partner account</h2><p className="lead">Leave your contact and we reply within one business day.</p><p className="small muted">{app ? <>Or <a href={app} data-event="partner_app_click" data-cta="register-form">register yourself in the Lenty Partners app →</a></> : <>Or <Tbc label="Become a partner in the app — link" /></>}</p></div>
          <form className="panel" id="partnerForm" noValidate>
            <div className="two">
              <div className="field"><label htmlFor="p-name">Name</label><input id="p-name" name="name" type="text" autoComplete="name" required /><span className="err">Please add your name.</span></div>
              <div className="field"><label htmlFor="p-company">Company</label><input id="p-company" name="company" type="text" autoComplete="organization" /></div>
            </div>
            <div className="field"><span className="lbl" id="lbl-role">Role</span><div className="seg" role="radiogroup" aria-labelledby="lbl-role"><input type="radio" name="role" id="r-agent" value="Agent" defaultChecked /><label htmlFor="r-agent">Agent</label><input type="radio" name="role" id="r-broker" value="Broker" /><label htmlFor="r-broker">Broker</label><input type="radio" name="role" id="r-dev" value="Developer" /><label htmlFor="r-dev">Developer</label></div></div>
            <div className="two">
              <div className="field"><label htmlFor="p-phone">UAE mobile</label><input id="p-phone" name="mobile" type="tel" inputMode="tel" required /><span className="err">We need a mobile number to reply.</span></div>
              <div className="field"><label htmlFor="p-email">Email</label><input id="p-email" name="email" type="email" required /><span className="err">That email doesn&apos;t look right.</span></div>
            </div>
            <div className="field"><label htmlFor="p-msg">Message</label><textarea id="p-msg" name="message"></textarea></div>
            <button className="btn btn-primary" type="submit">Apply to partner</button>
            <p className="form-err" data-err="" hidden></p>
            <p className="small muted" style={{ marginTop: 10 }} data-ok="" hidden>Thanks — we reply within one business day.</p>
          </form>
        </div>
      </section>
      <InlineModule name="partner-form" />
    </Base>
  );
}
