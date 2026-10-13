import { url } from '../lib/url';
import { situations, notSure } from '../content/situations';
import { waLink } from '../lib/whatsapp';

export default function SituationCards({ page, slug }: { page: string; slug: string }) {
  return (
    <section className="block" id="situations" aria-labelledby="sit-h2">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Your situation</p>
          <h2 id="sit-h2">Start from where you are, not from the bank&apos;s checklist</h2>
        </div>
        <div className="sit-grid">
          {situations.map((s) => (
            <a key={s.slug} className="sit" href={url(`/situations/${s.slug}/`)}>
              <span className="q">{s.card.title}</span>
              <span className="a">{s.card.line}</span>
              <span className="go">Read more →</span>
            </a>
          ))}
          <a className="sit" href={waLink(page, slug, 'not-sure')} target="_blank" rel="noopener" data-event="whatsapp_click" data-page={slug}>
            <span className="q">{notSure.title}</span>
            <span className="a">{notSure.line}</span>
            <span className="go">Message an advisor →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
