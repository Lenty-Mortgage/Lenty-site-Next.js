import { url } from '../lib/url';
import { steps } from '../content/steps';
import { rich } from '../lib/rich';
import Html from './Html';

export default function Steps({ link = true, expanded = false }: { link?: boolean; expanded?: boolean }) {
  return (
    <section className="block" id="how" aria-labelledby="how-h2">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">How it works</p>
          <h2 id="how-h2">Four steps, with the timing written down</h2>
        </div>
        <ol className="steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {steps.map((s) => (
            <li key={s.n} className="step">
              <Html className="when" html={rich(s.when)} />
              <h3>{s.n}. {s.title}</h3>
              <p>{expanded ? s.weDo : s.text}</p>
              <p className="from">From you: <Html as="b" html={rich(s.fromYou)} /></p>
              {expanded && <p className="from">Where it can slip: <Html html={rich(s.delays)} /></p>}
            </li>
          ))}
        </ol>
        {link && <p className="sec-foot"><a className="arrow" href={url('/how-it-works/')}>What happens after you apply →</a></p>}
      </div>
    </section>
  );
}
