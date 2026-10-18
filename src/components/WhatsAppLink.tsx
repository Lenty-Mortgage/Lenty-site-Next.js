/** WhatsApp link with pre-filled text (copy-deck 1.2) and data-event for analytics delegation. */
import type { ReactNode } from 'react';
import { waLink } from '../lib/whatsapp';
import WaIcon from './WaIcon';

interface Props { page: string; slug: string; situation?: string; cta?: string; className?: string; label?: string; icon?: boolean; ariaLabel?: string; children?: ReactNode }

export default function WhatsAppLink({ page, slug, situation, cta, className = 'btn btn-wa', label = 'WhatsApp', icon = true, ariaLabel, children }: Props) {
  return (
    <a className={className} href={waLink(page, slug, situation)} target="_blank" rel="noopener" data-event="whatsapp_click" data-page={slug} data-cta={cta} aria-label={ariaLabel}>
      {icon && <WaIcon />}
      {children ?? label}
    </a>
  );
}
