# Components

Catalogue extracted from the homepage at commit `5115dce`. Layers: **primitive** (Button, Icon, Text) → **composite** (Card, Field) → **region** (Hero, Footer). Variant values come from the fixed enums; don't invent new ones (see *Governance* in `PATTERNS.md`).

Fixed enums — Intent `primary|secondary|tertiary|ghost|danger|success` · Size `xs|sm|md|lg|xl` · Tone `default|muted|emphasis|inverse` · Shape `default|pill|square` · Width `auto|hug|fill`.

States glossary (document the ones each component has): default · hover · focus-visible · active · disabled · loading · empty · error · selected/current.

---

## Layer-0 spacing primitives

The homepage builds layout from four Tailwind patterns. Treat these as the spacing primitives every composite/region uses — **no literal margin/padding in composites; always a space token.**

- **Stack** — vertical flow. Implementation: `flex flex-col gap-{n}` or sequential `mt-{n}`. Canonical gaps: card-internal `gap-4`, content rhythm `mt-2/3/4/5/6/7/8`.
- **Inline** — horizontal, wraps. `flex flex-wrap items-center gap-{2|3}`. Used by button rows, trust-point rows, area-chip rows.
- **Cluster** — Inline with explicit justification. `flex items-center justify-between` (header nav, footer legal bar, featured banner).
- **Grid** — `grid gap-5 sm:grid-cols-2 lg:grid-cols-{3|4}` for card grids; two-column section grids use `md:grid-cols-[44fr_56fr]` (**fr, never %** — percent + gap overflows).

**Layer:** primitive · **Status:** stable · **Source:** inline Tailwind throughout `src/components/home/*`.
**A11y:** none (layout only). **SEO:** landmark NONE (inherits parent), heading NONE.
**Do:** use `fr` columns for two-up sections · stretch equal cards with `items-stretch`/`h-full`. **Don't:** use `%` columns with a `gap` · set margins that leak outside a child's box.

---

## Button

**Purpose** — the single call-to-action primitive (call, WhatsApp, learn-more links rendered as buttons).
**Layer** — primitive · **Status** — stable · **Source** — `src/components/ui/Button.tsx`.

### Anatomy
`[ optional leading icon ] [ label ]` inside a pill. WhatsApp variant auto-prepends `WhatsAppGlyph`.

### Props / API
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `href` | string | — | yes | Internal (`/x`) → `next/link`; `http`/`tel:`/`mailto:` → `<a target rel>` |
| `variant` | `primary\|secondary\|whatsapp\|ghost\|ghostInverse` | `primary` | no | Visual intent |
| `external` | boolean | — | no | Force new-tab anchor |
| `className` | string | `""` | no | Extra classes |
| `aria-label` | string | — | no | Required for icon-led/ambiguous labels |

### Variants (maps to enum)
- `primary` (Intent primary) — `bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-md active:translate-y-px`
- `secondary` (Intent secondary) — `bg-surface text-ink border border-border-strong hover:border-primary hover:text-primary`
- `whatsapp` (Intent success) — `bg-whatsapp text-white hover:bg-whatsapp-hover` + leading glyph
- `ghost` (Intent ghost) — `text-primary hover:underline`, link-like
- `ghostInverse` (Tone inverse) — `bg-white/10 text-inverse border-white/25 hover:bg-white/20` (on ink)

All: `rounded-pill px-5 py-3 text-base font-semibold min-h-[44px] transition-all duration-200`.

### States
default · hover (bg/shadow shift) · focus-visible (2px primary-hover ring, global) · active (`translate-y-px`) · disabled *(not implemented — add `disabled:opacity-60 disabled:pointer-events-none` if needed)* · loading/empty/error N/A.

### Slots
`children` (label + optional icon).

### Accessibility
Role link (anchor). Keyboard: Enter activates. Icon-only/ambiguous → `aria-label` (e.g. Call button passes the number). Touch target ≥44px (`min-h-[44px]`). Contrast: white-on-primary, white-on-whatsapp — see `ACCESSIBILITY.md` table.

### SEO contribution
Schema NONE · Landmark inherits parent · Heading NONE · Metadata none · Answer-first N/A.

