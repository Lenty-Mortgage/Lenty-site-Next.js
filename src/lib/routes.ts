/** Every exported page path (trailing slash), for the sitemap and the Astro ↔ Next comparison. */
import { situations } from '../content/situations';
import { cases } from '../content/cases';

export const staticPaths = [
  '/', '/about/', '/advisors/', '/calculators/', '/calculators/affordability/', '/calculators/cash-to-close/', '/calculators/monthly-payment/',
  '/cases/', '/check/', '/contact/', '/cookies/', '/disclaimer/', '/faq/', '/glossary/', '/how-it-works/', '/insights/complex-cases-2026/',
  '/lp/check/', '/partners/', '/privacy/', '/terms/', '/thanks/',
];

export const allPaths = (): string[] => [
  ...staticPaths,
  ...situations.map((s) => `/situations/${s.slug}/`),
  ...cases.map((c) => `/cases/${c.slug}/`),
].sort();

/** Ads landing, thank-you, form and 404 never go in the sitemap; /calculators/ is canonicalised to the cash-to-close tab. */
export const sitemapPaths = (): string[] => allPaths().filter((p) => !/\/lp\/|\/thanks\/|\/check\/|\/404|^\/calculators\/$/.test(p));
