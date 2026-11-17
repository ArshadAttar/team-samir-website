import React, { lazy } from 'react';
import type { PageId } from '../types';

/**
 * Route-based code splitting. Each page is its own JS chunk, loaded on demand.
 * `load()` fetches a page ahead of rendering so it shows without a Suspense
 * fallback: main.tsx loads the current URL's page before the first render, and
 * the prerender loads every page before rendering to HTML.
 */
type Loadable<P> = React.FC<P> & { load: () => Promise<void> };

function page<P extends object>(loader: () => Promise<React.ComponentType<P>>): Loadable<P> {
  let Loaded: React.ComponentType<P> | null = null;
  const load = () =>
    loader().then((C) => {
      Loaded = C;
    });
  const Lazy = lazy(() => loader().then((C) => ({ default: C })));
  const Page = ((props: P) => React.createElement(Loaded ?? (Lazy as React.ComponentType<P>), props)) as Loadable<P>;
  Page.load = load;
  return Page;
}

export const PAGES = {
  home: page(() => import('./HomePage').then((m) => m.HomePage)),
  services: page(() => import('./ServicesPage').then((m) => m.ServicesPage)),
  'senior-fitness': page(() => import('./SeniorFitnessPage').then((m) => m.SeniorFitnessPage)),
  transformations: page(() => import('./TransformationsPage').then((m) => m.TransformationsPage)),
  about: page(() => import('./AboutPage').then((m) => m.AboutPage)),
  contact: page(() => import('./ContactPage').then((m) => m.ContactPage)),
} satisfies Record<PageId, Loadable<any>>;

/** Warm the other pages' chunks when the browser is idle, so navigation is instant. */
export const prefetchPages = () => {
  const run = () => Object.values(PAGES).forEach((p) => p.load().catch(() => undefined));
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 2500);
};
