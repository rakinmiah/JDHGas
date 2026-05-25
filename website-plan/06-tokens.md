# Phase 6 — Design Tokens (homepage-derived)

_Light theme only (Phase 0). Every value committed. Colours derived from the sampled logo (`00-brand-discovery.md`)._

## Brand colours (with usage rule)
```
--color-brand-ink:        #0B1220;  /* near-black blue (logo bg) — headers, footer, CTA bands, headlines */
--color-brand-primary:    #2563EB;  /* electric blue (flame core) — primary CTAs/links ONLY */
--color-brand-primary-hover:#1D4FD7;
--color-accent-flame:     #3B82F6;  /* lighter blue — gradients, highlights, focus on ink */
--color-brand-steel:      #8DA2BC;  /* steel blue-grey (wordmark/silver) — muted accents, icons on ink */
--color-gas-safe:         #FFD200;  /* official Gas Safe yellow — the badge ONLY, never UI/CTA */
--color-whatsapp:         #25D366;  /* WhatsApp button only (brand-correct) */
```
_Category reference: palette honours the "trusted blue" heating convention but breaks the dated blue/silver-gradient cliché by going ink + one clean electric blue + lots of white (Phase 1B aesthetic brief)._

## Semantic layer (components use THESE)
```
--color-surface:          #FFFFFF;
--color-surface-raised:   #FFFFFF;   /* + shadow */
--color-surface-sunken:   #F4F7FB;   /* soft blue-grey section bg */
--color-background:       #FFFFFF;
--color-border-subtle:    #E4E9F0;
--color-border-strong:    #C9D2DE;
--color-text-primary:     #0B1220;
--color-text-muted:       #51607A;
--color-text-inverse:     #F5F8FC;
--color-text-link:        #2563EB;
--color-text-link-hover:  #1D4FD7;
--color-feedback-success: #16A34A;  --color-feedback-success-surface:#ECFDF3;
--color-feedback-warning: #B45309;  --color-feedback-warning-surface:#FEF6E7;
--color-feedback-danger:  #DC2626;  --color-feedback-danger-surface: #FEECEC;
--color-feedback-info:    #2563EB;  --color-feedback-info-surface:   #EAF1FE;
--color-focus-ring:       #1D4FD7;  /* light surfaces */
--color-focus-ring-on-ink:#A9C2E0;  /* steel-blue ring on brand-ink (meets 3:1 on dark) */
```

## Contrast pairing table (WCAG, measured)
| Text token | On surface | Ratio | Tier |
|---|---|---|---|
| text-primary #0B1220 | #FFFFFF | ~17:1 | AAA |
| text-primary | surface-sunken #F4F7FB | ~16:1 | AAA |
| text-muted #51607A | #FFFFFF | ~5.6:1 | AA |
| text-muted | surface-sunken | ~5.3:1 | AA |
| text-inverse #F5F8FC | brand-ink #0B1220 | ~17:1 | AAA |
| white #FFFFFF | brand-primary #2563EB | ~5.1:1 | AA (normal text ✓) |
| text-link #2563EB | #FFFFFF | ~5.1:1 | AA |
| brand-steel #8DA2BC | brand-ink | ~6.8:1 | AAA |
| focus-ring #1D4FD7 | #FFFFFF | ~6:1 | ✓ (≥3:1) |
| focus-ring-on-ink #A9C2E0 | brand-ink | ~9:1 | ✓ |
_Disallowed: brand-steel on white (≈2.4:1) — never use for text on light. Gas-safe yellow is never a text/UI colour._

## Dark mode
**Never** (Phase 0). Codify `color-scheme: light;` on `:root`. No dark token set.

## Typography
- **Display/Headings:** **General Sans** (Fontshare, free licence) — Semibold 600 / Bold 700. Self-hosted via `next/font` (local) — `font-display: swap`, latin subset, preload the 600 weight.
- **Body/UI:** **Inter** (self-hosted via `next/font`) — Regular 400 / Medium 500 / Semibold 600.
- **Mono:** none.
- **Runner-up (noted, not used):** Satoshi for display.

