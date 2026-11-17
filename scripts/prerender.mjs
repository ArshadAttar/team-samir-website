/**
 * Prerenders every page into dist/<path>/index.html, plus 404.html, sitemap.xml
 * and robots.txt. Runs after `vite build` and `vite build --ssr` (see package.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, preloadAll, headHtml, PAGE_META, PAGE_PATHS, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
await preloadAll();

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const HEAD_RE = /<!--head:start-->[\s\S]*?<!--head:end-->/;
const ROOT = '<div id="root"></div>';
if (!HEAD_RE.test(template) || !template.includes(ROOT)) {
  throw new Error('index.html is missing the <!--head:start/end--> markers or the empty #root div');
}

// Preload each page's own JS chunk (and its imports) so it downloads in parallel with the entry.
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'));
const PAGE_FILES = {
  home: 'src/pages/HomePage.tsx',
  services: 'src/pages/ServicesPage.tsx',
  'senior-fitness': 'src/pages/SeniorFitnessPage.tsx',
  transformations: 'src/pages/TransformationsPage.tsx',
  about: 'src/pages/AboutPage.tsx',
  contact: 'src/pages/ContactPage.tsx',
};
const chunkFiles = (key, seen = new Set()) => {
  const c = manifest[key];
  if (!c || seen.has(key)) return [];
  seen.add(key);
  return [c.file, ...(c.imports || []).flatMap((k) => chunkFiles(k, seen))];
};
const entryFiles = new Set(chunkFiles('index.html'));
const preloads = (id) =>
  id && PAGE_FILES[id]
    ? [...new Set(chunkFiles(PAGE_FILES[id]))]
        .filter((f) => !entryFiles.has(f))
        .map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`)
        .join('\n    ')
    : '';

const page = (id) =>
  template
    .replace(HEAD_RE, [headHtml(id), preloads(id)].filter(Boolean).join('\n    '))
    .replace(ROOT, `<div id="root">${render(id)}</div>`);

for (const [id, urlPath] of Object.entries(PAGE_PATHS)) {
  const file = path.join(dist, urlPath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(id));
  console.log(`prerendered ${urlPath.padEnd(18)} ${PAGE_META[id].index ? 'index' : 'noindex'}`);
}
fs.writeFileSync(path.join(dist, '404.html'), page(null));
console.log('prerendered /404.html');

// Sitemap: indexable canonical URLs only. No lastmod (no reliable per-page date).
const urls = Object.entries(PAGE_PATHS)
  .filter(([id]) => PAGE_META[id].index)
  .map(([, p]) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log('wrote sitemap.xml and robots.txt');

fs.rmSync(ssrDir, { recursive: true, force: true });
fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true }); // build metadata, not for the web
