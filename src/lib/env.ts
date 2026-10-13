/**
 * Build-time settings, read from the same environment variables as the Astro version
 * (see README → Environment variables). Everything is resolved during `next build`.
 */
export const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://lenty-mortgage.github.io';
/** Base path without a trailing slash: '' for the domain root, '/lenty-site/next' for a sub-folder. */
export const BASE = normaliseBase(process.env.PUBLIC_BASE ?? '/');
/** Public pages are noindex unless PUBLIC_NOINDEX=false (test site default). */
export const ENV_NOINDEX = process.env.PUBLIC_NOINDEX !== 'false';
export const LEAD_ENDPOINT = process.env.PUBLIC_LEAD_ENDPOINT ?? '';

export function normaliseBase(b: string): string {
  const t = b.trim().replace(/\/+$/, '');
  return !t ? '' : t.startsWith('/') ? t : '/' + t;
}
