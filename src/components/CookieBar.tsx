import { url } from '../lib/url';

/** One-line consent bar; client/site.js shows it and stores the choice. Analytics load only after "Accept". */
export default function CookieBar() {
  return (
    <div className="cookie" id="cookie" role="region" aria-label="Cookies" hidden>
      <span><span className="cb-long">We use essential cookies and anonymous analytics.</span><a className="cb-short" href={url('/cookies/')}>Cookies: essential + anonymous analytics</a></span>
      <span className="acts">
        <button type="button" className="primary" data-cookie="all">Accept</button>
        <button type="button" data-cookie="essential">Essential only</button>
        <a className="linkbtn" href={url('/cookies/')}>Details</a>
      </span>
    </div>
  );
}
