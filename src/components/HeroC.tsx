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
          <h1 id="hero-h1"><span className="v-orig">When the bank says it&apos;s complicated, <em>we find the one that says yes.</em></span><span className="v-test hc-h1-test"><span></span><em></em><span></span></span></h1>
          <p className="hc-lead">Non-resident, business owner, or already declined? A named advisor matches you with the right UAE bank and tells you upfront how much cash you&apos;ll need.</p>
          <div className="hc-ctas">
            <a className="btn hc-primary" href={url('/check/')}>Check my chances · 2 min</a>
            <WhatsAppLink page={page} slug={slug} className="btn hc-wa" label="Message an advisor" />
          </div>
          {site.company.phone && <p className="hc-sub">Prefer to talk? <a href={`tel:${site.company.phoneTel}`} data-event="call_click" data-page={slug}>Call {site.company.phone}</a></p>}
          <p className="hc-sub">No documents · no credit-file enquiry · reply within {sla ?? <Tbc label="X" />} min in working hours<span className="v-test"> · one named advisor, first message to keys</span></p>
          <div className={showGoogleReviews() ? 'hc-trust' : 'hc-trust v-orig'}>
            <span className="v-orig">Licensed in Dubai · {site.company.license}</span>
            <span className="v-orig">One named advisor, first message to keys</span>
            {showGoogleReviews() && <span>{site.google.rating}★ Google ({site.google.reviews} reviews)</span>}
          </div>
        </div>
        <aside className="hero-card v-orig" aria-label="Example: cash needed on a AED 2,000,000 apartment">
          <p className="eyebrow">Example · AED 2,000,000 apartment</p>
          <h2>What most buyers don&apos;t hear until it&apos;s late</h2>
          <div className="mini-row"><span>Down payment (20%)</span><span className="num">400,000</span></div>
          <div className="mini-row"><span>DLD transfer fee (4%)</span><span className="num">80,580</span></div>
          <div className="mini-row"><span>Agent commission (2% + VAT)</span><span className="num">42,000</span></div>
          <div className="mini-row"><span>Registration, valuation, bank fees</span><span className="num">≈ 19,900</span></div>
          <div className="mini-total"><span>Cash you need on day one</span><b className="num">≈ AED 542k</b></div>
          <p className="small">Since 1 February 2025, under UAE Central Bank rules, banks don&apos;t finance the DLD fee or the agent&apos;s commission. Resident expat, first home, ready property.</p>
          <a className="btn btn-ghost btn-sm" href={url('/calculators/cash-to-close/')}>Calculate for my case</a>
        </aside>
      </div>
    </section>
  );
}
