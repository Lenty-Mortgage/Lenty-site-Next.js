/**
 * Linked JSON-LD entities: the organisation (declared in components/Base.tsx), its advisors (Person)
 * and pages reviewed by an advisor. Shared @id values let search engines and AI assistants
 * join "this page" → "reviewed by this person" → "who works for this licensed company".
 */
import { absUrl } from './url';
import { advisors, type Advisor } from '../content/advisors';

export const orgId = (site?: URL) => absUrl('/', site) + '#organization';
export const personId = (a: Advisor, site?: URL) => absUrl('/advisors/', site) + '#' + a.slug;

/** Content on situation pages and the FAQ is reviewed by the founder. */
export const reviewer = advisors[0];

export function personLd(a: Advisor, site?: URL): object {
  return {
    '@type': 'Person',
    '@id': personId(a, site),
    name: a.name ?? undefined,
    jobTitle: a.role,
    worksFor: { '@id': orgId(site) },
    knowsLanguage: a.languages.map((l) => l.toLowerCase()),
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
    publisher: { '@id': orgId(site) },
    reviewedBy: personLd(reviewer, site),
  };
}
