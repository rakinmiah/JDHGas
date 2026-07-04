import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandMark";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { GasSafeBadge } from "@/components/ui/GasSafeBadge";
import { HeroSocialProof } from "@/components/sections/HeroSocialProof";
import { Reveal } from "@/components/ui/Reveal";
import { Reviews } from "@/components/home/Reviews";
import { LogoStrip } from "@/components/home/LogoStrip";
import { ContactSection } from "@/components/home/ContactSection";
import { CoverageMap } from "@/components/home/CoverageMap";
import { PostcodeChecker } from "@/components/sections/PostcodeChecker";
import { LOCAL_TOWNS, townUrl } from "@/lib/local-pages";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = {
  title: "Areas I Cover | JDH Gas Services, Burgess Hill",
  description:
    "Gas Safe registered engineer Jamie Hannah covers Burgess Hill, Mid Sussex and the coast — Haywards Heath, Hassocks, Hurstpierpoint, Hove, Portslade, Lewes, Henfield and more. Pick your town.",
  alternates: { canonical: "/areas" },
};

export default async function AreasHub() {
  const { rating, count, reviews } = await getGoogleReviews();

  // ItemList ties the hub to every town page so Google sees the cluster.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: LOCAL_TOWNS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Gas & heating engineer in ${t.name}`,
      url: townUrl(t.slug),
    })),
  };

  const checkerTowns = LOCAL_TOWNS.map((t) => ({
    name: t.name,
    slug: t.slug,
    postcode: t.postcode,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      {/* Hero — copy left, live coverage map right (P3 + P8) */}
      <section className="border-b border-border-subtle bg-sunken">
        <div className="container-page pt-6">
          <Breadcrumbs items={[{ label: "Areas", href: "/areas" }]} />
        </div>
        <div className="container-page grid gap-8 pb-10 pt-4 md:grid-cols-[44fr_56fr] md:items-stretch md:gap-10 md:py-10 lg:gap-14">
          <div className="md:self-center">
            <p className="eyebrow">Areas I cover</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Gas &amp; heating engineer across Mid Sussex &amp; the coast
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m Jamie Hannah, a Gas Safe registered engineer based in Burgess Hill, covering
              Mid Sussex and down to the coast for boiler servicing, landlord gas safety
              certificates (CP12), repairs and installs. Pick your town, or check your postcode
              below.
            </p>

            <div className="mt-5 flex flex-col items-start gap-3">
              <GasSafeBadge />
              <HeroSocialProof rating={rating} count={count} reviews={reviews} />
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              <Button
                href={SITE.phoneHref}
                className="w-full md:w-auto"
                aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
              >
                <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
              </Button>
              <div className="flex gap-3 md:contents">
                <Button href={SITE.whatsappHref} variant="whatsapp" className="flex-1 md:flex-none">
                  WhatsApp
                </Button>
                <Button href="/contact" variant="secondary" className="flex-1 md:flex-none">
                  <span className="md:hidden">Enquire</span>
                  <span className="hidden md:inline">Send an enquiry</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Live coverage map — the page's subject, filling the hero's right column */}
          <div className="relative isolate z-0 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-3 shadow-[var(--shadow-sm)]">
            <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-[var(--shadow-sm)] backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              Based in Burgess Hill · {SITE.postcodeArea}
            </span>
            <div className="h-[320px] md:h-full md:min-h-[26rem]">
              <CoverageMap />
            </div>
          </div>
        </div>
      </section>

      {/* Postcode check + town cards */}
      <section className="section bg-surface" aria-labelledby="towns-h">
        <div className="container-page">
          <p className="eyebrow">Towns I cover</p>
          <h2 id="towns-h" className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Do I cover you? Check your postcode
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Type your postcode for an instant answer, or pick your town below — each area page has
            the services I offer there, real local reviews and how to book.
          </p>
          <div className="mt-6">
            <PostcodeChecker towns={checkerTowns} />
          </div>

          <Reveal as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOCAL_TOWNS.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                >
                  {t.photo && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-sunken">
                      <Image
                        src={t.photo}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold">
                      {t.name} <span className="font-normal text-muted">· {t.postcode}</span>
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                      {t.blurb ?? "Boiler servicing, CP12 certificates, repairs & installs."}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      View {t.name}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            {/* 8th card — honest "somewhere nearby?" CTA, completes the 4×2 grid */}
            <li>
              <a
                href={`${SITE.whatsappHref}?text=${encodeURIComponent(
                  "Hi Jamie, do you cover my area? My postcode is ",
                )}`}
                target="_blank"
                rel="noopener"
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-ink p-6 text-inverse transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/25 blur-3xl"
                />
                <div className="relative flex h-full flex-col">
                  <BrandMark className="h-11 w-11" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-inverse">
                    Somewhere nearby?
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-inverse/80">
                    I cover more villages than fit on this page. Send your postcode and I&apos;ll
                    tell you straight away.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-inverse">
                    <WhatsAppGlyph className="h-4 w-4" /> WhatsApp your postcode
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            </li>
          </Reveal>
        </div>
      </section>

      {/* Boiler-make wall — slim ink variant */}
      <LogoStrip compact />

      <Reviews tone="sunken" />
      <ContactSection />
    </>
  );
}
