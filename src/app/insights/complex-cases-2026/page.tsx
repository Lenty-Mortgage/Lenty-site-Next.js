import Base from '../../../components/Base';
import WhatsAppLink from '../../../components/WhatsAppLink';
import { site } from '../../../config/site';
import { url, absUrl } from '../../../lib/url';
import { reviewer, personLd, orgId, websiteId } from '../../../lib/entity';
import { pageMetadata } from '../../../lib/seo';

const path = '/insights/complex-cases-2026/';
const title = 'Complex UAE mortgage cases in 2026: what 43 files show';
const published = '2026-10-13';
const description = 'Anonymised data from 43 Lenty cases: who needs a complex UAE mortgage, what they care about, how they find a broker and which files get approved.';

export const metadata = pageMetadata({
  title: `${title} | Lenty`,
  description,
  path,
});

/** Aggregated from 43 anonymised case records logged by three Lenty advisors in March 2026. No client data. */
const tables: { id: string; h: string; note?: string; cols: [string, string]; rows: [string, string][] }[] = [
  { id: 'who', h: 'Who the clients were', cols: ['Profile', 'Share of cases'], rows: [
    ['Resident, salaried', '40%'], ['Non-resident, business owner', '26%'], ['Resident, business owner or self-employed', '23%'], ['Non-resident, salaried', '12%'],
  ], note: 'Shares are rounded, so they add up to 101%.' },
  { id: 'where', h: 'Where they come from', cols: ['Region', 'Share of cases'], rows: [
    ['Europe', '26%'], ['GCC', '23%'], ['South Asia', '14%'], ['Other Western countries', '12%'], ['Africa', '12%'], ['East Asia', '12%'],
  ] },
  { id: 'priority', h: 'What mattered most to them', cols: ['First priority', 'Share of cases'], rows: [
    ['Expert service', '58%'], ['Fast approval', '21%'], ['Reputation', '12%'], ['Best rate', '7%'],
  ], note: 'Best rate was the second priority in 56% of cases: clients care about the rate, but not first.' },
  { id: 'language', h: 'Languages they wanted', cols: ['Language', 'Share of cases'], rows: [
    ['English', '67%'], ['Arabic', '44%'], ['French', '21%'], ['Hindi', '7%'],
  ], note: 'Clients could name more than one language; a third did not name English at all.' },
  { id: 'contact', h: 'How they wanted to talk', cols: ['Channel', 'Share of cases'], rows: [
    ['Phone', '74%'], ['WhatsApp', '65%'], ['Email', '33%'],
  ], note: 'More than one channel per client.' },
  { id: 'source', h: 'How they found us', cols: ['Source', 'Share of cases'], rows: [
    ['Referral', '49%'], ['Property portal', '23%'], ['Walk-in', '12%'], ['Social media', '9%'],
  ], note: 'A real-estate agent or a referral was involved in 74% of cases.' },
];
const findings = [
  `Half of the clients (49%) were business owners or self-employed, not salaried.`,
  `37% lived outside the UAE, and 44% of those came to us because an off-plan handover payment was due.`,
  `In 65% of cases the alternative the client considered was their own bank, not another broker.`,
  `"Expert service" was the first priority in 58% of cases; "best rate" in 7%.`,
  `80% of completed cases were approved. 18 of 19 referred clients were approved.`,
  `The five cases that were not approved were simple but weak profiles: four were salaried on AED 10–20k a month, three had a poor credit history. The complex files — non-residents and business owners — were almost all approved.`,
];

export default function Page() {
  const page = 'Complex cases 2026', slug = 'insights/complex-cases-2026';
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article', '@id': absUrl(path) + '#article',
      headline: title, description, image: absUrl('/og.png'), datePublished: published, dateModified: published,
      author: personLd(reviewer), publisher: { '@id': orgId() },
      mainEntityOfPage: absUrl(path), isPartOf: { '@id': websiteId() }, about: 'Mortgages for complex cases in the UAE',
    },
  ];
  return (
    <Base path={path} pageName={page} breadcrumbs={[{ label: 'Insights: complex cases 2026', href: path }]} jsonLd={ld}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="eyebrow">Insights · Lenty data</p>
          <h1>Complex UAE mortgage cases in 2026: what 43 files show</h1>
          <p className="lead">Who comes to a mortgage advisor when the bank says it&apos;s complicated, what they care about, and which files get approved. Anonymised data from 43 cases handled by Lenty advisors.</p>
          <p className="updated">Published 13 October 2026 · By <a href={url(`/advisors/#${reviewer.slug}`)}>{reviewer.name}</a>, {reviewer.role}, Lenty ({site.company.license})</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap stack-lg">
          <div className="prose">
            <h2>Key findings</h2>
            <ul>{findings.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>

          {tables.map((t) => (
            <div key={t.id} className="prose" id={t.id}>
              <h2>{t.h}</h2>
              <table className="data-table">
                <thead><tr><th scope="col">{t.cols[0]}</th><th scope="col">{t.cols[1]}</th></tr></thead>
                <tbody>{t.rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td className="num">{r[1]}</td></tr>)}</tbody>
              </table>
              {t.note && <p className="small muted">{t.note}</p>}
            </div>
          ))}

          <div className="prose" id="outcomes">
            <h2>Which files get approved</h2>
            <p>Among completed cases, 80% were approved and the client went ahead. Referred clients did best: 18 of 19 were approved. The five cases that did not close all came from cold channels, and they were not the complex ones: four were salaried with AED 10–20k a month and three had a poor credit history.</p>
            <p>The complex files — non-residents and business owners — were almost all approved. What made the difference was choosing the bank whose rules fit the file, not how unusual the case looked. For context: 21% of clients were over 55, and 61% were buying above AED 2M (21% above AED 5M).</p>
            <p><a className="arrow" href={url('/cases/')}>Read anonymised cases →</a></p>
          </div>

          <div className="prose" id="method">
            <h2>About this data</h2>
            <p>Three Lenty advisors logged 43 recent cases in March 2026: profile, residency, income band, budget, priorities, languages, how the client found us and the outcome. The figures above are shares of those 43 records, rounded to whole percentages; some questions allowed more than one answer.</p>
            <p className="small muted">This is a small sample of our own clients, not a survey of the UAE market or our full pipeline. Names and identifying details are not published.</p>
          </div>

          <div className="hero-ctas">
            <a className="btn btn-primary" href={url('/check/')} data-event="cta_check_click" data-cta="article">Check my chances · 2 min</a>
            <WhatsAppLink cta="article" page={page} slug={slug} className="btn btn-wa" label="Message an advisor" />
          </div>
        </div>
      </section>
    </Base>
  );
}
