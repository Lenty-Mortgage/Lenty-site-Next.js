/** Build an internal link that respects the configured base path and trailing slashes (`trailingSlash: true`). */
import { BASE, SITE_URL } from './env';

export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : '/' + path;
  const [pathname, rest] = p.split(/(?=[?#])/, 2);
  const withSlash = pathname.endsWith('/') || /\.[a-z0-9]+$/i.test(pathname) ? pathname : pathname + '/';
  return BASE + withSlash + (rest ?? '');
}

/** Absolute URL for canonical / OG / JSON-LD. */
export function absUrl(path: string, siteUrl: URL | string = SITE_URL): string {
  return new URL(url(path), siteUrl).toString();
}
