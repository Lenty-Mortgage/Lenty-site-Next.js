import { url } from '../lib/url';

export default function AgentsLine() {
  return (
    <aside className="agents-line" aria-label="For real-estate agents">
      <div className="wrap">
        <span>Real-estate agent or developer? We only do mortgages — your client stays yours.</span>
        <a className="arrow" href={url('/partners/')}>Partner programme →</a>
      </div>
    </aside>
  );
}
