/**
 * Compares the Astro build (lenty-site/site → dist/) with this Next.js build (out/).
 *   node scripts/compare.mjs <astro-dist> [next-out] [--md report.md]
 * Both builds should use the same PUBLIC_SITE_URL / PUBLIC_BASE / PUBLIC_NOINDEX.
 *
 * Checks, per page: same URL set; same <title>, description, robots, canonical, Open Graph tags;
 * same JSON-LD (parsed, key order ignored); same DOM inside <body> (tags, attributes, text — scripts,
 * styles and comments excluded); HTML size (raw / gzip); JavaScript the page loads (external + inline).
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const args = process.argv.slice(2);
const mdIdx = args.indexOf('--md');
const mdFile = mdIdx >= 0 ? args.splice(mdIdx, 2)[1] : null;
const [astroDir, nextDir = 'out'] = args;
if (!astroDir) { console.error('usage: node scripts/compare.mjs <astro-dist> [next-out] [--md report.md]'); process.exit(1); }

async function walk(dir) {
  const res = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) res.push(...await walk(p)); else res.push(p);
  }
  return res;
}
const toUrl = (rel) => '/' + rel.replace(/index\.html$/, '').replace(/\\/g, '/');
const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const kb = (n) => (n / 1024).toFixed(1);

/* ---------- parsing ---------- */
const attrRe = /([^\s=>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
function attrs(s) {
  const o = {};
  for (const m of s.matchAll(attrRe)) o[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  return o;
}
function head(html) {
  const h = html.split(/<\/head>/i)[0];
  const meta = {};
  meta.title = decode((h.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '');
  for (const m of h.matchAll(/<meta\s([^>]*)>/gi)) {
    const a = attrs(m[1]);
    const k = a.name || a.property;
    if (k && k !== 'viewport') meta[k] = a.content;
  }
  for (const m of h.matchAll(/<link\s([^>]*)>/gi)) {
    const a = attrs(m[1]);
    if (a.rel === 'canonical') meta.canonical = a.href;
  }
  return meta;
}
function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => JSON.parse(m[1]));
}
const canon = (v) => Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v;
function scripts(html, dir) {
  const out = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const a = attrs(m[1]);
    if (a.type === 'application/ld+json') continue;
    if (a.src) out.push({ src: a.src }); else out.push({ inline: m[2].length });
  }
  return out;
}
/** Normalised token stream of <body>: tags with sorted attributes + collapsed text. */
function bodyTokens(html) {
  let b = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [])[1] || '';
  b = b.replace(/<!--[\s\S]*?-->/g, '').replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  const toks = [];
  let text = '';
  const flush = () => { const t = decode(text).replace(/\s+/g, ' ').trim(); if (t) toks.push('#' + t); text = ''; };
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*\/?>/g;
  let last = 0;
  for (const m of b.matchAll(re)) {
    text += b.slice(last, m.index); last = m.index + m[0].length;
    flush();
    if (m[1]) { toks.push('/' + m[2].toLowerCase()); continue; }
    const a = attrs(m[3]);
    if (a.style) a.style = a.style.replace(/\s+/g, '').replace(/;$/, '');
    toks.push('<' + m[2].toLowerCase() + Object.keys(a).sort().map((k) => ` ${k}="${a[k]}"`).join('') + '>');
  }
  text += b.slice(last); flush();
  return toks;
}
/** First differences between two token streams (simple LCS on a window). */
function firstDiffs(a, b, max = 4) {
  const diffs = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    let found = false;
    for (let w = 1; w < 60 && !found; w++) {
      for (let k = 0; k <= w; k++) {
        if (a[i + k] !== undefined && a[i + k] === b[j + w - k] && a.slice(i + k, i + k + 3).join() === b.slice(j + w - k, j + w - k + 3).join()) {
          diffs.push({ astro: a.slice(i, i + k), next: b.slice(j, j + w - k) });
          i += k; j += w - k; found = true; break;
        }
      }
    }
    if (!found) { diffs.push({ astro: a.slice(i, i + 3), next: b.slice(j, j + 3), rest: true }); break; }
    if (diffs.length >= max) break;
  }
  return diffs;
}

/* ---------- run ---------- */
const load = async (dir) => {
  const files = (await walk(dir)).map((f) => relative(dir, f));
  return { dir, files, pages: files.filter((f) => f.endsWith('.html')).map((f) => ({ file: f, url: f === '404.html' ? '/404' : toUrl(f) })) };
};
const A = await load(astroDir), N = await load(nextDir);
const fileSize = async (dir, src) => {
  const p = src.replace(/^\/+/, '').split('?')[0];
  try { return (await readFile(join(dir, p))).length; } catch { return 0; }
};

const urlsA = new Set(A.pages.map((p) => p.url)), urlsN = new Set(N.pages.map((p) => p.url));
const onlyA = [...urlsA].filter((u) => !urlsN.has(u)), onlyN = [...urlsN].filter((u) => !urlsA.has(u));
const otherA = new Set(A.files.filter((f) => !f.endsWith('.html') && !f.startsWith('_astro/'))), otherN = new Set(N.files.filter((f) => !f.endsWith('.html') && !f.startsWith('_next/') && !f.startsWith('_assets/')));

