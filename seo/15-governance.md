# Phase 15 — Governance & Refresh

_Scaled for a solo local trade — light cadence, not an agency retainer._

## Cadence
- **Weekly (5–10 min):** glance at GSC (any errors/manual action/indexation drop) + reply to any new Google review.
- **Monthly (~30 min):** one-page KPI snapshot (Phase 11) — GBP calls/messages, enquiries, review count, manual rank check of the 5 priority queries + town variants, AI-Overview spot-check on the CP12 query. Adjust.
- **Quarterly (~2 hrs):** re-fetch the priority SERPs (the Phase 2 set), check competitor movement (new entrants in the local pack, review-count gaps), refresh keyword targets/auto-suggest, review which town pages are/aren't ranking, decide next content.
- **Annual (~half day):** re-run a compressed Phases 1–3 (keyword map + SERP + competitor teardown), refresh `handoff-to-website.md` + `handoff-to-content-team.md`, audit prices/hours/regs across the site.

## Triggered reviews (override cadence)
- **Google algorithm update** → check the 5 priority rankings within a week; don't react to noise.
- **New competitor hits the local 3-pack** for a core term → quick teardown, consider GBP/review response.
- **Service/area change** (Jamie adds installs, emergency hours, a new town) → update pages, GBP services/areas, schema.
- **Gas-safety regulation change** → update CP12 page immediately (YMYL accuracy).
- **GBP suspension/edit or review attack** → act immediately (GBP is the #1 asset).
- **KPI regression** (enquiries down >20% non-seasonal, branded search down, local-pack position lost) → root-cause before changing things.

## `--rebuild` rule
If `/plan-seo --rebuild` is run later, read existing `seo/` files, ask what changed, update only affected phases, regenerate `SEO-STRATEGY.md` + both handoffs, and log the diff at the top of the strategy file.

## Ownership
Solo: Jamie owns reviews + GBP + accuracy; the site builder owns GSC/GA4 + technical + content updates. Keep the monthly snapshot in one shared spreadsheet.