### Do / Don't
✅ Use `primary` for the page's main action; `whatsapp`/`tel:` for contact — *real contact methods.*
✅ Pair Call + WhatsApp as an Inline cluster — *the homepage CTA convention.*
✅ `aria-label` on the Call button with the number — *icon+number needs a clear name.*
❌ Don't use more than one `primary` per view region — *dilutes hierarchy.*
❌ Don't put a Button inside a Button — *forbidden nesting.*
❌ Don't write "Learn more" as a primary CTA — *banned verb (see VOICE).*

### Real example
Hero (`Hero.tsx`) Call + WhatsApp; ServiceArea CTA box; ContactSection.

---

## Icon

**Purpose** — iconography.
**Layer** — primitive · **Status** — stable · **Source** — `lucide-react` + `src/components/ui/icons.tsx`.

- **System:** lucide-react only. **Brand glyphs (custom, justified ≤5%):** `WhatsAppGlyph`, `GoogleG`, `InstagramGlyph` — multi-colour brand marks lucide doesn't provide.
- **Sizes:** `--icon-xs 14 / sm 16 / md 20 / lg 24` (`h-3.5/4/5/6`). Logo flame uses `strokeWidth={2.2}`.
- **Icon square pattern:** `grid place-items-center rounded-[var(--radius-md)]` + bg (`sunken` light / `white/10` on ink) + icon `text-primary` (light) or `text-flame` (ink).

**A11y:** decorative icons `aria-hidden`; icon-only controls need `aria-label`. Brand glyphs have `aria-hidden` (text label adjacent). **SEO:** none. **Do:** import from lucide · keep one size token per context. **Don't:** add a second icon library · use emoji as icons.

---

## Eyebrow

**Purpose** — the small uppercase section label above every H2.
**Layer** — primitive · **Status** — stable · **Source** — `.eyebrow` in `globals.css`.
`font-body 0.8125rem/600 uppercase, letter-spacing .08em, color primary`. On ink panels override with `!text-flame`.
**A11y:** it's a `<p>`, **not** a heading — must precede the real H2, never replace it. **SEO:** Heading NONE (decorative label). **Do:** one per section, directly above the H2. **Don't:** make it an `<h*>` · use it twice in one section.

---

## Reveal

**Purpose** — scroll-in entrance wrapper (fade + rise).
**Layer** — primitive (motion utility) · **Status** — stable · **Source** — `src/components/ui/Reveal.tsx`.

### Props / API
| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `div\|li\|section\|ol\|ul` | `div` | Element rendered |
| `delay` | number | `0` | Stagger seconds |
| `className` | string | `""` | Passthrough |

Behaviour: `initial {opacity:0, y:16}` → `whileInView {opacity:1, y:0}`, `viewport {once:true, amount:0.15}`, `duration 0.5, ease [0,0,0.2,1]`. Reduced-motion: drops the `y` (fade only).

### A11y / SEO
No role; purely visual. Honours `prefers-reduced-motion` internally. SEO none. **Do:** wrap each section's content once; stagger card lists with `delay={i*0.06}`. **Don't:** wrap below-the-fold-critical text such that it's invisible if JS fails (it animates from opacity 0 — acceptable for marketing, not for the only copy a crawler needs; SSR still renders the text in DOM).

---

## IconSquare / Pill / Chip / Badge (primitives)

- **IconSquare** — `grid h-10/12 w-10/12 place-items-center rounded-[var(--radius-md)] bg-{sunken|ink|white/10}` holding a `lg` icon. Used in every service card, how-it-works card, footer brand, logo.
- **Pill / Chip** — `rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-1.5 text-sm font-medium`, hover `border-primary text-primary`. Used by **AreaChip** (area links, with leading `MapPin` xs) and nav items.
- **Badge** — `inline-flex items-center rounded-pill px-3/4 py-1/1.5 text-xs/sm font-bold`. Variants: `bg-flame text-ink` (the "New customers from £75" offer badge — **ink text, not white**, for AA on flame), `bg-surface/90 backdrop-blur shadow-sm` (map "Based in Burgess Hill" overlay chip).

**Layer** primitive · **Status** stable · **A11y** chips that link are anchors (Enter activates); badges are non-interactive text. **SEO** none. **Do** keep one accent (`flame`) for offer badges. **Don't** stack >1 badge per card.

---

