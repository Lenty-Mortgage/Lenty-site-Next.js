import Base from '../../components/Base';
import CaseCard from '../../components/CaseCard';
import { cases } from '../../content/cases';
import { url } from '../../lib/url';
import { InlineModule } from '../../lib/assets';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Mortgage cases other banks found complicated | Lenty',
  description: 'Anonymised Lenty cases, with details changed. Non-residents, business owners, declined applicants, off-plan handovers, bonus income and borrowers over 55.',
  path: '/cases/',
});

const chips = ['Non-resident', 'Business owner', 'Declined', 'Off-plan', 'Non-standard income', '55+', 'Portfolio'];

export default function Page() {
  return (
    <Base path="/cases/" pageName="Cases" breadcrumbs={[{ label: 'Cases', href: '/cases/' }]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="eyebrow">Cases</p>
          <h1>Files other banks found complicated</h1>
          <p className="lead">Anonymised, with details changed. Filter by situation. <a href={url('/insights/complex-cases-2026/')}>What 43 of our cases show →</a></p>
          <div className="chips" style={{ marginTop: 20 }} role="group" aria-label="Filter by situation">
            <button type="button" className="chip" data-filter="" aria-current="true">All</button>
            {chips.map((c) => <button key={c} type="button" className="chip" data-filter={c} aria-current="false">{c}</button>)}
          </div>
        </div>
      </section>
      <section className="block">
        <div className="wrap">
          <div className="case-grid" id="caseGrid">
            {cases.map((c) => <CaseCard key={c.slug} c={c} withSituation />)}
          </div>
          <p className="small muted" id="caseEmpty" hidden style={{ marginTop: 16 }}>No published case for this situation yet.</p>
        </div>
      </section>
      <InlineModule name="cases-filter" />
    </Base>
  );
}
