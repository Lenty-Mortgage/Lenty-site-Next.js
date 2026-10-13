import { url } from '../lib/url';
import { cases, type Case } from '../content/cases';
import CaseCard from './CaseCard';

export default function Cases({ list = cases, heading = true, link = true }: { list?: Case[]; heading?: boolean; link?: boolean }) {
  return (
    <section className="block" id="cases" aria-labelledby="cases-h2">
      <div className="wrap">
        {heading && (
          <div className="sec-head">
            <p className="eyebrow">Cases</p>
            <h2 id="cases-h2">Files other banks found complicated</h2>
            <p className="lead">In 2026, 80% of our completed cases were approved; for referred clients it was 18 of 19. <a href={url('/insights/complex-cases-2026/')}>See the data →</a></p>
            <p className="small muted">Anonymised examples. Details changed, outcomes real.</p>
          </div>
        )}
        <div className="case-grid carousel" data-carousel="">
          {list.map((c) => <CaseCard key={c.slug} c={c} />)}
        </div>
        <div className="car-dots" aria-hidden="true"></div>
        {link && <p className="sec-foot"><a className="arrow" href={url('/cases/')}>All cases →</a></p>}
      </div>
    </section>
  );
}
