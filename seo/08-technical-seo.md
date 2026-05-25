# Phase 8 — Technical SEO

_Table stakes. Small static site (<30 URLs) on Next.js/Vercel — most large-site concerns (crawl budget, faceted nav, pagination, hreflang) don't apply and are marked N/A with reason._

## Rendering
**SSG** (Phase 4). Initial HTML contains all copy, headings, JSON-LD, internal links. Nothing SEO-critical is client-only (only the contact form is a hydrated island). No CSR routes. Verify with "View Source" (not just DevTools) that body copy + schema are present pre-JS.

## Off-site priority #0 — Google Business Profile (the biggest lever)
Not strictly "technical SEO" but the highest-ROI action, so it leads here:
- **Claim & verify** the existing JDH Gas Services GBP (it already ranks #1 locally, 5.0×24). Confirm ownership; if Jamie doesn't control it, reclaim it.
- **Categories:** primary "Gas engineer" + add "Heating contractor", "Boiler supplier/servicing" as secondary.
- **Services:** add **Boiler repair**, **Gas safety certificate (CP12)**, **Gas appliance installation** (fixes the "boiler repair" pack absence found in Phase 2).
- **Service areas:** add Haywards Heath, Hassocks, Cuckfield + villages (fixes Haywards-Heath absence).
- **Hours:** match site + schema (Mon–Fri 08:00–17:00 unless Jamie changes). **Website link → new homepage.** Add photos (the real job set), keep posting (seasonal). Enable messaging + booking link to `/contact`.
- NAP (name/address-area/phone) must be **identical** across GBP, site, Checkatrade, Yell, Facebook — citation consistency is a ranking factor.

## Sitemap & robots
- Single `/sitemap.xml` auto-generated at build (next-sitemap or App Router `sitemap.ts`), lists all indexable pages with `lastmod`.
- `/robots.txt`: allow all; `Sitemap: https://jdhgas.co.uk/sitemap.xml`. **Staging must `Disallow: /` and be password/preview-protected** — never let the Vercel preview domain get indexed (set `X-Robots-Tag: noindex` on preview deployments).
- Meta-robots for HTML; `X-Robots-Tag` header for any non-HTML asset to be hidden (none planned).

## Canonical / indexation
- Self-canonical every page. Trailing-slash: **no trailing slash** (configure Next `trailingSlash:false`); enforce one host (`https://jdhgas.co.uk`, www→non-www 301 or vice-versa — pick non-www, redirect www).
- Index everything in Phase 4; noindex `/404`. No internal search page exists. Quality floor: no town page under ~400 words of unique content gets published/indexed.
- Strip UTM/tracking params from internal links; none in indexed URLs.

## Core Web Vitals targets (top-decile)
LCP **< 2.0s**, INP **< 200ms**, CLS **< 0.05**. Levers:
- Next `<Image>` for all photos → AVIF (WebP fallback), responsive `srcset`, explicit width/height (zero CLS), `priority` on the hero only, lazy-load the rest.
- Self-host fonts via `next/font` (`font-display: swap`, subset latin, preload the one display face). No render-blocking webfonts.
- Minimal JS (static site + one form island). No carousel libraries, no heavy analytics.
- Vercel CDN + immutable asset caching; HTTP/2; Brotli.

## Mobile-first
Single light theme, responsive, tap targets ≥44px, legible base font ≥16px, no interstitials/pop-ups over content (cookie banner must be dismissible and not a full wall). Sticky header call/WhatsApp buttons.

## Security / hygiene
HTTPS only + HSTS; valid SSL (Vercel auto). 301 (never 302) for the www→non-www and the migration redirects. No mixed content.

## Structured-data validation
Run every Phase 7 snippet through validator.schema.org + Google Rich Results Test pre-launch. Add a lightweight CI check (or manual pre-deploy checklist) so schema doesn't silently break on edits.

## Crawl budget / large-site items — N/A
Site is <30 URLs → no log-file analysis, no parameter handling, no crawl-delay, no faceted-nav rules, no sitemap segmentation needed. Revisit only if a blog scales past ~50 pages.

## hreflang / i18n — N/A
Single locale en-GB. `<html lang="en-GB">`. No hreflang.

## Search Console + Bing setup (do at launch)
- **GSC:** verify (DNS TXT preferred), submit sitemap, monitor Coverage/Indexing, CWV report, manual-actions + security check (baseline currently unknown — verify clean once access exists). This is also the only free backlink visibility.
- **Bing Webmaster Tools:** verify + submit sitemap (seeds Copilot/ChatGPT-Bing AI search).
- **GA4:** install, mark the **enquiry/contact-form submit, click-to-call, and WhatsApp-click** as key events (Phase 11). Server-side not needed at this scale.

## Migration monitoring (light — same-domain rebuild)
Pre-launch: crawl the current small site, build the 301 map (Phase 4). Post-launch:
- **T+0:** fetch the handful of old URLs (`/book-now`, services, about) → confirm 301s to new equivalents; confirm new pages render + are indexable; confirm GBP website link points to new homepage.
- **T+24h:** GSC Coverage — watch for 404 spikes / redirect errors.
- **T+1 week:** check the 5 priority queries still surface JDH (local pack should be unaffected — GBP is independent of the site rebuild); confirm new URLs indexing.
- **T+1 month:** full GSC review; ensure no orphaned redirects; resubmit sitemap.
- **Owner:** site builder (you/user). Low risk given negligible existing authority, but the GBP→website link and the old booking URL are the two things that must not break.
```
