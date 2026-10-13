/**
 * Page shell — the Next.js counterpart of layouts/Base.astro (the <head> part lives in app/layout.tsx
 * and lib/seo.ts). Renders the chrome, breadcrumbs, JSON-LD and the site-wide script.
 */
import { Fragment, type ReactNode } from 'react';
import { site } from '../config/site';
import { url, absUrl } from '../lib/url';
import { personId, reviewer } from '../lib/entity';
import { advisorLanguages, langName } from '../content/advisors';
import { ModuleScript } from '../lib/assets';
import Header, { VariantButtons } from './Header';
import Footer from './Footer';
import MobileBar from './MobileBar';
import CookieBar from './CookieBar';

export interface Crumb { label: string; href?: string }
interface Props {
  path: string;            // page path, e.g. '/situations/non-resident/'
  pageName: string;        // used in the WhatsApp pre-filled text
  situation?: string;      // situation slug for WhatsApp + /check?s=
  onHero?: boolean;        // dark transparent header over Hero C
  chrome?: boolean;        // false = Ads landing (no menu)
  minimalFooter?: boolean;
  breadcrumbs?: Crumb[];
  jsonLd?: (object | null)[];
  bodyClass?: string;
  children?: ReactNode;
}

/** JSON for a <script type="application/ld+json">; `<` is escaped so content can never close the tag. */
export const ldJson = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c');

export default function Base({
  path, pageName, situation, onHero = false, chrome = true, minimalFooter = false,
  breadcrumbs = [], jsonLd = [], bodyClass, children,
}: Props) {
  const slug = path.replace(/^\/|\/$/g, '') || 'home';
  const ogImage = absUrl('/og.png');
  // Map pin from the Google Business Profile URL (…!3d<lat>!4d<lng>)
  const pin = site.google.url?.match(/!3d(-?[\d.]+)!4d(-?[\d.]+)/);
  // Street part only: city and country have their own PostalAddress fields
  const street = site.company.address?.replace(/,\s*Dubai(,\s*(UAE|United Arab Emirates))?\s*$/i, '');

  const ld: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      '@id': absUrl('/') + '#organization',
      name: 'Lenty',
      alternateName: 'Lenty Mortgage',
      legalName: site.company.legalName,
      url: absUrl('/'),
      telephone: site.company.phone ?? undefined,
      email: site.company.email ?? undefined,
      address: { '@type': 'PostalAddress', streetAddress: street || undefined, addressLocality: 'Dubai', addressCountry: 'AE' },
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
      ...(pin ? { geo: { '@type': 'GeoCoordinates', latitude: Number(pin[1]), longitude: Number(pin[2]) } } : {}),
      hasMap: site.google.url ?? undefined,
      openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
      logo: absUrl('/logo.png'),
      image: ogImage,
      knowsLanguage: site.languages.live.map((l) => l.toLowerCase()),
      contactPoint: site.company.phone ? {
        '@type': 'ContactPoint', contactType: 'customer service', telephone: site.company.phone,
        email: site.company.email ?? undefined, areaServed: 'AE',
        availableLanguage: advisorLanguages().map(langName), // languages advisors speak on the call, not website languages
      } : undefined,
      foundingDate: String(site.company.founded),
      identifier: site.company.license,
      sameAs: [site.company.instagram, site.company.facebook, site.google.url].filter(Boolean),
      founder: { '@id': personId(reviewer) },
      knowsAbout: ['Mortgages in the UAE', 'Non-resident mortgages in Dubai', 'Self-employed mortgages', 'Off-plan handover mortgages', 'Equity release', 'Mortgage buy-out'],
      description: 'Licensed mortgage advisory in Dubai for complex cases: non-residents, business owners, declined applicants.',
    },
    ...(breadcrumbs.length
      ? [{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [{ label: 'Home', href: '/' } as Crumb, ...breadcrumbs].map((c, i) => ({
            '@type': 'ListItem', position: i + 1, name: c.label, item: c.href ? absUrl(c.href) : undefined,
          })),
        }]
      : []),
    ...jsonLd.filter((o): o is object => o !== null),
  ];

  return (
    <>
      {/* body class set before the first paint (the root layout owns <body>) */}
      {bodyClass && <script dangerouslySetInnerHTML={{ __html: `document.body.className=${JSON.stringify(bodyClass)}` }} />}
      {ld.map((o, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(o) }} />)}
      <a className="skip" href="#main">Skip to content</a>
      {chrome && (
        <div className="vswitch tgl" role="group" aria-label="Site variant"><VariantButtons /></div>
      )}
      {chrome && <Header onHero={onHero} page={pageName} slug={slug} situation={situation} />}
      <main id="main">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="wrap" style={{ paddingTop: 18 }}>
            <ol className="crumbs">
              <li><a href={url('/')}>Home</a></li>
              {breadcrumbs.map((c, i) => (
                <Fragment key={i}><li aria-hidden="true">/</li><li>{c.href && i < breadcrumbs.length - 1 ? <a href={url(c.href)}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li></Fragment>
              ))}
            </ol>
          </nav>
        )}
        {children}
      </main>
      <Footer minimal={!chrome || minimalFooter} />
      {chrome && <MobileBar page={pageName} slug={slug} situation={situation} />}
      <CookieBar />
      <ModuleScript name="site" />
    </>
  );
}
