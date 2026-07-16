# JDH Gas — project handover

Everything a new session needs to pick this up cold. Written 15 July 2026.

Read this first, then `AGENTS.md`. Deeper reference lives in `design-system/`,
`seo/` and `website-plan/` — this doc points at them rather than repeating them.

---

## 1. The business

**JDH Gas Services** — Jamie Hannah, a sole-trader **Gas Safe registered engineer
(reg. 977838)** based in **Burgess Hill, West Sussex**. Homeowners + landlords.

- Services: boiler servicing (£85 first service for new customers), landlord gas
  safety certificates (CP12), boiler & heating repairs, boiler/heating
  installation, gas hob & cooker installs.
- Phone **07544 063330** (calls + WhatsApp). Most leads arrive by phone/WhatsApp,
  not the form.
- Google Business Profile: **5.0 from ~59 reviews**, **#1 in the local map pack**
  for "boiler service burgess hill".
- Rakin (the user) builds and runs the site; Jamie is the client.

---

## 2. Stack & hard technical gotchas

**Next.js 16.2.6 (App Router) · React 19.2.4 · TypeScript · Tailwind CSS v4**
Deployed on **Vercel** (project `jdh-gas`, org `rakinm-projects`).
Repo: `github.com/rakinmiah/JDHGas.git`, branch `main`. Push to `main` = deploy.

⚠️ **`AGENTS.md` rule: this is NOT the Next.js you know.** Read the relevant guide
in `node_modules/next/dist/docs/` before writing code. APIs differ from training data.

Gotchas learned the hard way:
- **Tailwind v4 uses the `translate` CSS property**, not `transform`, for translate
  utilities. `getComputedStyle(el).transform` reads `"none"` — assert on position /
  `getBoundingClientRect()` instead.
- **v4 important modifier is a trailing `z-0!`**, not v3's `!z-0`.
- **`next/link` mishandles same-page hash scrolling.** `Button` renders in-page `#`
  links as a native `<a>` on purpose — don't "fix" it back to `<Link>`.
- **`scroll-behavior: smooth` is deliberately NOT set** in `globals.css`. It silently
  cancelled the long jump to the footer quote form (lazy images + reveal animations
  shift layout mid-scroll). `scroll-padding-top: 7rem` clears the sticky header.
- Never run `npm run build` while a dev server is running.
- The preview tool's screenshots are flaky on below-fold content (framer-motion
  `Reveal` renders blank). Verify via DOM/SSR fetch, not screenshots.

**Commands:** `npm run dev` · `npm run build` · `npx tsc --noEmit` (typecheck).

---

## 3. Where things live

| Path | What |
|---|---|
| `src/lib/local-pages.ts` | **The town pages' single source of truth.** `LOCAL_TOWNS` (live) + `WAVE_2_TOWNS` (held back). Intro, service angles, FAQs, photo, blurb, reviews per town. |
| `src/lib/services-content.ts` | Service page content (servicing, CP12, repairs, installation, hobs). |
| `src/lib/site.ts` | `SITE` constants (phone, email, Gas Safe no., URL) + fallback `REVIEWS`. |
| `src/lib/google-reviews.ts` | Live Google rating/count/reviews via Places API. Falls back to `SITE` values with **no API key locally** — expect initials-only avatars in local preview. |
| `src/app/[localPage]/page.tsx` | The town page template (all 13 towns). |
| `src/app/areas/page.tsx` | Areas hub (map, postcode checker, town cards). |
| `src/components/home/CoverageMap.tsx` | Map pins — **keep in sync with `LOCAL_TOWNS`**. |
| `src/components/sections/PostcodeChecker.tsx` | Postcode → town matching; `LIKELY_PREFIXES` for covered-but-no-page areas. |
| `scripts/growth-report.mjs` | Weekly GSC + GA4 report (see §6). |
| `design-system/PATTERNS.md` | **Read before building any section.** P1–P9 patterns. |
| `seo/location-pages-strategy.md` | Why town pages are built the way they are. |
| `seo/review-locations.md` | Which review belongs to which town, and how we know. |

---

## 4. Design system (essentials)

Full detail in `design-system/`. The load-bearing bits:

- **P2 background rhythm** — sections alternate `bg-surface` ↔ `bg-sunken`;
  **never two `bg-ink` adjacent**; ≤1 mid-page ink + a closing ink bookend.
  Check this whenever you add/remove a section.
