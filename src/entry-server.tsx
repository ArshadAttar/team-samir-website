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

export const render = (page: PageId | null) => renderToString(<App initialPage={page} />);
