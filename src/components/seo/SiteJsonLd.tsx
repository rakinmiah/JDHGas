import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

export async function SiteJsonLd() {
  const { rating, count } = await getGoogleReviews();
  const business = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    image: `${SITE.url}/images/jamie-portrait.jpg`,
    logo: `${SITE.url}/shield-logo.png`,
    url: `${SITE.url}/`,
    telephone: "+447544063330",
    email: SITE.email,
    priceRange: "££",
    areaServed: [
      "Burgess Hill",
      "Haywards Heath",
      "Hassocks",
      "Cuckfield",
      "Hove",
      "Portslade",
      "Lancing",
    ].map((name) => ({ "@type": "City", name })),
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
      ratingValue: rating,
      reviewCount: count,
    },
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
