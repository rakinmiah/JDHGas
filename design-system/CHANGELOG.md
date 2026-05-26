# Changelog

All notable changes to the JDH Gas design system. Semver: MAJOR breaking · MINOR new component · PATCH token/variant tweak.

## [Unreleased]
- Nothing yet.

## [1.0.1] — 2026-05-26
### Fixed
- **Badge (flame variant)** — text white → **ink** so the "New customers from £75" badge passes AA on flame (≈6.5:1, was ≈2.6:1).
- **WhatsApp token** — `--color-whatsapp` darkened `#25d366` → `#127c3f` (hover `#1eb759` → `#0e6a34`) so white logo/text passes AA (≈5.3:1, was ≈1.8:1). White logo retained.
- **SiteHeader mobile menu** — added Escape-to-close, focus-on-open, Tab focus-trap, and focus-return to the trigger.
- Token mirrors (`tokens.css`, `tokens.ts`) and `ACCESSIBILITY.md` contrast table updated to match; no drift.

## [1.0.0] — 2026-05-26
Initial extraction from the approved homepage at commit `5115dce`.

### Added
- **Tokens** — colour (brand + semantic), type, space, radius, shadow, motion, layout, z-index, icon — documented in `TOKENS.md` and mirrored to `tokens/tokens.css`, `tokens/tokens.ts`, `tokens/tailwind.config.js`.
- **Primitives** — Button (5 variants), Icon (lucide + 3 brand glyphs), Eyebrow, Reveal, IconSquare, Pill/Chip, Badge, and Layer-0 spacing primitives (Stack/Inline/Cluster/Grid).
- **Composites** — Card + FeatureBanner, ReviewCard + Carousel, RatingBlock, TrustPoint, AccordionItem, FormField/PhotoUpload + multi-step EnquiryForm, AreaChip.
- **Regions** — TopBar, SiteHeader (+ Logo + MobileMenu), SiteFooter, Hero, ServicesSection, ReviewsSection, HowItWorks (signature scroll-rail), LogoStrip, MeetJamie, ServiceArea (+ CoverageMap), Faq, ContactSection.
- **Patterns** (`PATTERNS.md`) — P1 section skeleton, P2 section rhythm, P3 two-column split (fr-only), P4 card grid, P5 page hero, P6 ink CTA panel, P7 trust row, P8 media+aside, P9 logo wall; plus layer taxonomy, nesting rules, governance.
- **Page blueprints** (`PAGES.md`) — services hub + detail, areas hub + town, about, reviews, gallery, contact, legal, 404 — each with section stack, schema, H1, and acceptance gate.
- **Motion** (`MOTION.md`) — Tier 2 + one Tier 3 signature; duration/easing pairing; reduced-motion policy.
- **Voice** (`VOICE.md`) — derived from homepage; person, CTA verbs, banned words (em dashes, triads, corporate-speak), vocabulary, punctuation, tone-by-context.
- **Accessibility** (`ACCESSIBILITY.md`) — WCAG 2.2 AA target, landmarks, headings, focus, **contrast pairing table**, keyboard/SR canon, forbidden patterns.
- **Infrastructure** (`INFRASTRUCTURE.md`) — verify approach, token-sync rule, build gate, lint recommendations, release process.

### Known issues (flagged for the redesigns, not yet fixed)
- **Contrast:** flame Badge uses white text on flame (~2.6:1, fails AA) → switch to ink text. WhatsApp button uses white on #25d366 (~1.8:1, fails AA) → ink text or darker green.
- **Mobile menu:** lacks Escape-to-close and a focus trap → add both.
- **Token sync** is manual (no generator yet).
- **Voice & Motion are "derived from homepage only"** — `brand/` plan absent; re-base when `/plan-brand` runs.
