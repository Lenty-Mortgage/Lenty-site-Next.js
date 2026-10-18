import { notFound } from 'next/navigation';
import Base from '../../../components/Base';
import Tbc from '../../../components/Tbc';
import Html from '../../../components/Html';
import WhatsAppLink from '../../../components/WhatsAppLink';
import CaseCard from '../../../components/CaseCard';
import { situations } from '../../../content/situations';
import { cases as allCases, type Case } from '../../../content/cases';
import { advisorFor } from '../../../content/advisors';
import { site } from '../../../config/site';
import { url } from '../../../lib/url';
import { rich, faqPageLd } from '../../../lib/rich';
import { reviewer, reviewedPageLd, serviceLd } from '../../../lib/entity';
import { pageMetadata } from '../../../lib/seo';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return situations.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: Params) {
  const { slug: key } = await params;
  const s = situations.find((x) => x.slug === key);
  return s ? pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/situations/${s.slug}/` }) : {};
}

export default async function Page({ params }: Params) {
  const { slug: key } = await params;
  const s = situations.find((x) => x.slug === key);
  if (!s) notFound();
  const page = s.nav, slug = `situations/${s.slug}`;
  const cs = s.cases.map((c) => allCases.find((x) => x.slug === c)).filter((c): c is Case => !!c);
  const adv = advisorFor(s.slug);
  const updated = site.calc.ratesDate;
  const items = s.questions.map((q) => ({ q: q.q, a: q.a ?? '[[tbc:Answer to be written by an advisor]]' }));
  const faqLd = faqPageLd(s.questions.map((q) => ({ q: q.q, a: q.a })));
  return (
    <Base path={`/situations/${s.slug}/`} pageName={page} situation={s.slug}
      breadcrumbs={[{ label: 'My situation', href: '/#situations' }, { label: s.nav, href: `/situations/${s.slug}/` }]} jsonLd={[faqLd, reviewedPageLd(`/situations/${s.slug}/`, s.metaTitle), serviceLd(`/situations/${s.slug}/`, s.metaTitle.replace(/\s*\|\s*Lenty$/, ''), s.nav)]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="eyebrow">{s.eyebrow}</p>
          <h1>{s.h1}</h1>
          <p className="lead">{s.lead}</p>
          <div className={s.facts.length < 4 ? `facts-grid n${s.facts.length}` : 'facts-grid'}>
            {s.facts.map((f) => <div key={f.v + f.k} className="fact"><span className="v num">{f.v}</span><Html className="k" html={rich(f.k)} /></div>)}
          </div>
          <div className="hero-ctas"><a className="btn btn-primary" href={url(`/check/?s=${s.slug}`)}>Check my chances · 2 min</a></div>
          <p className="updated">{updated && `Updated ${updated} · `}Reviewed {site.contentReviewed.label} by <a href={url(`/advisors/#${reviewer.slug}`)}>{reviewer.name}</a>, {reviewer.role}, Lenty ({site.company.license})</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap stack-lg">
          <div className="prose">
            <h2>How banks see this case</h2>
            <ul className="how-list">
              <li><span className="ic">✓</span><span><b>What they accept</b>{s.banks.accept}</span></li>
              <li><span className="ic no">✗</span><span><b>What they don&apos;t</b>{s.banks.reject}</span></li>
              <li><span className="ic dec">◎</span><span><b>What decides it</b>{s.banks.decides}</span></li>
            </ul>
          </div>

          {s.reasons && (
            <div className="prose"><h2>{s.reasons.title}</h2><ol>{s.reasons.items.map((r) => <li key={r}>{r}</li>)}</ol></div>
          )}

          {s.timelineBack && (
            <div className="prose"><h2>{s.timelineBack.title}</h2><ol>{s.timelineBack.items.map((r) => <li key={r}>{r}</li>)}</ol></div>
          )}

          <div className="prose">
            <h2>How much cash you&apos;ll need</h2>
            {s.cash
              ? <><p>{s.cash.intro}</p><Html as="div" className="callout" html={rich(s.cash.example)} /></>
              : <p>Banks finance part of the price. They don&apos;t finance the DLD fee, the agent, the trustee or the valuation. The calculator shows the number for your status and price.</p>}
            <div><a className="btn btn-ghost" href={url(s.calcHref)}>Calculate my cash</a></div>
          </div>

          <div>
            <h2 style={{ marginBottom: 18 }}>Documents and timeline</h2>
            {s.documents && (
              <div className="doc-grid" style={{ marginBottom: 16 }}>
                {s.documents.map((d) => <div key={d.title} className="panel"><h3 style={{ marginBottom: 10 }}>{d.title}</h3><ul>{d.items.map((i) => <li key={i}>{i}</li>)}</ul></div>)}
              </div>
            )}
            {!s.documents && (
              <div className="doc-grid" style={{ marginBottom: 16 }}>
                <div className="panel"><h3 style={{ marginBottom: 10 }}>Salaried</h3><ul><li>Passport, Emirates ID and visa</li><li>6 months of payslips and a salary certificate</li><li>6 months of personal bank statements</li><li>Proof of address</li></ul></div>
                <div className="panel"><h3 style={{ marginBottom: 10 }}>Business owner</h3><ul><li>Passport, Emirates ID and visa</li><li>Trade licence and company documents</li><li>6–12 months of company and personal statements</li><li>Audited accounts, usually 2 years</li></ul></div>
              </div>
            )}
            <p className="small muted"><b>Nothing is needed for the first call.</b></p>
            {s.timeline && <Html as="p" className="small muted" style={{ marginTop: 8 }} html={rich(s.timeline)} />}
            {!s.timeline && <Html as="p" className="small muted" style={{ marginTop: 8 }} html={rich(`Plan for ${site.sla.preApprovalResident ?? '[[tbc:sla.preApprovalResident]]'} to pre-approval and 2–3 weeks from valuation to transfer.`)} />}
          </div>
        </div>
      </section>

      {(cs.length > 0 || !!s.extraCases?.length) && (
        <section className="block">
          <div className="wrap">
            <div className="sec-head"><p className="eyebrow">Cases</p><h2>A case like yours</h2></div>
            <div className="case-grid">
              {cs.map((c) => <CaseCard key={c.slug} c={c} />)}
              {s.extraCases?.map((e) => <article key={e} className="case"><span className="tag">Example</span><Html as="p" className="out" html={rich(e)} /></article>)}
            </div>
          </div>
        </section>
      )}

      <section className="block">
        <div className="wrap">
          <div className="faq-group" style={{ maxWidth: 720 }}>
            <h2>Questions</h2>
            {items.map((it) => <details key={it.q} className="qa"><summary>{it.q}</summary><Html as="p" className="ans" html={rich(it.a)} /></details>)}
          </div>
          <p className="sec-foot">Still have a question? <WhatsAppLink cta="situation_faq" page={page} slug={slug} situation={s.slug} className="arrow" icon={false} label="WhatsApp an advisor →" /></p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><h2>Related</h2></div>
          <div className="related">{s.related.map((r) => <a key={r.href} className="chip" href={url(r.href)}>{r.label}</a>)}</div>
        </div>
      </section>

      <section className="block" id="cta">
        <div className="wrap">
          <div className="aur cta-final" style={{ borderRadius: 'var(--radius)' }}>
            <h2>Check my chances for this case</h2>
            <p className="muted" style={{ color: 'var(--hero-muted)' }}>Your advisor for this situation: <b>{adv.name ?? <Tbc label={adv.tbcLabel ?? 'advisor'} />}</b> · {adv.role}</p>
            <div className="hc-ctas">
              <a className="btn btn-primary" href={url(`/check/?s=${s.slug}`)}>Check my chances · 2 min</a>
              <WhatsAppLink cta="situation_cta" page={page} slug={slug} situation={s.slug} className="btn btn-wa" label="Message an advisor" />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
