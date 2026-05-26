# Page blueprints & acceptance criteria

The one-shot kit. Each page below lists: **purpose · section stack (patterns/components) · H1 · schema · acceptance gate.** Build only from `COMPONENTS.md` + `PATTERNS.md`; copy follows `VOICE.md`; structure follows `ACCESSIBILITY.md`.

**Universal rules (every page):**
- Wrapped by the shared chrome: `TopBar` + `SiteHeader` (sticky) + `<main id="main">` + `SiteFooter` (already in `layout.tsx`).
- Exactly **one H1**, in the page hero (P5). Section heads are H2; sub-sections H3; no skipped levels.
- Every page exports its own `metadata` (title ≤60, description ≤160, `alternates.canonical`). Sub-pages override the layout default.
- Section rhythm per **P2**; close with an ink CTA (**P6**) unless the page is legal/utility.
- All sections wrapped in `Reveal`; motion per `MOTION.md`; a11y per `ACCESSIBILITY.md`.
- `BreadcrumbList` JSON-LD on every non-home page (Home › Section › Page).

---

## /services — Services hub
**Purpose:** overview of the four services, route to each detail page + contact.
**Stack:** PageHero (P5: eyebrow "Services", H1, lead) → Card grid (**P4**, the 4 services as standard cards linking to detail, featured = Boiler servicing with £75 badge) → "How it works" (reuse `HowItWorks` region or a lighter 4-step) → Reviews strip (reuse RatingBlock + a few ReviewCards) → ink CTA (**P6**).
**H1:** e.g. "Gas & heating services in Burgess Hill".
**Schema:** `BreadcrumbList`; the service list maps to `Service`/`OfferCatalog` per `seo/07-schema.md`.
**Acceptance:** ✓ 4 service cards link to `/services/<slug>` ✓ one featured ✓ one H1 ✓ canonical + title/desc ✓ ends on ink CTA ✓ no `%`-grid, no literal hex/px ✓ axe clean.

## /services/[slug] — Service detail (template for all 4)
**Purpose:** convert intent for one service; answer the buyer's questions.
**Stack:** PageHero (eyebrow = service name, H1 = service + location, lead, primary Call/WhatsApp + £75 where relevant; optional supporting image via P3) → "What's included / how I do it" (Stack of points or a small Card grid) → **answer-first** content blocks (H2 question → one-sentence answer → elaboration) for the service's key queries → price/quote note → service-specific FAQ (`AccordionItem`s, collapsed) → "Areas I cover" AreaChip row → ink CTA (**P6**).
**H1:** e.g. "Boiler servicing in Burgess Hill" / "Landlord gas safety certificates (CP12)".
**Schema:** `BreadcrumbList` + `Service` (name, provider→`#business`, areaServed) + `FAQPage` (if FAQ present) per `seo/07-schema.md`.
**Acceptance:** ✓ H1 contains the service + location ✓ answer-first block present for the primary query ✓ FAQ schema matches visible Q/A ✓ internal links to related services + areas ✓ Call/WhatsApp present ✓ canonical/title/desc unique per slug ✓ axe clean.

## /areas — Areas hub
**Purpose:** show coverage, route to town pages.
**Stack:** PageHero (eyebrow "Service area", H1, lead) → **CoverageMap** (P8) + intro/TrustPoints → AreaChip grid of all towns (linked where a page exists) → reassurance ("not sure? just ask") → ink CTA.
**H1:** "Covering Burgess Hill & Mid Sussex".
**Schema:** `BreadcrumbList`; business `areaServed` already in `SiteJsonLd`.
**Acceptance:** ✓ CoverageMap renders with `isolation:isolate` (no header overlap, no horizontal scroll) ✓ all area-page towns linked ✓ one H1 ✓ canonical/title/desc ✓ axe clean.

## /areas/[slug] — Town page (template for all towns)
**Purpose:** local landing page for "gas engineer in <Town>".
**Stack:** PageHero (eyebrow = town, H1 = "Gas engineer in <Town>", lead naming the town + nearby) → services offered in that town (Card grid or list linking to /services/<slug>) → local trust/answer-first ("Do you cover <Town>?" answer-first) → CoverageMap centred-ish on the town (or the shared map) → reviews strip → ink CTA.
**H1:** "Gas engineer in <Town>" (town + role).
**Schema:** `BreadcrumbList` + optionally `Service` with `areaServed: <Town>`.
**Acceptance:** ✓ H1 = role + town ✓ town named naturally in lead + an answer-first block ✓ links to service pages + areas hub ✓ unique canonical/title/desc per town ✓ no duplicated boilerplate flagged as thin ✓ axe clean.

