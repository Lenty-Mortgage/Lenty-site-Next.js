/* Exported as out/404.html (GitHub Pages and most static hosts serve it for unknown URLs). */
import Base from '../components/Base';
import WhatsAppLink from '../components/WhatsAppLink';
import { url } from '../lib/url';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({ title: 'Page not found | Lenty', description: "This page moved or never existed. The advisor didn't.", path: '/404/', noindex: true });

export default function NotFound() {
  return (
    <Base path="/404/" pageName="404">
      <section className="page-hero" style={{ paddingTop: 48, borderBottom: 0, minHeight: '50svh' }}>
        <div className="wrap"><p className="eyebrow">404</p><h1>This page moved or never existed. The advisor didn&apos;t.</h1>
          <div className="hero-ctas"><WhatsAppLink cta="404" page="404" slug="404" className="btn btn-wa" label="Message an advisor" /><a className="btn btn-ghost" href={url('/')}>Home</a></div></div>
      </section>
    </Base>
  );
}
