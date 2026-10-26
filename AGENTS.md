<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Travel landing page: Next.js 16.4 App Router, React 19.3, TypeScript strict, Tailwind v4, Biome 2. Node >= 20.9, npm with `package-lock.json` (the yarn/pnpm/bun commands in `README.md` are create-next-app boilerplate).

No tests, no CI, no auth, and **no `.env` / no API routes in this repo** — don't invent that setup. Data does come from a database, but via a *separate* backend directory (see [Backend](#backend)); there is nothing to configure here for it.

Three routes: `/` (landing), `/add-destination`, `/destination`. The bulk of the code is a large generated component kit in `src/components/ui/` plus image assets in `public/images/`.

## Commands

```bash
npm run dev                    # next dev (Turbopack), http://localhost:3000
npm run build                  # production build; runs TypeScript checks + prerender
npm start                      # serve a completed build
npm run lint                   # biome check over the whole repo (currently red, see below)
npx biome check <paths>        # lint + format check only the files you touched
npx biome check --write <paths> # apply safe fixes, formatting, and import sorting
npx next typegen && npx tsc --noEmit # standalone typecheck
```

- There is no test suite. `npm run build` is the full verification: it typechecks and prerenders, but does not run Biome.
- **`npm run build` needs the backend on :4000 running.** `/destination` prerenders at build time with an unconditional `fetch("http://localhost:4000/destination")` and no error handling, so the build fails if that server (or its MongoDB) is down. See [Backend](#backend).
- `npm run lint` is red repo-wide, not just from your changes: the shadcn-generated kit (`src/components/ui/`, `src/hooks/`, `src/lib/highlighter.tsx`) is formatted without semicolons and trips lint rules. Don't mass-reformat it, and avoid `npm run format` (it rewrites the whole repo); check only your own files.
- `next-env.d.ts` is gitignored, so a fresh checkout needs `next typegen` before `tsc --noEmit`.
- `next dev` may rewrite the managed block at the top of this file; commit it with your work to keep the tree clean.
- Dev-server gotcha: if `GET /` starts returning 500 with a CSS parse error (`"*/ {"` inside the globals.css transpile), `.next/dev` cache is corrupted. Fix: kill the node process listening on :3000 (`lsof -ti :3000 -sTCP:LISTEN`), `rm -rf .next/dev`, restart `npm run dev`. The user keeps `next dev` running in a background shell during work; restart it if it exits.

## Next.js 16 specifics

- `next.config.ts` currently sets `cacheComponents: false` and `partialPrefetching: false` (they're a pair — `partialPrefetching` requires `cacheComponents`) plus `reactCompiler: true`. **Cache Components is off**, so PPR and `use cache` / `cacheLife` / `cacheTag` are not in play; normal App Router behavior applies and pages are statically prerendered when possible. Don't start using cache directives without flipping those flags too.
- Don't add `export const runtime`. Node is already the default, `'edge'` is deprecated in Next 16, and if `cacheComponents` is ever turned back on the config rejects `runtime` exports outright (including `runtime = "nodejs"`).
- React Compiler is enabled. Route prop types such as `LayoutProps<"/">` are generated globals; run `next typegen` after adding or renaming routes or typechecking fails.
- `next dev` writes to `.next/dev`; `next build` writes to `.next` (both gitignored). Bundled docs for the installed version live in `node_modules/next/dist/docs/` — consult them instead of relying on memory.
- Server Components are strictly enforced: client-side JavaScript (`onSubmit`, `onChange`, hooks) needs a `"use client"` component — no passing event handlers from server components. (`new Date()` no longer blocks prerender with `cacheComponents: false` — verified — but the value is frozen at build time, so hardcode it or use a client component if it must stay current.)
- Next Image in v16: `priority` is deprecated in favor of `preload` / `loading="eager"`. Keep `width`/`height` consistent with the file's intrinsic aspect ratio and pair CSS size changes with `width:auto`/`height:auto` (warnings appear in the dev console).

## UI and styling

- Tailwind v4 has no `tailwind.config.*` or PostCSS config. CSS is compiled by `@tailwindcss/turbopack` through the Turbopack `*.css` rule in `next.config.ts`; don't add a PostCSS setup.
- Design tokens are CSS variables in `src/app/globals.css` (`@theme inline`, oklch values, light/dark). Add or change tokens there, not in a JS config. `globals.css` also imports `tw-animate-css` and `shadcn/tailwind.css`; keep those imports.
- `src/components/ui/` is shadcn-generated (style `base-nova` in `components.json`). Primitives come from `@base-ui/react`, not Radix: there are no `@radix-ui/*` deps and no `asChild` — compose with Base UI's `render={<Button ... />}`.
- Import `cn` from the `cn` npm package as the generated components do; `@/lib/utils` only re-exports it.
- `src/lib/highlighter.tsx` lazy-loads Shiki languages: to support a new language, add its dynamic import to `languages` and, if needed, an entry in `aliases`. Code block/trace components rely on this registry.
- `lucide-react` v1.61 has no brand icons (no `Instagram`, `Linkedin`, `X`, etc.) and icon names differ from older versions. Check available names via `ls node_modules/lucide-react/dist/esm/icons/` before importing; social icons in the footer are inline SVGs.
- Carousel primitives are in `src/components/ui/carousel.tsx` (embla-based). Override the built-in `CarouselPrevious`/`CarouselNext` positioning with `static size-...` utility classes when the design uses external arrow buttons.

## Page structure

- `src/app/layout.tsx` renders the shell: `<Navbar />` → `{children}` → `<Footer />` → `<Toaster />`. `Navbar` (`src/components/navbar.tsx`, fixed, `SiteHeader` was renamed/moved here) and `Footer` (`src/components/footer.tsx`) are global — don't re-add them inside `page.tsx`.
- `src/app/page.tsx` composes full-bleed section components in order: `Hero` (with `SearchBar`) → `WhyChooseUs` → `Testimonials` → `CtaBanner`. Each design screenshot gets cloned into its own component(s) under `src/components/` — keep sections separate rather than inlining markup.
- Routes: `/` (landing), `/add-destination` (form → POSTs to the backend; page is a thin server shell with `metadata`, logic lives in `src/components/add-destination-form.tsx`), `/destination` (async server component, fetches the backend and currently renders an empty `<div>` — a placeholder). The navbar's "My Bookings" link points at `/bookings`, which does not exist yet (404).
- Sections are served dark-and-light from tokens: `--color-brand` (#15a1bf) and `--color-ink` (#1e1e1e) in `globals.css`; the rest `bg-white` or `bg-[#f4f9fa]`. Sections use a shared container like `mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16` (footer uses `max-w-[1240px]` per the design).
- Reusable static assets live in `public/images/`: `person1/2.png` (testimonial portraits), `Wanderlast.png` (navbar logo) vs `Wanderlast-1.png` (large footer wordmark), `Banner.png` (hero), `destinations/*.png` — check whether what you need already exists before creating anything.
- Visual verification: capture at 1440px width. `browser.screenshot` may fail with "needs a visible tab"; a reliable fallback is Chrome DevTools Protocol on `http://127.0.0.1:9222` (Node 24 has global `WebSocket`): `Emulation.setDeviceMetricsOverride` 1440×900, then `Page.captureScreenshot`. Note lazy-loaded images below the fold may not paint in full-page captures — scroll and capture the viewport instead.
- Path alias: `@/*` → `src/*`. Hooks live in `src/hooks/`, non-UI helpers in `src/lib/`, static assets in `public/images/`.

## Backend

The API is **not in this repo**. It lives in the sibling directory `../wanderlust-server/` (its own project, not a git repo: `index.js`, Express 5 + MongoDB via `MONGODB_URI` in its own `.env`, `type: "module"`). It serves `http://localhost:4000` with CORS open:

- `GET /` — health check
- `GET /destination` — all Mongo documents (`_id`, `name`, `country`, `category`, `price`, `duration`, `departure`, `imageUrl`, `description`)
- `POST /add-destination` — inserts `req.body` into the `destination` collection

Start it with `node index.js` from that directory (`package.json` has no `start`/`dev` script). Run it alongside `next dev` — check what's up with `lsof -i :4000 -i :3000 -sTCP:LISTEN -P -n`.

Frontend touchpoints: `src/app/destination/page.tsx` fetches `GET /destination` at build time; `src/components/add-destination-form.tsx` POSTs JSON to `/add-destination` from the browser. The base URL is hardcoded there — no env var or proxy exists, so if you need it configurable you'd have to introduce that yourself (and note `next.config.ts` has no rewrites set up).
