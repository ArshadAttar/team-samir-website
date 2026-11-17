# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website prototype for "TeamSamir" / TS Fitness, a personal-training business in Kothrud, Pune. Generated with Google AI Studio and now edited locally. It is a fully client-side React 19 + Vite + Tailwind CSS v4 single-page app.

## Commands

- `npm install`: install dependencies
- `npm run dev`: dev server on port 3000 (`--host=0.0.0.0`)
- `npm run build`: production build to `dist/`
- `npm run preview`: serve the built `dist/`
- `npm run lint`: type-check only (`tsc --noEmit`). There is no ESLint and there is no test suite.

## Architecture

- **No router.** `src/App.tsx` holds `currentPage: PageId` in state and renders one of the six components in `src/pages/` conditionally. Navigation goes through the `onNavigate` / `onBookDemo` callbacks passed down as props. To add a page: extend `PageId` in `src/types.ts`, add a branch in `App.tsx`, and add links in `Header`, `MobileDrawer`, `MobileBottomBar` and `Footer`.
- **App-level modals and state.** `LightboxModal`, `VideoModal` and `PlaceholderDialog` live in `App.tsx` and are opened through callbacks. `handleBookDemo(service?)` preselects a service and switches to the Contact page.
- **Content lives in `src/data/mockData.ts`.** It holds `BUSINESS_INFO` (brand, address, phone/WhatsApp number, hours, stats), `SERVICES`, the team, `TRANSFORMATIONS` and the nutrition food cards. Edit business details here and avoid hard-coding them in components. The headline numbers (years, clients, celebrities) live in `STATS` at the top of the file; `BUSINESS_INFO.experienceYears/clientsTrained/celebritiesTrained` are derived from it, and every page reads them from there, so never hard-code those figures. `CountUpStat` counters do not use `allowLiveIncrement`, so all pages show the same number. WhatsApp links are built from `BUSINESS_INFO.contact.whatsappNumber`.
- **WhatsApp entry point.** The only WhatsApp button is the floating `src/components/WhatsAppFloat.tsx`, rendered once in `App.tsx` (bottom-right, above `MobileBottomBar` on mobile). Don't add WhatsApp buttons to pages; the phone-number text links in the Contact page and Footer contact details are kept on purpose.
- **No backend.** The contact form in `ContactPage.tsx` validates on the client and then fakes a submit with `setTimeout`, so nothing is sent anywhere. The `@google/genai`, `express` and `dotenv` dependencies, and `GEMINI_API_KEY` in `.env.example`, come from the AI Studio template and are not used in `src/`.
- **Prototype features.** The floating "Wireframe Blueprint" toggle was removed from `App.tsx` (the unused `.wireframe-mode` styles remain in `index.css`). There is still a `highlightPlaceholders` prop. `PrototypeToolbar` is imported in `App.tsx` but not rendered.

## Styling

- Tailwind v4 is set up through `@tailwindcss/vite`, so there is no `tailwind.config`. Brand tokens are defined in `@theme` in `src/index.css` (for example `--color-brand-blue: #1769FF`). Components mostly use raw hex classes such as `text-[#171A21]` and `bg-[#1769FF]`. Match those existing values.
- Fonts are Plus Jakarta Sans (body) and Outfit (`font-display`, used for headings), loaded from Google Fonts in `index.html`.
- Animation uses `motion` (Framer Motion); icons use `lucide-react`.
- Layout is mobile-first. `MobileBottomBar` is fixed on small screens, which is why the root element has `pb-16 lg:pb-0`.

## Assets

- Code references images by absolute public paths such as `/images/<file>.jpg`, served from `public/images/`. `src/assets/images/` holds duplicate copies that are not imported. Put new images in `public/images/`. Some filenames contain spaces (WhatsApp exports).
- Official logos are in `public/images/logo/`. `TeamSamirLogo` (Header, Footer, MobileDrawer) uses the transparent mark `logo-without-bg.PNG` (uppercase extension; keep the exact case) plus a "TeamSamir" text wordmark; it is also the favicon. The Home hero card uses `logo-black.jpeg`.
- Videos are in `src/assets/videos/`.
- The Senior Fitness page loads its photos from `public/images/senior-fitness/<name>.jpg` and shows a styled placeholder for any missing file. The expected filenames and their AI generation prompts are listed in `docs/senior-fitness-image-prompts.md`.
- `motion` (`motion/react`) is used for scroll and entrance animations on the Senior Fitness page, wrapped in `MotionConfig reducedMotion="user"`.

## Config notes

- `vite.config.ts` sets `@` as an alias for the project root (not `src/`). It also disables HMR and file watching when `DISABLE_HMR=true`, which AI Studio relies on. Leave that block unchanged.
