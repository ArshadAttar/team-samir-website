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
- **SEO.** `src/lib/seo.ts` holds `SITE_URL` (the one place to change the domain), each page's title/description/share image/indexing, and the JSON-LD. The prerender writes these into each page's `<head>`; `applyHead()` updates the same tags on in-app navigation. `/contact/` is `noindex` and not in the sitemap. Share images are 1200×630 JPGs in `public/media/shared/og/`. Only put verified facts in meta text and JSON-LD.
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

- All photos and videos live in `public/media/`, organised as `<page>/<section>/{photos,videos}/` and referenced by absolute paths such as `/media/services/service-cards/photos/<file>.webp`. Page folders use the URL slugs (`home`, `services`, `senior-fitness`, `transformations`, `about-samir`); `shared/` holds site-wide files (`shared/logo/`, `shared/og/`); `unused/` holds files no live page shows (some are still referenced by the unrendered `TRANSFORMATIONS` data and `VideoModal`). A file used in several places lives once, in the section that owns it, and the others point to it (Home's service cards use `services/service-cards/`). Put new media in the folder for the page and section that shows it.
- Images are referenced as WebP. The original JPG/PNG files are kept beside them (the JSON-LD logo still uses one). When adding an image, add a compressed `.webp` (max ~1600px wide) and reference that. Below-the-fold `<img>` tags use `loading="lazy" decoding="async"`; the main image of a page loads eagerly. `src/assets/images/` holds duplicate copies that are not imported. Some filenames contain spaces (WhatsApp exports).
- Raw client uploads (full-size photos, ~1.1 GB of videos) are kept outside the repo in `../media-originals/Website/`; never put originals in `public/` (everything there is deployed). Web copies made from them: Home review avatars `home/client-feedback/photos/` (240px face crops), Home feedback clips `home/video-feedback/videos/feedback-NN.mp4` (480px wide, mono audio; shown muted with hover sound and play/pause buttons; the Transformations page has its own copies in `transformations/video-gallery/videos/`, shown with the same `FeedbackVideoStrip`), Transformations before & after photos `transformations/before-after/photos/transformation-NN.webp` (1600px) and `-sm.webp` (800px, cards), one composite photo per card, and the Senior Fitness video gallery clips `senior-fitness/transformations/videos/senior-NN.mp4` (720×480, with audio; thumbnails `senior-fitness/transformations/photos/senior-video-NN.webp`, listed in `SeniorTransformations.tsx`). The `feedback photos` folder name ends in a hidden macOS character (U+F028), so typed paths to it fail.
- Official logos are in `public/media/shared/logo/`. `TeamSamirLogo` (Header, Footer, MobileDrawer) uses the transparent mark `logo-without-bg.webp` (its original is `logo-without-bg.PNG`, uppercase extension; keep the exact case) plus a "TeamSamir" text wordmark. The Home hero card also uses `logo-without-bg.webp`.
- Videos are plain public files (not bundled, so not content-hashed: give a replaced clip a new filename or it may stay cached for up to 30 days). They are H.264 with +faststart, client clips at 30 fps. Inline preview videos use `src/components/LazyVideo.tsx`, which fetches nothing until the video is near the viewport and respects reduced motion.
- The Senior Fitness page's photo paths are in `src/data/seniorFitnessMedia.ts` (one folder per section) and it shows a styled placeholder for any missing file. The expected filenames and their AI generation prompts are listed in `docs/senior-fitness-image-prompts.md`.
- `motion` (`motion/react`) is used for scroll and entrance animations on the Senior Fitness page, wrapped in `MotionConfig reducedMotion="user"`.

## Config notes

- `vite.config.ts` sets `@` as an alias for the project root (not `src/`). It also disables HMR and file watching when `DISABLE_HMR=true`, which AI Studio relies on. Leave that block unchanged.

## Deployment

- Hosted on Vercel. `vercel.json` sets the build command, `trailingSlash: true` (redirects `/services` to `/services/`), long immutable caching for `/assets/*`, 30-day caching for `/media/*`, and basic security headers. `VITE_FORM_ENDPOINT` must be set in Vercel's Environment Variables.
