/** Per-page <head> metadata: title, description, robots, canonical, Open Graph, Twitter — same values as the Astro Base layout. */
import type { Metadata } from 'next';
import { absUrl } from './url';
import { ENV_NOINDEX } from './env';

export interface SeoProps {
  title: string;
  description: string;
  path: string;            // canonical path, e.g. '/situations/non-resident/'
  canonicalPath?: string;  // when the canonical differs from the page path (/calculators/)
  noindex?: boolean;       // force noindex (/check, /thanks, /lp, /404)
}

export function pageMetadata({ title, description, path, canonicalPath, noindex = false }: SeoProps): Metadata {
  const canonical = absUrl(canonicalPath ?? path);
  const is404 = path === '/404/';
  return {
    title: { absolute: title },
    description,
    robots: noindex || ENV_NOINDEX ? 'noindex,nofollow' : 'index,follow',
    alternates: is404 ? undefined : { canonical },
    openGraph: {
      type: 'website',
      siteName: 'Lenty',
      title,
      description,
      url: canonical,
      images: [{ url: absUrl('/og.png'), width: 1200, height: 630, alt: 'Lenty — UAE mortgage advisors for complex cases' }],
      locale: 'en_AE',
    },
    twitter: { card: 'summary_large_image' },
  };
}
