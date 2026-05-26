# Accessibility

System-wide rules inherited by every page. Conformance target: **WCAG 2.2 AA**. No regulated/AAA surface identified (small-business marketing site).

## Skip link
In `layout.tsx`: `<a href="#main">Skip to content</a>`, `sr-only` until focused, then visible (`focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[600] focus:bg-ink focus:text-inverse`). Target: `<main id="main">`. Keep on every page (it's in the layout).

## Landmarks
- `<header>` (banner) = TopBar + SiteHeader · `<nav aria-label="Primary">` inside.
- `<main id="main">` = page content (one per page).
- `<footer role="contentinfo">` = SiteFooter · `<nav aria-label="Footer">` inside.
- Content sections use `<section aria-labelledby="…-h">`. Use ARIA roles only where HTML5 doesn't fit (e.g. the mobile menu `role="dialog"`).

## Heading hierarchy
- **One `<h1>` per page** — the page hero only.
- Section heads = `<h2>` (paired with `<section>`); sub-sections `<h3>`. **No skipped levels.**
- Decorative labels (eyebrows) are `<p class="eyebrow">`, never headings.
- Known cleanliness note: Meet Jamie renders the H2 twice (responsive), but only one is visible per viewport — acceptable; do not introduce a *second visible* H2.

## Focus
- System focus ring (global `:focus-visible`): `outline: 2px solid var(--color-primary-hover); outline-offset: 2px; border-radius: 4px`. Visible on every surface (primary-hover #15368f contrasts against surface/sunken/ink). Buttons also set `focus-visible:outline-2 focus-visible:outline-offset-2`.
- Modals/drawers (mobile menu): traps focus while open and returns focus to the trigger on close. ✅ Implemented in `SiteHeader.tsx` — Escape closes, focus moves to the dialog on open, Tab cycles within the dialog, focus returns to the hamburger on close, body scroll locked.

## Contrast pairing table
Measured against WCAG (normal text needs ≥4.5:1; large/bold ≥3:1; non-text ≥3:1).

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `text`/`ink` #0b1220 | `surface` #fff | ~17:1 | AAA ✓ |
| `text` #0b1220 | `sunken` #f4f7fb | ~16:1 | AAA ✓ |
| `muted` #51607a | `surface` #fff | ~5.9:1 | AA ✓ |
| `muted` #51607a | `sunken` #f4f7fb | ~5.6:1 | AA ✓ |
| `primary` #1b46c2 (link/text) | `surface` #fff | ~7.4:1 | AAA ✓ |
| white | `primary` #1b46c2 | ~7.4:1 | AAA ✓ (primary buttons) |
| `inverse` #f5f8fc | `ink` #0b1220 | ~16:1 | AAA ✓ |
| `inverse`/85 | `ink` | ~13:1 | AAA ✓ |
| `steel` #8da2bc | `ink-soft` #142036 | ~6.3:1 | AA ✓ (footer muted) |
| `flame` #f2731b (icon/text) | `ink` #0b1220 | ~6.5:1 | AA ✓ (dark-section accents) |
| **`ink`** | **`flame` #f2731b** | **~6.5:1** | **AA ✓** (flame badge — fixed; was white) |
| **white** | **`whatsapp` #127c3f** | **~5.3:1** | **AA ✓** (WhatsApp button — green darkened from #25d366; was white-on-#25d366 ≈ 1.8:1) |

**Resolved (were failures on the first homepage build, fixed at commit after `5115dce`):**
1. **Flame badge** ("New customers from £75") — switched white → **ink text** (ink-on-flame ≈ 6.5:1 ✓).
2. **WhatsApp button** — green token darkened `#25d366` → `#127c3f`, keeping the white logo (white-on-#127c3f ≈ 5.3:1 ✓).

> Any pairing not in this table that doesn't meet AA is forbidden. Add new pairings here when new fg/bg combos appear.

## Keyboard canon
- Tab / Shift+Tab through all interactive elements in DOM order; visible focus everywhere.
- Enter activates links/buttons; Space also activates buttons; Enter/Space toggles the FAQ accordion.
- **Escape** closes every overlay (mobile menu — *to add*). Every mode has a committed exit key.
- Carousel arrows are real buttons (Tab + Enter); autoplay never moves focus.
- No keyboard traps.

## Screen-reader canon
- Icon-only controls have `aria-label` (Call button includes the number; menu open/close; carousel arrows; social links).
- Decorative icons/stars `aria-hidden`; rating exposes `sr-only` "Rated 5 out of 5".
- Form errors associated via `aria-describedby`; `aria-invalid` on the field; required state announced.
- `aria-current="page"` on the active nav item (not colour alone).
- Live regions: form submit errors `role="alert"` (assertive); status updates polite; decoration off.

## Reduced motion
Honour `prefers-reduced-motion: reduce` per `MOTION.md` (global rule already in `globals.css`). Every animating component degrades to instant/fade.

## Touch targets
≥ **44×44px** for every pointer target. Buttons/menu/CTA use `min-h-[44px]`/`h-11`. Small chips/links that are primary targets must hit 44px (pad or pseudo-expand).

## Forbidden patterns
- Colour-only semantics (we pair colour with `aria-current`, icons, text).
- `pointer-events:none` for disabled (use `aria-disabled` + styling).
- Placeholder-as-label.
- Autoplay audio/video; auto-advancing content **without** pause (carousel pauses ✓).
- Pop-ups/modals on first paint; countdown-urgency theatre (the £75 strip is a static link, not a countdown — keep it that way).
- Keyboard traps; invisible focus rings; inaccessible drag-and-drop.

## Testing requirements
- **axe-core: zero violations** per page (run on each redesigned page).
- Keyboard sweep per page (tab order, focus visible, Escape on overlays).
- Screen-reader spot-check (VoiceOver + NVDA) on the homepage and ≥2 redesigned pages per release.
- Verify at 375 / 768 / 1280 widths: no overlap, no horizontal scroll, targets ≥44px.
