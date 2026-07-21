import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Star, Wrench, Hammer, CookingPot, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandMark";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection, type Faq } from "@/components/sections/FaqSection";
import { ServiceStepList } from "@/components/sections/ServiceStepList";
import { TownReviews } from "@/components/sections/TownReviews";
import { AreaLink } from "@/components/personalization/AreaPersonalization";
import { Reviews } from "@/components/home/Reviews";
import { LogoStrip } from "@/components/home/LogoStrip";
import { ContactSection } from "@/components/home/ContactSection";
import { CoverageMap } from "@/components/home/CoverageMap";
import { GoogleReviewsLink } from "@/components/ui/GoogleReviewsLink";
import { Reveal } from "@/components/ui/Reveal";
import {
  LOCAL_TOWNS,
  SECTION_SERVICES,
  ALSO_SERVICES,
  getTown,
  otherTowns,
  townPhoto,
  serviceAngle,
  townMetaTitle,
  townMetaDescription,
  townUrl,
  type Town,
} from "@/lib/local-pages";
import type { ServiceContent } from "@/lib/services-content";
import { SITE, OG_IMAGE, TWITTER_IMAGE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

export const dynamicParams = false;

const ALSO_ICONS: Record<string, LucideIcon> = {
  "boiler-repairs": Wrench,
  "boiler-heating-installation": Hammer,
  "gas-appliances": CookingPot,
};

export function generateStaticParams() {
  return LOCAL_TOWNS.map((t) => ({ localPage: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ localPage: string }>;
}): Promise<Metadata> {
  const { localPage } = await params;
  const town = getTown(localPage);
  if (!town) return {};
  const title = townMetaTitle(town);
  const description = townMetaDescription(town);
  return {
    title,
    description,
    alternates: { canonical: `/${town.slug}` },
    openGraph: { title, description, url: townUrl(town.slug), images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [TWITTER_IMAGE] },
  };
}

/** Section H2 — keeps the high-intent "[service] in [town]" phrasing. */
function sectionHeading(svc: ServiceContent, name: string) {
  if (svc.slug === "gas-safety-certificate")
    return `Landlord gas safety certificates (CP12) in ${name}`;
  if (svc.slug === "boiler-servicing") return `Boiler servicing in ${name}`;
  return `${svc.navTitle} in ${name}`;
}

/** Town-specific FAQs followed by the two lead services' top FAQs (deduped). */
function buildFaqs(town: Town): Faq[] {
  const out: Faq[] = [...town.faqs];
  for (const svc of SECTION_SERVICES) {
    for (const f of svc.faqs.slice(0, 2)) {
      if (!out.some((x) => x.q === f.q)) out.push(f);
    }
  }
  return out;
}

export default async function LocalTownPage({
  params,
}: {
  params: Promise<{ localPage: string }>;
}) {
  const { localPage } = await params;
  const town = getTown(localPage);
  if (!town) notFound();

  const url = townUrl(town.slug);
  const faqs = buildFaqs(town);
  const others = otherTowns(town);
  const hero = townPhoto(town);
  // Live Google rating + count (falls back to SITE.rating when no API key is set).
  const { rating, count, reviews: googleReviews } = await getGoogleReviews();

  // Only the Service nodes are emitted here: the BreadcrumbList is emitted by
  // <Breadcrumbs> (inside PageHero) and the FAQPage by <FaqSection>, so emitting
  // them again would duplicate the schema. The business entity + AggregateRating
  // lives in <SiteJsonLd> (#business), which these Services reference as provider.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [...SECTION_SERVICES, ...ALSO_SERVICES].map((svc) => ({
      "@type": "Service",
      "@id": `${url}#service-${svc.slug}`,
      serviceType: svc.serviceType,
      name: sectionHeading(svc, town.name),
      url,
      provider: { "@id": `${SITE.url}/#business` },
      areaServed: { "@type": "City", name: town.name },
      description: serviceAngle(town, svc.slug) ?? svc.metaDescription,
      // NOTE: no `review`/`aggregateRating` here — Service is not a supported
      // type for Google review snippets (flagged by Search Console). Review
      // markup lives on the HVACBusiness entity in SiteJsonLd instead; the
      // town reviews remain as visible page content.
      ...(svc.offerPrice
        ? {
            offers: {
              "@type": "Offer",
              price: svc.offerPrice,
              priceCurrency: "GBP",
              description: "First boiler service for new customers",
            },
          }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={`Gas engineer · ${town.name}`}
        title={`Gas & heating engineer in ${town.name}`}
        intro={town.intro}
        crumbs={[
          { label: "Areas", href: "/areas" },
          { label: town.name, href: `/${town.slug}` },
        ]}
        image={hero.src}
        imageAlt={hero.alt}
        rating={rating}
        reviewCount={count}
        reviews={googleReviews}
      />

      {/* Lead services — CP12 then servicing, each a two-column signature ink
          context-panel + numbered ServiceStepList, mirrored so the cards sit on
          opposite sides (CP12 left, servicing right). */}
      {SECTION_SERVICES.map((svc) => {
        const bulletBlock = svc.blocks.find((b) => b.bullets);
        const isCp12 = svc.slug === "gas-safety-certificate";
        return (
          <section
            key={svc.slug}
            className={`section ${isCp12 ? "bg-surface" : "bg-sunken"}`}
            aria-labelledby={`svc-${svc.slug}`}
          >
            <div className="container-page">
              <Reveal className="max-w-2xl">
                <p className="eyebrow">{svc.navTitle}</p>
                <h2
                  id={`svc-${svc.slug}`}
                  className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl"
                >
                  {sectionHeading(svc, town.name)}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {town.serviceAngles[svc.slug]}
                </p>
              </Reveal>

              <div
                className={`mt-10 grid gap-10 lg:gap-16 ${
                  isCp12
                    ? "lg:grid-cols-[minmax(0,38%)_1fr]"
                    : "lg:grid-cols-[1fr_minmax(0,38%)]"
                }`}
              >
                {/* Context panel — sticky on desktop; right column on servicing */}
                <div
                  className={`lg:sticky lg:top-28 lg:self-start ${
                    isCp12 ? "" : "lg:order-2"
                  }`}
                >
                  {isCp12 ? (
                    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-ink p-7 text-inverse shadow-[var(--shadow-md)] md:p-8">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
                      />
                      <div className="relative">
                        <BrandMark className="h-12 w-12" />
                        <h3 className="mt-5 font-display text-xl font-bold text-inverse">
                          Landlord or letting agent?
                        </h3>
                        <p className="mt-3 leading-relaxed text-inverse/80">
                          You get a digital certificate by email, a free reminder when it&apos;s
                          due, and I&apos;ll arrange access with your tenants. Send your postcode and
                          how many gas appliances you have for a clear fixed price.
                        </p>
                        <Button
                          href={SITE.phoneHref}
                          className="mt-6 w-full"
                          aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
                        >
                          <Phone className="h-5 w-5" aria-hidden /> Call to book
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-ink p-7 text-inverse shadow-[var(--shadow-md)] md:p-8">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
                      />
                      <div className="relative">
                        <BrandMark className="h-12 w-12" />
                        <span className="mt-5 inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] bg-flame px-3.5 py-1 text-sm font-bold text-ink">
                          New customers £85
                        </span>
                        <p className="mt-4 leading-relaxed text-inverse/80">
                          A full Gas Safe service: no rushing, no skipped steps. Your annual check
                          keeps the boiler safe, efficient and within its warranty.
                        </p>
                        <Button
                          href={SITE.phoneHref}
                          className="mt-6 w-full"
                          aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
                        >
                          <Phone className="h-5 w-5" aria-hidden /> Call to book
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Numbered steps */}
                <div className={isCp12 ? "" : "lg:order-1"}>
                  {bulletBlock && (
                    <>
                      <h3 className="font-display text-xl font-bold">{bulletBlock.heading}</h3>
                      <ServiceStepList items={bulletBlock.bullets!} />
                    </>
                  )}
                  <AreaLink
                    href={`/services/${svc.slug}`}
                    area={town.name}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
                  >
                    More about {svc.navTitle}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </AreaLink>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Boiler-make wall — slim ink variant; the page's single mid-ink moment */}
      <LogoStrip compact />

      {/* Reviews — localised where we have town reviews, else the general block */}
      {town.reviews && town.reviews.length > 0 ? (
        <section className="section bg-sunken" aria-labelledby="local-reviews-h">
          <Reveal className="container-page grid gap-10 lg:grid-cols-[minmax(0,38%)_1fr] lg:items-center lg:gap-16">
            {/* Header + aggregate rating (the section's single Google CTA) */}
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 id="local-reviews-h" className="mt-2 font-display text-2xl font-bold md:text-3xl">
                What {town.name} customers say
              </h2>
              <div className="mt-6 flex items-center gap-4">
                <p className="font-display text-6xl font-extrabold leading-none text-ink">
                  {rating}
                </p>
                <div>
                  <div className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gas-safe text-gas-safe" />
                    ))}
                  </div>
                  <p className="mt-1.5 text-sm text-muted">
                    <span className="sr-only">Rated {rating} out of 5. </span>from {count} Google
                    reviews
                  </p>
                </div>
              </div>
              <GoogleReviewsLink className="mt-6" />
            </div>

            {/* The town's review(s) — big left-aligned quote */}
            <div className="lg:pt-1">
              <TownReviews reviews={town.reviews} />
            </div>
          </Reveal>
        </section>
      ) : (
        <Reviews tone="sunken" />
      )}

      {/* Also offered locally — standard icon cards */}
      <section className="section bg-surface" aria-labelledby="also-h">
        <div className="container-page">
          <p className="eyebrow">Also in {town.name}</p>
          <h2 id="also-h" className="mt-2 font-display text-2xl font-bold md:text-3xl">
            The rest of what I do in {town.name}
          </h2>
          <Reveal as="ul" className="mt-8 grid gap-5 sm:grid-cols-3">
            {ALSO_SERVICES.map((svc) => {
              const Icon = ALSO_ICONS[svc.slug] ?? Wrench;
              return (
                <li key={svc.slug}>
                  <AreaLink
                    href={`/services/${svc.slug}`}
                    area={town.name}
                    className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{svc.navTitle}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {serviceAngle(town, svc.slug) ?? svc.lead.split(". ")[0].replace(/\.*$/, "") + "."}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </AreaLink>
                </li>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Coverage — text + chips alongside the live coverage map (P8) */}
      <section className="section bg-sunken" aria-labelledby="coverage-h">
        <Reveal className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 id="coverage-h" className="mt-2 font-display text-2xl font-bold md:text-3xl">
              Covering {town.name} ({town.postcode}) &amp; nearby
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m based in Burgess Hill and cover {town.name} and the surrounding area,
              including {town.nearby.join(", ")}. Not sure if I reach you? Send your postcode and
              I&apos;ll let you know.
            </p>
            <Button
              href={`${SITE.whatsappHref}?text=${encodeURIComponent(
                `Hi Jamie, I'm in ${town.name} and my postcode is `,
              )}`}
              variant="whatsapp"
              className="mt-6"
            >
              Send your postcode on WhatsApp
            </Button>

            {town.areas && town.areas.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {town.areas.map((a) => (
                  <li
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-1.5 text-sm font-medium"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            )}

            {others.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-ink">Other areas I cover:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {others.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/${t.slug}`}
                        className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                      >
                        {t.name}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative isolate z-0 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-3 shadow-[var(--shadow-sm)]">
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-[var(--shadow-sm)] backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              Based in Burgess Hill · {SITE.postcodeArea}
            </span>
            <div className="aspect-[420/360]">
              <CoverageMap />
            </div>
          </div>
        </Reveal>
      </section>

      <FaqSection items={faqs} />
      <ContactSection town={town.name} />
    </>
  );
}
