import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";
import { Reviews } from "@/components/home/Reviews";
import { LogoStrip } from "@/components/home/LogoStrip";
import { ContactSection } from "@/components/home/ContactSection";
import { CoverageMap } from "@/components/home/CoverageMap";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { SERVICES } from "@/lib/site";
import { LOCAL_TOWNS } from "@/lib/local-pages";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = {
  title: "Our Services | JDH Gas Services, Burgess Hill",
  description:
    "Boiler servicing, landlord gas safety certificates, heating system repairs and gas hob installs in Burgess Hill & Mid Sussex. Gas Safe registered engineer.",
  alternates: { canonical: "/services" },
};

/** Real job photos fronting each service card. */
const PHOTO_BY_SLUG: Record<string, { src: string; alt: string }> = {
  "gas-safety-certificate": {
    src: "/images/work/manometer.jpg",
    alt: "Gas pressure test during a landlord gas safety check",
  },
  "boiler-repairs": {
    src: "/images/work/analyser-worcester.jpg",
    alt: "Diagnosing a boiler fault with a flue gas analyser",
  },
  "boiler-heating-installation": {
    src: "/images/work/vaillant-install.jpg",
    alt: "A newly installed Vaillant boiler",
  },
  "gas-appliances": {
    src: "/images/work/gas-hob.jpg",
    alt: "A gas hob installed and safety-tested",
  },
};

/** The homepage's one-line service blurbs, reused so copy stays consistent. */
function shortBlurb(slug: string) {
  return SERVICES.find((s) => s.href === `/services/${slug}`)?.blurb ?? "";
}

export default async function ServicesHub() {
  const { rating, count, reviews } = await getGoogleReviews();
  const [featured, ...rest] = SERVICE_CONTENT;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Gas & heating services in Burgess Hill"
        intro="The gas and heating work I do as a Gas Safe registered engineer across Burgess Hill and Mid Sussex: boiler servicing, landlord gas safety certificates, heating repairs and gas hob installs. Pick a service to see what's involved."
        crumbs={[{ label: "Services", href: "/services" }]}
        image="/images/work/boiler-service-inspection.jpg"
        imageAlt="Jamie Hannah, Gas Safe registered engineer, inspecting an open boiler during an annual service"
        rating={rating}
        reviewCount={count}
        reviews={reviews}
      />

      <section className="section bg-surface" aria-label="Our services">
        <Reveal as="ul" className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Featured — boiler servicing */}
          <li className="sm:col-span-2 lg:col-span-4">
            <Link
              href={`/services/${featured.slug}`}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] bg-ink p-6 text-inverse transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8"
            >
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
              <div className="relative">
                <BrandMark className="h-14 w-14" />
                <h2 className="mt-4 font-display text-lg font-semibold text-inverse">{featured.navTitle}</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-inverse/80">{shortBlurb(featured.slug)}</p>
              </div>
              <div className="relative flex shrink-0 flex-col items-start gap-4 lg:items-end">
                <span className="inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] bg-flame px-4 py-1.5 text-sm font-bold text-ink">
                  New customers from £85
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-inverse">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </li>

          {/* The other four — real job photos fronting each card */}
          {rest.map((s) => {
            const photo = PHOTO_BY_SLUG[s.slug];
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                >
                  {photo && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-sunken">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-lg font-semibold">{s.navTitle}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {shortBlurb(s.slug)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </section>

      {/* Boiler-make wall — slim ink variant */}
      <LogoStrip compact />

      {/* Town landing pages — text + chips alongside the live coverage map (P8) */}
      <section className="section bg-sunken" aria-labelledby="areas-h">
        <Reveal className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">Areas I cover</p>
            <h2 id="areas-h" className="mt-2 font-display text-2xl font-bold md:text-3xl">
              Gas &amp; heating services near you
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Based in Burgess Hill and covering Mid Sussex and down to the coast. Pick your town
              for boiler servicing, a landlord gas safety certificate (CP12), repairs and more.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {LOCAL_TOWNS.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href="/areas"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-hover"
              >
                See all the areas I cover
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </p>
          </div>

          <div className="relative isolate z-0 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-3 shadow-[var(--shadow-sm)]">
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-[var(--shadow-sm)] backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              Based in Burgess Hill · RH15
            </span>
            <div className="aspect-[420/360]">
              <CoverageMap />
            </div>
          </div>
        </Reveal>
      </section>

      <Reviews tone="surface" />
      <ContactSection />
    </>
  );
}
