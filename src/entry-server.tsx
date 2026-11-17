/**
 * Build-time renderer used by scripts/prerender.mjs (not shipped to the browser).
 * Renders each page to static HTML so search engines get real content and
 * page-specific <head> tags without running JavaScript.
 */
import { renderToString } from 'react-dom/server';
import App from './App';
import type { PageId } from './types';

export { headHtml, PAGE_META, SITE_URL } from './lib/seo';
export { PAGE_PATHS } from './lib/routes';

import { PAGES } from './pages/registry';

/** Load every page chunk before rendering (renderToString can't wait for lazy()). */
export const preloadAll = () => Promise.all(Object.values(PAGES).map((p) => p.load()));

export const render = (page: PageId | null) => renderToString(<App initialPage={page} />);
