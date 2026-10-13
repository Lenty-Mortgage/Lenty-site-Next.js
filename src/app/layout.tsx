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

/* A/B preview: ?v=test / ?v=original or the Original/Test switch; theme: Auto / Light / Dark switch. Both remembered in localStorage, set before paint. */
const prePaint = `(function () {
      try { var t = localStorage.getItem('lenty-theme'); if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t); } catch (e) {}
      var v = null;
      try { v = new URLSearchParams(location.search).get('v'); if (v) localStorage.setItem('lenty-variant', v); else v = localStorage.getItem('lenty-variant'); } catch (e) {}
      if (v === 'test' || v === 'test1') document.documentElement.setAttribute('data-variant', v);
    })();`;

/* dataLayer + consent-gated GA4 / Clarity. Values are baked in at build time and scoped in an IIFE, like Astro's define:vars. */
const analytics = `(function(){const ga = ${JSON.stringify(site.analytics.ga4Id)};
const clarity = ${JSON.stringify(site.analytics.clarityId)};
const leadEndpoint = ${JSON.stringify(LEAD_ENDPOINT)};
    window.dataLayer = window.dataLayer || [];
    window.LENTY = { leadEndpoint: leadEndpoint || null };
    /* Analytics load only after "Accept" in the cookie bar (see /cookies/). site.js calls LENTY.analytics() on accept. */
    window.LENTY.analytics = function () {
      if (window.LENTY.analyticsOn) return;
      window.LENTY.analyticsOn = true;
      var variant = document.documentElement.getAttribute('data-variant') || 'original';
      var load = function (src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); };
      if (ga) {
        window.gtag = function () { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('set', 'user_properties', { site_variant: variant });
        gtag('config', ga, { anonymize_ip: true, site_variant: variant });
        load('https://www.googletagmanager.com/gtag/js?id=' + ga);
        /* gtag.js ignores plain { event: … } objects, so forward ours to GA4 as events. */
        var push = dataLayer.push;
        dataLayer.push = function () {
          for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            if (o && typeof o.event === 'string' && !('length' in o)) {
              var p = {}; for (var k in o) if (k !== 'event') p[k] = o[k];
              p.site_variant = variant;
              gtag('event', o.event, p);
            }
          }
          return push.apply(dataLayer, arguments);
        };
      }
      if (clarity) {
        (function (c, l, a, r, i) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; load('https://www.clarity.ms/tag/' + i); })(window, document, 'clarity', 'script', clarity);
        window.clarity('set', 'site_variant', variant);
      }
    };
    try { if (localStorage.getItem('lenty-cookies') === 'all') window.LENTY.analytics(); } catch (e) {}
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  for (const f of preloadFonts) preload(f, { as: 'font', type: 'font/woff2', crossOrigin: '' });
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={url('/favicon.svg')} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={url('/apple-touch-icon.png')} />
        <style dangerouslySetInnerHTML={{ __html: fontCss }} />
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script dangerouslySetInnerHTML={{ __html: analytics }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
