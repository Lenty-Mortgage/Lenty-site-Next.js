import Base from '../../components/Base';
import Steps from '../../components/Steps';
import Timeline from '../../components/Timeline';
import Chat from '../../components/Chat';
import { url } from '../../lib/url';
import { InlineModule } from '../../lib/assets';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'How getting a mortgage in Dubai works, step by step | Lenty',
  description: 'Four steps with the timing written down: discovery call, bank matching, pre-approval, valuation to keys. What happens after you apply and the documents you need.',
  path: '/how-it-works/',
});

const docs: Record<string, string[]> = {
  'Salaried resident': ['Passport, Emirates ID and visa', '6 months of payslips and a salary certificate', '6 months of personal bank statements', 'Proof of address', 'Credit report (Etihad Credit Bureau), we pull it with you'],
  'Business owner': ['Passport, Emirates ID and visa', 'Trade licence', 'Certificate of incorporation, shareholder register, articles', '6–12 months of company and personal bank statements', 'Audited accounts, usually 2 years, or VAT returns', 'Proof of address'],
  'Non-resident': ['Passport (all pages)', '6 months of payslips and a salary certificate, or company documents and audited accounts', '6 months of personal bank statements', 'Proof of address', 'Credit report from your country, for some banks'],
};

export default function Page() {
  return (
    <Base path="/how-it-works/" pageName="How it works" breadcrumbs={[{ label: 'How it works', href: '/how-it-works/' }]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap"><p className="eyebrow">How it works</p><h1>From the first message to the keys — and what happens in between</h1></div>
      </section>
      <Steps link={false} expanded />
      <section className="block" id="after">
        <div className="wrap after">
          <div>
            <div className="sec-head" style={{ marginBottom: 20 }}><p className="eyebrow">After you apply</p><h2>After you apply — no black holes</h2></div>
            <Timeline />
          </div>
          <Chat />
        </div>
      </section>
      <section className="block" id="documents">
        <div className="wrap">
          <div className="sec-head"><p className="eyebrow">Documents</p><h2>Documents, by situation</h2><p className="lead">Nothing is needed for the first call. We send the checklist for your case after it.</p></div>
          <div className="tabs" role="tablist" aria-label="Documents by situation">
            {Object.keys(docs).map((k, i) => <button key={k} type="button" role="tab" aria-selected={i === 0 ? 'true' : 'false'} aria-controls={`doc-${i}`} id={`tab-${i}`}>{k}</button>)}
          </div>
          {Object.entries(docs).map(([k, items], i) => (
            <div key={k} className="panel tabpanel" role="tabpanel" id={`doc-${i}`} aria-labelledby={`tab-${i}`} hidden={i !== 0} style={{ maxWidth: 720 }}>
              <h3 style={{ marginBottom: 10 }}>{k}</h3><ul>{items.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
          ))}
          <p className="small muted" style={{ marginTop: 12 }}>Requirements differ by bank and nationality. We tell you which apply to you on the first call.</p>
        </div>
      </section>
      <section className="block">
        <div className="wrap"><div className="hero-ctas"><a className="btn btn-primary" href={url('/check/')} data-event="cta_check_click" data-cta="how_it_works">Check my chances · 2 min</a></div></div>
      </section>
      <InlineModule name="doc-tabs" />
    </Base>
  );
}
