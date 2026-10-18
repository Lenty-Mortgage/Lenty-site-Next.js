import { url } from '../lib/url';

/** One-line consent bar; client/site.js shows it, stores the choice and sends the Consent Mode update to GTM.
    Analytics (GA4, Clarity) and advertising (Google Ads, Meta) tags fire only after "Accept all". */
export default function CookieBar() {
  return (
    <div className="cookie" id="cookie" role="region" aria-label="Cookies" hidden>
      <span><span className="cb-long">We use essential cookies. With your consent we also use analytics and advertising cookies (Google, Meta, Microsoft Clarity).</span><a className="cb-short" href={url('/cookies/')}>Cookies: essential + analytics &amp; ads with consent</a></span>
      <span className="acts">
        <button type="button" className="primary" data-cookie="all">Accept all</button>
        <button type="button" data-cookie="essential">Essential only</button>
        <a className="linkbtn" href={url('/cookies/')}>Details</a>
      </span>
    </div>
  );
}
