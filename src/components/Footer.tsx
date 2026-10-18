import { url } from '../lib/url';
import { site, languagesLabel } from '../config/site';
import { situations } from '../content/situations';
import Tbc from './Tbc';
import { ThemeToggle } from './Header';

export default function Footer({ minimal = false }: { minimal?: boolean }) {
  const c = site.company;
  return (
    <footer className="site">
      <div className="wrap">
        {!minimal && (
          <div className="foot">
            <div>
              <h2>Situations</h2>
              <ul>{situations.map((s) => <li key={s.slug}><a href={url(`/situations/${s.slug}/`)}>{s.nav}</a></li>)}</ul>
            </div>
            <div>
              <h2>Tools</h2>
              <ul>
                <li><a href={url('/calculators/monthly-payment/')}>Monthly payment</a></li>
                <li><a href={url('/calculators/affordability/')}>How much can I borrow</a></li>
                <li><a href={url('/calculators/cash-to-close/')}>Cash to close</a></li>
                <li><a href={url('/check/')} data-event="cta_check_click" data-cta="footer">Check my chances</a></li>
              </ul>
            </div>
            <div>
              <h2>Company</h2>
              <ul>
                <li><a href={url('/about/')}>About</a></li>
                <li><a href={url('/advisors/')}>Advisors</a></li>
                <li><a href={url('/cases/')}>Cases</a></li>
                <li><a href={url('/partners/')}>For agents</a></li>
                <li><a href={url('/faq/')}>FAQ</a></li>
                <li><a href={url('/glossary/')}>Glossary</a></li>
                <li><a href={url('/insights/complex-cases-2026/')}>Complex cases 2026: data</a></li>
                <li><a href={url('/contact/')}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h2>Legal</h2>
              <ul>
                <li><a href={url('/privacy/')}>Privacy</a></li>
                <li><a href={url('/terms/')}>Terms</a></li>
                <li><button type="button" className="linkbtn" data-cookie-settings>Cookie settings</button></li>
                <li><a href={url('/cookies/')}>Cookies</a></li>
                <li><a href={url('/disclaimer/')}>Disclaimer</a></li>
              </ul>
            </div>
          </div>
        )}
        <div className="foot-legal">
          <a className="logo" href={url('/')} aria-label="Lenty home">Lenty</a>
          <p className="sep">
            <span>{c.legalName}</span>
            <span>{c.license}</span>
            <span>TRN {c.trn}</span>
            <span>{c.address ?? <Tbc label="address" />}</span>
            <span>{c.email ? <a href={`mailto:${c.email}`} data-event="email_click" data-cta="footer">{c.email}</a> : <Tbc label="email" />}</span>
            <span>{c.phone ? <a href={`tel:${c.phoneTel}`} data-event="call_click" data-cta="footer">{c.phone}</a> : <Tbc label="phone" />}</span>
          </p>
          <p>Lenty is a licensed mortgage advisory, not a bank. Approval, rates and terms are decided by the lending bank. Figures on this site are estimates.</p>
          <div className="foot-theme"><span>Theme</span><ThemeToggle /></div>
          <p className="sep"><span>Languages: {languagesLabel()}</span>{!minimal && <><a href={c.linkedin} target="_blank" rel="noopener" data-event="social_click" data-cta="linkedin">LinkedIn</a><a href={c.instagram} target="_blank" rel="noopener" data-event="social_click" data-cta="instagram">Instagram</a><a href={c.facebook} target="_blank" rel="noopener" data-event="social_click" data-cta="facebook">Facebook</a></>}</p>
        </div>
      </div>
    </footer>
  );
}
