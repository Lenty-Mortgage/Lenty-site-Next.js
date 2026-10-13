/**
 * robots.txt follows PUBLIC_NOINDEX: the test build closes everything,
 * the production build (PUBLIC_NOINDEX=false) opens the site and points to the sitemap.
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are allowed by the default rule.
 */
import { ENV_NOINDEX } from '../../lib/env';
import { absUrl } from '../../lib/url';

export const dynamic = 'force-static';

export function GET() {
  const body = ENV_NOINDEX
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${absUrl('/sitemap-index.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