**Type scale (rem · px) — mobile / desktop · line-height · weight · role**
```
--text-display:  2.5rem/40 (mobile) · 3.5rem/56 (desktop) · 1.05 · 700 · H1 (hero)
--text-h1:       2rem/32 · 2.75rem/44 · 1.1 · 700 · page H1 (non-hero)
--text-h2:       1.5rem/24 · 2rem/32 · 1.15 · 600 · section headings
--text-h3:       1.25rem/20 · 1.5rem/24 · 1.2 · 600 · card titles
--text-h4:       1.125rem/18 · 1.25rem/20 · 1.3 · 600 · sub-titles
--text-lead:     1.125rem/18 · 1.25rem/20 · 1.6 · 400 · hero subhead / intros
--text-body:     1rem/16 · 1.0625rem/17 · 1.65 · 400 · body
--text-small:    0.875rem/14 · 0.875rem/14 · 1.5 · 400 · captions/meta
--text-eyebrow:  0.8125rem/13 · 0.8125rem/13 · 1.2 · 600 · UPPERCASE, letter-spacing .08em · kicker
--text-button:   1rem/16 · 1rem/16 · 1 · 600 · button label
--text-label:    0.875rem/14 · — · 1.4 · 500 · form label
--text-helper:   0.8125rem/13 · — · 1.4 · 400 · helper/error text
```
Letter-spacing: headings -0.01em; eyebrow +0.08em; body 0.

## Space scale (4px base)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` → `--space-1 … --space-13`.

## Layout tokens
- **Breakpoints (px):** `sm 375 · mob 430 · tab 768 · lap 1024 · desk 1280 · wide 1536`.
- **Content max-width:** `1200px` (comfortable reading + room for SPLIT-OFFSET on laptop). Wide-bleed sections (hero, CTA band, gallery) go full-viewport with inner content capped at 1200.
- **Grid:** 12-col / 24px gutter ≥1024; 8-col / 20px gutter 768–1023; 4-col / 16px gutter <768.
- **Section vertical rhythm (padding-block):** 48px mobile · 80px tablet · 96px desktop (breathable sections +16–32px).

## Radius
`--radius-sm 6px · --radius-md 10px · --radius-lg 16px · --radius-pill 999px`. Cards md; buttons pill (or md — commit **pill** for CTAs, md for cards); images lg.

## Shadow
```
--shadow-sm: 0 1px 2px rgba(11,18,32,.06), 0 1px 3px rgba(11,18,32,.08);
--shadow-md: 0 4px 12px rgba(11,18,32,.08), 0 2px 4px rgba(11,18,32,.06);
--shadow-lg: 0 12px 32px rgba(11,18,32,.12);
--shadow-focus: 0 0 0 3px rgba(37,99,235,.35);  /* optional focus glow; default focus uses outline */
```

## Z-index
`--z-base 0 · --z-sticky 100 · --z-dropdown 200 · --z-overlay 300 · --z-modal 400 · --z-toast 500 · --z-tooltip 600`.

## Motion
```
--motion-fast: 120ms; --motion-base: 200ms; --motion-slow: 400ms; --motion-emphasis: 600ms;
--ease-standard: cubic-bezier(.4,0,.2,1);
--ease-out:      cubic-bezier(0,0,.2,1);
--ease-in-out:   cubic-bezier(.4,0,.6,1);
--ease-spring:   cubic-bezier(.34,1.56,.64,1);  /* used sparingly (chip pop) */
```
**Motion ambition tier: Tier 2 — Considered.** Gentle scroll-linked fade/slide-up (opacity + 8–16px translate), single entrance animation per module, minimal stagger. The SIGNATURE module (Meet Jamie) carries the one slightly richer reveal (still Tier 2, 16px/500ms). Matches a low-Whimsy, trust-first brand. **All motion respects `prefers-reduced-motion`** → opacity-only or instant.

## Icon sizing (Lucide — single system)
`--icon-sm 16 · --icon-md 20 · --icon-lg 24 · --icon-xl 32`. Stroke 2px (1.75 at xl). No second icon set.
