import { SITE, REVIEWS } from "@/lib/site";

export function SiteJsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    image: `${SITE.url}/images/jamie-portrait.jpg`,
    url: `${SITE.url}/`,
    telephone: "+447544063330",
    email: SITE.email,
    priceRange: "££",
    areaServed: ["Burgess Hill", "Haywards Heath", "Hassocks", "Cuckfield"].map(
      (name) => ({ "@type": "City", name })
    ),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Burgess Hill",
      addressRegion: "West Sussex",
      postalCode: "RH15",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 50.957, longitude: -0.131 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Gas Safe Register",
      identifier: SITE.gasSafe,
    },
    sameAs: [SITE.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: r.text,
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
