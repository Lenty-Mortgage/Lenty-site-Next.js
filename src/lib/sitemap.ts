/** Same files and format as @astrojs/sitemap: /sitemap-index.xml → /sitemap-0.xml, lastmod = build time. */
import { absUrl } from './url';
import { sitemapPaths } from './routes';

const lastmod = new Date().toISOString();
const xml = (body: string) => new Response(`<?xml version="1.0" encoding="UTF-8"?>${body}`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });

export const sitemapIndex = () =>
  xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${absUrl('/sitemap-0.xml')}</loc><lastmod>${lastmod}</lastmod></sitemap></sitemapindex>`);

export const sitemap0 = () =>
  xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${sitemapPaths().map((p) => `<url><loc>${absUrl(p)}</loc><lastmod>${lastmod}</lastmod></url>`).join('')}</urlset>`);
