import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import '../styles/global.css';
import { site } from '../config/site';
import { SITE_URL, LEAD_ENDPOINT } from '../lib/env';
import { url } from '../lib/url';
import { fonts } from '../lib/assets';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: site.analytics.gscVerification ?? undefined,
    other: site.analytics.bingVerification ? { 'msvalidate.01': site.analytics.bingVerification } : undefined,
  },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#002C1F' };

/* Self-hosted fonts (@fontsource, latin subset only). Prata 400 + Inter 400/600 are used above the fold and preloaded (CLS). */
const face = (family: string, weight: number, file: string) =>
  `@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:${weight};src:url(${url(file + '.woff2')}) format('woff2'),url(${url(file + '.woff')}) format('woff')}`;
const fontCss = [
  face('Prata', 400, fonts.prata400),
  face('Inter', 400, fonts.inter400), face('Inter', 500, fonts.inter500), face('Inter', 600, fonts.inter600), face('Inter', 700, fonts.inter700),
].join('');
const preloadFonts = [fonts.prata400, fonts.inter400, fonts.inter600].map((f) => url(f + '.woff2'));

/* Theme: Auto / Light / Dark switch, remembered in localStorage, set before paint. */
const prePaint = `(function () {
      try { var t = localStorage.getItem('lenty-theme'); if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t); } catch (e) {}
    })();`;

/* Google Consent Mode v2 default + page context + GTM. GTM is the only tag in the code: GA4, Google Ads, Meta Pixel and
   Clarity live in the container and respect consent there. This must run before gtm.js (inline, first in <head>).
   The visitor's choice is stored by client/site.js in localStorage 'lenty-cookies' ('all' | 'essential'). */
const analytics = `(function(){const gtm = ${JSON.stringify(site.analytics.gtmId)};
const base = ${JSON.stringify(url('/'))};
const leadEndpoint = ${JSON.stringify(LEAD_ENDPOINT)};
    window.dataLayer = window.dataLayer || [];
    window.LENTY = { leadEndpoint: leadEndpoint || null };
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    var choice = null;
    try { choice = localStorage.getItem('lenty-cookies'); } catch (e) {}
    var ok = choice === 'all', s = ok ? 'granted' : 'denied';
    gtag('consent', 'default', {
      security_storage: 'granted', functionality_storage: s, personalization_storage: s,
      analytics_storage: s, ad_storage: s, ad_user_data: s, ad_personalization: s, wait_for_update: 500
    });
    gtag('set', 'ads_data_redaction', !ok);
    /* page_type / situation for every GA4 event and for audiences */
    var path = location.pathname.indexOf(base) === 0 ? location.pathname.slice(base.length) : location.pathname.slice(1);
    var seg = path.split('/').filter(Boolean);
    var types = { situations: 'situation', calculators: 'calculator', cases: 'case', check: 'check', lp: 'check', thanks: 'thanks', partners: 'partners', contact: 'contact' };
    var pageType = seg.length ? (types[seg[0]] || 'content') : 'home';
    if (seg[0] === 'cases' && seg.length === 1) pageType = 'cases';
    var situation = seg[0] === 'situations' && seg[1] ? seg[1] : (new URLSearchParams(location.search).get('s') || '');
    dataLayer.push({
      event: 'consent_default',
      consent_state: { necessary: true, preferences: ok, analytics: ok, marketing: ok },
      consent_saved: !!choice,
      page_type: pageType,
      situation: situation
    });
    if (gtm) {
      dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var j = document.createElement('script'); j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtm;
      document.head.appendChild(j);
    }
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  for (const f of preloadFonts) preload(f, { as: 'font', type: 'font/woff2', crossOrigin: '' });
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={url('/favicon.svg')} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={url('/apple-touch-icon.png')} />
        <style dangerouslySetInnerHTML={{ __html: fontCss }} />
        <script dangerouslySetInnerHTML={{ __html: analytics }} />
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>
        {site.analytics.gtmId && (
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${site.analytics.gtmId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        )}
        {children}
      </body>
    </html>
  );
}
