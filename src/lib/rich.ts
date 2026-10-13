/**
 * Tiny inline markup for content strings:
 *   [[tbc:label]]  → <span class="tbc">label</span>   (fact Lenty still has to confirm)
 *   **bold**       → <b>bold</b>
 *   *italic*       → <em>italic</em>
 * Everything else is HTML-escaped. Use with `dangerouslySetInnerHTML={{ __html: rich(text) }}` (or the <Html> helper).
 */
export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function rich(text: string | null | undefined): string {
  if (!text) return '';
  let out = esc(text);
  out = out.replace(/\[\[tbc:([^\]]+)\]\]/g, (_m, l) => `<span class="tbc">${l.trim()}</span>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  out = out.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  return out;
}

/** Plain-text version (for JSON-LD, meta): strips markers. */
export function plain(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/\[\[tbc:([^\]]+)\]\]/g, (_m, l) => `(${l.trim()} — to confirm)`)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1$2');
}

/** Value-or-placeholder helper for [DATA: key] slots. */
export function data(value: string | number | null | undefined, label: string): string {
  return value === null || value === undefined || value === '' ? `[[tbc:${label}]]` : String(value);
}

/**
 * FAQPage JSON-LD. Answers that are missing or still carry a [[tbc:…]] marker are left out,
 * so search engines and AI answers never quote a placeholder. Returns null when nothing is left.
 */
export function faqPageLd(items: { q: string; a: string | null | undefined }[]): object | null {
  const ready = items.filter((i) => i.a && !/\[\[tbc:/.test(i.a));
  if (!ready.length) return null;
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: ready.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: plain(i.a) } })),
  };
}
