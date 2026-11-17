import type React from 'react';
import type { PageId } from '../types';

/**
 * URL for every page. Paths end in "/" because each page is prerendered to
 * <path>/index.html (see scripts/prerender.mjs); vercel.json redirects the
 * no-slash form to these.
 */
export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  services: '/services/',
  'senior-fitness': '/senior-fitness/',
  transformations: '/transformations/',
  about: '/about-samir/',
  contact: '/contact/',
};

const normalise = (pathname: string) => {
  const p = pathname.replace(/\/index\.html$/, '/').replace(/\/{2,}/g, '/');
  return p.endsWith('/') ? p : `${p}/`;
};

/** Page for a URL path, or null when no page matches (404). */
export const pageFromPath = (pathname: string): PageId | null => {
  const path = normalise(pathname);
  const hit = (Object.keys(PAGE_PATHS) as PageId[]).find((id) => PAGE_PATHS[id] === path);
  return hit ?? null;
};

export const pageHref = (page: PageId) => PAGE_PATHS[page];

/**
 * Props for a real <a href> nav link that still navigates in-app.
 * Ctrl/Cmd/Shift/middle-click keep the browser default (open in new tab, etc.).
 */
export const pageLink = (page: PageId, onNavigate: (page: PageId) => void) => ({
  href: PAGE_PATHS[page],
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate(page);
  },
});
