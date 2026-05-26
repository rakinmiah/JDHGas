# Button — variants

Source: `src/components/ui/Button.tsx` (commit `5115dce`). Base: `inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-5 py-3 text-base font-semibold transition-all duration-200 min-h-[44px]`.

| Variant | Enum | Classes | Trigger / use | Notes |
|---|---|---|---|---|
| `primary` | Intent primary | `bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-md active:translate-y-px` | The one main action per view (Call) | white-on-primary ≈ 7.4:1 ✓ |
| `secondary` | Intent secondary | `bg-surface text-ink border border-border-strong hover:border-primary hover:text-primary active:translate-y-px` | Alternative action on light bg | |
| `whatsapp` | Intent success | `bg-whatsapp text-white hover:bg-whatsapp-hover active:translate-y-px` + auto leading `WhatsAppGlyph` | WhatsApp contact | white-on-`#127c3f` ≈ 5.3:1 ✓ (green darkened from brand `#25d366`; white logo kept) |
| `ghost` | Intent ghost | `text-primary hover:text-primary-hover hover:underline px-2` | Inline/tertiary link-style | also used as the "Learn more →" card affordance |
| `ghostInverse` | Tone inverse | `bg-white/10 text-inverse border border-white/25 hover:bg-white/20 active:translate-y-px` | Secondary action on ink/dark panels | |

**Budget:** 5/5 — adding a 6th requires a governance change or a new component.
**States:** default · hover · focus-visible (global 2px primary-hover ring) · active (`translate-y-px`). `disabled` not implemented — if needed add `disabled:opacity-60 disabled:pointer-events-none` + `aria-disabled`.
**Auto-routing:** `http*` → new-tab `<a target="_blank" rel="noopener">`; `tel:`/`mailto:` → `<a>`; internal → `next/link`.
