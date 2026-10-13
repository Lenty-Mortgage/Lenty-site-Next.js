/**
 * Post-processing of the static export (out/), run by `npm run build` after `next build`.
 *
 * Every page here is a React Server Component rendered to HTML at build time; the interactive parts
 * (calculator, forms, cookie bar, carousels, theme / variant switches) are plain scripts from src/client/.
 * The Next.js client runtime (React, router, RSC payload) therefore has nothing to hydrate, so we remove it:
 *   - <script src="/_next/static/chunks/…">, its <link rel="preload" as="script"> and the inline self.__next_f RSC payload;
 *   - the *.txt RSC payload files and the JS chunks / build manifests;
 *   - the empty <div hidden> Next leaves for its streaming metadata outlet;
 *   - the duplicate 404 routes (/404/index.html, /_not-found/) — /404.html stays, as in the Astro build.
 * Result: pages are ready HTML + CSS, with JavaScript only where the page needs it.
 *
 * If you ever add a 'use client' component, the runtime is needed: the script then stops with an error
 * (or set KEEP_NEXT_RUNTIME=1 to skip this step and keep the standard Next.js output).
 */
import { readdir, readFile, writeFile, rm, stat } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');

if (process.env.KEEP_NEXT_RUNTIME === '1') { console.log('[postbuild] KEEP_NEXT_RUNTIME=1 — Next.js runtime kept'); process.exit(0); }

async function walk(dir) {
  const res = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) res.push(...await walk(p)); else res.push(p);
  }
  return res;
}

/* Guard: client components need the runtime. */
for (const f of await walk(join(root, 'src'))) {
  if (!/\.(tsx?|jsx?)$/.test(f) || f.includes(`${'src'}/client/`)) continue;
  const src = await readFile(f, 'utf8');
  if (/^\s*['"]use client['"]/m.test(src)) {
    console.error(`[postbuild] ${relative(root, f)} is a client component — the Next.js runtime is required. Remove it or build with KEEP_NEXT_RUNTIME=1.`);
    process.exit(1);
  }
}

const files = await walk(out);
let pages = 0, saved = 0;
for (const f of files) {
  if (!f.endsWith('.html')) continue;
  const html = await readFile(f, 'utf8');
  const next = html
    .replace(/<link rel="preload" as="script"[^>]*href="[^"]*\/_next\/static\/[^"]*"[^>]*\/?>/g, '')
    .replace(/<script src="[^"]*\/_next\/static\/[^"]*"[^>]*><\/script>/g, '')
    .replace(/<script>\(?self\.__next_f[\s\S]*?<\/script>/g, '')
    .replace(/<!--\/?\$-->/g, '')
    .replace(/<div hidden=""><\/div>/g, ''); // Next's empty metadata-outlet boundary
  if (/\/_next\/static\/[^"]*\.js/.test(next) || next.includes('__next_f')) throw new Error(`[postbuild] runtime reference left in ${relative(out, f)}`);
  saved += html.length - next.length; pages++;
  await writeFile(f, next);
}

const remove = files.filter((f) => f.endsWith('.txt') && !f.endsWith('robots.txt') || /\/_next\/static\/.+\.js$/.test(f));
for (const f of remove) await rm(f);
for (const d of ['404', '_not-found']) await rm(join(out, d), { recursive: true, force: true });
/* empty build-id folder under _next/static */
for (const e of await readdir(join(out, '_next/static'))) {
  const p = join(out, '_next/static', e);
  if ((await stat(p)).isDirectory() && (await readdir(p)).length === 0) await rm(p, { recursive: true });
}
console.log(`[postbuild] ${pages} HTML pages cleaned (−${Math.round(saved / 1024)} KB of runtime markup), ${remove.length} runtime files removed`);
