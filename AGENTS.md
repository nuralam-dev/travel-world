<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Travel landing page: Next.js 16.4 App Router, React 19.3, TypeScript strict, Tailwind v4, Biome 2. Node >= 20.9, npm with `package-lock.json` (the yarn/pnpm/bun commands in `README.md` are create-next-app boilerplate). No tests, CI, API routes, database, auth, or env vars — don't invent setup for them.

The app is mostly scaffolding: one route (`src/app/page.tsx`), a large generated component kit in `src/components/ui/`, and image assets in `public/images/`.

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
- `npm run lint` is red repo-wide, not just from your changes: the shadcn-generated kit (`src/components/ui/`, `src/hooks/`, `src/lib/highlighter.tsx`) is formatted without semicolons and trips lint rules. Don't mass-reformat it, and avoid `npm run format` (it rewrites the whole repo); check only your own files.
- `next-env.d.ts` is gitignored, so a fresh checkout needs `next typegen` before `tsc --noEmit`.
- `next dev` may rewrite the managed block at the top of this file; commit it with your work to keep the tree clean.

## Next.js 16 specifics

- `next.config.ts` enables `cacheComponents` + `partialPrefetching` (`partialPrefetching` requires `cacheComponents`). Data fetching is dynamic by default, PPR is the rendering model, and caching is opt-in via `use cache` / `cacheLife` / `cacheTag`. The route handlers/pages are statically prerendered when possible.
- Do not add `export const runtime`; Cache Components is Node-only and rejects `runtime` exports, including `runtime = "nodejs"`.
- React Compiler is enabled. Route prop types such as `LayoutProps<"/">` are generated globals; run `next typegen` after adding or renaming routes or typechecking fails.
- `next dev` writes to `.next/dev`; `next build` writes to `.next` (both gitignored). Bundled docs for the installed version live in `node_modules/next/dist/docs/` — consult them instead of relying on memory.

## UI and styling

- Tailwind v4 has no `tailwind.config.*` or PostCSS config. CSS is compiled by `@tailwindcss/turbopack` through the Turbopack `*.css` rule in `next.config.ts`; don't add a PostCSS setup.
- Design tokens are CSS variables in `src/app/globals.css` (`@theme inline`, oklch values, light/dark). Add or change tokens there, not in a JS config. `globals.css` also imports `tw-animate-css` and `shadcn/tailwind.css`; keep those imports.
- `src/components/ui/` is shadcn-generated (style `base-nova` in `components.json`). Primitives come from `@base-ui/react`, not Radix: there are no `@radix-ui/*` deps and no `asChild` — compose with Base UI's `render={<Button ... />}`.
- Import `cn` from the `cn` npm package as the generated components do; `@/lib/utils` only re-exports it.
- `src/lib/highlighter.tsx` lazy-loads Shiki languages: to support a new language, add its dynamic import to `languages` and, if needed, an entry in `aliases`. Code block/trace components rely on this registry.
- Path alias: `@/*` → `src/*`. Hooks live in `src/hooks/`, non-UI helpers in `src/lib/`, static assets in `public/images/`.
