# Phase 6 — Metadata (final strings)

## Committed patterns
- **Title:** `<Page/keyword + town> | JDH Gas Services` (front-load the local keyword; brand last). Trim brand to "JDH Gas" where length demands. ≤60 chars.
- **Description:** [what + where + who/Gas Safe] + [proof or offer] + [CTA verb]. ≤160 chars. Brand voice, no hype.
- **Robots:** `index,follow` on all below unless noted. **Canonical:** self. **og:type:** `website` (home/areas) / `article`-free service pages use `website`. **og:site_name:** JDH Gas Services. Twitter card: `summary_large_image`.

## Per-page table
| Route | `<title>` (≤60) | `<meta description>` (≤160) |
|---|---|---|
| `/` | Gas Engineer in Burgess Hill \| JDH Gas Services | Jamie Hannah, your Gas Safe registered engineer in Burgess Hill. Boiler servicing, repairs & landlord gas safety certificates. Call or WhatsApp today. |
| `/services` | Our Services \| JDH Gas Services, Burgess Hill | Boiler servicing, repairs, landlord gas safety certificates & gas appliance fitting in Burgess Hill & Mid Sussex. Gas Safe registered engineer. |
| `/services/boiler-servicing` | Boiler Service in Burgess Hill \| JDH Gas Services | Annual boiler servicing in Burgess Hill by a Gas Safe registered engineer. Thorough safety & efficiency checks. First service £75 — book today. |
| `/services/boiler-repairs` | Boiler Repair in Burgess Hill \| JDH Gas Services | Fast, reliable boiler repairs in Burgess Hill from Gas Safe engineer Jamie Hannah. All major brands fixed. Call or WhatsApp for a quick response. |
| `/services/gas-safety-certificate` | Landlord Gas Safety Certificate, Burgess Hill \| JDH | Landlord CP12 gas safety certificates in Burgess Hill from a Gas Safe engineer. Legal annual checks, fast turnaround, digital copy. Book today. |
| `/services/gas-appliances` | Gas Hob & Cooker Fitting Burgess Hill \| JDH Gas | Gas Safe hob & cooker installation in Burgess Hill. Safe fitting, removal and tightness testing of gas appliances by Jamie Hannah. Get in touch. |
| `/areas` | Areas We Cover \| JDH Gas Services, Mid Sussex | JDH Gas Services covers Burgess Hill, Haywards Heath, Hassocks, Cuckfield & nearby Mid Sussex villages. Gas Safe engineer Jamie Hannah. |
| `/areas/burgess-hill` | Gas Engineer & Boiler Service, Burgess Hill \| JDH | Local Gas Safe engineer in Burgess Hill — boiler servicing, repairs & gas safety certificates. 5-star rated. Call Jamie at JDH Gas today. |
| `/areas/haywards-heath` | Gas Engineer in Haywards Heath \| JDH Gas Services | Gas Safe registered engineer serving Haywards Heath — boiler servicing, repairs & landlord CP12 certificates. Friendly, reliable, local. Book now. |
| `/areas/hassocks` | Gas Engineer in Hassocks \| JDH Gas Services | Gas Safe engineer covering Hassocks — boiler servicing, repairs & gas safety certificates. 5-star rated local service. Call or WhatsApp Jamie. |
| `/areas/cuckfield` | Gas Engineer in Cuckfield \| JDH Gas Services | Gas Safe registered engineer in Cuckfield — boiler servicing, repairs & landlord gas safety certificates. Honest, careful local work. Book today. |
| `/about` | About Jamie Hannah \| JDH Gas Services, Burgess Hill | Meet Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services in Burgess Hill. Honest, careful work — prevention over cure. |
| `/reviews` | Reviews \| JDH Gas Services, Burgess Hill | What Burgess Hill & Mid Sussex customers say about JDH Gas Services — 5.0 stars from 24 Google reviews. Honest, thorough, Gas Safe work. |
| `/gallery` | Our Work \| JDH Gas Services, Burgess Hill | Recent boiler servicing, repairs & gas installations by JDH Gas Services across Burgess Hill & Mid Sussex. Real jobs by a Gas Safe engineer. |
| `/contact` | Contact \| JDH Gas Services, Burgess Hill Gas Engineer | Call 07544 063330, WhatsApp or message Jamie at JDH Gas Services in Burgess Hill for boiler servicing, repairs & gas safety certificates. |
| `/privacy-policy` | Privacy Policy \| JDH Gas Services | How JDH Gas Services collects and uses your data when you enquire. Read our privacy policy. | (robots: index,follow) |
| `/terms` | Terms of Service \| JDH Gas Services | The terms that apply when you use the JDH Gas Services website and book our work. | (index,follow) |
| `/cookie-policy` | Cookie Policy \| JDH Gas Services | How JDH Gas Services uses cookies on this website and how to manage your choices. | (index,follow) |
| `/404` | Page Not Found \| JDH Gas Services | (noindex) That page doesn't exist. Head back to the homepage or call JDH Gas on 07544 063330. |

_Town phase-2 pages (ditchling, wivelsfield, lindfield, keymer) reuse the `/areas/<town>` title pattern: "Gas Engineer in <Town> | JDH Gas Services" — only build with unique localised descriptions._

## OG image strategy
**Static** (site <30 pages). One branded 1200×630 template per page TYPE (home, service, area, about, reviews/gallery, contact). Template: JDH shield logo + page title ≥64px in brand blue on dark/steel background + "Gas Safe Registered · 977838" + a real photo (Jamie portrait for home/about; relevant job photo for service pages). Safe-zone respected; legible at thumbnail. Test in Slack/WhatsApp/Twitter/LinkedIn/iMessage (Phase 9.B).
- `og:title` / `og:description` = mirror the table (can be slightly punchier). `og:url` = canonical. `twitter:image` = same asset.

## Favicon / app icons
- `favicon.svg` (vector — the JDH shield, simplified mark) + `favicon.ico` (48×48 multi-size fallback).
- `apple-touch-icon.png` 180×180 (shield on solid brand-dark, safe padding).
- Android maskable 512×512 with safe zone; `manifest.webmanifest` (name "JDH Gas Services", theme colour brand-dark).
- No Safari pinned-tab requirement (optional monochrome `mask-icon` of the flame mark if quick).

## Voice check
All titles/descriptions read as a person describing a real local service — no "your #1 trusted provider". Gas Safe + town + a real CTA (Call/WhatsApp/Book). Banned-word scan: none present.
