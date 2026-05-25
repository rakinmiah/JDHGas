# Phase 11 — Measurement

_Free-tool stack only (no Ahrefs/SEMrush). Truth comes from GSC, GA4, and Google Business Profile Insights — all free._

## North-star metric
**40 qualified enquiries per month from organic + Google Business Profile, within 12 months of launch** (calls + WhatsApp + form submits that are real job enquiries, not spam).
- _Rationale:_ JDH already holds the Burgess Hill local pack with no real website behind it; a fast, schema-rich site + optimised GBP + review growth + the repair/HH gaps closed should compound enquiry volume. Number is a stretch-but-plausible target for a solo engineer.
- **Baseline caveat:** there is **no current measurement** (no GSC/GA4/GBP-Insights access yet). The very first task at launch is to capture the baseline (current GBP calls/direction-requests, current enquiry volume). **Revise this number after 30 days of real data** — it's a planning target, not a measured trajectory.

## Goal pacing (SEO compounds non-linearly)
| Month | Target % of north-star | ~Enquiries/mo |
|---|---|---|
| M1 (launch + GBP optimised) | 25% | ~10 (GBP already produces these) |
| M3 ✅ checkpoint | 45% | ~18 |
| M6 ✅ checkpoint | 70% | ~28 |
| M9 | 88% | ~35 |
| M12 | 100% | ~40 |
GBP front-loads results (it already works); site + reviews + content compound through M3–M12. If M3 < 40% or M6 < 60%, investigate (rankings, GBP, conversion path).

## Attribution
**Last-click**, channel-tagged (low volume; single-touch local intent dominates). Acknowledge GBP and organic both feed enquiries; don't collapse GBP into "direct". Tag every conversion with source.

## KPIs
**Organic (GSC + GA4):**
- Ranked keywords in top 10 for the priority set (manual monthly check of the 5 priority queries + town variants — incognito, Burgess Hill geo).
- Organic sessions to service + town pages.
- Organic key events: form submit, click-to-call, WhatsApp click.
- Local-pack presence per query (manual: is JDH in the 3-pack for service/repair/CP12 × each town?).

**Google Business Profile (GBP Insights):**
- Calls, direction requests, website clicks, messages from the profile.
- Search-vs-Maps discovery; queries that surfaced the profile.
- Review count + average rating trend (target +2–4 reviews/mo, hold 4.9–5.0).

**Branded search (GSC):** impressions for "jdh gas" + variants, month-over-month — lagging brand-health signal.

**AI-search visibility (manual monthly spot check):** for ~8 queries (esp. `landlord gas safety certificate burgess hill`, `cp12 burgess hill`), check whether JDH is cited in Google AI Overview / appears in ChatGPT/Perplexity answers. Binary per query; track the trend. (The CP12 page is the deliberate play here.)

## Leading vs lagging
- **Leading (weekly-ish):** GSC impressions, average position, CTR, indexation coverage, CWV, new reviews.
- **Lagging (monthly):** enquiries, GBP calls/messages, branded-search volume, top-10 keyword count.

## Dashboard segmentation (free, in GA4 + GSC)
Segment by: branded vs non-branded (GSC query filter on "jdh"); page type (home/service/town); device (mobile dominates local trade); channel (organic / GBP-referral / direct / referral); geography (Burgess Hill vs other towns). Aggregate numbers hide the truth — e.g. a branded-search bump isn't an SEO win for non-branded local terms.

## Conversion quality
Track which enquiries become booked jobs (Jamie's simple note/spreadsheet) and by channel — so we learn whether organic/GBP leads convert as well as word-of-mouth. Even a tally of "enquiry → booked" by source is enough at this scale.

## Tooling stack (all free)
GSC, GA4, Google Business Profile Insights, Google Rich Results Test + validator.schema.org (schema), PageSpeed Insights / Lighthouse (CWV), manual incognito SERP checks (rank), a simple spreadsheet (enquiry→job log + monthly KPI snapshot). Optional free: Bing Webmaster Tools.

## Pre-launch baseline (capture before/at go-live)
Record on day 0: current GBP rating/review count (5.0 / 24), current GBP monthly calls + direction requests (from Insights once claimed), current local-pack positions for the 5 priority queries (manual), and any current site traffic if GA exists. This is the comparison point for everything above.

## Reporting cadence
- Weekly: 10-min glance at GSC (anomalies, new reviews).
- Monthly: one-page snapshot (the KPIs above) + adjust.
- Quarterly: re-fetch the priority SERPs (Phase 15), check competitor movement, refresh keyword targets.
