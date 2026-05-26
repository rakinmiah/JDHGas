# Phase 5 — Per-Module Specification (Homepage)

_Final copy = ships as written. Wireframes mobile + desktop. Design weight ≥ copy weight. Voice = Jamie stand-in. Tokens referenced from `06-tokens.md`._

## Component budget (declared)
Expected **11 reusable components**: `SiteHeader`, `SiteFooter`, `Button` (variants: primary/secondary/whatsapp/ghost), `TrustBar`, `ServiceCard`, `OfferBand`, `SplitFeature` (Meet Jamie + Service Area), `ValueCard`, `LogoStrip`, `ReviewCard`, `Accordion`/`FaqItem`, `CtaBand`, `GalleryGrid`. Modules compose these; one-offs flagged below.

---
## NAV — `SiteHeader`
**Category citation:** convention — persistent click-to-call is table-stakes for trades; diverges by adding a WhatsApp button (under-used by rivals).
**Purpose:** orient + give an always-available contact path.
**Audience intent:** reach Jamie immediately (phone-first visitor).
**Layout composition:** HORIZONTAL-STRIP, sticky. Logo left; nav centre-right; **Call + WhatsApp** buttons far right. _Rationale (≥50w):_ considered a centred-logo split with nav below (BOXT-style) but a trades visitor's #1 action is to call — so the phone/WhatsApp buttons get the highest-visibility right slot and stay pinned on scroll; logo stays left for F-pattern scanning. Ceiling borrow: Linear's slim, quiet sticky header (low height, no shadow until scroll). Proportion: 64px tall desktop / 56px mobile; buttons are the only filled elements. Sleekness: transparent over hero, gains a subtle hairline border + bg on scroll — ≤2 containers.
**Signature tag:** NONE.
**Desktop wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│ [▲ JDH Gas]   Services  Areas  About  Reviews   [Call ▸][WhatsApp]│
└──────────────────────────────────────────────────────────────┘
```
**Mobile wireframe:**
```
┌───────────────────────────┐
│ [▲ JDH]      [Call][≡]     │   ≡ opens drawer: Services/Areas/About/Reviews/Contact + Call + WhatsApp
└───────────────────────────┘
```
**Final copy:** Nav: `Services` `Areas` `About` `Reviews` `Contact`. Buttons: `Call 07544 063330` (tel:+447544063330) · `WhatsApp` (https://wa.me/447544063330). Skip link: `Skip to content`.
**Assets:** logo `logo.svg` (shield+wordmark) alt "JDH Gas Services" — focal centre — EXISTS (derive SVG from logo image) — STATUS: TO_CREATE (vectorise).
**States:** default (transparent on hero); scrolled (bg `--color-surface` + `--shadow-sm` + hairline); link hover (underline grow, `--color-text-link-hover`); focus-visible (2px `--color-focus-ring`); active link (ink, bold); drawer open (overlay `--z-overlay`, body scroll-lock); disabled n/a; loading n/a. Touch targets ≥44px.
**Motion:** header bg/shadow fade on scroll past 24px — 160ms `--ease-standard`. Drawer slide-in 240ms `--ease-out`. Reduced-motion: instant, no slide.
**A11y:** `<header role="banner">`, `<nav aria-label="Primary">`, drawer = focus-trapped dialog with `aria-expanded`, ESC closes. Tel/WhatsApp links have descriptive `aria-label` ("Call JDH Gas on 07544 063330").
**SEO/schema:** NONE (nav). Phone here must match NAP exactly.
**Design-system role:** REUSABLE — `SiteHeader` (props: transparentOnHero bool).

---
## MODULE 1 — Hero  `(SPLIT-OFFSET · BREATHABLE)`
**Category citation:** honours hero-with-CTA+Gas-Safe convention; breaks the faceless cliché — names Jamie + £75 in view.
**Purpose:** in 5 seconds answer who/what/where + give the trust + action.
**Audience intent:** "is this a real, safe, local gas engineer I can call now?"
**Layout composition:** SPLIT-OFFSET 42/58 — copy left, **Jamie portrait** full-bleed right, bleeding off the top/right edge, ink gradient behind copy. _Rationale (≥50w):_ considered CENTERED-FOCAL with the portrait as a single hero object (BOXT-style text-over-photo) — rejected because the copy (name, services, £75, two CTAs) needs a calm reading column that text-over-photo would fight. The 42/58 offset gives the human face dominant visual weight (the trust driver) while protecting copy legibility — the contrarian "meet the engineer" thesis starts in the hero, not just the About section. Ceiling borrow: Airbnb's human-led hero warmth + Linear's restrained copy column. Proportion: full-viewport-height minus header on desktop (min 600px), portrait focal point pinned to Jamie's face (45%,38%) so it survives the crop. Sleekness: 2 containers (copy panel + image); one accent (electric blue CTA); generous left padding.
**Signature tag:** NONE (signature is Module 5).
**Desktop wireframe:**
```
┌───────────────────────────────────────────────┐
│ Gas Safe registered · Burgess Hill & Mid Sussex │   [   Jamie     ]
│                                                 │   [  portrait,  ]
│ Your local gas engineer in                      │   [ full-bleed, ]
│ Burgess Hill — boiler servicing,                │   [ face top-r  ]
│ repairs & gas safety.                           │   [            ]
│                                                 │   [ ★ 5.0 (24)  ]  ← floating chip
│ I'm Jamie Hannah, Gas Safe registered. Honest,  │   [ Gas Safe ✓  ]
│ thorough work on every make of boiler.          │
│ [ Call 07544 063330 ] [ WhatsApp ]              │
│ New customer? First boiler service from £75 →   │
└───────────────────────────────────────────────┘
```
**Mobile wireframe:**
```
┌───────────────────────────┐
│ [ Jamie portrait, 4:5 ]    │
│  ★5.0(24)   Gas Safe ✓     │
├───────────────────────────┤
│ Gas Safe · Burgess Hill    │
│ Your local gas engineer    │
│ in Burgess Hill — servicing,│
│ repairs & gas safety.      │
│ I'm Jamie Hannah…          │
│ [ Call 07544 063330 ]      │
│ [ WhatsApp ]               │
│ First service from £75 →   │
└───────────────────────────┘
```
**Final copy:**
- Eyebrow: `Gas Safe registered · Burgess Hill & Mid Sussex`
- Headline: `Your local gas engineer in Burgess Hill — boiler servicing, repairs & gas safety.`
- Subheadline: `I'm Jamie Hannah, a Gas Safe registered engineer. Honest, thorough work on every make of boiler — done properly the first time.`
- Primary CTA: `Call 07544 063330` → `tel:+447544063330` (form-submit n/a; initiates call)
- Secondary CTA: `WhatsApp` → `https://wa.me/447544063330` (new tab)
- Tertiary link: `New customer? First boiler service from £75 →` → `/services/boiler-servicing` (same tab, scroll to offer)
- Floating chips: `★ 5.0 from 24 Google reviews` · `Gas Safe Registered · 977838`
- Microcopy: none.
- Handles objection: safe/legit, covers area, cost.
**Assets:**
- Role hero / photograph / `hero-jamie.avif` (from `Imagery/…08 (2).jpeg`, **request full-res original**) — "Jamie Hannah, Gas Safe registered engineer, beside a serviced boiler in Burgess Hill" — focal 45%,38% — art direction: desktop right-crop portrait `hero-jamie-desktop.avif`; mobile top 4:5 crop `hero-jamie-mobile.avif` — treatment: subtle ink gradient scrim on copy side for contrast; LQIP dominant-colour blur — sourcing: EXISTING_LIBRARY (optimise) — STATUS: NEEDS_OPTIMISATION (ideally original) — AVIF+WebP, served 720×900 (desktop) / 750×938 (mobile @2x).
**States:** CTAs: default `--color-brand-primary` filled (Call), `--color-surface` + border (WhatsApp w/ brand-green hover); hover (darken 8%, lift `--shadow-sm`); focus-visible (2px ring); active (translateY 1px); disabled n/a; loading n/a; empty/error n/a.
**Motion:** copy block fade-up 400ms `--ease-out` on load (stagger eyebrow→headline→sub→CTAs 60ms); chips fade-in 200ms after. Reduced-motion: all instant.
**A11y:** single **H1** here. Portrait `<img>` with alt above. CTA `aria-label`s explicit. Contrast: eyebrow/sub on scrim ≥4.5:1 (verified in token table).
**Dynamic:** none (static).
**SEO/schema:** primary head `gas engineer burgess hill` in H1; secondary `gas safe registered`, `boiler servicing` in sub + first 100 words; entities Jamie Hannah, Gas Safe 977838, Burgess Hill. Schema: page inherits site-wide HVACBusiness (no per-module schema).
**Design-system role:** ONE-OFF (Hero) using `Button`.

