import { url } from '../lib/url';
import type { Case } from '../content/cases';

export default function CaseCard({ c, withSituation = false }: { c: Case; withSituation?: boolean }) {
  return (
    <a className="case" data-situation={withSituation ? c.situation : undefined} href={url(`/cases/${c.slug}/`)}>
      <span className="tag">{c.tag}</span>
      <p className="out">{c.result}</p>
      <p className="small muted">{c.line}</p>
      <span className="small muted">{c.readTime}</span>
    </a>
  );
}