## TrustPoint / RatingBlock (composites)

- **TrustPoint** — `<li class="flex items-center gap-2.5 text-sm font-medium text-text">` + xs/sm icon `text-primary` (or `text-flame` on ink) + label. Grouped in a `Grid`/`Inline`. Used in Hero ("All makes…"), Meet Jamie, Service area, Contact.
- **RatingBlock** — "EXCELLENT ★★★★★ Based on N reviews · Google". Stars = 5× `Star` `fill-gas-safe text-gas-safe`. Source: `Reviews.tsx` left column + the compact hero pill variant.

**Layer** composite · **Status** stable · **A11y** stars `aria-hidden`; provide `sr-only` "Rated 5 out of 5". Rating pill is a link to `/reviews` with `aria-label`. **SEO** RatingBlock visible rating mirrors the `aggregateRating` in `SiteJsonLd` (do not emit a second one). **Do** use real numbers from `SITE.rating`. **Don't** fabricate counts.

---

## Card (service) + FeatureBanner (composites)

**Purpose** — the service/offer card. Two forms share styling: standard light card + the ink "featured" treatment.
**Layer** — composite · **Status** — stable · **Source** — `src/components/home/Services.tsx`.

### Anatomy (standard)
`[ IconSquare(lg, bg-sunken, text-primary) ] → [ H3 title ] → [ blurb (flex-1) ] → [ "Learn more →" ghost link ]`, in a `flex flex-col h-full rounded-lg border border-border-subtle bg-surface p-6`, hover `-translate-y-0.5 border-primary shadow-md`.

### Variants
- `standard` — light card (above).
- `featured` (Tone emphasis) — `bg-ink text-inverse`, IconSquare `bg-white/10 text-flame`, optional flame Badge ("New customers from £75"), `Learn more` in `text-inverse`. Becomes a **wide banner** only at `lg` (`lg:flex-row lg:items-center lg:justify-between lg:col-span-3`); stacked card below `lg`.

### States
default · hover (lift + shadow + border-primary) · focus-visible (link ring) · others N/A.

### Accessibility
Whole card is a single `<Link>` (one clickable target). H3 inside. Icon `aria-hidden`. **SEO:** Schema — when used as a Services list on the Services hub, the parent list maps to `Service`/`OfferCatalog` (see `seo/07-schema.md`); the card itself emits NONE. Landmark inherits. Heading **H3**. Answer-first N/A.

### Do / Don't
✅ One featured card max per grid · ✅ keep icon→title→blurb→link order across all four · ✅ `h-full` for equal heights.
❌ Don't mix the wide-banner layout below `lg` · ❌ don't give two cards the ink treatment · ❌ don't drop the "Learn more" affordance.

### Real example
`Services.tsx` — "What I can help with" (1 featured + 3 standard).

---

## ReviewCard + Carousel (composites)

**Purpose** — a Google-style review card in a horizontal, auto-advancing carousel.
**Layer** — composite · **Status** — stable · **Source** — `src/components/home/ReviewsCarousel.tsx`.

Card: avatar initial (coloured circle), name, date, 5 gas-safe stars, `BadgeCheck` (verified), `GoogleG`, `line-clamp-5` quote, "Read more". Carousel: `flex snap-x gap-5 overflow-x-auto`, responsive basis (`basis-[85%] sm:[1/2] lg:[1/3]` → exactly 3 full on desktop), autoplay 4s (pause on hover/focus/touch, respects reduced-motion), prev/next arrow buttons.

### Accessibility
Arrows are `<button aria-label="Previous/Next reviews">`. Autoplay pauses on interaction & under `prefers-reduced-motion`. Stars `aria-hidden` + `sr-only` rating. **SEO:** content mirrors `aggregateRating`; no per-card Review schema (self-serving review markup was intentionally removed — see `seo/07-schema.md`). Heading NONE (figures). **Do** use real reviews from `SITE.REVIEWS`/Google Places. **Don't** invent reviews or auto-scroll without pause controls.

---

## AccordionItem (FAQ)

**Purpose** — expand/collapse Q&A.
**Layer** — composite · **Status** — stable · **Source** — `src/components/home/Faq.tsx`.
`<dt><button aria-expanded></button></dt>` + `<dd>` grid-rows transition (`grid-rows-[0fr]`→`[1fr]`), chevron rotates. **Default state: all collapsed** (`useState(null)`).

