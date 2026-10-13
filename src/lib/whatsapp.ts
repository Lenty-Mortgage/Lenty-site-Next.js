import { site } from '../config/site';

/** Pre-filled WhatsApp link (copy-deck 1.2) with UTM parameters. */
export function waLink(pageName: string, pageSlug: string, situation?: string): string {
  const text = `Hi Lenty, I'm on the ${pageName} page.${situation ? ` My situation: ${situation}.` : ''} I'd like to discuss my case.`;
  const utm = `utm_source=site&utm_medium=whatsapp&utm_content=${encodeURIComponent(pageSlug)}`;
  return `https://wa.me/${site.company.whatsappDigits}?text=${encodeURIComponent(text)}&${utm}`;
}
