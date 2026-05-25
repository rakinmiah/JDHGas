# SEO → Website Handoff
_Read by `/plan-website` Phase 5. Brand voice wins when voice and keyword conflict._

## Voice reminder
Jamie-as-narrator, first person, plain, safety-first, "prevention over cure". No emoji in body, no corporate filler, no "cheapest"/hype. `[STAND-IN — pending /plan-brand]`.

## Per-page keyword assignments
| Page | Primary head | Secondary (2–3) | Question variants (answer-first) |
|---|---|---|---|
| `/` | gas engineer burgess hill | gas safe registered engineer, boiler service near me, gas safety certificate | "do I need my boiler serviced?" |
| `/services/boiler-servicing` | boiler service burgess hill | annual boiler service, gas boiler servicing, worcester boiler service | what's included in a boiler service? · how much is a boiler service? · how long does it take? |
| `/services/boiler-repairs` | boiler repair burgess hill | boiler breakdown, boiler not working, boiler engineer | why won't my boiler fire up? · why is my boiler losing pressure? · repair or replace? |
| `/services/gas-safety-certificate` | landlord gas safety certificate burgess hill | cp12 certificate, gas safety certificate, landlord gas safety check | what is a CP12? · how long is it valid? · do homeowners need one? · what does it cover? |
| `/services/gas-appliances` | gas hob installation burgess hill | gas cooker fitting, gas appliance disconnection | do I need a Gas Safe engineer to fit a gas hob? |
| `/areas/<town>` | gas engineer <town> | boiler service <town>, boiler repair <town>, gas safety certificate <town> | (light) is JDH local to <town>? |
| `/about` | jamie hannah gas engineer | gas safe registered burgess hill | are you Gas Safe registered? |
| `/reviews` | jdh gas reviews | best gas engineer burgess hill | — |
| `/contact` | (navigational) | — | — |

## Placement rules (summary)
Head term in: title, meta description, H1, first 100 words (once), one H2. Use semantic variants (gas safe engineer, heating engineer, central heating) not literal repetition — 3–5×/700 words max. Internal-link anchors = target page's primary term, in a sentence, varied. Alt text = honest image description first, keyword only if accurate.

## Answer-first (mandatory)
CP12 page + all FAQ blocks: **[1-sentence direct answer] → [30–60 word elaboration] → [H2 deeper]**. CP12 lead must be the extractable legal answer (annual / Gas Safe / 28-day tenant copy / 2-year records) to win the AI Overview that currently cites Checkatrade & Smart Heat Experts.

## Town pages — anti-cannibalisation (critical)
Town pages **localise** (postcode area, neighbouring villages, travel, a local review) and **link to canonical service pages**. They do NOT repeat the service explainer copy. ≥60% unique copy per town or don't build the page. Service pages stay town-agnostic ("across Mid Sussex"); home owns the brand head term; town pages own `[service] [town] prices/reviews` long-tails.

## Metadata (compact — full strings in `06-metadata.md`)
Pattern: `<keyword + town> | JDH Gas Services`, ≤60 char title / ≤160 char description. Examples: Home "Gas Engineer in Burgess Hill | JDH Gas Services"; Servicing "Boiler Service in Burgess Hill | JDH Gas Services"; CP12 "Landlord Gas Safety Certificate, Burgess Hill | JDH". Pull exact strings from `06-metadata.md`.

## Schema per page type (full JSON-LD in `07-schema.md`)
- Site-wide: **HVACBusiness** (with Gas Safe `hasCredential` 977838, areaServed, hours, real AggregateRating 5.0/24) + **WebSite**.
- Service pages: **Service** + **BreadcrumbList** (+ **FAQPage** where a real FAQ exists).
- CP12 page: Service + **FAQPage** + **speakable** (AI/voice) + BreadcrumbList.
- Town pages: business reference by `@id` + **BreadcrumbList**.
- `/about`: **Person** (Jamie Hannah, Gas Safe 977838) — the YMYL E-E-A-T anchor.
- `/reviews`: **Review** (genuine only) feeding the global AggregateRating.

## Semantic entities (must appear in copy)
- **Home/About:** Jamie Hannah, JDH Gas Services, Gas Safe Register 977838, Burgess Hill, West/Mid Sussex.
- **Servicing/Repairs:** flue gas analyser, combustion reading, gas pressure, Worcester Bosch, Vaillant, Ideal, Baxi, combi/system boiler, fault code, heat exchanger, fan.
- **CP12:** CP12, Gas Safety (Installation and Use) Regulations 1998, Gas Safe Register, landlord, tenant, letting agent, flue, pipework, 12 months, 28 days, 2 years.
- **Town pages:** the town, its postcode (RH15/RH16/RH17/BN6), neighbouring villages.

## Hard don'ts
No "Welcome to JDH, your trusted…"; no footer town-keyword dump; no identical FAQ copy-pasted across pages; no exact-match question-H2 stacks without answers; no "cheapest/number one/best in Sussex"; no "emergency/24-hour" claims (Jamie closes 5pm — unconfirmed out-of-hours); no general "plumber" framing.

## Modules the site needs for SEO (maps to plan-website IA)
Sticky header with **click-to-call + WhatsApp** (NAP-consistent phone); trust strip stating "Gas Safe registered 977838" as text; service cards linking to 4 service pages; reviews module (schema); boiler-brands strip (Worcester/Vaillant/Ideal/Baxi/Bosch entities); meet-Jamie (E-E-A-T); areas module linking town pages; FAQ block (answer-first + FAQPage schema); footer with NAP + Gas Safe number + IG link.

## Open inputs needed for final copy (carry to plan-website intake)
Real prices (service/CP12/repair — only £75 new-customer service known); out-of-hours/emergency availability (gates "emergency" terms); public-liability insurance (trust copy); years experience / accreditations (Worcester/Vaillant) for About + installer-directory citations.
