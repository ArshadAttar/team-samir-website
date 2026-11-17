# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website prototype for "TeamSamir" / TS Fitness, a personal-training business in Kothrud, Pune. Generated with Google AI Studio and now edited locally. It is a React 19 + Vite + Tailwind CSS v4 app whose pages are prerendered to static HTML at build time (no framework, no router package).

## Commands

- `npm install`: install dependencies
- `npm run dev`: dev server on port 3000 (`--host=0.0.0.0`)
- `npm run build`: client build, then SSR build of `src/entry-server.tsx` to `dist-ssr/`, then `scripts/prerender.mjs` writes `dist/<path>/index.html` for every page plus `404.html`, `sitemap.xml` and `robots.txt` (and deletes `dist-ssr/` and `dist/.vite/`)
- `npm run preview`: serve the built `dist/`
- `npm run lint`: type-check only (`tsc --noEmit`). There is no ESLint and there is no test suite.

## Architecture

- **Routing without a router package.** `src/lib/routes.ts` maps each `PageId` to a URL (`/`, `/services/`, `/senior-fitness/`, `/transformations/`, `/about-samir/`, `/contact/`). `App.tsx` reads the page from `window.location` (or the `initialPage` prop during prerender), pushes history on navigation and handles back/forward; an unknown path renders the 404 view. Nav links are real `<a>` tags built with `pageLink(page, onNavigate)`. To add a page: extend `PageId` in `src/types.ts`, add it to `PAGE_PATHS` (routes.ts), `PAGE_META`/`PAGE_LABELS` (seo.ts), `PAGES` (`src/pages/registry.ts`) and `PAGE_FILES` (prerender.mjs), add a branch in `App.tsx`, and add links in `Header`, `MobileDrawer`, `MobileBottomBar` and `Footer`.
- **SEO.** `src/lib/seo.ts` holds `SITE_URL` (the one place to change the domain), each page's title/description/share image/indexing, and the JSON-LD. The prerender writes these into each page's `<head>`; `applyHead()` updates the same tags on in-app navigation. `/contact/` is `noindex` and not in the sitemap. Share images are 1200×630 JPGs in `public/images/og/`. Only put verified facts in meta text and JSON-LD.
- **Code splitting.** Pages load as separate chunks via `src/pages/registry.ts`. `main.tsx` loads the current page's chunk before rendering (so the prerendered HTML is swapped without a blank frame), then prefetches the rest when idle. The client uses `createRoot` (not hydration), so the prerendered markup is replaced on load.
- **App-level modals and state.** `LightboxModal`, `VideoModal` and `PlaceholderDialog` live in `App.tsx` and are opened through callbacks. `handleBookDemo(service?)` preselects a service and switches to the Contact page.
- **Content lives in `src/data/mockData.ts`.** It holds `BUSINESS_INFO` (brand, address, phone/WhatsApp number, hours, stats), `SERVICES`, the team, `TRANSFORMATIONS` and the nutrition food cards. Edit business details here and avoid hard-coding them in components. The headline numbers (years, clients, celebrities) live in `STATS` at the top of the file; `BUSINESS_INFO.experienceYears/clientsTrained/celebritiesTrained` are derived from it, and every page reads them from there, so never hard-code those figures. `CountUpStat` counters do not use `allowLiveIncrement`, so all pages show the same number. WhatsApp links are built from `BUSINESS_INFO.contact.whatsappNumber`.
- **WhatsApp entry point.** The only WhatsApp button is the floating `src/components/WhatsAppFloat.tsx`, rendered once in `App.tsx` (bottom-right, above `MobileBottomBar` on mobile). Don't add WhatsApp buttons to pages; the phone-number text links in the Contact page and Footer contact details are kept on purpose.
- **Form backend = Google Apps Script.** `ContactPage.tsx` validates on the client, then `src/lib/submitEnquiry.ts` POSTs JSON (as `text/plain`, to avoid a CORS preflight) to `VITE_FORM_ENDPOINT`. The script lives in `docs/google-apps-script/Code.gs` (pasted into the Google Sheet's Apps Script editor, not built with the site): it appends a row to the sheet, emails the owner Gmail while the daily quota (~100 on free Gmail) allows, and otherwise marks the row "Pending (digest)" for the hourly summary email. Setup steps: `docs/google-apps-script/SETUP.md`. Changing `Code.gs` requires redeploying it in Apps Script (new version on the same deployment). There is no database. The `@google/genai`, `express` and `dotenv` dependencies, and `GEMINI_API_KEY` in `.env.example`, come from the AI Studio template and are not used in `src/`.
- **Prototype features.** The floating "Wireframe Blueprint" toggle was removed from `App.tsx` (the unused `.wireframe-mode` styles remain in `index.css`). There is still a `highlightPlaceholders` prop. `PrototypeToolbar` is imported in `App.tsx` but not rendered.

## Styling

- Tailwind v4 is set up through `@tailwindcss/vite`, so there is no `tailwind.config`. Brand tokens are defined in `@theme` in `src/index.css` (for example `--color-brand-blue: #1769FF`). Components mostly use raw hex classes such as `text-[#171A21]` and `bg-[#1769FF]`. Match those existing values.
- Fonts are Plus Jakarta Sans (body) and Outfit (`font-display`, used for headings), loaded from Google Fonts in `index.html`.
- Animation uses `motion` (Framer Motion); icons use `lucide-react`.
- Layout is mobile-first. `MobileBottomBar` is fixed on small screens, which is why the root element has `pb-16 lg:pb-0`.

## Assets

- Code references images as WebP by absolute public paths such as `/images/<file>.webp`, served from `public/images/`. The original JPG/PNG files are kept beside them (favicon, apple-touch icon and the JSON-LD logo still use them). When adding an image, add a compressed `.webp` (max ~1600px wide) and reference that. Below-the-fold `<img>` tags use `loading="lazy" decoding="async"`; the main image of a page loads eagerly. `src/assets/images/` holds duplicate copies that are not imported. Put new images in `public/images/`. Some filenames contain spaces (WhatsApp exports).
- Official logos are in `public/images/logo/`. `TeamSamirLogo` (Header, Footer, MobileDrawer) uses the transparent mark `logo-without-bg.PNG` (uppercase extension; keep the exact case) plus a "TeamSamir" text wordmark; it is also the favicon. The Home hero card uses `logo-black.jpeg`.
- Videos are in `src/assets/videos/` (bundled, ~5.7 MB total; re-encoded to H.264 with +faststart, client clips at 30 fps). Inline preview videos use `src/components/LazyVideo.tsx`, which fetches nothing until the video is near the viewport and respects reduced motion.
- The Senior Fitness page loads its photos from `public/images/senior-fitness/<name>.webp` and shows a styled placeholder for any missing file. The expected filenames and their AI generation prompts are listed in `docs/senior-fitness-image-prompts.md`.
- `motion` (`motion/react`) is used for scroll and entrance animations on the Senior Fitness page, wrapped in `MotionConfig reducedMotion="user"`.

## Config notes

- `vite.config.ts` sets `@` as an alias for the project root (not `src/`). It also disables HMR and file watching when `DISABLE_HMR=true`, which AI Studio relies on. Leave that block unchanged.

## Deployment

- Hosted on Vercel. `vercel.json` sets the build command, `trailingSlash: true` (redirects `/services` to `/services/`), long immutable caching for `/assets/*`, 30-day caching for `/images/*`, and basic security headers. `VITE_FORM_ENDPOINT` must be set in Vercel's Environment Variables.
