import { url } from '../lib/url';
import { site } from '../config/site';
import { waLink } from '../lib/whatsapp';

export default function MobileBar({ page, slug, situation }: { page: string; slug: string; situation?: string }) {
  const tel = site.company.phoneTel ?? ('+' + site.company.whatsappDigits);
  return (
    <div className="mbar" role="navigation" aria-label="Quick actions">
      <a className="btn btn-wa" href={waLink(page, slug, situation)} target="_blank" rel="noopener" data-event="whatsapp_click" data-page={slug}>WhatsApp</a>
      <a className="btn btn-ghost" href={`tel:${tel}`} data-event="call_click" data-page={slug}>Call</a>
      {slug !== 'check' && <a className="btn btn-primary" href={url(situation ? `/check/?s=${situation}` : '/check/')}>Check my chances</a>}
    </div>
  );
}