- **P3 two-column** — `md:grid-cols-[44fr_56fr]` (fr, not %).
- **P5 `PageHero`** — shared hero (town pages + services). Carries breadcrumbs,
  `GasSafeBadge`, `HeroSocialProof`, CTAs.
- **P8 media+aside** — map cards need `isolation:isolate z-0`.
- `.section` = padding-block 3rem/5rem/6rem · `.container-page` = 1200 max.
- Every page ends with the ink **`ContactSection`** (the `#enquiry` quote form).

**Copy voice:** plain, first-person, like Jamie talking. **No em dashes** (we swept
them out — use commas/colons/full stops). No AI-cliché lexicon. See `design-system/VOICE.md`.

---

## 5. Non-negotiable content rules

These are commitments to the client, not preferences:

1. **Never fabricate reviews, testimonials, jobs, or photo provenance.** Review text
   is transcribed **word-for-word**. A review is only attached to a town when Jamie
   has confirmed it (his GBP owner-reply sign-off names the town — that's the source).
2. **Never claim a photo was taken in a town.** `photoAlt` describes *Jamie*
   ("engineer covering Hove, servicing a boiler") — never "photographed in Hove".
3. **No "24/7" or guaranteed-emergency claims.** Jamie works Mon–Fri, some evenings,
   not guaranteed. This was explicitly corrected once already.
4. **No street address published** — locality level only (he's home-based; the GBP
   address should stay hidden).
5. **Don't imitate the official Gas Safe Register logo.** `GasSafeBadge` is a tasteful
   stand-in; swap for the real mark only when Jamie supplies the official pack.
6. **Never paste secrets/API keys into chat.** Rakin adds them in Vercel.
7. **Commit only when asked; never push without explicit instruction.**

---

## 6. Data access & automation (the useful part)

**Search Console + GA4 are queryable directly** — no browser needed.

- **Auth:** gcloud **Application Default Credentials** on Rakin's Mac, using *his own*
  OAuth client (the GCP org policy blocks service-account keys, and Google blocks
  gcloud's built-in client for these scopes).
  - Client file: `~/.secrets/jdh-oauth-client.json` (GCP project `JDH-Analytics`, number `154905144160`)
  - Account: `rakin.rifat.miah@gmail.com` (owner of the GSC property)
  - gcloud lives at `/opt/homebrew/share/google-cloud-sdk/bin`
  - Re-auth if expired:
    ```
    gcloud auth application-default login \
      --client-id-file="$HOME/.secrets/jdh-oauth-client.json" \
      --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly
    ```
- **GA4 property:** `543081820` · **GSC property:** `sc-domain:jdhgas.co.uk`
- **Weekly report:** `node scripts/growth-report.mjs` — prints GSC clicks/impressions/
  queries/pages + GA4 sessions and lead events week-over-week, **and saves a dated
  copy** to `~/Desktop/JDH Gas Reports/Growth Report <date>.md`.
- **Scheduled tasks** (on Rakin's machine):
  - `jdh-weekly-growth-report` — Mondays ~9am; runs the script, appends an
    interpretation to the saved file, reports in chat.
  - `jdh-pack-recheck` — one-off, re-checks map-pack positions after the GBP
    category additions.
- **Microsoft Clarity** (heatmaps/session replay) — project `xhnxfnbcyi`, **gated on
  cookie consent** (never loads before Accept; that's deliberate and legally required).
  Its export API is too limited to be useful — read Clarity in the browser.

**GA4 lead events:** `phone_click`, `whatsapp_click`, `enquiry_submit` (+ `postcode_check`
as an intent signal, deliberately *not* a key event). `phone_click` = a tap on the call
button, **not a completed call** — it's a floor, and GBP map-pack calls are invisible to us.

---

## 7. Environment variables

`.env.example` lists them. Set in **Vercel** (production):

| Var | Purpose |
|---|---|
| `GOOGLE_PLACES_API_KEY` | Live Google reviews/rating. **Not set locally** — local falls back to `SITE` values. |
| `GOOGLE_PLACE_ID` | The GBP place. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Enquiry form email delivery. |
| `NEXT_PUBLIC_GA_ID` | GA4 (public by design; defaults in code). |
| `NEXT_PUBLIC_CLARITY_ID` | Clarity (public by design; defaults in code). |
| `GOOGLE_SITE_VERIFICATION` | Optional GSC meta tag. |

---

## 8. SEO position (as of mid-July 2026)

- Canonical host is **`https://www.jdhgas.co.uk`** (non-www 308s to www). All
  canonicals/sitemap/robots/schema use www — this was a real bug we fixed; don't regress it.
- **Live & indexed:** homepage, 5 service pages, 7 town pages (Haywards Heath,
  Hassocks, Hove, Portslade, Hurstpierpoint, Lewes, Henfield), `/areas`, plus
  about/reviews/contact/legal. ~21 URLs.
- **Performance:** clicks +157% and impressions +47% across the launch fortnight.
  Page-1 positions for "boiler breakdown/repairs/fitting/installations burgess hill"
  (pos 3–5). **"boiler service burgess hill" sits ~pos 16–21** — the big target; it's
  gated by domain authority (competitors have decade-old sites), not by on-page work.
- **The map pack (#1) is Jamie's reviews, not the website.** The website's job is
  everywhere the pack can't reach (other towns) + conversion. Don't over-claim SEO
  credit for the pack.
- **Review snippets:** Google **won't** show star ratings on our own organic results
  (self-serving review policy for LocalBusiness). Don't chase it with Service/Product
  review schema — that triggered a Search Console warning once and we removed it.
  `AggregateRating` lives only on the `HVACBusiness` entity in `SiteJsonLd`.
- **Growth levers that actually matter:** more Google reviews (ask customers to
  **mention their town** — it feeds both the pack and town pages) and citation
  repointing (Checkatrade/Yell/MyBuilder → jdhgas.co.uk).

---

## 9. ⚠️ CURRENT STATE — Wave 2 is staged, NOT deployed

**There is uncommitted work in the tree.** Do not blow it away.

**Built, verified locally, awaiting Rakin's "ship":**
- **6 new town pages** promoted into `LOCAL_TOWNS`: **Horsham, Cuckfield, Ditchling,
  Lindfield, Wivelsfield, Keymer** (13 towns total). Each has a unique hero photo,
  blurb, intro, service angles, FAQs. Production build passes.
- **Lancing is deliberately held** in `WAVE_2_TOWNS` — 15+ miles out, no demand
  signal, no evidence of work there. Don't launch it without a real job/review.
- **New town-verified reviews** added: Hassocks ← Ann Karlsson; Horsham ← Gary
  Woolnough + Diana Dodds + Suriani Hulbert; Hurstpierpoint ← Leon Ellerton.
- Map pins + postcode prefixes (RH17 → Cuckfield; RH13 → "likely") updated.
- New photos copied into `public/images/work/`; 13 unique town heroes, no dupes.

**To ship:** `npm run build` → commit → push `main` → Vercel deploys → verify live →
submit the 6 new URLs in Search Console.

---

## 10. Open threads

1. **Chris Jarvest review (Lindfield)** — Jamie's reply confirms Lindfield, but the
   review *text* hasn't been captured yet. Lindfield is the one new town with no
   review. Needs the full text from the GBP reviews screen (never invent it).
2. **Google Business Profile checklist** — sent to Jamie, partially done:
   - ✅ Categories added (Central Heating Service, Gas installation service, Gasfitter;
     primary stays **Gas engineer**)
   - ⬜ **Hide the home address** (247 Chanctonbury Rd is public + Street View of the
     house — privacy + he's a service-area business; hiding it does NOT hurt ranking)
   - ⬜ Fuller description, Services section, service areas, Instagram link
   - ⬜ GA4 property currency is USD → should be GBP
3. **GA4 key events** — confirm `phone_click` / `whatsapp_click` / `enquiry_submit`
   are starred as key events; set event data retention to **14 months** (default 2).
4. **Wave 3 (later):** dedicated service×town pages **only where data proves demand**
   (CP12 + servicing for the towns that earn impressions). Not a blanket 5×13 matrix —
   that's the doorway-page pattern we've deliberately avoided.
5. **Photo library:** ~10 unused job photos in `Imagery/`. No page currently lacks a
   hero, so they're stock. A "Recent work" gallery is the obvious use if wanted.

---

## 11. How Rakin likes to work

- **Verify, don't assume.** Check the live site / real data before claiming something
  works. He values being told "this is too early to tell" over invented trends.
- **Be honest and objective**, including when the answer is "don't build that."
  (Example: an Ansty page was rejected because the "search volume" was a bot —
  99.6% desktop, 0 clicks from 478 impressions at pos 1.5.)
- **He decides when to ship.** Stage and verify; wait for the word.
- Small numbers are noisy — say so rather than over-reading a quiet week.
