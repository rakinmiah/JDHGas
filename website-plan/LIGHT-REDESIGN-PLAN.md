# Light Redesign Plan — Areas pages, Areas hub, Homepage polish

**Goal:** raise the professional feel and conversion pressure of the site — town pages and the
/areas hub especially — without a rebuild. Keep everything that already works. Every move below
composes existing design-system patterns (P1–P9); no new section shells are invented.

**Conversion thesis for a local trade site:** a visitor landing cold on a town page decides in
seconds based on (1) *can I trust this person* (Gas Safe, reviews, real photos, real prices),
(2) *do they actually cover me* (proximity proof), and (3) *how little effort is it to act*
(thumb-reach call button, a form that doesn't ask much). The current pages do (1) well at the
top, but under-deliver on (2) and (3) and thin out below the fold.

---

## Keep list (untouched strengths)

- **Boiler-make LogoStrip** (P9 ink wall) — kept, and *extended* to town pages (slim variant).
- Ink context panels (CP12 "Landlord?" + servicing £85 panel) and their mirrored layout.
- TownReviews big-quote treatment with light-blue quotation marks + auto-advance.
- CoverageMap with town pins; framed media-card treatment (P8).
- PageHero trust cluster (Gas Safe reg + dynamic Google rating pill).
- Design tokens, type scale, section rhythm rules (P2), voice.

---

## Global additions (all pages, both phases)

### G1 — Sticky mobile action bar ★ the single highest-value change
Fixed bottom bar, mobile only (`md:hidden`), appearing after the hero scrolls out:
**[📞 Call] [WhatsApp]** — full-width split buttons, `bg-surface` with top border + shadow,
44px+ targets. Hidden while the closing contact form is in view (IntersectionObserver).
Every CTA click already fires GA4 events, so lift is measurable from day one.

### G2 — Response-expectation microcopy
One consistent reassurance line under CTA clusters: *"Replies quickly on WhatsApp · Mon–Fri,
some evenings"*. Sets expectations honestly (no 24/7 claim) and reduces call hesitation.

### G3 — Photo proof upgrade
Fold in the 10 new job photos (3 real jobs, JDH-branded mat/uniform visible):
- Clean analyser-on-Vaillant shot → boiler-servicing contexts.
- Case-off internals shot → repairs/"what's included" contexts.
- Others → town-page heroes & "recent work" strips *once Jamie confirms towns* (honesty rule:
  no town captions until confirmed; until then captions say what the work is, not where).

---

## Phase A — Town page template (`/[localPage]`) redesign

Current order: `Hero → CP12 → Servicing → TownReviews → AlsoOffered → Coverage → FAQ → CtaBand`

New order (P2 rhythm — one mid-page ink moment + closing ink bookend):

| # | Section | bg | Change |
|---|---------|----|--------|
| 1 | **PageHero** | sunken | ADD: £85 flame price pill beside CTAs; ADD proximity line under trust cluster — *"Based in Burgess Hill — usually in {town} within 15–20 minutes"* (true per town, stored in local-pages data). Keeps photo, rating pill, Gas Safe reg. |
| 2 | **How booking works** (NEW) | surface | 3-step inline strip (icon squares, P7-style): *"Message or call with your postcode → I confirm a time and fixed price → done properly, certificate/paperwork by email."* Kills the "what happens if I ring" friction. Compact — not a full section of cards. |
| 3 | **CP12 section** | sunken | Layout kept (ink panel left + numbered steps). Tighten steps to 4 visible. |
| 4 | **Servicing section** | surface | Layout kept (steps left + ink panel right). ADD the clean analyser photo as a small framed inset in the panel (proof of the actual work). |
| 5 | **Boiler-make strip** (NEW here) | ink | Slim variant of P9: one-line heading *"All the major makes, serviced and repaired"* + mono-white logo row. The page's single mid-ink moment. Reuses LogoStrip with a `compact` prop. |
| 6 | **TownReviews** | sunken | Kept. ADD aggregate header row: 5★ + "5.0 from 50+ Google reviews" (dynamic) beside the "What {town} customers say" heading, so one quote never reads as the only evidence. |
| 7 | **Also offered** | surface | Kept (icon cards). |
| 8 | **Coverage** | sunken | Kept (chips + map). Postcode nudge copy gains a WhatsApp deep-link: *"Send your postcode on WhatsApp"* prefilled message. |
| 9 | **FAQ** | surface | Kept (force `tone` to fit rhythm). |
| 10 | **Closing CTA → ContactSection** (P6, replaces CtaBand) | ink | The homepage's ink CTA + **enquiry form** (HomeEnquiryForm), with the town name prefilled in the message placeholder. A form at the decision point instead of a link away. GA4 `enquiry_submit` already wired. |

## Phase B — Areas hub (`/areas`) redesign

Current order: `Hero(text) → TownCards → Map → Reviews → CtaBand`

| # | Section | bg | Change |
|---|---------|----|--------|
| 1 | **PageHero** | sunken | Kept (rating pill already in). ADD the same proximity/response microcopy (G2). |
| 2 | **"Do I cover you?" checker** (NEW) | surface | Postcode quick-check: input + button; client-side prefix match (RH15/RH16/RH17, BN6, BN3, BN41, BN7, BN5 …) → "Yes — {town} page →" / "Likely — send it to me on WhatsApp". Zero backend; pure conversion + delight. Sits above the fold on desktop. |
| 3 | **Town cards** | surface (same section as 2) | Kept image-top cards. ADD per-card: ★ 5.0 chip when town has reviews (exists) + "from £85 services" price hint. |
| 4 | **Coverage map** | sunken | Kept, framed (P8). |
| 5 | **Boiler-make strip** (slim, NEW) | ink | Same compact P9 as town pages. |
| 6 | **Reviews** | surface | Kept (`tone="surface"`). |
| 7 | **ContactSection** (P6, replaces CtaBand) | ink | Full closing CTA + form, consistent with town pages. |

## Phase C — Homepage polish (light touch only)

- **C1** Hero: add the £85 price pill next to CTAs (offer currently lives only in the top bar
  and mid-page Services banner; price-anchor the first screen). Add G2 microcopy.
- **C2** MeetJamie: swap/add one of the new action photos (Gas Safe patch visible) alongside
  the portrait for "real person, real work" texture.
- **C3** ServiceArea section: link the town chips to their live town pages (currently static
  TOWNS list — swap to LOCAL_TOWNS links once Wave 1 ships) + "See all areas →".
- **C4** Global G1 sticky bar + G2 microcopy apply here too.
- Explicitly NOT touched: section order, Services banner, Reviews, LogoStrip, WhyChoose, FAQ.

---

## Sequencing & shipping

1. Build Phase A + B on top of the un-shipped Wave-1 work (same branch of work) — town pages
   **launch already redesigned**; no churn of shipping twice.
2. Phase C + G1/G2 ship separately after (touches live homepage; small, low-risk commits).
3. Photo provenance: town-specific captions/heroes only after Jamie confirms which towns the
   three new jobs were in.

## Acceptance checks

- P2 rhythm holds on every page (alternating surface/sunken, ≤1 mid ink + ink bookend, never
  two ink adjacent).
- Single H1 per page; every section keeps eyebrow/H2 skeleton (P1).
- Sticky bar never overlaps the cookie banner or covers the closing form (observer-gated).
- CTAs all still fire `phone_click` / `whatsapp_click` / `enquiry_submit`.
- No new claims: no 24/7, no invented locations, prices only where true (£85 new-customer).
- Lighthouse: no CLS from the sticky bar (reserve height), images sized/`priority` correctly.
