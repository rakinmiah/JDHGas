# JDH Gas Services — Homepage Plan

> **Build brief (read first).** Everything below this box is detail in the phase files (`00`–`09`).

## 1. Build blueprint (one page)
- **Project:** Homepage for JDH Gas Services — sole-trader Gas Safe engineer **Jamie Hannah**, Burgess Hill / Mid Sussex. Rebuild of jdhgas.co.uk on the same domain.
- **Primary conversion goal:** enquiry — **phone call / WhatsApp** (primary), short contact form (fallback). North-star: 40 organic+GBP enquiries/mo within 12 months.
- **Stack (one line):** Next.js 15 App Router (SSG) · Tailwind 4 · Radix (accordion/dialog) · Framer Motion (Tier-2) · forms via RHF+Zod→Resend · Lucide · self-hosted General Sans + Inter · `next/image` · Vercel. (Full table: `07-stack.md`.)
- **Design tokens (compact):** ink `#0B1220`, primary electric-blue `#2563EB` (CTAs/links only), accent `#3B82F6`, steel `#8DA2BC`, Gas-Safe-yellow `#FFD200` (badge only), WhatsApp `#25D366`. Surfaces white / sunken `#F4F7FB`. Type: General Sans (headings) + Inter (body); display 56px desktop. Space 4px base; content max 1200px; radius pill CTAs / md cards / lg images; Tier-2 motion. Light theme only. (Full: `06-tokens.md`.)
- **Module stack (12 + nav/footer):** Hero → Trust strip → Services (4) → £75 offer → **Meet Jamie ⭐signature** → Why choose (3) → Boiler brands → Reviews → Recent work → Service area → FAQ → Final CTA band. (Specs: `05-modules.md`; IA/arc: `04-ia.md`.)
- **Narrative arc:** Promise → Proof → Personality → Path.
- **Signature moment:** "Meet Jamie" — real portrait overlapping an ink panel, scroll-revealed first-person intro + "Prevention over cure." + Gas Safe 977838. The one thing a faceless competitor can't copy.
- **Build sequencing (3 gates, each a review point):**
  - **V0.1 skeleton:** Next scaffold (done) → tokens wired in `globals.css` + Tailwind config; `SiteHeader`, `SiteFooter`, `Button`; Hero built; site JSON-LD in layout. Proves stack + token flow.
  - **V0.5 modules stubbed:** all 12 modules rendered with final copy + placeholder-optimised imagery; full-page rhythm/arc review.
  - **V1 launch-ready:** all `05-modules.md` specs honoured; all `09-acceptance.md` §A gates pass; all §B launch items resolved (incl. GBP optimised in parallel).
- **DO-NOT rules:** no hero carousel; no stock photography; no auto-playing media; no "24/7/emergency" claims (standard hours); no hidden pricing (£75 + honest quote); no faceless About; no footer town-keyword dump; no cookie-wall over content; no second icon set; no SPLIT-50-50 monotony.
- **Definition of done:** `09-acceptance.md` §A (quality) + §B (launch readiness).

## 2. SEO integration (from `seo/handoff-to-website.md`)
Home targets `gas engineer burgess hill` (H1) + `boiler service near me`, `gas safe registered engineer`. Per-module keyword placement, answer-first FAQ, entities, and schema (HVACBusiness + WebSite site-wide; FAQPage + Review on home; Person on /about) are specified there and reflected in `05-modules.md`. Brand voice wins over keywords.

## 3. Phase index
`00-brand-discovery` · `01-category-brief` (+`references/`) · `02-synthesis` · `03-positioning` · `04-ia` · `05-modules` · `06-tokens` · `07-stack` · `08-manifest` · `09-acceptance`.

---

## Phase 11 — Open questions & assumptions

### Resolved (2026-05-25)
- ✅ **Client requirements (Jamie via WhatsApp):** services confirmed = Boiler servicing · Landlord gas safety certificates · Heating system repairs · Gas hob installs (site labels updated to match). Enquiry form "same format as the Squarespace one" **+ a photo-upload section** — BUILT (`/contact` + `/api/contact`, photo upload with preview, honeypot, validation; emails via Resend once `RESEND_API_KEY` is set). Reviews + areas already included. Client happy to reuse current-site blueprints.
- ⏳ **To wire before launch:** set `RESEND_API_KEY` (env) so the form emails info@jdhgas.co.uk; optionally add Turnstile. If exact Squarespace field parity is wanted, match once Jamie shares that form.
- ✅ **Real reviews** — 3 verbatim Google reviews (Josh C., Max, Sabir) pulled live; Reviews module copy FINAL.
- ✅ **Brand logos** — user confirmed OK to display Worcester/Vaillant/Ideal/Baxi/Bosch wordmarks (still TO_SOURCE as official SVGs).
- ℹ️ **Public address known** — GBP shows 247 Chanctonbury Rd, Burgess Hill RH15 9HQ. Decision needed: publish full street address on site/schema, or keep locality-level (recommended — likely his home; service-area business). See assumptions.

### Blocking (resolve before/at the relevant build gate)
1. **`/plan-brand` deferred** — positioning, differentiator, promises in `03-positioning.md` are `[STAND-IN]`. Confirm or overwrite before launch; ideally run `/plan-brand`.
2. **Original hero portrait** — WhatsApp-compressed version works, but the full-res original materially improves the LCP hero. Request from Jamie.
3. **Subsequent pages** — this plan is the **homepage** (framework default). Service/area/about/etc. pages are referenced and linked but need their own builds (run `/plan-website --page <name>` after the homepage + design system are approved). All internal links resolve only once those exist.

### Non-blocking assumptions (correct if wrong)
- **Imagery:** existing 9 photos + AI-generated fills for gaps (map, OG, watermark); **no stock, no paid photographer** — from the DIY budget.
- **Hours:** Mon–Fri 08:00–17:00 (from GBP); **no out-of-hours/emergency** (confirmed). Schema/openingHours + copy reflect this.
- **Insurance & accreditations:** left out of copy/schema until confirmed ("not sure"). Add "fully insured" + Worcester-accredited only if true.
- **Pricing:** £75 new-customer service shown; all else "contact for a quote" (confirmed approach).
- **Phone/WhatsApp:** 07544 063330 (+447544063330) is the single NAP number across site/GBP/citations.
- **Domain:** new site replaces jdhgas.co.uk; GBP website link re-pointed to it; `/book-now` 301→`/contact`.
- **Next step after homepage approval:** run `/plan-design-system` to formalise tokens into a system before building further pages.
