# SEO Plan — Phase 0 Intake

_Project: JDH Gas Services website (Next.js rebuild). Date: 2026-05-25._

## Framework-input resolution
- **Brand plan (`brand/`):** NOT RUN. Deferred by user. Using **lightweight voice stand-in** sourced from Jamie's real Instagram captions (@jdhgasservices) + live-site copy. Tagged `[STAND-IN — pending /plan-brand]` wherever brand-owned facts are asserted. Flagged as non-blocking open question.
- **SEO tools:** NONE (free only). No Ahrefs/SEMrush/Moz. No GSC/GA4 on current site yet. Volume/difficulty figures are **manual-SERP-read estimates**, labelled as such per Constitutional Rule 10 (Ask, don't fabricate).
- **Design system:** N/A (homepage not yet planned; `/plan-website` paused at its Phase 0).

## A. Business & audience context
- **Business:** JDH Gas Services — sole trader, **Jamie Hannah**, Gas Safe registered engineer (**reg. 977838**). Domestic gas/heating: boiler servicing, gas safety (CP12) certificates, boiler repairs/breakdowns, gas appliance (hob/cooker) install & removal. Works on all major brands (Worcester, Vaillant, Ideal, Baxi, Bosch).
- **Primary commercial goal SEO serves:** **enquiries / bookings** (phone call, WhatsApp, contact form). Lead-gen, not e-commerce.
- **Geographies:** UK — Burgess Hill (base) + Haywards Heath, Hassocks, Cuckfield + nearby (Ditchling, Wivelsfield, Lindfield, Keymer). Mid Sussex / RH15–RH17 postcodes. Single country.
- **Languages:** en-GB only. No hreflang.
- **Audiences:** (1) homeowners needing annual service / repair; (2) landlords & letting agents needing CP12 certificates; (3) small businesses with gas appliances.
- **YMYL classification: YES — safety.** Gas work is a safety YMYL topic; E-E-A-T bar is high. Satisfied via Gas Safe reg #977838, named real engineer (Jamie Hannah), real job photos, real reviews. Author/credential signals required in copy + schema.

## B. Query & SERP context
- **Five priority queries (user-confirmed):**
  1. `gas engineer burgess hill` (head)
  2. `boiler service burgess hill`
  3. `boiler repair burgess hill` / `boiler not working burgess hill`
  4. `landlord gas safety certificate burgess hill` / `cp12 burgess hill`
  5. `boiler service near me`
- **Brand-search intent:** minimal today (tiny brand). Will grow; reserve "jdh gas reviews / jdh gas services" via homepage + reviews content.
- **Search-feature targets:** **Local pack (Maps) = #1 priority**, organic local results, People Also Ask / featured snippets for question queries, image pack (job photos). 
- **AI-search / GEO posture:** IN SCOPE. Optimise for AI Overview / ChatGPT/Perplexity citation via answer-first content + schema.
- **Seasonality:** boiler **servicing demand spikes Aug–Nov** (pre-winter); **breakdowns spike in cold snaps (Nov–Feb)**; **CP12** is year-round, tenancy-cycle driven (spikes around new tenancies / summer turnover). Content + GBP posts flighted accordingly.
- **Named competitors:** user deferred — **discover from SERP** (Phase 3).

## C. Existing-site reality
- **Status:** effectively a **rebuild** of jdhgas.co.uk on the **same domain**. Old site is small (few pages, tiny footprint). Treat as low-migration-risk but **preserve domain + any ranking URLs**; do a light migration check in Phase 4.
- **Crawl access:** live site is fetchable (confirmed earlier; note `/services` 404s on direct path — services sit under a nav dropdown).
- **Rankings/analytics access:** none set up. **No GSC, no GA4, no Google Business Profile.** Establishing all three is part of the launch plan.
- **Migration artefacts:** none available (no GSC/Ahrefs). Migration map will be best-effort from a manual crawl of the current site.
- **GSC manual actions:** unknown (no access) — assume clean; verify once GSC is set up.

## D. Operational context
- **Paid search:** **OUT OF SCOPE** — organic only. Phase 9 = lean ready-to-activate stub, not a live campaign.
- **Content production capacity:** very low — solo engineer + site builder. Plan favours **few, high-quality evergreen pages** over volume.
- **Implementation team:** Claude + user, Next.js/TS/Tailwind, Vercel.
- **Regulatory/compliance:** gas-safety claims must be accurate (Gas Safe reg true). UK GDPR for contact form. No medical/financial. Don't overclaim ("emergency 24/7" only if true — confirm).
- **Budget:** low / DIY. **Timeline:** months. **Theme:** light only.

## Single biggest finding
**No Google Business Profile exists.** For a local trade this is the largest, cheapest lever available — it powers the Map local pack that outranks organic for "near me" / town queries. **Creating + verifying + optimising a GBP is action #1** in this plan, ahead of any on-site work.

## Open questions (non-blocking, carried to strategy)
- Real pricing for service / CP12 / repair call-out (only £75 new-customer offer known).
- Does Jamie offer emergency / same-day call-outs? Working hours? (affects "emergency" terms + schema openingHours).
- Public-liability insurance held? (trust signal + E-E-A-T).
- Full `/plan-brand` deferred — voice currently a stand-in.