### States
default (collapsed) · hover (`text-primary`) · focus-visible · **selected/current** (expanded — `aria-expanded=true`, chevron rotated).

### Accessibility
`aria-expanded` on the trigger; content in `<dd>`. Keyboard: Enter/Space toggle. **SEO:** the page wraps these in **`FAQPage`** JSON-LD (see `Faq` region + `seo/07-schema.md`); visible Q/A must match the schema text. Heading: questions are `<span>` inside buttons (not headings) — acceptable for an accordion; the section H2 covers the outline. **Do** keep schema ↔ visible text in sync · start collapsed. **Don't** auto-open the first item.

---

## FormField + PhotoUpload + multi-step EnquiryForm (composites)

**Purpose** — enquiry capture.
**Layer** — composite · **Status** — stable · **Source** — `src/components/home/HomeEnquiryForm.tsx` (3-step) + `src/components/contact/ContactForm.tsx` (single-page).

- **FormField** — `<label class="block text-sm font-semibold text-ink">` + input `mt-1.5 w-full rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 py-2.5 text-base focus:border-primary`. Error text `text-sm text-[#DC2626]` + `aria-invalid` + `aria-describedby`.
- **PhotoUpload** — dashed `border-2 border-dashed` dropzone → preview card with remove button; client-side type/size validation (image, ≤10MB).
- **EnquiryForm (stepped)** — progress bar + "Step n of 3"; step 1 service picker cards (auto-advance), step 2 postcode/message/photo, step 3 name/phone/email/consent. Honeypot `company` field. Posts `FormData` → `/api/contact`. Jumps to the step owning a server error. Success state replaces the form.

### States
default · focus-visible (border-primary) · error (red text + `aria-invalid`) · loading ("Sending…", disabled submit) · success (confirmation card).

### Accessibility
Every input has a `<label>`. Errors associated via `aria-describedby`. Required marked; consent checkbox required. Submit ≥44px. Honeypot visually hidden (`absolute left-[-9999px]`), not `display:none`, so it doesn't trap focus oddly. **SEO:** Landmark inherits `<main>`; no schema. **Do** validate per step before advancing · keep labels visible. **Don't** use placeholder-as-label · block submit without explaining the error.

---

## TopBar (offer strip)

**Purpose** — sticky promotional strip above the header.
**Layer** — region · **Status** — stable · **Source** — `src/components/layout/TopBar.tsx`.
Full-width `bg-ink text-inverse` link → `/contact?service=servicing`. Content centred: `Sparkles` (flame) + "New customer offer: first boiler service from **£75**" + "Book now →". `£75`/Book-now in `text-flame`. The whole strip is one `<Link>`.
**A11y:** single link with descriptive `aria-label`; ≥44px effective height via padding. **SEO:** Landmark NONE (chrome), Heading NONE. **Do** keep it one line/one link. **Don't** add a dismiss countdown (banned — see ACCESSIBILITY forbidden patterns).

---

## SiteHeader (+ Logo, MobileMenu)

**Purpose** — primary navigation chrome.
**Layer** — region · **Status** — stable · **Source** — `src/components/layout/SiteHeader.tsx`.
- **Logo:** ink IconSquare + flame `Flame` + "JDH **Gas**" (Gas in primary). Links home.
- Desktop (`lg`): nav pills + Call + WhatsApp buttons. **Active pill:** `bg-sunken text-primary`, `aria-current="page"`. Active = exact `/` or `pathname.startsWith(href)`.
- Scrolled (`scrollY>24`): adds `bg-surface/95 backdrop-blur border-b shadow-sm`.
- Mobile (`<lg`): hamburger → full-screen `bg-ink/95` dialog (`role="dialog" aria-modal`), nav links with active flame dot, Call/WhatsApp. Body scroll locked when open.

### States
nav item: default · hover (`bg-sunken text-primary`) · **current** (`aria-current`, persistent active pill).

