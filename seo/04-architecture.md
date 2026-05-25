# Phase 4 — Site Architecture for SEO

## Rendering strategy (committed)
**SSG (static generation) via Next.js App Router**, deployed on Vercel. Every page is a static, content-bearing HTML document at build time — ideal for a small, mostly-evergreen local site. The contact form is the only dynamic element (client island posting to a serverless route). **Rule honoured:** all SEO-relevant content (copy, headings, schema JSON-LD, internal links) is in the initial server-rendered HTML; nothing SEO-critical is client-only. ISR not needed at this size; rebuild on content change.

## URL + slug convention (committed)
- lowercase, hyphens (never underscores), no trailing slash, no stop-words, keyword-at-front, ≤5 words, no dates.
- Pattern: `/services/<service-slug>`, `/areas/<town-slug>`. Flat and shallow.

## Hub-and-spoke map
```
/  (home)  ── hub: brand + local head terms; links to every service + top towns
│
├── /services  (services hub — links to all 4 service pages)
│   ├── /services/boiler-servicing        ← head: boiler service burgess hill
│   ├── /services/boiler-repairs          ← head: boiler repair burgess hill (GBP gap fix)
│   ├── /services/gas-safety-certificate  ← head: landlord gas safety certificate / CP12  ★ content priority
│   └── /services/gas-appliances          ← head: gas hob/cooker installation burgess hill
│
├── /areas  (areas hub — links to all town pages)
│   ├── /areas/burgess-hill   (core — JDH ranks #1)
│   ├── /areas/haywards-heath (gap — currently absent from pack)
│   ├── /areas/hassocks       (JDH ranks #1)
│   ├── /areas/cuckfield      (low competition)
│   └── (phase 2 towns, light: ditchling, wivelsfield, lindfield, keymer)
│
├── /about      (Meet Jamie — E-E-A-T anchor, Gas Safe 977838)
├── /reviews    (reviews/testimonials — Review/AggregateRating schema, branded query)
├── /gallery    (recent work — image-pack play, real job photos)
├── /contact    (enquiry form + call + WhatsApp)
└── legal: /privacy-policy, /terms, /cookie-policy + /404
```

**Internal-link flow (link-equity):** home → services hub → each service page; home → areas hub → each town page. **Cross-links:** every service page links to the relevant town pages ("serving Burgess Hill, Hassocks…"); every town page links to the canonical service pages (localised anchors) + to /reviews and /contact. /about and /reviews link from every page's header/footer to spread E-E-A-T signals. Max ~100 internal links/page (far below ceiling here).

**Anti-cannibalisation rule (carried from Phase 1):** town pages localise (proof, area, travel, landmarks) and link to canonical service pages; they do **not** duplicate the service explainer copy. Service pages stay town-agnostic in their core explainer (mention "across Mid Sussex"), town pages own `[service] [town]` long-tails.

## Content-depth bands (guard against drift; match top-ranking local pages)
| Page type | Target words | Notes |
|---|---|---|
| Home | 600–900 | scannable, modular, not an essay |
| Service page | 700–1,200 | offer + process + what's included + FAQ block |
| CP12 service page | 1,000–1,500 | richest — legal requirements + answer-first + FAQ (AI-Overview target) |
| Town page | 400–700 | localised, NOT duplicate; proof + area + links |
| About | 500–800 | Jamie's story + credentials |
| Reviews / Gallery | 200–400 + content | mostly structured data + media |

## Click-depth
Every SEO-priority page is ≤2 clicks from home (home → hub → page, or linked directly in nav/footer). No orphan pages.

## Canonical rules
- Self-canonical on every indexable page.
- No parameter/filter pages exist (static site) → no canonical complexity.
- `/services` and `/areas` hubs are thin-but-useful → keep indexable (they aggregate + link), each gets ≥300 words of genuine intro/overview to clear the quality floor.

## Breadcrumbs
On all service + town pages: `Home › Services › Boiler Servicing` / `Home › Areas › Burgess Hill`. Rendered visually + `BreadcrumbList` schema (Phase 7).

## Sitemap structure
Single `/sitemap.xml` (site is <30 URLs). Add an image sitemap entry set later only if the gallery grows. `robots.txt` references it. Submit to GSC + Bing Webmaster once verified.

## Indexation rules
- Index: home, all service pages, all town pages, /about, /reviews, /gallery, /contact, legal pages.
- Noindex: none needed yet (no internal search, no paid LPs in scope, no thin tag/date archives). Quality floor: don't publish a town page until it has ≥400 words of genuine localised content — a stub town page is worse than none.

## Migration map — `jdhgas.co.uk` (light)
**Context:** rebuild on the **same domain**; current site is small with negligible measurable authority (no GSC/analytics; tiny brand footprint). Risk is LOW but the domain + any indexed URLs must be preserved.

**Action before launch:** manually crawl the current live site (it's small) to list every existing URL, then 301-map each to its new equivalent. Known/observed current URLs:
| Old URL (current site) | New URL | Redirect | Risk |
|---|---|---|---|
| `/` (home) | `/` | none (same) | LOW |
| `/book-now` (booking) | `/contact` | 301 | LOW |
| services dropdown: gas boiler servicing | `/services/boiler-servicing` | 301 | LOW |
| services dropdown: CP12 gas safety certificates | `/services/gas-safety-certificate` | 301 | LOW |
| about / about-me | `/about` | 301 | LOW |
| boiler advice / blog | `/` or relevant service page | 301 | LOW |
| `/services` (404s currently) | `/services` | n/a (fix the 404) | LOW |

**Rule:** complete the crawl + 301 map before DNS cutover; no old URL left to 404. Because authority is negligible, no HIGH/MEDIUM lossy-redirect blockers exist — but verify in GSC at T+24h/T+1wk (Phase 8) once the profile is set up. Preserve `info@jdhgas.co.uk` + phone + the GBP website link target (point GBP to the new homepage).