---
## MODULE 2 — Trust strip  `(HORIZONTAL-STRIP · BREATHABLE)`
**Category citation:** honours "surface Gas Safe + rating"; breaks "reviews live only on Google".
**Purpose:** instant credibility hit directly under hero.
**Audience intent:** "are they any good / legit?"
**Layout composition:** HORIZONTAL-STRIP, 4 inline trust items separated by hairline dividers, on `--color-surface-sunken`. _Rationale (≥50w):_ considered folding these into the hero — rejected to keep the hero calm and let the proof get its own quiet band (Stripe's pattern of a dedicated, low-noise proof strip). A thin full-width strip reads as a confident underline to the hero rather than clutter. Proportion: ~88px tall, items evenly distributed, icon+label pairs. Sleekness: no boxes — just icons + text + hairline dividers; 1 container.
**Signature tag:** NONE.
**Desktop wireframe:**
```
┌──────────────────────────────────────────────────────────────┐
│  ✓ Gas Safe 977838 │ ★ 5.0 · 24 reviews │ 📍 Burgess Hill & Mid Sussex │ 🛠 Every make of boiler │
└──────────────────────────────────────────────────────────────┘
```
**Mobile wireframe:** 2×2 grid of the four items.
**Final copy:** `Gas Safe registered · 977838` · `5.0 ★ from 24 Google reviews` · `Covering Burgess Hill & Mid Sussex` · `All makes of boiler serviced`. Microcopy: reviews item links → `/reviews`.
**Assets:** 4 Lucide icons (`shield-check`, `star`, `map-pin`, `wrench`) — decorative `alt=""` — ICON_SYSTEM Lucide — STATUS: EXISTS.
**States:** static; reviews item is a link (hover underline, focus ring). 
**Motion:** fade-in on scroll-into-view 200ms. Reduced-motion: none.
**A11y:** `role="list"`; star rating has visually-hidden "rated 5.0 out of 5". Contrast AA on sunken surface.
**SEO/schema:** reinforces Gas Safe + rating entities; AggregateRating lives in site schema (don't duplicate). 
**Design-system role:** REUSABLE — `TrustBar`.

---
## MODULE 3 — Services  `(GRID-4 · DENSE)`
**Category citation:** must-have service list; breaks thin-list cliché (adds Repairs + Gas Appliances).
**Purpose:** show the four things Jamie does + route to each page.
**Audience intent:** "do they do what I need?"
**Layout composition:** GRID-4 (4 cards desktop / 2×2 tablet / 1-col mobile), each card = icon + title + one line + link. _Rationale (≥50w):_ considered a GRID-3 with appliances demoted — rejected because Repairs is a key SEO/GBP gap to capture and deserves equal billing; four equal cards signal full-service competence. Ceiling borrow: Stripe's product-card grid (even weight, generous padding, hover lift, no heavy borders). Proportion: cards 1:1.1, 24px internal padding, 24px gap. Sleekness: card = surface + radius + hairline, single hover shadow; ≤2 visual layers.
**Signature tag:** NONE.
**Desktop wireframe:**
```
   What I can help with
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ ⚙ icon │ │ 🔧 icon│ │ 📄 icon│ │ 🍳 icon│
│Boiler  │ │Boiler  │ │Gas     │ │Gas hob │
│Service │ │Repairs │ │Safety  │ │& cooker│
│…line   │ │…line   │ │Cert.   │ │fitting │
│Learn → │ │Learn → │ │Learn → │ │Learn → │
└────────┘ └────────┘ └────────┘ └────────┘
```
**Mobile wireframe:** single column, 4 stacked cards.
**Final copy:**
- Section eyebrow: `Services` · Heading: `What I can help with`
- Card 1 `Boiler servicing` — `Thorough annual services to keep your boiler safe, efficient and under warranty.` → `/services/boiler-servicing`
- Card 2 `Boiler repairs` — `Fast, reliable repairs on every major make when your heating or hot water stops.` → `/services/boiler-repairs`
- Card 3 `Gas safety certificates (CP12)` — `Landlord gas safety certificates, done right and on time — homeowners too.` → `/services/gas-safety-certificate`
- Card 4 `Gas hob & cooker fitting` — `Safe installation, removal and testing of gas hobs, cookers and appliances.` → `/services/gas-appliances`
- Card link label: `Learn more →` (each). Handles objection: can-they-fix-mine, what-they-do.
**Assets:** 4 Lucide icons (`flame`, `wrench`, `clipboard-check`, `cooking-pot`) decorative — ICON_SYSTEM Lucide — EXISTS.
**States:** card default (surface + hairline); hover (lift `--shadow-md`, border→`--color-brand-primary` 1px, title→link colour); focus-visible (ring on whole card link); active (translateY 1px); disabled/loading/empty/error n/a. Whole card clickable (≥44px).
**Motion:** stagger fade-up on scroll, 60ms apart, 300ms `--ease-out`. Reduced-motion: none.
**A11y:** H2 "What I can help with"; cards are `<a>` with full-card label; icons `aria-hidden`. 
**SEO/schema:** internal links with descriptive anchors carrying each service's primary term; entities (CP12, boiler service). No per-card schema (Service schema on the destination pages).
**Design-system role:** REUSABLE — `ServiceCard` (props: icon, title, blurb, href).

---
## MODULE 4 — £75 offer band  `(CENTERED-FOCAL · BREATHABLE)`
**Category citation:** differentiator — transparent offer where rivals hide pricing.
**Purpose:** convert price-anxious new customers with the hook.
**Audience intent:** "what will it cost / is there a deal?"
**Layout composition:** CENTERED-FOCAL — single centred statement on a tinted (`--color-surface-sunken` or soft-blue) band, big price, one CTA. _Rationale (≥50w):_ considered a left-aligned SPLIT with a photo — rejected; the offer is a single idea and earns a quiet, centred, high-whitespace moment (a breather between two dense modules). Centring the price as the focal element makes it the scannable hero of the section. Ceiling borrow: Linear's single-statement centred sections. Proportion: max-width 720px centred, generous vertical padding (96px). Sleekness: no card, just type + button on a tint; 1 container.
**Signature tag:** NONE.
**Desktop/mobile wireframe:**
```
            New customer offer
     First boiler service from £75
   A full Gas Safe service for new customers
   across Burgess Hill & Mid Sussex.
            [ Book your service ]
```
**Final copy:**
- Eyebrow: `New customer offer`
- Headline: `Your first boiler service from £75`
- Body: `A full, Gas Safe registered boiler service for new customers across Burgess Hill and Mid Sussex. No call-out charge, no surprises.`
- Primary CTA: `Book your service` → `/contact?service=servicing` (same tab)
- Microcopy: `Prices for repairs and certificates? Just ask for a quote.`
- Handles objection: cost / ripped off.
**Assets:** none (type-led) — optional faint shield watermark `pattern-shield.svg` decorative `alt=""` STATUS: TO_CREATE (optional).
**States:** CTA standard `Button` states. 
**Motion:** price scales 0.98→1 + fade 300ms on scroll-in. Reduced-motion: fade only/none.
**A11y:** H2; price is text (not image). Contrast AA on tint.
**SEO/schema:** entity "boiler service"; the £75 maps to `Offer` schema on the servicing page (not here).
**Design-system role:** REUSABLE — `OfferBand`.

---
## MODULE 5 — Meet Jamie  ⭐SIGNATURE  `(SPLIT-OFFSET reverse · BREATHABLE)`
**Category citation:** the contrarian thesis — no local rival shows the actual engineer; this is the differentiator made visible.
**Purpose:** convert the core fear ("a stranger in my home") into trust by introducing Jamie personally.
**Audience intent:** "who exactly is coming, and can I trust him?"
**Layout composition:** SPLIT-OFFSET reverse (58/42) — **portrait left, overlapping an ink panel**; intro copy right; signature line + Gas Safe badge inline. _Rationale (≥50w):_ considered a plain centered "About" blurb (category default) — rejected because it wastes the single strongest asset (a warm, real portrait) and the single strongest differentiator. Overlapping the portrait into an ink panel creates depth and a deliberate, magazine-like composition no competitor's faceless template has; the ink panel ties to the brand-dark token and sets the signature apart from the white sections around it. Ceiling borrow: Airbnb host-profile warmth + Linear ink-section confidence + Stripe whitespace. Proportion: portrait 4:5 overlapping ~8% onto the ink panel; copy column narrow (≈420px) pinned right. Sleekness: 2 layers (photo + panel), one accent, lots of air.
**Signature tag:** `SIGNATURE` — the portrait's intro copy + signature line **fade/slide up on scroll (Tier-2, 16px translate + opacity, 500ms)**, and "Prevention over cure." is set in display weight as a quiet typographic flourish with the Gas Safe 977838 badge sitting inline beneath. Tied to the HERO differentiator (the named, visible, credentialed engineer). Buildable with Framer Motion `whileInView`.
**Desktop wireframe:**
```
┌──────────────────────────────────────────────┐
│███ ink panel ██████████████████████████████   │
│  ┌────────────┐   Meet Jamie                  │
│  │  Jamie      │   I started JDH Gas Services  │
│  │  portrait   │   to do gas work the way I'd  │
│  │ (overlaps→) │   want it done in my own home.│
│  │            │    Gas Safe registered, fully  │
│  └────────────┘   focused on doing the job     │
│                   properly — not rushing to    │
│                   the next call.               │
│                   “Prevention over cure.”       │
│                   ✓ Gas Safe Registered 977838  │
│                   [ More about me → ]           │
└──────────────────────────────────────────────┘
```
**Mobile wireframe:** portrait (4:5) → ink panel below with copy + signature + badge + link, stacked.
**Final copy:**
- Eyebrow: `Meet your engineer`
- Headline: `Meet Jamie`
- Body: `I started JDH Gas Services to do gas work the way I'd want it done in my own home: carefully, honestly, and explained in clear, everyday terms. I'm Gas Safe registered and I treat every boiler, and every home, like it matters. No rushing to the next job.`
- Signature line: `"Prevention over cure."`
- Badge: `Gas Safe Registered · 977838`
- CTA: `More about me →` → `/about` (same tab)
- Handles objection: safe/legit (the central one).
**Assets:** hero-grade portrait `jamie-portrait.avif` (from `…08 (2).jpeg`, **request original full-res**) — alt "Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services" — focal 45%,40% — same crop desktop/mobile (4:5) — treatment: natural, slight warmth; LQIP blur — EXISTING_LIBRARY/NEEDS_OPTIMISATION — AVIF+WebP 560×700.
**States:** CTA `Button` ghost-on-ink variant (states as standard). Portrait static.
**Motion:** SIGNATURE Tier-2: copy + signature fade/slide-up 500ms `--ease-out` `whileInView` (once); badge fades 200ms after. Reduced-motion: appear instantly, no translate.
**A11y:** H2 "Meet Jamie"; ink panel contrast — body text `--color-text-inverse` on `--color-brand-ink` ≥7:1 (AAA, verified). Portrait alt meaningful.
**Dynamic:** none.
**SEO/schema:** entities Jamie Hannah, Gas Safe 977838; links to /about (Person schema lives there). Reinforces E-E-A-T on the homepage.
**Design-system role:** ONE-OFF (signature) reusing `SplitFeature` shell + `Button`.

---
## MODULE 6 — Why choose / How it works  `(GRID-3 · DENSE)`
**Category citation:** table-stakes "why us", built from Jamie's real values (not generic).
**Purpose:** convert remaining doubt (tidy, thorough, honest, on-time).
**Audience intent:** "will he turn up, do a proper, tidy job, and not rip me off?"
**Layout composition:** GRID-3 value cards (icon + title + line). _Rationale (≥50w):_ considered a long prose "why choose us" list (category default, low-scan) — rejected for a 3-up scannable grid that alternates density against the breathable Meet-Jamie above and the brands strip below. Three is enough to be memorable without padding. Ceiling borrow: Stripe feature-trio restraint. Proportion: equal thirds, 32px padding, icon 24px. Sleekness: borderless cards, icon + 2 lines, generous gap.
**Signature tag:** NONE.
**Desktop wireframe:**
```
        Why people choose JDH Gas
┌──────────┐ ┌──────────┐ ┌──────────┐
│ ✓        │ │ ⏱        │ │ £        │
│Thorough &│ │On time & │ │Honest    │
│Gas Safe  │ │tidy      │ │pricing   │
│…line     │ │…line     │ │…line     │
└──────────┘ └──────────┘ └──────────┘
```
**Mobile wireframe:** single column ×3.
**Final copy:**
- Eyebrow: `Why JDH` · Heading: `Why people choose JDH Gas`
- Card 1 `Thorough & Gas Safe` — `Every job done by the book, by a Gas Safe registered engineer who takes his time.`
- Card 2 `On time & tidy` — `I turn up when I say I will and leave your home exactly as I found it.`
- Card 3 `Honest pricing` — `Clear prices, no call-out surprises — and I'll tell you straight if something can wait.`
- Handles objection: tidy/turn-up, cost.
**Assets:** Lucide `shield-check`, `clock`, `badge-pound-sterling` decorative — Lucide — EXISTS.
**States:** static cards (no hover lift — not links) ; or subtle hover tint. Focus n/a (not interactive).
**Motion:** stagger fade-up 300ms. Reduced-motion none.
**A11y:** H2; `role="list"`; icons hidden.
**SEO/schema:** semantic reinforcement only.
**Design-system role:** REUSABLE — `ValueCard`.

---
## MODULE 7 — Boiler brands  `(HORIZONTAL-STRIP · BREATHABLE)`
**Category citation:** differentiation — "every make" reassurance rivals rarely make explicit.
**Purpose:** answer "can he fix MY boiler?"
**Audience intent:** brand-match reassurance.
**Layout composition:** HORIZONTAL-STRIP of 5 greyscale brand wordmarks + a line. _Rationale (≥50w):_ considered a grid — rejected; a single quiet logo row reads as a confident "all of these" without making a feature of it (it's reassurance, not a hero). Greyscale keeps it from competing with brand colour. Ceiling borrow: Stripe/Linear customer-logo bar (muted, evenly spaced, single line). Proportion: ~64px logo height, even distribution, muted opacity 70%→100% on hover. Sleekness: no boxes, one line of marks.
**Signature tag:** NONE.
**Wireframe (desktop & mobile-wrap):**
```
   I service & repair every major make
   [Worcester] [Vaillant] [Ideal] [Baxi] [Bosch]
```
**Final copy:** Heading: `I service and repair every major make` · sub: `Including Worcester Bosch, Vaillant, Ideal, Baxi and more.` Handles objection: can-they-fix-mine.
**Assets:** 5 brand wordmark SVGs greyscale (`worcester.svg`, `vaillant.svg`, `ideal.svg`, `baxi.svg`, `bosch.svg`) — alt e.g. "Worcester Bosch" — **nominative use** (brands serviced) — LICENSED/brand-asset — STATUS: TO_SOURCE (official wordmarks; confirm Jamie is comfortable / accreditation status for Worcester). If sourcing is a concern, fall back to a plain text list (no logos) — note.
**States:** logos muted default, full-opacity on hover (decorative, non-link). 
**Motion:** fade-in on scroll. Reduced-motion none.
**A11y:** `role="list"`, each logo `alt` = brand name; heading H2.
**SEO/schema:** entities Worcester Bosch, Vaillant, Ideal, Baxi, Bosch (supports servicing/repair pages' brand long-tails).
**Design-system role:** REUSABLE — `LogoStrip`.

---
## MODULE 8 — Reviews  `(GRID-3 · DENSE)`
**Category citation:** must-have social proof; breaks "reviews only on Google".
**Purpose:** prove quality with real, named, local reviews.
**Audience intent:** "are they actually any good?"
**Layout composition:** GRID-3 review cards under a rating header; "see all" link. _Rationale (≥50w):_ considered a single rotating carousel (common anti-pattern) — rejected; carousels hide proof and hurt CWV. A static 3-up shows three real quotes at once, scannable, with name+town for authenticity. Ceiling borrow: Monzo/Stripe testimonial grids (quote, attribution, restraint). Proportion: equal thirds, quote + attribution, 5-star glyph; 24px padding. Sleekness: surface card + hairline, one star colour.
**Signature tag:** NONE.
**Desktop wireframe:**
```
   Rated 5.0 ★ from 24 Google reviews
┌──────────┐ ┌──────────┐ ┌──────────┐
│★★★★★     │ │★★★★★     │ │★★★★★     │
│"quote…"  │ │"quote…"  │ │"quote…"  │
│— James,  │ │— …,      │ │— …,      │
│ Hickstead│ │ Cuckfield│ │ Burgess H│
└──────────┘ └──────────┘ └──────────┘
        [ Read all reviews → ]
```
**Mobile wireframe:** single column ×3 + link.
**Final copy:**
- Eyebrow: `Reviews` · Heading: `Rated 5.0 ★ from 24 Google reviews`
- Review 1 (annual service): `"Outstanding service from JDH! I recently had Jamie round for an annual boiler service and could not fault him — on time, super polite with real professionalism. I won't be going anywhere else."` — `Josh C.` · Google review
- Review 2 (general gas work / tidy): `"We hired Jamie to carry out some gas work for us and he did a fantastic job. He was professional, efficient and even left everything clean and tidy afterwards. Highly recommended!"` — `Max` · Google review (Local Guide)
- Review 3 (boiler/heater replacement): `"Came and replaced my old heater with new ones as well as a few other bits. Reliable and thorough, and made sure the job was done to last. Top quality and reliable work received."` — `Sabir` · Google review
- CTA: `Read all reviews →` → `/reviews`
- Handles objection: are-they-good, tidy/turn-up.
- _All three are REAL, verbatim (Sabir lightly de-typo'd) Google reviews pulled 2026-05-25. Google reviews don't carry a town, so attribution is name + "Google review" (no fabricated locations). The fuller set (24) populates `/reviews`._
**Assets:** star glyph (Lucide `star` filled) decorative. Optional small Google "G" logo (licensed mark). No photos required.
**States:** cards static; "read all" link hover/focus. 
**Motion:** stagger fade-up. Reduced-motion none.
**A11y:** H2; each card `<blockquote>`+`<cite>`; star rating visually-hidden text "5 out of 5".
**SEO/schema:** **Review** schema per displayed review + feeds site `AggregateRating` (5.0/24) — genuine only; keep in sync. Branded query `jdh gas reviews` supported (also /reviews page).
**Design-system role:** REUSABLE — `ReviewCard`.
> **Resolved:** real reviews pulled live from the Google Business Profile (2026-05-25). Reviews module copy = FINAL.

---
## MODULE 9 — Recent work  `(LAYERED · BREATHABLE)`
**Category citation:** differentiation — real job photos (image-pack play); rivals use stock.
**Purpose:** show competence + tidiness through real work.
**Audience intent:** "what does his actual work look like?"
**Layout composition:** LAYERED offset grid (masonry-ish, varied tile sizes, slight overlaps) of real photos. _Rationale (≥50w):_ considered a uniform 3-col grid — rejected; a layered/offset arrangement with one large feature tile breaks the rectangle monotony of the page and signals design confidence (the page's required LAYERED moment), while showcasing the authentic photography that is a genuine asset. Ceiling borrow: editorial/Airbnb gallery offset rhythm. Proportion: one 2×2 feature tile + smaller tiles; consistent gap 12px; rounded corners. Sleekness: images do the work, no captions clutter (alt only), one container.
**Signature tag:** NONE.
**Wireframe:**
```
        Recent work
┌─────────┐┌────┐┌────┐
│ big     ││img ││img │
│ feature │└────┘└────┘
│ (install)│┌────┐┌────┐
└─────────┘│img ││img │
   [ See more on Instagram → ]
```
**Mobile:** 2-col simple grid.
**Final copy:** Eyebrow `Recent work` · Heading `Real jobs, done properly` · CTA `See more on Instagram →` → `https://www.instagram.com/jdhgasservices/` (new tab). Handles objection: competence, tidy.
**Assets:** 5–6 from `Imagery/` (finished Ideal install `09`, analyser shots `(3)/(6)`, Bosch service `08`, hob `49`) — alt each honest+localised ("Finished Ideal Logic boiler installation by JDH Gas in Burgess Hill") — focal per image (from inventory) — treatment: consistent crop/rounded; LQIP — EXISTING (optimise) — AVIF+WebP responsive.
**States:** tiles optional lightbox on click (or static); hover subtle zoom 1.02. Focus ring if interactive.
**Motion:** tiles fade-in stagger on scroll; hover zoom 200ms. Reduced-motion: no zoom/none.
**A11y:** H2; if lightbox, it's a focus-trapped dialog with ESC + alt text; else images with meaningful alt.
**SEO/schema:** `ImageObject` per featured image (image-pack); IG outbound link `rel="noopener"`.
**Design-system role:** REUSABLE — `GalleryGrid`.

---
## MODULE 10 — Service area  `(SPLIT-OFFSET · DENSE)`
**Category citation:** convention — named towns + "not sure? get in touch".
**Purpose:** confirm "he covers my area".
**Audience intent:** geographic fit.
**Layout composition:** SPLIT-OFFSET 55/45 — town list/copy left, static map image right. _Rationale (≥50w):_ considered a full-bleed interactive Google Map embed — rejected for CWV/privacy (heavy third-party JS) and because a static styled map + a clear town list converts better and loads instantly. Offset gives the town list reading priority. Ceiling borrow: clean static-map patterns (no clutter). Proportion: map 45% with rounded corners; town list as chips/columns. Sleekness: one map image + chip list; no heavy UI.
**Signature tag:** NONE.
**Desktop wireframe:**
```
┌───────────────────────────────────────────┐
│ Areas I cover            [   static map    ]│
│ Burgess Hill · Haywards  [  of Mid Sussex  ]│
│ Heath · Hassocks ·       [  with pin       ]│
│ Cuckfield · Ditchling ·  [                 ]│
│ Wivelsfield · Lindfield  [                 ]│
│ Not sure if I cover you? [ WhatsApp me ]    │
└───────────────────────────────────────────┘
```
**Mobile:** map on top, town chips + CTA below.
**Final copy:**
- Eyebrow `Service area` · Heading `Covering Burgess Hill & Mid Sussex`
- Body: `Based in Burgess Hill, I cover the surrounding Mid Sussex towns and villages —` then chips: `Burgess Hill · Haywards Heath · Hassocks · Cuckfield · Ditchling · Wivelsfield · Lindfield · Keymer`
- Microcopy/CTA: `Not sure if I reach you? Just ask —` `WhatsApp me` → `https://wa.me/447544063330`
- Handles objection: do-they-cover-me. Town chips link to `/areas/<town>` (the 4 core ones).
**Assets:** `map-mid-sussex.svg`/static image — alt "Map of JDH Gas service area across Mid Sussex" — STATUS: TO_CREATE (static styled map, no live embed) — AVIF/SVG.
**States:** town chips that link = hover/focus states; CTA standard.
**Motion:** fade-in on scroll. Reduced-motion none.
**A11y:** H2; map `alt` meaningful (or `role=img`); chips are links/lists.
**SEO/schema:** entities = the towns; internal links to town pages with localised anchors; supports `areaServed` (site schema).
**Design-system role:** reuse `SplitFeature`.

---
## MODULE 11 — FAQ  `(STACKED accordion · DENSE)`
**Category citation:** table-stakes + the SEO answer-first/AI-citation play.
**Purpose:** kill remaining objections + win PAA/AI snippets.
**Audience intent:** specific worries (cost, CP12 legality, how to book, frequency).
**Layout composition:** STACKED full-width accordion, single column, generous line length capped ~720px. _Rationale (≥50w):_ considered a 2-col FAQ — rejected; single-column accordion is the most scannable and the cleanest for FAQPage schema + answer-first extraction. Stacked full-width gives the page a calm, text-forward closing rhythm before the CTA. Ceiling borrow: Stripe docs/FAQ clarity (clear type hierarchy, lots of line spacing). Proportion: centred 720px, 16/20px padding per item. Sleekness: hairline dividers only, no boxes.
**Signature tag:** NONE.
**Wireframe:**
```
   Common questions
  ▸ How much is a boiler service?
  ▾ Do I really need an annual service?
     [answer-first paragraph…]
  ▸ What is a CP12 / landlord gas safety certificate?
  ▸ Which areas do you cover?
  ▸ How do I book?
```
**Final copy (answer-first):**
- Eyebrow `FAQ` · Heading `Common questions`
- Q `How much is a boiler service?` A: `A boiler service for new customers starts at £75. It's a full Gas Safe check — for repairs or a gas safety certificate, just call or WhatsApp and I'll give you a clear quote first.`
- Q `Do I really need my boiler serviced every year?` A: `Yes — an annual service is the best way to keep your boiler safe, efficient and within its warranty. A boiler can look fine while faults build up out of sight; a yearly check catches them early. Prevention over cure.`
- Q `What is a CP12 / landlord gas safety certificate?` A: `A CP12 is the Landlord Gas Safety Certificate. By law, landlords must have every gas appliance, pipe and flue in a rented property checked every 12 months by a Gas Safe registered engineer. I provide CP12s across Mid Sussex — homeowners can have a gas safety check too.`
- Q `Which areas do you cover?` A: `I'm based in Burgess Hill and cover Haywards Heath, Hassocks, Cuckfield and the surrounding Mid Sussex villages. Not sure if I reach you? Just ask.`
- Q `How do I book?` A: `Call 07544 063330, WhatsApp, or send a quick message and I'll get back to you. I work Monday to Friday and will always confirm a time that suits you.`
- Handles objection: cost, CP12 legality, area, how-to-reach.
**Assets:** Lucide `chevron-down` (rotates). 
**States:** item collapsed (default) / expanded; hover (row tint); focus-visible (ring on button); `aria-expanded` toggles chevron; disabled n/a.
**Motion:** accordion height + chevron rotate 200ms `--ease-standard`. Reduced-motion: instant toggle.
**A11y:** H2; each question = `<button aria-expanded>` controlling a region; keyboard operable; no skipped headings.
**SEO/schema:** **FAQPage** schema (these exact Q&As, answer-first) + `speakable` on answer leads — the AI-Overview/PAA play from the SEO plan.
**Design-system role:** REUSABLE — `Accordion`/`FaqItem`.

---
## MODULE 12 — Final CTA band  `(FULL-BLEED ink · BREATHABLE)`
**Category citation:** conversion close; honest (no false 24/7).
**Purpose:** last, unmissable prompt to call/WhatsApp.
**Audience intent:** ready to act.
**Layout composition:** FULL-BLEED brand-ink band, centred copy, two CTAs, phone shown. _Rationale (≥50w):_ considered repeating the hero split — rejected; a full-bleed ink band gives a strong visual full-stop and maximal contrast for the final action, distinct from every light section above. Ceiling borrow: Linear's ink CTA bands. Proportion: full-width, 96px padding, centred max-640px. Sleekness: ink bg, white type, two buttons, nothing else.
**Signature tag:** NONE.
**Wireframe:**
```
███████████████████████████████████████
   Ready to book? I'd be glad to help.
   [ Call 07544 063330 ]  [ WhatsApp ]
   Mon–Fri · Burgess Hill & Mid Sussex
███████████████████████████████████████
```
**Final copy:**
- Heading: `Ready to book? I'd be glad to help.`
- Body: `Call or message me for a boiler service, a repair or a gas safety certificate — and I'll get back to you quickly.`
- Primary CTA: `Call 07544 063330` → `tel:+447544063330`
- Secondary CTA: `WhatsApp` → `https://wa.me/447544063330`
- Microcopy: `Monday–Friday · Burgess Hill & Mid Sussex`
- Handles objection: hassle-to-reach.
**Assets:** optional faint shield watermark on ink — decorative. 
**States:** `Button` states (primary inverts to white-on-ink with blue hover; WhatsApp green).
**Motion:** fade-up on scroll 300ms. Reduced-motion none.
**A11y:** H2; contrast white on `--color-brand-ink` ≥7:1 (AAA); CTA aria-labels.
**SEO/schema:** NAP phone matches site; no per-module schema.
**Design-system role:** REUSABLE — `CtaBand`.

---
## FOOTER — `SiteFooter`
**Category citation:** convention — NAP + Gas Safe + legal; required for trust + local consistency.
**Purpose:** contact, navigation, legal, NAP consistency.
**Layout composition:** 4-column (brand/NAP · Services · Areas · Legal/social) on brand-ink, hairline top. _Rationale:_ standard columned footer; ink ties to hero/CTA; keeps NAP identical to GBP. Proportion: 4-col desktop / stacked mobile. Sleekness: muted text, one accent for links.
**Signature tag:** NONE.
**Final copy:**
- Col 1: logo · `JDH Gas Services` · `Gas Safe Registered · 977838` · `Burgess Hill, West Sussex` · `07544 063330` · `info@jdhgas.co.uk` · WhatsApp + Instagram icons.
- Col 2 Services: Boiler Servicing / Boiler Repairs / Gas Safety Certificates / Gas Appliances.
- Col 3 Areas: Burgess Hill / Haywards Heath / Hassocks / Cuckfield.
- Col 4: About / Reviews / Contact · Privacy Policy / Terms / Cookie Policy.
- Bottom line: `© {currentYear} JDH Gas Services. Gas Safe Registered 977838.` (year auto-derived from build).
**Assets:** logo (inverse/white) `logo-inverse.svg` alt "JDH Gas Services"; Lucide `phone`,`mail`,`message-circle`,`instagram`.
**States:** link hover/focus (underline, ring). 
**Motion:** none.
**A11y:** `<footer role="contentinfo">`; nav landmarks labelled; icons have labels.
**SEO/schema:** NAP must exactly match GBP + HVACBusiness schema; IG in `sameAs`. No footer keyword dump.
**Design-system role:** REUSABLE — `SiteFooter`.
```
