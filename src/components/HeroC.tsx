import { url } from '../lib/url';
import { site, showGoogleReviews } from '../config/site';
import WhatsAppLink from './WhatsAppLink';
import Tbc from './Tbc';

export default function HeroC({ page, slug }: { page: string; slug: string }) {
  const sla = site.sla.firstReplyMinutes;
  return (
    <section className="hero-c" aria-labelledby="hero-h1">
      <div className="wrap">
        <div className="hc-copy">
          <p className="hc-eyebrow">UAE mortgage advisors for complex cases</p>
          <h1 id="hero-h1">Make the <em>impossible</em> work.</h1>
          <p className="hc-lead">Non-resident, business owner, or already declined? A named advisor matches you with the right UAE bank and tells you upfront how much cash you&apos;ll need.</p>
          <div className="hc-ctas">
            <a className="btn hc-primary" href={url('/check/')} data-event="cta_check_click" data-cta="hero">Check my chances · 2 min</a>
            <WhatsAppLink cta="hero" page={page} slug={slug} className="btn hc-wa" label="Message an advisor" />
          </div>
          {site.company.phone && <p className="hc-sub">Prefer to talk? <a href={`tel:${site.company.phoneTel}`} data-event="call_click" data-cta="hero" data-page={slug}>Call {site.company.phone}</a></p>}
          <p className="hc-sub">No documents · no credit-file enquiry · reply within {sla ?? <Tbc label="X" />} min in working hours · one named advisor, first message to keys</p>
          {showGoogleReviews() && <div className="hc-trust"><span>{site.google.rating}★ Google ({site.google.reviews} reviews)</span></div>}
        </div>
      </div>
    </section>
  );
}
