# Phase 8 — Content & Asset Manifest (Homepage)

## Copy manifest (status)
All homepage strings are FINAL in `05-modules.md` except:
| String | Module | Status |
|---|---|---|
| Homepage review cards (×3) | Reviews | **FINAL** — real verbatim Google reviews (Josh C., Max, Sabir) pulled live 2026-05-25 |
| Insurance / accreditation trust lines | (would add to Why/Footer) | AWAITING_USER (left out until confirmed) |
| Repair / CP12 prices | (service pages, not homepage) | AWAITING_USER (homepage uses £75 + "ask for a quote" — FINAL) |
| Brand wordmark logos display | Boiler brands | **CONFIRMED OK to display** (user approved 2026-05-25) → STATUS TO_SOURCE official SVGs |
Everything else: **FINAL**.

## Asset manifest
| File | Type | Format | Served dims | AR | Focal | Alt | Treatment | Sourcing | Status |
|---|---|---|---|---|---|---|---|---|---|
| hero-jamie-desktop.avif | photo | AVIF+WebP | 720×900 | 4:5 | 45%,38% | "Jamie Hannah, Gas Safe registered engineer, beside a serviced boiler in Burgess Hill" | ink scrim, blur LQIP | EXISTING `…08 (2)` | NEEDS_OPTIMISATION (want original) |
| hero-jamie-mobile.avif | photo | AVIF+WebP | 750×938 | 4:5 | 50%,35% | (as above) | top-crop, scrim | EXISTING | NEEDS_OPTIMISATION |
| jamie-portrait.avif | photo | AVIF+WebP | 560×700 | 4:5 | 45%,40% | "Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services" | warm, blur LQIP | EXISTING `…08 (2)` | NEEDS_OPTIMISATION |
| work-ideal-install.avif | photo | AVIF+WebP | 800×1000 | 4:5 | 50%,45% | "Finished Ideal Logic combi boiler installation by JDH Gas" | rounded, LQIP | EXISTING `…09` | NEEDS_OPTIMISATION |
| work-analyser-1.avif | photo | AVIF+WebP | 600×450 | 4:3 | 60%,40% | "Flue gas analyser used during a boiler service" | rounded | EXISTING `…08 (3)` | NEEDS_OPTIMISATION |
| work-analyser-2.avif | photo | AVIF+WebP | 600×450 | 4:3 | 55%,45% | "Boiler service on a Baxi boiler in a Mid Sussex kitchen" | rounded | EXISTING `…08 (6)` | NEEDS_OPTIMISATION |
| work-bosch-service.avif | photo | AVIF+WebP | 600×800 | 3:4 | 55%,40% | "Servicing the internals of a Bosch boiler" | rounded | EXISTING `…08` | NEEDS_OPTIMISATION |
| work-gas-hob.avif | photo | AVIF+WebP | 600×450 | 4:3 | 40%,45% | "Gas hob safety-checked and tested by JDH Gas" | rounded | EXISTING `…49` | NEEDS_OPTIMISATION |
| logo.svg | logo | SVG | — | — | centre | "JDH Gas Services" | — | derive from `…08 (4)` | TO_CREATE (vectorise) |
| logo-inverse.svg | logo | SVG | — | — | centre | "JDH Gas Services" | white variant | derive | TO_CREATE |
| favicon.svg / .ico | icon | SVG/ICO | 48 | 1:1 | shield | (n/a) | shield mark | derive | TO_CREATE |
| apple-touch-icon.png | icon | PNG | 180×180 | 1:1 | shield | (n/a) | shield on ink | derive | TO_CREATE |
| map-mid-sussex.svg | illustration | SVG | ~560×420 | 4:3 | pin@BurgessHill | "Map of the JDH Gas service area across Mid Sussex" | brand-tinted static map | TO_CREATE (no live embed) | TO_CREATE |
| worcester/vaillant/ideal/baxi/bosch.svg | logo | SVG | h64 | — | — | brand name each | greyscale, nominative use | LICENSED/brand asset | TO_SOURCE (confirm; text fallback if unavailable) |
| og/*.png (per page type) | graphic | PNG | 1200×630 | 1.91:1 | logo+title | (n/a) | brand template | TO_CREATE | TO_CREATE |
| pattern-shield.svg | decoration | SVG | — | — | — | "" decorative | faint watermark | TO_CREATE (optional) | TO_CREATE |

_No stock anywhere. Photos exist; optimisation (AVIF/resize) + ideally original hero is the work. Logos/map/OG are TO_CREATE/TO_SOURCE — tracked in Phase 9 launch gate._

## Link manifest
| Label | Destination | Type | Target | rel | Module | Status |
|---|---|---|---|---|---|---|
| Call 07544 063330 | tel:+447544063330 | tel | _self | — | Hero/Header/CTA | RESOLVES |
| WhatsApp | https://wa.me/447544063330 | external | _blank | noopener | Hero/Header/CTA/Area | RESOLVES |
| First service from £75 | /services/boiler-servicing | internal | _self | — | Hero | AWAITING_PAGE (built in this project) |
| Book your service | /contact?service=servicing | internal | _self | — | Offer | AWAITING_PAGE |
| Learn more (×4) | /services/<slug> | internal | _self | — | Services | AWAITING_PAGE |
| More about me | /about | internal | _self | — | Meet Jamie | AWAITING_PAGE |
| Read all reviews | /reviews | internal | _self | — | Reviews | AWAITING_PAGE |
| See more on Instagram | https://www.instagram.com/jdhgasservices/ | external | _blank | noopener | Gallery | RESOLVES |
| Town chips (×4) | /areas/<town> | internal | _self | — | Area | AWAITING_PAGE |
| Nav: Services/Areas/About/Reviews/Contact | /… | internal | _self | — | Header | AWAITING_PAGE |
| Footer service/area/legal links | /… | internal | _self | — | Footer | AWAITING_PAGE |
| Instagram (footer) | https://www.instagram.com/jdhgasservices/ | external | _blank | noopener | Footer | RESOLVES |
| info@jdhgas.co.uk | mailto:info@jdhgas.co.uk | mailto | _self | — | Footer | RESOLVES |
_All `AWAITING_PAGE` are pages within this same build — they resolve once those routes exist (Phase 9 gate: zero unresolved before launch). No external dead links._

## Form manifest — Contact / Enquiry form (`/contact`, summarised CTA target on home)
| Field | Label | Type | Validation | Req | autocomplete | inputmode |
|---|---|---|---|---|---|---|
| name | Your name | text | 2–80 chars | ✓ | name | text |
| phone | Phone number | tel | UK phone regex | ✓ | tel | tel |
| email | Email (optional) | email | valid email if present | ✗ | email | email |
| postcode | Postcode | text | UK postcode regex | ✓ | postal-code | text |
| service | What do you need? | select | one of: Service/Repair/CP12/Appliance/Other | ✓ | — | — |
| message | Message | textarea | ≤1000 chars | ✗ | — | text |
| consent | "I'm happy for JDH Gas to contact me about my enquiry." | checkbox | must be true | ✓ | — | — |
- **Submit:** POST `/api/contact` → Zod re-validate → Resend email to info@jdhgas.co.uk.
- **Success:** inline "Thanks — I've got your message and I'll be in touch shortly. Need me sooner? Call 07544 063330." + clear form.
- **Error (validation):** per-field helper text (e.g. "Please enter a valid UK phone number"). **Error (send fail):** "Something went wrong sending that. Please call or WhatsApp me on 07544 063330." 
- **Anti-spam:** honeypot field + Cloudflare Turnstile (free) + server rate-limit.
- **GDPR:** explicit consent checkbox + link to /privacy-policy; data only emailed, not stored.

## Icon audit (all Lucide — single system)
`shield-check`, `star`, `map-pin`, `wrench`, `flame`, `clipboard-check`, `cooking-pot`, `clock`, `badge-pound-sterling`, `chevron-down`, `phone`, `mail`, `message-circle`, `instagram`, `menu`, `x`. **No second icon set.** Brand wordmarks (Worcester etc.) are logos, not icons.
