/**
 * Linked JSON-LD entities: the organisation (declared in components/Base.tsx), its advisors (Person)
 * and pages reviewed by an advisor. Shared @id values let search engines and AI assistants
 * join "this page" → "reviewed by this person" → "who works for this licensed company".
 */
import { absUrl } from './url';
import { advisors, type Advisor } from '../content/advisors';

export const orgId = (site?: URL) => absUrl('/', site) + '#organization';
export const websiteId = (site?: URL) => absUrl('/', site) + '#website';
export const personId = (a: Advisor, site?: URL) => absUrl('/advisors/', site) + '#' + a.slug;

/** Content on situation pages and the FAQ is reviewed by the founder. */
export const reviewer = advisors[0];

/** Only advisors with no open [TO CONFIRM] go into JSON-LD, so schema never states an unconfirmed name or language. */
export const confirmedAdvisors = () => advisors.filter((a) => a.name && !a.tbcLabel);

/** WebSite entity for the homepage: gives Google the site name shown in results. */
export function websiteLd(site?: URL): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: absUrl('/', site),
    name: 'Lenty',
    alternateName: ['Lenty Mortgage', 'lenty.com'],
    inLanguage: 'en',
    publisher: { '@id': orgId(site) },
  };
}

export function personLd(a: Advisor, site?: URL): object {
  return {
    '@type': 'Person',
    '@id': personId(a, site),
    name: a.name ?? undefined,
    jobTitle: a.role,
    worksFor: { '@id': orgId(site) },
    knowsLanguage: a.languagesTbc ? undefined : a.languages.map((l) => l.toLowerCase()),
    url: personId(a, site),
  };
}

export function reviewedPageLd(path: string, name: string, site?: URL): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': absUrl(path, site) + '#webpage',
    url: absUrl(path, site),
    name,
    isPartOf: { '@id': websiteId(site) },
    publisher: { '@id': orgId(site) },
    reviewedBy: personLd(reviewer, site),
  };
}

/** The advisory service a situation page describes, provided by the organisation. */
export function serviceLd(path: string, name: string, audience: string, site?: URL): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absUrl(path, site) + '#service',
    name,
    serviceType: 'Mortgage advisory',
    provider: { '@id': orgId(site) },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
    audience: { '@type': 'Audience', audienceType: audience },
    url: absUrl(path, site),
  };
}
