import Base from '../../components/Base';
import Tbc from '../../components/Tbc';
import WhatsAppLink from '../../components/WhatsAppLink';
import { site } from '../../config/site';
import { url } from '../../lib/url';
import { pageMetadata } from '../../lib/seo';
import { orgPageLd } from '../../lib/entity';

export const metadata = pageMetadata({
  title: 'Contact a mortgage advisor in Dubai | Lenty',
  description: 'WhatsApp, call or email a Lenty mortgage advisor. Office in Tameem House, Barsha Heights, Dubai, open Monday to Friday, 9:00 to 18:00 Dubai time.',
  path: '/contact/',
});

export default function Page() {
  const page = 'Contact', slug = 'contact';
  const c = site.company;
  return (
    <Base path="/contact/" pageName={page} breadcrumbs={[{ label: 'Contact', href: '/contact/' }]} jsonLd={[orgPageLd('ContactPage', '/contact/', 'Contact Lenty')]}>
      <section className="page-hero" style={{ paddingTop: 12 }}><div className="wrap"><p className="eyebrow">Contact</p><h1>Talk to a person</h1></div></section>
      <section className="block">
        <div className="wrap stack-lg">
          <div className="contact-grid">
            <div className="panel stack"><p className="eyebrow">WhatsApp</p><p className="num">{c.whatsapp}</p><WhatsAppLink cta="contact" page={page} slug={slug} className="btn btn-wa btn-sm" label="Message" /></div>
            <div className="panel stack"><p className="eyebrow">Call</p><p>{c.phone ? <a href={`tel:${c.phoneTel}`} data-event="call_click" data-cta="contact" data-page={slug}>{c.phone}</a> : <Tbc label="phone — one number" />}</p></div>
            <div className="panel stack"><p className="eyebrow">Email</p><p>{c.email ? <a href={`mailto:${c.email}`} data-event="email_click" data-cta="contact">{c.email}</a> : <Tbc label="email — one domain" />}</p></div>
            <div className="panel stack"><p className="eyebrow">Hours</p><p>{c.hours ?? <Tbc label="e.g. Mon–Sat 9:00–19:00" />} (Dubai time, GMT+4)</p></div>
          </div>
          <div className="prose"><h2>Address</h2><p>{c.address ?? <Tbc label="address: Business Bay (Al Manara Tower, Office 510) or Barsha Heights (Tameem House, Office 2803)" />}</p>{site.google.url && <p><a className="arrow" href={site.google.url} target="_blank" rel="noopener">Open in Google Maps →</a></p>}</div>
          <p>Prefer to start with the questions? <a className="arrow" href={url('/check/')} data-event="cta_check_click" data-cta="contact">Check my chances · 2 min →</a></p>
        </div>
      </section>
    </Base>
  );
}
