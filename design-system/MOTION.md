# Motion

> **Tier:** Tier 2 (Considered) with **one Tier 3 signature** moment. **Whimsy axis:** *derived from homepage only* — `brand/` is absent, so this is inferred from the build, tag "derived" and re-base when `/plan-brand` runs. Inferred Whimsy ≈ 4/10: quiet, confident, trades-credible; no playfulness.

Sleekness is non-negotiable: motion serves meaning or doesn't ship. No visual-noise motion, no over-bounce, no decorative loops.

## What animates (allowed)
- **Section entrances** — `Reveal`: fade + 16px rise, `--motion-reveal` (500ms), `--ease-out`, once, when ~15% in view. Card lists stagger `delay = i*0.06`.
- **Signature (Tier 3):** "How it works" **scroll-linked progress rail** (desktop) — the fill + numbered circles activate with scroll (`useScroll`/`useTransform`); mirrored on mobile as per-card circles that fill on scroll. This is the *one* memorable motion idea; nowhere else gets scroll-linked motion.
- **Hover/active affordances** — buttons, nav pills, cards (`-translate-y-0.5` + shadow), links: `--motion-base` (≤200ms).
- **State transitions** — FAQ expand/collapse (`grid-rows 0fr→1fr`), how-it-works circle fill, chevron rotate: `--motion-slow` (300ms).
- **Header** — background/blur/shadow fade in on scroll past 24px (`--motion-base`).
- **Carousel** — reviews auto-advance every 4s (genuine ongoing behaviour, not decoration) — **pauses on hover/focus/touch** and under reduced-motion.

## What does NOT animate (do-not list)
- No auto-looping decoration, ambient hover on non-interactive elements, parallax on body copy, scroll-jacking.
- No entrance animation on the sticky header chrome itself (only its bg on scroll).
- No motion on legal/utility pages beyond `Reveal`.

## Duration pairing
| Interaction | Token |
|---|---|
| Micro hover (link/chip) | `--motion-fast` 150ms |
| Button / nav / card hover, header | `--motion-base` 200ms (no hover transition exceeds 200ms) |
| FAQ expand, circle fill, larger state change | `--motion-slow` 300ms |
| Section scroll-in entrance | `--motion-reveal` 500ms |

## Easing pairing
- Entrance / reveal → `--ease-out` (`cubic-bezier(0,0,0.2,1)`).
- Bidirectional UI transitions → `--ease-in-out`.
- Physical feel (drawer/toggle) → `--ease-spring` (reserved; not currently used).

## Reduced-motion policy (system rule)
Global rule in `globals.css`: under `prefers-reduced-motion: reduce`, all `animation-duration`/`transition-duration` collapse to ~0 and `scroll-behavior` becomes auto. Per component:
- `Reveal` → drops the translate, fades only (and effectively instant).
- How-it-works rail → all steps render active immediately, no scroll-linked motion.
- Carousel → autoplay disabled.
- Hover lifts → instant.
Any exception requires written justification. There are none currently.

## Loops
No animation auto-loops for decoration. The only indefinite behaviours are: the review carousel (genuine, pausable) and any loading indicator (none currently). Any future indefinite loop (spinner/live dot) needs an `aria-label` describing what it represents.

## Cross-component coordination
- Mobile menu open → `document.body` scroll locked (`overflow:hidden`) and restored on close; close button + (to add) Escape.
- No other element's animation triggers another. If a future panel/menu pair coordinates, document it here, not in component code.
