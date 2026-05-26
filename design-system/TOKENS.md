# Tokens

Source of truth at runtime: the `@theme` block in `src/app/globals.css` (Tailwind v4, CSS-first). The files in `tokens/` mirror it. **Any value used twice on the homepage is a token; literal hex/px in component code is a bug.**

Extracted from commit `5115dce`.

## Colour — brand

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#0b1220` | Darkest surface; logo square, ink panels (Meet Jamie / Services featured / CTA), footer base text colour source |
| `--color-primary` | `#1b46c2` | Primary action + links + eyebrows + icon accents (deliberate deep blue, **not** Tailwind `blue-600`) |
| `--color-primary-hover` | `#15368f` | Primary hover/active; focus-ring colour |
| `--color-flame` | `#f2731b` | Warm brand accent — logo flame, £75 highlights, dark-section eyebrows/icons, featured badge |
| `--color-steel` | `#8da2bc` | Muted text on dark (footer) |
| `--color-gas-safe` | `#ffd200` | Review star fill only (Gas Safe yellow) |
| `--color-whatsapp` | `#127c3f` | WhatsApp CTA bg (darkened from brand `#25d366` so white text passes AA, 5.28:1) |
| `--color-whatsapp-hover` | `#0e6a34` | WhatsApp CTA hover |

## Colour — semantic surfaces / text

| Token | Value | Use |
|---|---|---|
| `--color-surface` | `#ffffff` | Default page/section bg, cards |
| `--color-sunken` | `#f4f7fb` | Tinted section bg, soft cards, icon squares, nav-active pill |
| `--color-ink-soft` | `#142036` | Footer bg (one step lighter than ink, to separate from the ink CTA above) |
| `--color-border-subtle` | `#e4e9f0` | Default borders, dividers |
| `--color-border-strong` | `#c9d2de` | Inputs, pill outlines, secondary button border |
| `--color-text` | `#0b1220` | Body text (= ink) |
| `--color-muted` | `#51607a` | Secondary/supporting text |
| `--color-inverse` | `#f5f8fc` | Text on ink/ink-soft |

Section-background **alternation** is a rhythm rule, not a token — see `PATTERNS.md → Section rhythm`.

## Type

- **Display font** `--font-display` → **Manrope** (weights 600/700/800), wired via `next/font`.
- **Body font** `--font-body` → **Inter** (weights 400/500/600).
- Base rule (`@layer base`): all `h1–h4` use display font, `letter-spacing: -0.01em`, colour `--color-ink`.

Type scale (as used; Tailwind utility → rem):

| Role | Classes | Size |
|---|---|---|
| H1 (hero) | `text-[2rem] sm:text-[2.5rem] md:text-[2.25rem] lg:text-[3.5rem]` `font-extrabold leading-[1.1]` | 32 → 56px |
| H2 (section) | `text-3xl md:text-4xl font-bold` | 30 → 36px |
| H3 (card/sub) | `text-lg font-semibold` (cards) · `text-base font-semibold` (how-it-works) | 18 / 16px |
| Lead paragraph | `text-lg leading-relaxed text-muted` | 18px |
| Body | `text-base` / `text-sm` `leading-relaxed` | 16 / 14px |
| Eyebrow | `.eyebrow` = 0.8125rem, 600, uppercase, `letter-spacing:0.08em`, colour primary | 13px |
| Small / meta | `text-xs` | 12px |

## Space

Tailwind spacing scale (4px base). Committed gaps in use → use these via the Layer-0 primitives (`COMPONENTS.md`):

| Token (Tailwind) | px | Typical use |
|---|---|---|
| `gap-1.5` / `gap-2` | 6 / 8 | Inline icon+label, star rows |
| `gap-3` | 12 | Button rows, card header icon+title |
| `gap-4` | 16 | Card internal stacks, trust-point rows |
| `gap-5` | 20 | Card grids (`gap-5`) |
| `gap-6` / `gap-8` | 24 / 32 | Section sub-blocks, desktop card grid (`lg:gap-8`) |
| `gap-10` / `gap-14` | 40 / 56 | Two-column section gaps |
| `mt-2 / mt-3 / mt-4 / mt-5 / mt-6 / mt-7 / mt-8` | 8–32 | Vertical rhythm inside content blocks |