## /about — About Jamie
**Purpose:** trust via the person; expand the "Meet Jamie" story.
**Stack:** PageHero (eyebrow "Meet your engineer", H1 "Meet Jamie", lead) OR reuse the `MeetJamie` two-column shape at full size (portrait + bio) → story / "how I work" (Stack of paragraphs, plain voice) → TrustPoints / credentials (Gas Safe 977838, every make, tidy, on-time) → pull-quote ("Prevention over cure.") → reviews strip → ink CTA.
**H1:** "Meet Jamie" (or "About JDH Gas Services").
**Schema:** `BreadcrumbList` + `Person` (name Jamie Hannah, jobTitle Gas Safe registered engineer, worksFor→`#business`) per `seo/07-schema.md`.
**Acceptance:** ✓ one H1 ✓ portrait with descriptive alt ✓ Person schema ✓ real, specific, plain-voice copy (no em-dash/triad padding) ✓ ends on ink CTA ✓ axe clean.

## /reviews — Reviews
**Purpose:** social proof at scale.
**Stack:** PageHero (eyebrow, H1 "What our customers say", lead with rating) → RatingBlock (EXCELLENT ★★★★★ Based on N · Google) → full grid/list of ReviewCards (real reviews; Google Places where wired) → "leave a review" link to Google → ink CTA.
**H1:** "Reviews" / "What our customers say".
**Schema:** `BreadcrumbList`. **Do NOT** emit per-review `Review`/`aggregateRating` here (self-serving markup intentionally removed; the visible block mirrors `SiteJsonLd`'s `aggregateRating`).
**Acceptance:** ✓ real reviews only (no fabrication) ✓ rating mirrors `SITE.rating` ✓ one H1 ✓ no self-serving review schema ✓ axe clean.

## /gallery — Our work
**Purpose:** show real jobs.
**Stack:** PageHero (eyebrow "Our work", H1, lead) → responsive image **Grid** (P4-style, `rounded-lg`, real job photos from `public/images/work`, descriptive alt each) → optional lightbox (must be keyboard-accessible + Escape; if not, link out) → ink CTA.
**H1:** "Our work" / "Recent jobs".
**Schema:** `BreadcrumbList`; optionally `ImageObject` per image.
**Acceptance:** ✓ every image has specific alt ✓ grid uses tokens, no layout shift (set width/height or aspect) ✓ any lightbox is keyboard+Escape accessible or omitted ✓ one H1 ✓ axe clean.

## /contact — Contact
**Purpose:** capture enquiries (full form) + show all contact methods.
**Stack:** PageHero (eyebrow "Get in touch", H1, lead) → two-column (P3): left = contact methods (Call/WhatsApp/email, hours, Gas Safe, service area), right = **full single-page ContactForm** (with PhotoUpload) → CoverageMap or map note (optional) → no second CTA needed.
**H1:** "Contact JDH Gas" / "Get in touch".
**Schema:** `BreadcrumbList` + `ContactPage`; business contact already in `SiteJsonLd`.
**Acceptance:** ✓ full form posts to `/api/contact` with photo upload ✓ all fields labelled, errors associated ✓ Call/WhatsApp/email present as real links ✓ honeypot retained ✓ one H1 ✓ axe clean.

## /privacy-policy, /terms, /cookie-policy — Legal
**Purpose:** compliance; plain-language.
**Stack:** PageHero (eyebrow "Legal", H1 = doc title, last-updated line) → `.legal` typographic block (H2/H3, paragraphs, lists, links per the `.legal` styles in `globals.css`). No marketing CTA; a quiet "questions? contact" link is fine.
**H1:** the document title.
**Schema:** `BreadcrumbList`. `robots`: indexable (already allow-all).
**Acceptance:** ✓ uses `.legal` styles ✓ one H1, proper H2/H3 outline ✓ readable line length (`max-w-3xl`) ✓ plain voice (plainer than a lawyer draft) ✓ axe clean.

## not-found (404)
**Purpose:** recover lost visitors.
**Stack:** centred block on `bg-sunken`: H1 "Page not found", one-line plain message, primary "Back to home" + secondary links (Services, Contact) + Call/WhatsApp. Keep the shared header/footer.
**H1:** "Page not found".
**Schema:** none. **Meta:** `robots: noindex`.
**Acceptance:** ✓ one H1 ✓ home + key links + contact present ✓ `noindex` ✓ on-brand, not a default Next 404 ✓ axe clean.

---

## Per-page definition of done (checklist to run before shipping any page)
- [ ] Built only from documented components/patterns; zero new section shells invented
- [ ] One H1 (page hero), correct H2/H3 outline, no skipped levels
- [ ] Own `metadata`: unique title (≤60) + description (≤160) + `alternates.canonical`
- [ ] `BreadcrumbList` JSON-LD; page-appropriate schema per the table above (matches `seo/07-schema.md`)
- [ ] Section rhythm (P2); closes on an ink CTA where applicable
- [ ] Copy passes `VOICE.md` (no em-dashes/triads/banned words; CTA verbs allowed)
- [ ] Motion per `MOTION.md` (Reveal on sections; reduced-motion honoured)
- [ ] a11y per `ACCESSIBILITY.md` (landmarks, focus, contrast, ≥44px targets, labelled controls) — axe-core zero violations
- [ ] No literal hex/px; only tokens; `fr` (not `%`) for grid columns; no horizontal overflow
- [ ] Verified on mobile (375), tablet (768), desktop (1280) — no overlap/overflow
- [ ] Production build green