### Accessibility
`<nav aria-label="Primary">`. Mobile menu: `role="dialog" aria-modal="true"`, open/close buttons labelled, focusable; **add Escape-to-close + focus trap** (see ACCESSIBILITY — current code locks scroll & has close button; Escape/trap is the one a11y gap to close in the redesign). `aria-current="page"` on the active route. **SEO:** Landmark `<header>` (banner) + `<nav>`. Heading NONE. **Do** mark the current page · keep the logo linking home. **Don't** rely on colour alone for "current" (we also set `aria-current` + a dot).

---

## SiteFooter

**Purpose** — site-wide footer (brand + contact, SEO links, legal).
**Layer** — region · **Status** — stable · **Source** — `src/components/layout/SiteFooter.tsx`.
Three bands on `bg-ink-soft text-inverse` (one step lighter than the ink CTA above): (1) brand + one-line description + Gas Safe no. + Call/email + WhatsApp/Instagram circles; (2) compact inline link clusters (Services · Areas · pages) via `LinkRow`; (3) slim legal bar (© + Privacy/Terms). `border-t border-white/10`.
**A11y:** `<footer role="contentinfo">`, `<nav aria-label="Footer">`; link hover `text-flame`. **SEO:** Landmark `<footer>` (contentinfo); crawlable internal links to every service/area/page. Heading NONE (uses bold spans, not headings — acceptable for footer). **Do** keep it lighter than the section above (ink-soft). **Don't** rebuild the corporate 4-column mega-footer (intentionally replaced).

---

## Region sections (Hero, ServicesSection, ReviewsSection, HowItWorks, LogoStrip, MeetJamie, ServiceArea+CoverageMap, Faq, ContactSection)

These are page-level regions. Each follows the same skeleton — **eyebrow → H2 → content** inside `.section` + `.container-page`, wrapped in `Reveal`. Reusable shapes are abstracted in `PATTERNS.md`. Per-region summary:

| Region | Source | Landmark | Heading | Bg | Notable |
|---|---|---|---|---|---|
| **Hero** | `Hero.tsx` | `<section>` | **H1** | sunken | full-bleed image on `lg` (absolute, `54vw`); overlap copy card on mobile; eyebrow above image on mobile only |
| **ServicesSection** | `Services.tsx` | `<section>` | H2 | surface | Card grid (featured + 3); 2×2 equal at tablet |
| **ReviewsSection** | `Reviews.tsx` | `<section>` | H2 | sunken | RatingBlock + Carousel; async (Google Places) |
| **HowItWorks** | `WhyChoose.tsx` | `<section>` | H2 | surface | **Tier-3 signature**: scroll-linked progress rail (desktop) + per-card fill circles (mobile) |
| **LogoStrip** | `LogoStrip.tsx` | `<section>` | H2 | ink | brand-logo wall, mono-white (`brightness-0 invert`), radial glow |
| **MeetJamie** | `MeetJamie.tsx` | `<section>` | H2 | sunken | portrait + bio + pull-quote + TrustPoints; heading above image on mobile |
| **ServiceArea** | `ServiceArea.tsx` | `<section>` | H2 | surface | text / **CoverageMap** / CTA box; per-breakpoint box placement |
| **CoverageMap** | `CoverageMap.tsx` | `aria-label`'d `<div>` | NONE | — | Leaflet + Carto Voyager tiles, branded pins + coverage ring; `isolation:isolate z-0`; client-only |
| **Faq** | `Faq.tsx` | `<section>` | H2 | sunken | AccordionItems + `FAQPage` schema |
| **ContactSection** | `ContactSection.tsx` | `<section>` | H2 | ink | ink panel: copy + Call/WhatsApp + TrustPoints (left), white form card (right) |

Each region: **A11y** one H2 (Hero one H1), section landmark, content in `Reveal`. **SEO** as per table; `FAQPage` (Faq) and `aggregateRating` (Reviews/SiteJsonLd) are the only homepage schema emitters. **Variants & recipes** → `PATTERNS.md`. **Do** keep one H1 per page (only the page hero) · alternate backgrounds per `PATTERNS.md`. **Don't** add a second full-ink section adjacent to another (rhythm rule).

> **CoverageMap custom-icon/dep justification:** Leaflet + Carto tiles are a bespoke region used only where a coverage map is needed (homepage Service Area, area pages). It is the one external-tile dependency; documented here as an allowed exception. Must keep `isolation:isolate` so its z-indexes don't escape under the sticky header.