**Section padding** (`.section`): `padding-block` 3rem → 5rem (md) → 6rem (lg).
**Page gutter** (`.container-page`): `max-width 1200px`, `padding-inline` 1.25rem → 2rem (md), centred.

## Radius

| Token | Value | Use |
|---|---|---|
| `--radius-md` | `10px` | Icon squares, small chips, menu button |
| `--radius-lg` | `16px` | Cards, panels, images, map card |
| `--radius-pill` | `999px` | Buttons, nav pills, badges, area chips |

## Shadow

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(11,18,32,.06), 0 1px 3px rgba(11,18,32,.08)` | Resting cards, pills, scrolled header |
| `--shadow-md` | `0 4px 12px rgba(11,18,32,.08), 0 2px 4px rgba(11,18,32,.06)` | Card hover |
| `--shadow-lg` | `0 12px 32px rgba(11,18,32,.12)` | Floating cards (mobile hero copy card, form card), featured hover |

## Motion (tokens; principles in `MOTION.md`)

The homepage hard-codes motion values via framer-motion + Tailwind `transition` utilities. Promote to:

| Token | Value | Use |
|---|---|---|
| `--motion-fast` | `150ms` | Micro hover (links, chips) |
| `--motion-base` | `200ms` | Buttons, nav, card hover, header (`duration-200`) |
| `--motion-slow` | `300ms` | Larger state changes (FAQ expand, circle fill `duration-300`) |
| `--motion-reveal` | `500ms` | Scroll-in `Reveal` entrance (framer `duration: 0.5`) |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entrances / reveals (framer `[0,0,0.2,1]`) |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Bidirectional transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Reserved (not currently used; physical feel) |

> These motion tokens are **new names for values already in the homepage**; add them to `globals.css @theme` when components start referencing them by name. Until then they are documented intent.

## Layout

| Token | Value |
|---|---|
| `--container-max` | `1200px` (`.container-page` max-width) |
| `--gutter` | `1.25rem` mobile / `2rem` md+ |
| Breakpoints | Tailwind defaults: `sm 640` · `md 768` · `lg 1024` · `xl 1280` |
| Section two-column ratios | Hero `44fr/56fr`; Meet Jamie `46fr/54fr`; Service area / Contact `1fr/1fr`. **Always `fr`, never `%`** (percent + gap overflows — a real bug we fixed). |

## Z-index

| Layer | z | Where |
|---|---|---|
| Base content | auto | sections |
| Map card isolate | `z-0` + `isolation:isolate` | ServiceArea map (contains Leaflet's internal z-indexes) |
| Hero copy card | `z-10` | overlaps mobile hero image |
| Sticky header wrapper | `z-[200]` | TopBar + SiteHeader |
| Mobile menu overlay | `z-[300]` | SiteHeader dialog |
| Skip link (focused) | `z-[600]` | layout |

## Icon

- **System:** `lucide-react`, default stroke (`Flame` logo uses `strokeWidth={2.2}`).
- **Brand glyphs (custom, justified):** `WhatsAppGlyph`, `GoogleG`, `InstagramGlyph` in `src/components/ui/icons.tsx` — multi-colour/brand marks lucide doesn't provide reliably.
- **Sizes:**

| Token | px | Use |
|---|---|---|
| `--icon-xs` | 14 (`h-3.5`) | inline chips, area-pill pins, review stars |
| `--icon-sm` | 16 (`h-4`) | trust points, inline meta, arrows |
| `--icon-md` | 20 (`h-5`) | button icons, social glyphs, GoogleG |
| `--icon-lg` | 24 (`h-6`) | service-card icons, menu |
| `--icon-xl` | 28–30 | (reserved) |

Icon squares: `h-9–h-12 w-…` `rounded-[var(--radius-md)]`, bg `sunken`/`ink`/`white/10`, icon `text-primary`/`text-flame`.
