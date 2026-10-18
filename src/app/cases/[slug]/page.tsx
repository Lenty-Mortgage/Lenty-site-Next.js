import { notFound } from 'next/navigation';
import Base from '../../../components/Base';
import Tbc from '../../../components/Tbc';
import Html from '../../../components/Html';
import WhatsAppLink from '../../../components/WhatsAppLink';
import { cases } from '../../../content/cases';
import { advisors } from '../../../content/advisors';
import { situations } from '../../../content/situations';
import { url } from '../../../lib/url';
import { rich } from '../../../lib/rich';
import { pageMetadata } from '../../../lib/seo';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return cases.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: Params) {
  const { slug: key } = await params;
  const c = cases.find((x) => x.slug === key);
  return c ? pageMetadata({ title: `${c.result} | Lenty`, description: c.line, path: `/cases/${c.slug}/` }) : {};
}

export default async function Page({ params }: Params) {
  const { slug: key } = await params;
  const c = cases.find((x) => x.slug === key);
  if (!c) notFound();
  const adv = advisors.find((a) => a.slug === c.advisor) ?? advisors[0];
  const sit = situations.find((s) => s.slug === c.situationSlug);
  const page = `Case: ${c.result}`, slug = `cases/${c.slug}`;
  return (
    <Base path={`/cases/${c.slug}/`} pageName={page} situation={c.situationSlug}
      breadcrumbs={[{ label: 'Cases', href: '/cases/' }, { label: c.result, href: `/cases/${c.slug}/` }]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap"><p className="tag">{c.tag}</p><h1>{c.result}</h1><p className="lead">{c.line}</p><p className="updated">{c.readTime} · Details changed to protect the client&apos;s privacy.</p></div>
      </section>
      <section className="block">
        <div className="wrap stack-lg">
          <div className="prose" style={{ maxWidth: 760 }}>
            <h2>A quick overview</h2>
            <table className="kv"><tbody>{c.overview.map((r) => <tr key={r.k}><th scope="row">{r.k}</th><Html as="td" html={rich(r.v)} /></tr>)}</tbody></table>
          </div>
          <div className="prose">
            <h2>The problem</h2><Html as="p" html={rich(c.problem)} />
            <h2>What we changed</h2><Html as="p" html={rich(c.changed)} />
            <h2>The outcome</h2><Html as="p" html={rich(c.outcome)} />
          </div>
          <div>
            <h2 style={{ marginBottom: 14 }}>Advisor on this case</h2>
            <article className="adv" style={{ maxWidth: 360 }}>
              <div className="avatar" aria-hidden="true">{adv.initial}</div>
              <h3>{adv.name ?? <Tbc label={adv.tbcLabel ?? 'advisor'} />}</h3><p className="small muted">{adv.role}</p>
              <div className="acts"><WhatsAppLink cta="case" page={page} slug={slug} situation={c.situationSlug} className="btn btn-ghost btn-sm" /></div>
            </article>
          </div>
          <div className="aur cta-final" style={{ borderRadius: 'var(--radius)' }}>
            <h2>Similar situation? Check my chances</h2>
            <div className="hc-ctas"><a className="btn btn-primary" href={url(`/check/?s=${c.situationSlug}`)}>Check my chances · 2 min</a>{sit && <a className="btn btn-ghost" href={url(`/situations/${sit.slug}/`)}>{sit.nav} →</a>}</div>
            <p className="small" style={{ color: 'var(--hero-muted)' }}>Details changed to protect the client&apos;s privacy.</p>
          </div>
        </div>
      </section>
    </Base>
  );
}
