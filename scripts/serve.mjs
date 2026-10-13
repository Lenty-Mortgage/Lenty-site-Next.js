/**
 * Minimal static server for the exported site: `npm run preview` → http://localhost:4321/
 * Serves out/ under PUBLIC_BASE (if set), /dir/ → dir/index.html, unknown URLs → 404.html with status 404.
 *   node scripts/serve.mjs [dir] [port]
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const dir = process.argv[2] || 'out';
const port = +(process.argv[3] || process.env.PORT || 4321);
const base = (process.env.PUBLIC_BASE ?? '/').replace(/\/+$/, '');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json' };

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (base && p.startsWith(base)) p = p.slice(base.length) || '/';
  let file = join(dir, normalize(p).replace(/^(\.\.[/\\])+/, ''));
  try {
    if ((await stat(file)).isDirectory()) {
      if (!p.endsWith('/')) { res.writeHead(301, { Location: base + p + '/' }); return res.end(); }
      file = join(file, 'index.html');
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(await readFile(join(dir, '404.html')).catch(() => 'Not found'));
  }
}).listen(port, () => console.log(`Serving ${dir} at http://localhost:${port}${base}/`));
