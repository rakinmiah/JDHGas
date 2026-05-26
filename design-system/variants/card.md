# Card — variants

Source: `src/components/home/Services.tsx` (commit `5115dce`). A whole card is a single `<Link>`.

| Variant | Enum | Shell | Icon square | Heading | Affordance | Use |
|---|---|---|---|---|---|---|
| `standard` | Tone default | `flex flex-col h-full rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 hover:-translate-y-0.5 hover:border-primary hover:shadow-md transition-all duration-200` | `bg-sunken text-primary` (lg icon) | H3 `text-lg font-semibold` | "Learn more →" ghost (`text-primary`) | Service cards, any link-card grid |
| `featured` | Tone emphasis | `bg-ink text-inverse` + same radius/hover; **`lg:flex-row lg:items-center lg:justify-between lg:col-span-3`** (wide banner only at desktop) | `bg-white/10 text-flame` (lg icon) | H3 `text-lg font-semibold text-inverse` | optional flame **Badge** ("New customers from £75") + "Learn more →" `text-inverse` | One per grid — the lead/offer service |

**Budget:** 2/5.
**Responsive rule:** the featured card is a **stacked card** below `lg` (matches `standard` shape) and becomes the full-width horizontal banner only at `lg`. Never the banner at tablet/mobile.
**Equal heights:** `h-full` on every card + the grid stretches rows (`items-stretch` default).
**States:** default · hover (lift + shadow + `border-primary`) · focus-visible (link ring). No disabled/loading/empty/error.
**A11y:** single clickable target; H3 inside; icon `aria-hidden`.
**Contrast:** the featured `flame` Badge uses **ink text** on flame (≈6.5:1, AA ✓). Do not use white text on flame.
