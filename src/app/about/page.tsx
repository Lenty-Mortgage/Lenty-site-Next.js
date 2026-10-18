import Base from '../../components/Base';
import Tbc from '../../components/Tbc';
import WhatsAppLink from '../../components/WhatsAppLink';
import { site } from '../../config/site';
import { url } from '../../lib/url';
import { pageMetadata } from '../../lib/seo';
import { orgPageLd, reviewer as founder } from '../../lib/entity';

export const metadata = pageMetadata({
  title: 'About us: a licensed mortgage advisory in Dubai | Lenty',
  description: "Lenty is a licensed mortgage consultant in Dubai. We work for the client, with the banks, on the cases that don't fit a checklist.",
  path: '/about/',
});

export default function Page() {
  const page = 'About', slug = 'about';
  const c = site.company;
  return (
    <Base path="/about/" pageName={page} breadcrumbs={[{ label: 'About', href: '/about/' }]} jsonLd={[orgPageLd('AboutPage', '/about/', 'About Lenty')]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap"><p className="eyebrow">About</p><h1>A mortgage advisory, not a bank, not a platform</h1>
          <p className="lead">Lenty is a licensed mortgage consultant in Dubai. We work for the client, with {site.banks.count ? `${site.banks.count}+` : <Tbc label="N" />} banks, on the cases that don&apos;t fit a checklist.</p></div>
      </section>
      <section className="block">
        <div className="wrap stack-lg">
          <div className="grid-2">
            <div className="panel stack"><p className="eyebrow">Licence</p><p><b>{c.legalName}</b></p><p>{c.license}, issued {c.licenseIssued} {c.licenseRenewal && `· valid until ${c.licenseRenewal}`}</p><p>{c.address ?? <Tbc label="address" />}</p><p className="small muted">TRN {c.trn}</p></div>
            <div className="panel stack"><p className="eyebrow">Founder</p><div className="avatar" aria-hidden="true">{founder.initial}</div><p><b>{founder.name}</b> — {founder.role}</p>{founder.bio && <p className="muted">{founder.bio}</p>}</div>
          </div>
          <div>
            <div className="sec-head"><h2>Four principles</h2></div>
            <div className="principles">
              <div className="panel">We say what&apos;s possible on the first call, not after the paperwork</div>
              <div className="panel">One named advisor from first message to keys</div>
              <div className="panel">We only do mortgages; we never sell property</div>
              <div className="panel">The cash number comes first, the rate second</div>
            </div>
          </div>
          <div className="grid-2">
            <div className="prose"><h2>Team</h2><p><a className="arrow" href={url('/advisors/')}>Meet the advisors →</a></p></div>
            <div className="prose"><h2>Timeline</h2><ol className="timeline"><li><span className="t">2025</span><span>Licence issued</span></li></ol></div>
          </div>
          <div className="hero-ctas"><a className="btn btn-primary" href={url('/check/')} data-event="cta_check_click" data-cta="hero">Check my chances</a><WhatsAppLink cta="hero" page={page} slug={slug} className="btn btn-wa" label="Message an advisor" /></div>
        </div>
      </section>
    </Base>
  );
}
