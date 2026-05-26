# Infrastructure

How the system lives and ships. This is a small Next.js app, not a published package — the infrastructure is right-sized to that.

## Demo / inspection
- **No Storybook** (overkill for this project). The **homepage itself is the living gallery** — every component appears there at commit `5115dce`.
- Inspect via the dev server: `npm run dev` → `http://localhost:3000`. Verify responsive states at 375 / 768 / 1280.
- **Recommended next step (optional):** a `/system` route that renders each component in its variants/states for isolated review. Until then, point reviewers at the homepage section that uses the component (links are in `COMPONENTS.md` → *Real example*).

## Token build pipeline
- **Runtime source of truth:** the `@theme { … }` block in `src/app/globals.css` (Tailwind v4 generates utilities from it).
- `design-system/tokens/tokens.css`, `tokens.ts`, `tailwind.config.js` are **mirrors** for documentation/porting.
- There is no automated generator yet; keeping them in sync is manual. **Rule: when you change a token in `globals.css`, update `tokens.css` + `tokens.ts` in the same commit.** Drift is a bug.
- **Recommended:** a tiny script (`scripts/sync-tokens.mjs`) that parses the `@theme` block and rewrites `tokens.css`/`tokens.ts`, run via `npm run tokens` and checked in CI. (Not yet built.)

## Component test harness
- Current: **production build is the gate** — `npm run build` must pass (type-check + compile) before any page ships. ⚠️ **Never run `npm run build` while `npm run dev` is running** — they share `.next` and will corrupt each other. Stop the dev server first.
- Manual: dev-server visual verification + keyboard/axe sweep per `ACCESSIBILITY.md`.
- **Recommended additions:** `axe-playwright` smoke test per route; a Playwright check that asserts one `<h1>` per page, no horizontal overflow, and `metadata`/canonical present.

## Linting (enforce system usage)
- ESLint + TypeScript already run in the build.
- **Rules to add (recommended) to prevent drift:**
  - No raw hex outside `globals.css`/`tokens.css` (Stylelint `color-no-hex` scoped to components).
  - No `grid-cols-[NN%_NN%]` (percent + gap overflow) — prefer `fr`.
  - No icon imports from anything but `lucide-react` / `@/components/ui/icons`.
  - No literal `margin`/`padding` pixel values in components (use Tailwind scale).

## Release process
- Branch → PR → review against the relevant `PAGES.md` acceptance gate + the self-audit → merge to `main`.
- Each system-affecting PR adds a `CHANGELOG.md` entry and bumps the version (semver).
- Deploy target: **Vercel** (planned; not yet connected). Nothing is pushed to the remote yet — local commits only. Pre-launch checklist: set `RESEND_API_KEY`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`; connect Vercel; verify the OG image renders in a share debugger.

## Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Dev server / living gallery (localhost:3000) |
| `npm run build` | Build + type-check gate (dev server must be stopped) |
| `npm run lint` | ESLint |
| `npm run tokens` | *(recommended, not yet built)* regenerate token mirrors from `globals.css` |
