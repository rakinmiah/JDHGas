# Phase 7 — Schema (JSON-LD recipes)

_JSON-LD only. Validate every snippet at validator.schema.org + Google Rich Results Test before launch. Never fabricate review/rating data — the 5.0 / 24 below is the real Google figure; keep it in sync or drop AggregateRating. Placeholders in ALL-CAPS need real values before ship (address line, lat/lng, hours, insurance) — flagged as open questions._

## Global — site-wide (every page, in root layout)
Use **HVACBusiness** (a `LocalBusiness` subtype) as the primary entity — most accurate for a heating engineer and Maps-eligible. Reference Jamie as `founder`/`employee` Person for E-E-A-T.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": "https://jdhgas.co.uk/#business",
  "name": "JDH Gas Services",
  "image": "https://jdhgas.co.uk/og/jamie-hannah.jpg",
  "logo": "https://jdhgas.co.uk/logo.png",
  "url": "https://jdhgas.co.uk/",
  "telephone": "+447544063330",
  "email": "info@jdhgas.co.uk",
  "priceRange": "££",
  "founder": { "@id": "https://jdhgas.co.uk/about#jamie" },
  "areaServed": [
    { "@type": "City", "name": "Burgess Hill" },
    { "@type": "City", "name": "Haywards Heath" },
    { "@type": "City", "name": "Hassocks" },
    { "@type": "City", "name": "Cuckfield" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Burgess Hill",
    "addressRegion": "West Sussex",
    "postalCode": "RH15",
    "addressCountry": "GB"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "LAT", "longitude": "LNG" },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00", "closes": "17:00"
  }],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Gas Safe Register",
    "identifier": "977838"
  },
  "sameAs": ["https://www.instagram.com/jdhgasservices/"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0", "reviewCount": "24"
  }
}
</script>
```
Plus a minimal **WebSite** entity (same layout):
```html
<script type="application/ld+json">
{ "@context":"https://schema.org","@type":"WebSite","@id":"https://jdhgas.co.uk/#website",
  "url":"https://jdhgas.co.uk/","name":"JDH Gas Services","publisher":{"@id":"https://jdhgas.co.uk/#business"} }
</script>
```
_**DECIDED (2026-05-25): locality-level only.** Omit street address everywhere (site + schema) — use `addressLocality: Burgess Hill`, `addressRegion: West Sussex`, `postalCode: RH15`, `addressCountry: GB`, plus `areaServed`. Set `geo` to the **Burgess Hill town centroid (≈51.957, -0.131)**, NOT the GBP's listed street coords (likely his home). The GBP itself may keep its full address; the website does not republish it._

## Homepage — adds nothing beyond global business + WebSite (avoid duplicate Organization).

## Service pages — `Service` + `BreadcrumbList` (+ FAQPage where a real FAQ exists)
Example (`/services/boiler-servicing`):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Boiler Servicing",
  "provider": { "@id": "https://jdhgas.co.uk/#business" },
  "areaServed": ["Burgess Hill","Haywards Heath","Hassocks","Cuckfield"],
  "description": "Annual gas boiler servicing by a Gas Safe registered engineer in Burgess Hill and Mid Sussex.",
  "offers": { "@type": "Offer", "price": "75", "priceCurrency": "GBP",
    "description": "First boiler service for new customers" }
}
</script>
```
_Set `offers.price` only where a real fixed price exists (the £75 new-customer service). For CP12/repairs without a fixed price, omit `offers` or use `priceSpecification` once Jamie confirms — never invent a number._

## CP12 page — `Service` + `FAQPage` + `BreadcrumbList` (the AI-Overview play)
FAQPage (only genuine Q&As that appear visibly on the page, answer-first):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is a CP12 / landlord gas safety certificate?",
      "acceptedAnswer": { "@type": "Answer",
        "text": "A CP12 is the Landlord Gas Safety Certificate. UK landlords must have every gas appliance, pipe and flue in a rented property checked every 12 months by a Gas Safe registered engineer." } },
    { "@type": "Question", "name": "How long is a gas safety certificate valid?",
      "acceptedAnswer": { "@type": "Answer", "text": "A CP12 is valid for 12 months and must be renewed annually. You must give tenants a copy within 28 days and keep records for at least two years." } },
    { "@type": "Question", "name": "Do homeowners need a gas safety certificate?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — a CP12 is a legal requirement only for landlords. Homeowners aren't required to have one, but an annual gas safety check is still strongly recommended for safety." } }
  ]
}
</script>
```
Add `speakable` to the CP12 + servicing answer paragraphs (voice/AI):
```json
"speakable": { "@type": "SpeakableSpecification", "cssSelector": [".answer-lead"] }
```
_attach speakable to the `WebPage` node of those pages, targeting the answer-first lead paragraphs._

## Town pages — `Service`/`HVACBusiness` reference + `BreadcrumbList`
Reuse the global business `@id` as provider; add `BreadcrumbList`:
```html
<script type="application/ld+json">
{ "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
  {"@type":"ListItem","position":1,"name":"Home","item":"https://jdhgas.co.uk/"},
  {"@type":"ListItem","position":2,"name":"Areas","item":"https://jdhgas.co.uk/areas"},
  {"@type":"ListItem","position":3,"name":"Burgess Hill","item":"https://jdhgas.co.uk/areas/burgess-hill"}
]}
</script>
```

## About page — `Person` (E-E-A-T anchor for YMYL)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://jdhgas.co.uk/about#jamie",
  "name": "Jamie Hannah",
  "jobTitle": "Gas Safe Registered Engineer",
  "worksFor": { "@id": "https://jdhgas.co.uk/#business" },
  "knowsAbout": ["Boiler servicing","Boiler repair","Gas safety certificates (CP12)","Gas appliance installation"],
  "hasCredential": { "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Gas Safe Register", "identifier": "977838" }
}
</script>
```

## Reviews page — `Review` (genuine, with consent) referencing the business
```html
<script type="application/ld+json">
{ "@context":"https://schema.org","@type":"Review",
  "itemReviewed":{"@id":"https://jdhgas.co.uk/#business"},
  "author":{"@type":"Person","name":"James"},
  "reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},
  "reviewBody":"Very thorough, knowledgeable and took his time on our boiler. A very professional service." }
</script>
```
_Only mark up reviews actually displayed on the page, with the customer's real name as shown publicly on Google. Keep `aggregateRating` (global business) in sync with the live Google count._

## Gallery — `ImageObject` per featured photo (image-pack eligibility)
Each gallery image: `ImageObject` with `contentUrl`, honest `caption`/`name`, `creator` = the business. Optional but supports the image-pack opportunity from Phase 2.

## Multi-schema nesting note
Service pages emit **Service + BreadcrumbList** (+ FAQPage if a real FAQ block exists); the global **HVACBusiness + WebSite** load site-wide via the root layout. About emits **Person** (linked from business `founder` + Service `provider`). Cross-`@id` references (`#business`, `#jamie`) consolidate the entity graph — do not duplicate the full business object on every page; reference it by `@id`.

## YMYL gate
Gas safety = YMYL. E-E-A-T satisfied via: `hasCredential` (Gas Safe 977838) on both business + Person; named real engineer (Jamie Hannah) with `knowsAbout`; real reviews; real job photos. No medical/financial reviewer needed (trade safety), but accuracy of all safety/legal statements is mandatory — CP12 legal facts above are correct per Gas Safety (Installation and Use) Regulations 1998.
```
