# JDH Gas — Design System

A formal, implementation-ready design system **extracted from the approved homepage** so every other page (services hub + 4 service pages, areas hub + 4 town pages, about, reviews, gallery, contact, legal, 404) can be redesigned consistently — ideally in one shot.

- **Source of truth:** the homepage code at commit **`5115dce`** (`git show 5115dce`).
- **Reference render:** the local dev server (`npm run dev` → `localhost:3000`). The site is **not yet deployed**, so there is no staging/prod URL; the committed source + dev render are the frozen reference.
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (`@theme` in `src/app/globals.css`) · lucide-react (icons) · framer-motion (motion).

## Where things live

| Doc | What it covers |
|---|---|
| `TOKENS.md` | Every design token (colour, type, space, radius, shadow, motion, layout, z-index, icon) |
| `COMPONENTS.md` | Component catalogue — one canonical doc per component |
| `PATTERNS.md` | Composition recipes (hero, card grid, split section, ink CTA panel…) |
| `PAGES.md` | **Per-page blueprints + acceptance criteria** for the redesigns (the one-shot kit) |
| `MOTION.md` | Motion principles, reduced-motion policy |
| `VOICE.md` | Copy voice, vocabulary, CTA verbs, banned words (derived from homepage) |
| `ACCESSIBILITY.md` | System-wide a11y rules, contrast pairs, keyboard canon |
| `INFRASTRUCTURE.md` | Demo/verify approach, token build, lint, release |
| `CHANGELOG.md` | Semver release notes |
| `tokens/tokens.css` | Runtime source-of-truth mirror of the `@theme` block |
| `tokens/tokens.ts` | Typed TS exports for compile-time refs |
| `tokens/tailwind.config.js` | Tailwind-v4 `@theme` reference (this project is CSS-first; not authored here) |
| `variants/*.md` | Per-component variant specs where they exist |

## How to use it (redesigning a page)

1. Open `PAGES.md`, find the page → copy its blueprint (sections, components, copy slots) and acceptance criteria.
2. Build with components from `COMPONENTS.md` and recipes from `PATTERNS.md` — **do not invent new section styles**.
3. Use only tokens from `TOKENS.md` (no hex/px literals — see lint rules in `INFRASTRUCTURE.md`).
4. Apply `VOICE.md` to all copy, `MOTION.md` to any animation, `ACCESSIBILITY.md` to structure.
5. Check the page against its acceptance gate in `PAGES.md` before calling it done.

## How to contribute

A new component/pattern enters the system only via the governance process in `PATTERNS.md` → *Governance*. New variant values must come from the fixed enums in `COMPONENTS.md`. Code is canonical; this folder documents the code, and any drift between docs and `globals.css` is a bug.

## Decisions restated (do not silently re-decide)

- **Dark mode: NOT supported.** `:root { color-scheme: light }` in `globals.css`. The site is light-theme only; there is no `[data-theme="dark"]`. Every token is single-value.
- **Icon system: lucide-react only**, plus three hand-built inline brand glyphs (`WhatsAppGlyph`, `GoogleG`, `InstagramGlyph`) because lucide's brand icons were removed/unreliable. See `COMPONENTS.md → Icon`. No second icon library anywhere.
- **Motion tier: Tier 2 (Considered)** with one **Tier 3 signature** moment (the "How it works" scroll-linked progress rail). See `MOTION.md`.

## Sibling-plan status

- `brand/` — **absent** (brand strategy was deferred). Therefore **`VOICE.md` and `MOTION.md` are derived from the homepage snapshot only** and tagged "derived". Re-base them when `/plan-brand` runs.
- `website-plan/HOMEPAGE-PLAN.md` + `website-plan/06-tokens.md` — present; tokens trace to these.
- `seo/SEO-STRATEGY.md` + `seo/07-schema.md` — present; component SEO-contribution fields cite these.
