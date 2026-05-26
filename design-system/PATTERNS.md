# Patterns

Composition recipes extracted from the homepage (`5115dce`). Build pages by assembling these — don't invent new section shells.

## P1 — Section skeleton (every content section)
```
<section class="section bg-{surface|sunken|ink}" aria-labelledby="x-h">
  <Reveal class="container-page …">
    <p class="eyebrow">LABEL</p>
    <h2 id="x-h" class="mt-2 font-display text-3xl font-bold md:text-4xl">Heading</h2>
    <p class="mt-4 max-w-xl text-lg text-muted">Lead…</p>
    … content …
  </Reveal>
</section>
```
- `.section` = responsive vertical padding (48/80/96px). `.container-page` = 1200 max, gutter.
- Wrap content in `Reveal` (one per section; stagger child lists).
- Exactly one H2 per section (Hero is the only H1).
- **Example:** every homepage section.

## P2 — Section rhythm (background alternation)
Alternate backgrounds to create cadence; **never two full-ink sections adjacent**, and the ink CTA + ink-soft footer are the dark "bookends".
Homepage order (reuse as the template): `Hero(sunken) → Services(surface) → Reviews(sunken) → HowItWorks(surface) → LogoStrip(ink) → MeetJamie(sunken) → ServiceArea(surface) → Faq(sunken) → Contact(ink) → Footer(ink-soft)`.
Rule of thumb: surface ↔ sunken alternation, with at most one ink "moment" mid-page (logo wall) plus the closing ink CTA.

## P3 — Two-column split
`grid items-{start|center} gap-10 md:grid-cols-[44fr_56fr] lg:gap-14`.
- **fr units only** (percent + gap overflows the container — a fixed bug; see TOKENS → Layout).
- Top-align (`items-start`) when both columns have stacked content of different heights; centre (`items-center` / `lg:items-center`) when one column is a single media block.
- Per-breakpoint element placement (e.g. a box that's left on desktop, right on tablet) → render it twice with `hidden lg:block` / `lg:hidden` via a shared sub-component (see ServiceArea). Don't fight grid auto-flow.
- **Examples:** Hero, Meet Jamie, Service area, Contact.

## P4 — Card grid (+ optional featured)
`grid gap-5 sm:grid-cols-2 lg:grid-cols-{3|4}`; equal heights via `h-full` + `items-stretch`.
- Optional **featured** card: ink treatment, spans full width as a banner **only at `lg`** (`lg:col-span-{3}` + `lg:flex-row`); at tablet it's a normal grid cell keeping its stacked design.
- **Example:** Services.

## P5 — Page hero (interior pages)
The homepage Hero is the *home* variant. Interior pages use a lighter **PageHero**: `section bg-sunken border-b border-border-subtle` → `container-page py-12 md:py-16` → eyebrow + **H1** + one lead paragraph + (optional) breadcrumb + (optional) primary CTA. No full-bleed image required; an interior hero can be text-only or text + supporting image using P3. Keep the single-H1 rule.
- Derive styling from `Hero.tsx` (eyebrow, H1 scale, lead, CTA cluster) minus the full-bleed image machinery.

## P6 — Ink CTA panel (closing call-to-action)
The `ContactSection` shape, reusable as any page's closing CTA: `section bg-ink text-inverse` → two-column → left: flame eyebrow + H2 + reassurance + Call/WhatsApp + TrustPoints; right: white card (form **or** a key message/booking block).
- Lighter variant: centred single-column ink band with H2 + Call/WhatsApp (the old CtaBand shape, still in repo at `CtaBand.tsx` if a form isn't wanted).
- **Example:** ContactSection.

## P7 — Trust row
`Inline`/`Grid` of **TrustPoint**s (icon + short claim). 3–4 items. Light sections: icon `text-primary`; ink sections: icon `text-flame`. Claims must be true & non-duplicative across adjacent sections.
- **Examples:** Hero, Meet Jamie, Service area, Contact.

## P8 — Media + aside (map / image with supporting content)
Two-column (P3): one column a framed media card (`rounded-lg border bg-sunken p-3 shadow-sm`, optional overlay chip), the other column text + CTA. Map cards must use `isolation:isolate z-0`.
- **Example:** Service area (CoverageMap + text + CTA box).

## P9 — Logo / proof wall
`section bg-ink` + radial glow + centred eyebrow/H2 + wrapped logo row (`flex flex-wrap justify-center gap-x-14 gap-y-9`), logos mono-white via `brightness-0 invert opacity-70 hover:opacity-100`.
- **Example:** LogoStrip.

---

## Layer taxonomy
- **Primitive:** Button, Icon, Eyebrow, Reveal, IconSquare, Pill/Chip, Badge, Stack/Inline/Cluster/Grid.
- **Composite:** Card/FeatureBanner, ReviewCard, RatingBlock, TrustPoint, AccordionItem, FormField/PhotoUpload, AreaChip.
- **Region:** TopBar, SiteHeader, SiteFooter, Hero/PageHero, all `*Section`s, CoverageMap, EnquiryForm.
A component that doesn't fit is a smell — resolve before shipping.

## Nesting rules
- Primitives compose into composites; composites into regions. Regions are not nested in regions.
- **Forbidden:** Button inside Button; a second `<h1>` anywhere; Eyebrow used as a heading element; two ink regions adjacent; `%` grid columns with a gap.
- An interactive Card is a single `<Link>` — no nested interactive elements inside it (except the card *is* the link).

## Spacing ownership
Parent owns spacing **between** children (section gap, grid gap, stack gap). Children never set margins that leak outside their box. All spacing references a token (Tailwind scale) — no literal px.

## Variant budget
Max **5** variants per component. Button is at 5 (`primary/secondary/whatsapp/ghost/ghostInverse`) — adding a 6th requires a governance change or a new component. Card has 2 (`standard/featured`).

---

## Governance
- **Adding a component/pattern:** proposed in a PR that (1) cites the homepage/source precedent or a written justification, (2) adds a `COMPONENTS.md` entry with the full canonical template, (3) respects the variant budget and fixed enums, (4) adds a `CHANGELOG.md` entry. Approver: the design-system owner (currently: project lead).
- **API stability:** props are camelCase; booleans for toggles; string enums for variants; `children`/named slots for content. Breaking a published prop = MAJOR bump + migration note in `CHANGELOG.md`.
- **Versioning (semver):** MAJOR breaking · MINOR new component · PATCH token/variant tweak.
- **Deprecation:** mark `Status: deprecated` with a replacement pointer; keep one MINOR cycle; remove in the next MAJOR.
- **Source of truth:** code (`src/`) is canonical; this folder documents it; any Figma mirrors code. Drift between `globals.css` and `tokens/*` is a bug.
