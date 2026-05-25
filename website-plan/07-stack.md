# Phase 7 — Tech Stack

| Layer | Choice | Version | Reason (this project) |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.x | Already scaffolded; SSG + great SEO; built-in Image/Metadata/`sitemap.ts` — perfect for a small static local site. |
| Styling | Tailwind CSS | 4.x | Scaffolded; fast, tokens map cleanly to CSS vars from Phase 6; no runtime CSS-in-JS weight. |
| Component primitives | Radix UI (Accordion, Dialog) | latest | Accessible accordion (FAQ) + mobile-drawer/lightbox dialog with focus-trap, ARIA done right — meets the a11y=100 gate. Only pulled where needed. |
| Animation | Framer Motion (`motion`) | 11.x | Tier-2 `whileInView` fade/slide-ups + the signature reveal; respects reduced-motion. |
| Forms | React Hook Form + Zod | latest | Contact form validation (client) + shared Zod schema validated again server-side. |
| Form submission/email | Next Route Handler → Resend | latest | `/api/contact` serverless route emails Jamie via Resend (free tier ample). No DB. |
| Payments / auth / backend | NONE | — | No transactions, no accounts, no login. Lead-gen only. |
| CMS | NONE | — | <30 mostly-evergreen pages; content in MDX/TSX. A CMS is overhead for a solo site; revisit if a blog grows. |
| Hosting | Vercel | — | Native Next.js; free tier; auto-deploy from the GitHub repo; CDN + AVIF + edge. |
| Font serving | `next/font/local` (self-host) | — | General Sans (Fontshare licence) + Inter, self-hosted, no layout shift, no Google request. |
| Image pipeline | `next/image` | built-in | AVIF→WebP, responsive srcset, explicit dims (zero CLS), blur LQIP. |
| Icon system | Lucide React | latest | Single system (Phase 0/6); tree-shaken. No second icon set. |
| Analytics | GA4 + Vercel Web Analytics | — | GA4 fires the KPI events (call/WhatsApp/form); Vercel Analytics for lightweight pageview/Vitals. |
| Error monitoring | Sentry (free tier) | latest | Catch client/route errors; low overhead. |
| RUM / Web Vitals | Vercel Speed Insights | — | Field CWV reporting against the Phase 9 targets. |
| Testing — unit | Vitest | latest | Component/util tests (form schema, etc.). |
| Testing — e2e | Playwright | latest | Critical path: nav, form submit, call/WhatsApp links, FAQ a11y. |
| Testing — visual regression | NONE | — | DIY budget; covered by manual device/browser screenshots in Phase 9. Revisit later. |
| Testing — accessibility | axe-core via Playwright (`@axe-core/playwright`) | latest | Zero-violations gate, automated. |
| Email / transactional | Resend | — | Single enquiry email to info@jdhgas.co.uk. |
| Consent / cookie management | Lightweight custom banner | — | Only GA4 needs consent. No non-essential cookies fire before consent; simple accept/reject. UK GDPR/PECR compliant. (No heavy CMP needed at this scale.) |
| i18n / localisation | NONE | — | Single locale en-GB. |
| Feature flags / experimentation | NONE | — | No need at launch. |
| Deployment / CI | Vercel + GitHub Actions | — | PR previews (noindex), CI runs Vitest + Playwright + axe + schema validation before prod deploy. |

## Folder structure (≥2 levels)
```
jdh-gas/
├── app/
│   ├── layout.tsx                 # root: fonts, <html lang=en-GB>, SiteHeader/Footer, site JSON-LD
│   ├── page.tsx                   # homepage (composes the 12 modules)
│   ├── globals.css                # Tailwind + token CSS vars
│   ├── sitemap.ts                 # auto sitemap
│   ├── robots.ts                  # robots.txt
│   ├── opengraph-image.tsx        # default OG (per-type overrides per route)
│   ├── services/
│   │   ├── page.tsx               # services hub
│   │   ├── boiler-servicing/page.tsx
│   │   ├── boiler-repairs/page.tsx
│   │   ├── gas-safety-certificate/page.tsx
│   │   └── gas-appliances/page.tsx
│   ├── areas/
│   │   ├── page.tsx
│   │   ├── burgess-hill/page.tsx
│   │   ├── haywards-heath/page.tsx
│   │   ├── hassocks/page.tsx
│   │   └── cuckfield/page.tsx
│   ├── about/page.tsx
│   ├── reviews/page.tsx
│   ├── gallery/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── cookie-policy/page.tsx
│   ├── not-found.tsx              # 404
│   └── api/contact/route.ts       # form handler → Resend
├── components/
│   ├── layout/ (SiteHeader.tsx, SiteFooter.tsx, MobileDrawer.tsx)
│   ├── ui/ (Button.tsx, Accordion.tsx, ...)
│   ├── home/ (Hero.tsx, TrustBar.tsx, ServiceCard.tsx, OfferBand.tsx,
│   │          MeetJamie.tsx, ValueCard.tsx, LogoStrip.tsx, ReviewCard.tsx,
│   │          GalleryGrid.tsx, ServiceArea.tsx, FaqAccordion.tsx, CtaBand.tsx)
│   └── seo/ (JsonLd.tsx, Breadcrumbs.tsx)
├── lib/ (schema.ts [JSON-LD builders], reviews.ts, towns.ts, contact-schema.ts [Zod])
├── content/ (faqs.ts, services.ts, reviews-data.ts)  # typed content
├── public/
│   ├── images/ (hero-jamie*.avif, jamie-portrait.avif, work/*.avif, map-mid-sussex.svg)
│   ├── brands/ (worcester.svg, vaillant.svg, ideal.svg, baxi.svg, bosch.svg)
│   ├── logo.svg, logo-inverse.svg, favicon.svg, apple-touch-icon.png, og/*
│   └── fonts/ (general-sans, inter)
├── tests/ (e2e/*.spec.ts, unit/*.test.ts, a11y/*.spec.ts)
└── (config: next.config.ts, tailwind, tsconfig, .github/workflows/ci.yml)
```
