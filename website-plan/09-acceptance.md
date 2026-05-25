# Phase 9 — Acceptance Gates & Launch Readiness

## A. Quality gates (must pass)
- **Lighthouse:** Performance ≥95, Accessibility =100, Best Practices ≥95, SEO ≥95 (mobile + desktop).
- **Core Web Vitals (field/lab):** LCP <2.0s, INP <200ms, CLS <0.05. Hero image is the LCP element — `priority`, AVIF, dimensioned, blur LQIP.
- **Accessibility:** WCAG 2.2 AA; axe-core zero violations (CI); keyboard-only completes the conversion path (call link focusable, form submittable, FAQ operable); VoiceOver + NVDA read hero, services, form correctly.
- **Device matrix (screenshots):** iPhone SE 375, iPhone 15 Pro 393, iPad 768, laptop 1280, desktop 2560.
- **Browser matrix (screenshots):** latest Chrome, Safari, Firefox, Edge.
- **Copy test:** each headline stands alone (hero, "What I can help with", "Meet Jamie", "Rated 5.0…", "Ready to book?").
- **Blur test:** squint — hierarchy holds per section (hero face + headline dominate; one CTA obvious).
- **First-5-seconds test:** a stranger can say *what* (local gas engineer), *who for* (Burgess Hill homeowners/landlords), *do what* (call/WhatsApp/£75 service).
- **Competitor test:** screenshot beside B.Cooke / Smart Heat / BOXT — JDH must look more trustworthy + more modern, not templated. The Meet-Jamie signature must read as un-copiable.
- **Objection test:** walk all 7 Category-Brief objections through the page; each resolved by its mapped module.

## B. Launch readiness (all required before DNS cutover)
- **Page set live:** all 12 homepage modules + Privacy, Terms, Cookie Policy, Contact, 404 (500 handled by Vercel). All service + area + about/reviews/gallery pages built (links resolve).
- **Social preview test:** paste URL in Slack, WhatsApp, Twitter/X, LinkedIn, iMessage → correct og:image/title/description each.
- **Analytics fires:** GA4 key events verified on staging — `call_click`, `whatsapp_click`, `contact_form_submit`.
- **Error monitoring:** Sentry catches a test error from `/api/contact`.
- **Form end-to-end:** submit → email arrives at info@jdhgas.co.uk; success + error + validation states correct; Turnstile + honeypot block spam.
- **Link manifest:** zero AWAITING_PAGE / PLACEHOLDER unresolved (all internal pages exist; tel/WhatsApp/IG/mailto resolve).
- **Asset manifest:** zero TO_CREATE/TO_SOURCE unresolved — logo SVG, favicons, OG images, static map done; brand logos sourced (or text fallback shipped); hero optimised (original obtained if possible).
- **Copy manifest:** zero AWAITING_USER — real reviews #2/#3 wording confirmed (or replaced with other genuine reviews); insurance/accreditation lines added only if confirmed true.
- **Content freshness:** footer year auto from build; no hard-coded year.
- **GBP wired:** Google Business Profile claimed/verified, website link → new homepage, services/areas updated (per SEO Phase 8). NAP identical across site/GBP/citations.
- **Consent banner:** GA4 doesn't fire before consent; reject works; no other non-essential cookies.
- **robots.txt + sitemap.xml** deployed; sitemap submitted to GSC + Bing. Staging/preview = noindex + protected.
- **Redirects:** old jdhgas.co.uk URLs (incl `/book-now`) 301 to new equivalents (Phase 4/SEO migration map); fix the old `/services` 404.
- **DNS/SSL/CDN:** HTTPS+HSTS, non-www canonical (www→301), Vercel SSL valid, caching headers set.
- **Migration monitoring:** T+0 / T+24h / T+1wk / T+1mo checks (SEO Phase 8), owner = site builder.

## Definition of done
All Section A quality gates pass on mobile + desktop, and every Section B item is checked, with the GBP optimisation completed in parallel (it's independent of the build and is the top revenue lever).