const rows = [];
const problems = [];
for (const pa of A.pages.sort((x, y) => x.url.localeCompare(y.url))) {
  const pn = N.pages.find((p) => p.url === pa.url);
  if (!pn) continue;
  const ha = await readFile(join(A.dir, pa.file), 'utf8'), hn = await readFile(join(N.dir, pn.file), 'utf8');
  // head / SEO
  const ma = head(ha), mn = head(hn);
  const seoDiff = [...new Set([...Object.keys(ma), ...Object.keys(mn)])]
    .filter((k) => !k.startsWith('twitter:') || k === 'twitter:card')
    .filter((k) => k !== 'theme-color' || ma[k] !== mn[k])
    .filter((k) => ma[k] !== mn[k]);
  const ldA = JSON.stringify(canon(jsonLd(ha)).sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y))));
  const ldN = JSON.stringify(canon(jsonLd(hn)).sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y))));
  const ta = bodyTokens(ha), tn = bodyTokens(hn);
  const same = ta.join('\n') === tn.join('\n');
  // JS
  const js = async (dir, html) => {
    let ext = 0, inl = 0, n = 0;
    for (const s of scripts(html)) { if (s.src) { if (/^https?:/.test(s.src)) continue; ext += await fileSize(dir, s.src); n++; } else inl += s.inline; }
    return { ext, inl, n };
  };
  const ja = await js(A.dir, ha), jn = await js(N.dir, hn);
  rows.push({ url: pa.url, a: ha.length, n: hn.length, ag: gzipSync(ha).length, ng: gzipSync(hn).length, ja, jn, seo: seoDiff, ld: ldA === ldN, dom: same, ldCount: [jsonLd(ha).length, jsonLd(hn).length] });
  if (seoDiff.length) problems.push(`${pa.url}: head differs → ${seoDiff.map((k) => `${k}: «${ma[k] ?? '—'}» vs «${mn[k] ?? '—'}»`).join('; ')}`);
  if (ldA !== ldN) problems.push(`${pa.url}: JSON-LD differs`);
  if (!same) problems.push(`${pa.url}: body DOM differs\n` + firstDiffs(ta, tn).map((d) => `    astro: ${d.astro.join(' ').slice(0, 300)}\n    next:  ${d.next.join(' ').slice(0, 300)}`).join('\n'));
}

const sum = (f) => rows.reduce((n, r) => n + f(r), 0);
const cssA = (await Promise.all(A.files.filter((f) => f.endsWith('.css')).map((f) => fileSize(A.dir, f)))).reduce((a, b) => a + b, 0);
const cssN = (await Promise.all(N.files.filter((f) => f.endsWith('.css')).map((f) => fileSize(N.dir, f)))).reduce((a, b) => a + b, 0);
const jsFilesA = A.files.filter((f) => f.endsWith('.js')), jsFilesN = N.files.filter((f) => f.endsWith('.js'));
const jsTotA = (await Promise.all(jsFilesA.map((f) => fileSize(A.dir, f)))).reduce((a, b) => a + b, 0);
const jsTotN = (await Promise.all(jsFilesN.map((f) => fileSize(N.dir, f)))).reduce((a, b) => a + b, 0);

const lines = [];
const p = (s = '') => lines.push(s);
p(`## Pages and URLs`);
p(`- Astro: ${urlsA.size} HTML pages · Next.js: ${urlsN.size} HTML pages`);
p(`- Only in Astro: ${onlyA.length ? onlyA.join(', ') : 'none'}`);
p(`- Only in Next.js: ${onlyN.length ? onlyN.join(', ') : 'none'}`);
p(`- Other public files only in Astro: ${[...otherA].filter((f) => !otherN.has(f)).join(', ') || 'none'} · only in Next.js: ${[...otherN].filter((f) => !otherA.has(f)).join(', ') || 'none'}`);
p();
p(`## Per page`);
p(`| URL | HTML Astro | HTML Next | gzip Astro | gzip Next | JS Astro (files + inline) | JS Next (files + inline) | head/SEO | JSON-LD | body DOM |`);
p(`|---|---:|---:|---:|---:|---:|---:|:-:|:-:|:-:|`);
for (const r of rows) p(`| ${r.url} | ${kb(r.a)} KB | ${kb(r.n)} KB | ${kb(r.ag)} KB | ${kb(r.ng)} KB | ${kb(r.ja.ext)} + ${kb(r.ja.inl)} KB (${r.ja.n} file${r.ja.n === 1 ? '' : 's'}) | ${kb(r.jn.ext)} + ${kb(r.jn.inl)} KB (${r.jn.n} file${r.jn.n === 1 ? '' : 's'}) | ${r.seo.length ? '≠' : '='} | ${r.ld ? '=' : '≠'} (${r.ldCount[0]}) | ${r.dom ? '=' : '≠'} |`);
p(`| **Total** | **${kb(sum((r) => r.a))} KB** | **${kb(sum((r) => r.n))} KB** | **${kb(sum((r) => r.ag))} KB** | **${kb(sum((r) => r.ng))} KB** | | | | | |`);
p();
p(`## Assets`);
p(`- CSS: Astro ${kb(cssA)} KB · Next.js ${kb(cssN)} KB`);
p(`- JS files in the build: Astro ${jsFilesA.length} files, ${kb(jsTotA)} KB · Next.js ${jsFilesN.length} files, ${kb(jsTotN)} KB`);
p();
p(`## Differences found`);
p(problems.length ? problems.map((x) => '- ' + x).join('\n') : '- none: every page has the same head/SEO tags, JSON-LD and body DOM');
const report = lines.join('\n');
console.log(report);
if (mdFile) await writeFile(mdFile, report + '\n');
