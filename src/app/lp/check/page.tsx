import Base from '../../../components/Base';
import CheckForm from '../../../components/CheckForm';
import WhatsAppLink from '../../../components/WhatsAppLink';
import Tbc from '../../../components/Tbc';
import { site } from '../../../config/site';
import { pageMetadata } from '../../../lib/seo';

export const metadata = pageMetadata({
  title: 'Non-resident? Business owner? Declined? We find the UAE bank that says yes | Lenty',
  description: 'Check your chances in 2 minutes. A named Lenty advisor reads your answers before the call.',
  path: '/lp/check/', noindex: true,
});

export default function Page() {
  const page = 'Ads landing: check', slug = 'lp/check';
  return (
    <Base path="/lp/check/" pageName={page} chrome={false}>
      <header className="site" style={{ position: 'static' }}><div className="wrap"><span className="logo">Lenty</span><div className="hdr-cta" style={{ marginLeft: 'auto' }}><WhatsAppLink cta="lp_header" page={page} slug={slug} className="btn btn-ghost btn-sm" /></div></div></header>
      <section className="lp-hero">
        <div className="wrap">
          <p className="eyebrow">UAE mortgage advisors for complex cases</p>
          <h1 style={{ marginTop: 12 }}>Non-resident? Business owner? Declined? <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>We find the UAE bank that says yes.</em></h1>
          <p className="lp-proof"><span>Licensed in Dubai</span><span>One named advisor</span><span>{site.banks.count ? `${site.banks.count}+` : <Tbc label="N" />} banks</span></p>
        </div>
      </section>
      <div className="wrap"><CheckForm intro={false} page={page} slug={slug} /></div>
    </Base>
  );
}
