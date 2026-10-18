import Base from '../../components/Base';
import Advisors from '../../components/Advisors';
import WhatsAppLink from '../../components/WhatsAppLink';
import { advisorLanguages, langName } from '../../content/advisors';
import { personLd, confirmedAdvisors } from '../../lib/entity';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Mortgage advisors in Dubai: one named advisor | Lenty',
  description: 'No call centre, no hand-offs. The mortgage advisor who reads your case is the one who calls you and stays with you from the first message to the keys.',
  path: '/advisors/',
});

export default function Page() {
  const peopleLd = confirmedAdvisors().map((a) => ({ '@context': 'https://schema.org', ...personLd(a) }));
  const page = 'Advisors', slug = 'advisors';
  return (
    <Base path="/advisors/" pageName={page} breadcrumbs={[{ label: 'Advisors', href: '/advisors/' }]} jsonLd={peopleLd}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="eyebrow">Your advisors</p>
          <h1>One named advisor, first message to keys</h1>
          <p className="lead">No call centre, no hand-offs. The person who reads your case is the person who calls you.</p>
          <div className="chips" style={{ marginTop: 20 }} aria-label="Languages our advisors speak">
            {advisorLanguages().map((l) => <span key={l} className="chip">{langName(l)}</span>)}
          </div>
                  </div>
      </section>
      <Advisors page={page} slug={slug} all heading={false} showSituations />
      <section className="block">
        <div className="wrap">
          <div className="band aur">
            <div style={{ display: 'grid', gap: 10 }}><h2>Not sure who to ask? Message us — we&apos;ll route you to the right advisor.</h2></div>
            <div style={{ display: 'grid', gap: 10, justifyItems: 'start' }}><WhatsAppLink cta="advisors" page={page} slug={slug} className="btn btn-primary" label="Message us" /></div>
          </div>
        </div>
      </section>
    </Base>
  );
}
