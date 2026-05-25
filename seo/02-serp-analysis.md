# Phase 2 — SERP Analysis

_Date: 2026-05-25. 10 live UK SERPs fetched via Chrome (desktop; google.co.uk, gl=uk). Snapshots in `seo/serp-snapshots/2026-05-25/`. No paid rank-tracker — figures are manual SERP reads, labelled. Mobile inferred (local pack + ads rank higher on mobile; order materially similar for local intent)._

## Method & honesty note
Volumes/difficulty are **relative manual estimates** from SERP composition (who ranks, how many directories, feature density), not tool-measured. SERP volatility not formally measured (no Sensor/Mozcast access); local-pack composition for trades is generally **stable** month-to-month. Re-fetch quarterly per Phase 15.

## The headline finding
**JDH Gas Services already owns the Burgess Hill local pack.** It appears in the 3-pack at or near the top for `gas engineer burgess hill`, `boiler service burgess hill`, `boiler service near me`, and **#1 for `boiler service hassocks`** — with a **5.0 rating from 24 reviews** and an active Google Business Profile (website + directions links). This contradicts the Phase 0 "no GBP yet" answer; **a GBP exists and performs**. Strategy pivots from *create* to *claim/verify/optimise + expand*.

## Where JDH is PRESENT vs ABSENT in the local pack
| Query | JDH in local pack? | Who else | Note |
|---|---|---|---|
| gas engineer burgess hill | ✅ #1 | B.Cooke 5.0(299), DAJ 4.9(82) | Strong |
| boiler service burgess hill | ✅ | P.Prosser 5.0(20), DAJ | Strong |
| boiler service near me (BH) | ✅ | Elite[ad], P.Prosser, Lindfield | Strong |
| boiler service hassocks | ✅ #1 | Elements 5.0(31), P.Prosser | Wins adjacent town |
| **boiler repair burgess hill** | ❌ | P.Prosser, DAJ, Lindfield | GBP category gap |
| **gas engineer haywards heath** | ❌ | TP Heat 5.0(67), Premier Gas, Smart Heat 4.9(366) | Service-area gap |
| **emergency gas engineer burgess hill** | ❌ | B.Cooke 24h, PlatinumGas 24h, DAJ | Needs 24/7 (skip) |

**Three concrete GBP/site actions fall straight out of this table:**
1. **Add "Boiler repair" + "Gas safety certificate" as GBP services/categories** → enter the repair local pack (currently missing).
2. **Expand GBP service area + build a Haywards Heath page** → JDH is invisible there despite ranking #1 in Burgess Hill.
3. **Decide on emergency/out-of-hours.** The emergency pack is 100% "Open 24 hours" firms; JDH (closes 5pm) can't win it without offering it. Likely skip.

## What intent Google rewards, by query class
- **`[service] [town]` and `[service] near me`** → **LOCAL pack + directories**. This is JDH's winnable battleground. Organic blue links sit below local pack + ads + a directory carousel (Checkatrade, Trustatrader, MyBuilder, Yell). Independent tradesperson sites *can* rank organically (B Cooke, PDP, A Ridley, JD Heating all do) but the **local pack is the prize**, and JDH already holds it.
- **`landlord gas safety certificate [town]` / CP12** → **content + AI Overview**, no local pack. Winnable with a dedicated answer-first CP12 page + FAQ schema. Bar set by **Smart Heat Experts** (digital certificates, automatic annual reminders, tenant/agent liaison, online booking). **JDH has zero presence here** — biggest content opportunity.
- **Informational heads (`how often should a boiler be serviced`, `gas safety certificate cost`)** → **national brands + forums + video** (British Gas, Worcester Bosch, Energy Saving Trust, Reddit, Mumsnet). **Not winnable** for a local solo engineer. Use these only as FAQ content (PAA/AI citation), never standalone blog posts.
- **`emergency`** → **24/7 availability** signal. Out of scope unless Jamie offers it.

## AI Overview observations (GEO)
- AI Overview fired on **`landlord gas safety certificate burgess hill`**, citing Checkatrade, LGS, Smart Heat Experts, Lindfield. Answer was answer-first, legal-requirement-structured (annual / 28-day tenant copy / 2-year retention / £70–£117). **To earn citation, JDH's CP12 page must mirror that structure**: direct answer in first 40–80 words, legal requirements as a clean list, transparent price, FAQPage + Service schema.
- No AI Overview on the pure local-pack queries (Google serves the map instead) or on `gas safety certificate cost` this run.
- Reddit/Mumsnet rank on informational queries → community presence (Phase 10) supports AI citation over time.

## Competitor-SERP-overlap matrix (who appears where)
| Competitor | g.eng BH | service BH | repair BH | near me | g.eng HH | emergency BH | hassocks |
|---|---|---|---|---|---|---|---|
| **JDH Gas** | LP#1 | LP | — | LP | — | — | LP#1 |
| B.Cooke P&H | LP | org | org | org | — | LP | org |
| DAJ P&H | LP | LP | LP | — | — | LP | — |
| P.Prosser | — | LP | LP | LP | — | — | LP |
| Lindfield P&H | — | — | LP | LP | — | — | org |
| Elite P&H (ad-heavy) | ad | LP(ad) | LP(ad) | LP(ad) | — | — | — |
| Smart Heat Experts | — | — | — | — | LP | — | — |
| TP Heat | — | — | — | — | LP | org | — |
| Checkatrade (dir) | org | org | org | org | org | org | org |
| PDP Services | org | org | org | org | org | org | — |
| JD Heating (name clash) | org | org | org | org | — | org | — |

_LP = local pack, org = organic, ad = paid. Directories (Checkatrade/Trustatrader/MyBuilder/Yell) appear on essentially every query._

## Per-query worth-targeting verdict
| Query | Organic winnable? | Local-pack winnable? | Verdict |
|---|---|---|---|
| gas engineer burgess hill | hard (dirs) | **already won** | Defend GBP + homepage |
| boiler service burgess hill | medium | **won** | Service page + GBP |
| boiler repair burgess hill | medium | **gap → winnable** | Repair page + fix GBP services |
| landlord CP12 burgess hill | **yes** | n/a | **Priority content page** |
| boiler service near me | n/a | **won** | GBP-driven |
| gas engineer haywards heath | medium | **gap → winnable** | Town page + GBP area |
| boiler service hassocks | medium | **won #1** | Town page |
| emergency gas engineer BH | low | needs 24/7 | Skip unless offered |
| how often / cost (info heads) | no (national) | n/a | FAQ only, no blog |

## Competitive density verdict
**MODERATE and beatable.** No national brand owns these SERPs; directories do, and a cluster of local firms trade local-pack places. JDH's 5.0(24) GBP already out-positions most local rivals on rating quality. The win condition is **GBP optimisation + a fast, trustworthy, schema-rich local site**, not out-publishing manufacturers.
