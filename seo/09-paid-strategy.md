# Phase 9 — Paid Strategy

## Status: OUT OF SCOPE (organic-only, by decision in Phase 0)
No live paid campaign is planned. This file is a **ready-to-activate stub** so paid can switch on later without re-planning. It is deliberately not a full campaign build.

## Why organic-first is right here
JDH already **owns the Burgess Hill local pack** organically (5.0×24 GBP). For a local trade, the GBP + organic local results capture the high-intent "[service] [town] / near me" traffic for free. The SERPs show competitors (Elite, Boiler Technicians, Peter Dundon) **paying** for visibility JDH earns organically — so ad spend would largely duplicate ground already held. Spend is better directed at GBP optimisation + reviews (Phase 10).

## When to revisit paid
Activate a lean Google Ads Search campaign only if: (a) Jamie wants more volume than organic delivers, (b) he expands to a competitive town where he's absent organically (e.g. **Haywards Heath** — currently not in that local pack), or (c) seasonal surge (Aug–Nov servicing / cold-snap breakdowns) and he has capacity.

## Ready-to-activate outline (if switched on later)
- **Channel:** Google Ads Search only (skip Display/PMax initially).
- **Attribution:** last-click to start (low conversion volume); move to data-driven once ≥30 conv/mo.
- **Ad groups (tight, themed):** (1) Boiler service + town; (2) Boiler repair + town; (3) Landlord CP12 + town. Each maps to its keyword cluster (Phase 1).
- **Match types:** phrase + exact for high-intent local terms; broad only with audience signals + the negative list below.
- **Negatives (seed):** free, cheap, DIY, job, jobs, career, salary, course, training, grant, "british gas", boiler finance, "rent to own", parts, manual, wiki, what is.
- **Bidding sequence:** Manual CPC/Max-clicks (wk 1–2) → Max conversions (≥30 conv/mo) → tCPA once stable.
- **Landing pages:** dedicated **`/lp/<campaign>`** routes — single CTA (call/WhatsApp/short form), no main nav, trust stack (Gas Safe 977838, 5.0×24, photo), message-matched headline. **`noindex,follow`** (Phase 8) so they never compete with the organic service pages.
- **Conversion tracking before first click:** call clicks, WhatsApp clicks, form submits as GA4 + Ads conversions; call-tracking optional.
- **Budget guardrails:** start ~£10–15/day, max-CPC cap during learning, single shared budget.
- **PMax:** OFF (don't let Google auto-spend on brand/irrelevant placements for a small local advertiser).

## Anti-patterns to avoid (when activated)
Sending ads to the homepage; using organic service pages as LPs; running without conversion tracking live; broad match with no negatives; auto-applying Google "recommendations"; PMax on a tiny local budget.
