import { url } from '../lib/url';
import { situations, notSure } from '../content/situations';
import { waLink } from '../lib/whatsapp';
import WaIcon from './WaIcon';

interface Props { onHero?: boolean; page: string; slug: string; situation?: string }

const nav = [
  { label: 'Calculators', href: '/calculators/cash-to-close/' },
  { label: 'Advisors', href: '/advisors/' },
  { label: 'Cases', href: '/cases/' },
  { label: 'For agents', href: '/partners/' },
  { label: 'FAQ', href: '/faq/' },
];

export default function Header({ onHero = false, page, slug, situation }: Props) {
  const wa = waLink(page, slug, situation);
  return (
    <header className={onHero ? 'site on-hero' : 'site'}>
      <div className="wrap">
        <a className="logo" href={url('/')} aria-label="Lenty home">Lenty</a>
        <nav className="main" aria-label="Main">
          <details className="dd" data-dd="">
            <summary aria-haspopup="true">My situation</summary>
            <div className="dd-menu" role="menu" aria-label="My situation">
              <p className="dd-cap">Non-resident, business owner, declined — we start there.</p>
              {situations.map((s) => <a key={s.slug} role="menuitem" href={url(`/situations/${s.slug}/`)}>{s.nav}</a>)}
              <a role="menuitem" href={wa} target="_blank" rel="noopener" data-event="whatsapp_click" data-page={slug}>{notSure.nav}</a>
            </div>
          </details>
          {nav.map((n) => <a key={n.href} href={url(n.href)}>{n.label}</a>)}
        </nav>
        <div className="hdr-cta">
          <a className="btn btn-ghost btn-sm" href={wa} target="_blank" rel="noopener" data-event="whatsapp_click" data-page={slug}>
            <WaIcon />WhatsApp</a>
          <a className="btn btn-primary btn-sm" href={url(situation ? `/check/?s=${situation}` : '/check/')} data-event="cta_check_click" data-cta="header">Check my chances</a>
          <details className="mobile-nav">
            <summary><span className="btn btn-ghost btn-sm menu-btn" aria-label="Menu">Menu</span></summary>
            <nav className="mn-panel" aria-label="Mobile">
              <p className="mn-cap">My situation</p>
              <div className="mn-sub">
                {situations.map((s) => <a key={s.slug} href={url(`/situations/${s.slug}/`)}>{s.nav}</a>)}
                <a href={wa} target="_blank" rel="noopener" data-event="whatsapp_click" data-page={slug}>{notSure.nav}</a>
              </div>
              <p className="mn-cap">Menu</p>
              {nav.map((n) => <a key={n.href} href={url(n.href)}>{n.label}</a>)}
              <a href={url('/about/')}>About</a>
              <a href={url('/contact/')}>Contact</a>
              <p className="mn-cap">Settings</p>
              <div className="mn-set">
                <span>Theme</span>
                <ThemeToggle />
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

/** Auto / Light / Dark — wired up by client/site.js. */
export function ThemeToggle() {
  return <span className="tgl" role="group" aria-label="Theme"><button type="button" data-theme-btn="auto">Auto</button><button type="button" data-theme-btn="light">Light</button><button type="button" data-theme-btn="dark">Dark</button></span>;
}
