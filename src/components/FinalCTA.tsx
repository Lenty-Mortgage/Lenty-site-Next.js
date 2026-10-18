import { url } from '../lib/url';
import { site } from '../config/site';
import WhatsAppLink from './WhatsAppLink';
import Tbc from './Tbc';

interface Props { page: string; slug: string; situation?: string; title?: string; primary?: string }

export default function FinalCTA({ page, slug, situation, title = 'You bring the case. We bring the bank that says yes.', primary = 'Check my chances · 2 min' }: Props) {
  return (
    <section className="block" id="cta">
      <div className="wrap">
        <div className="aur cta-final" style={{ borderRadius: 'var(--radius)' }}>
          <h2>{title}</h2>
          <div className="hc-ctas">
            <a className="btn btn-primary" href={url(situation ? `/check/?s=${situation}` : '/check/')} data-event="cta_check_click" data-cta="final_cta">{primary}</a>
            <WhatsAppLink cta="final_cta" page={page} slug={slug} situation={situation} className="btn btn-wa" label="Message an advisor" />
          </div>
          <p className="marks" style={{ margin: 0 }}><span>No commitment</span><span>No credit-file enquiry</span><span>Reply within {site.sla.firstReplyMinutes ?? <Tbc label="X" />} min in working hours</span></p>
        </div>
      </div>
    </section>
  );
}
