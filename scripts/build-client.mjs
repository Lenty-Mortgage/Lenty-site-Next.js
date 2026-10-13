/**
 * Prepares the browser assets before `next build` / `next dev`:
 *  1. Bundles the vanilla scripts in src/client/ with esbuild (ES modules, minified).
 *     - site / calculator / check-form → public/_assets/<name>.<hash>.js (loaded with <script type="module" src>)
 *     - small page scripts (thanks, cases filter, document tabs, partner form) → inlined into the page,
 *       the same way Astro inlines small <script> blocks.
 *  2. Copies the self-hosted fonts (@fontsource Prata + Inter, latin) to public/_assets/fonts/.
 * The result is described in src/generated/client-manifest.json, which the layout reads at build time.
 * No React runs in the browser: these files are the only client-side JavaScript of the site.
 */
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { mkdir, rm, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/_assets');
const genDir = join(root, 'src/generated');

const external = ['site', 'calculator', 'check-form'];
const inline = ['thanks', 'cases-filter', 'doc-tabs', 'partner-form'];

await rm(outDir, { recursive: true, force: true });
await mkdir(join(outDir, 'fonts'), { recursive: true });
await mkdir(genDir, { recursive: true });

const bundle = async (name) => {
  const r = await build({
    entryPoints: [join(root, 'src/client', name + '.js')],
    bundle: true, format: 'esm', minify: true, target: 'es2020', write: false, legalComments: 'none',
  });
  return r.outputFiles[0].text.trim();
};

const manifest = { scripts: {}, inline: {}, fonts: {} };
for (const name of external) {
  const code = await bundle(name);
  const hash = createHash('sha256').update(code).digest('base64url').slice(0, 8);
  const file = `${name}.${hash}.js`;
  await writeFile(join(outDir, file), code + '\n');
  manifest.scripts[name] = `/_assets/${file}`;
}
for (const name of inline) manifest.inline[name] = await bundle(name);

const fonts = [
  ['@fontsource/prata/files/prata-latin-400-normal', 'prata400'],
  ['@fontsource/inter/files/inter-latin-400-normal', 'inter400'],
  ['@fontsource/inter/files/inter-latin-500-normal', 'inter500'],
  ['@fontsource/inter/files/inter-latin-600-normal', 'inter600'],
  ['@fontsource/inter/files/inter-latin-700-normal', 'inter700'],
];
for (const [src, key] of fonts) {
  const base = src.split('/').pop();
  for (const ext of ['woff2', 'woff']) await copyFile(join(root, 'node_modules', src + '.' + ext), join(outDir, 'fonts', `${base}.${ext}`));
  manifest.fonts[key] = `/_assets/fonts/${base}`;
}

await writeFile(join(genDir, 'client-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('[build-client] scripts:', Object.values(manifest.scripts).join(', '), '| inline:', inline.join(', '));
