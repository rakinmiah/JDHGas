import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Flame, ClipboardCheck, Wrench, CookingPot, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { ServiceStepList } from "@/components/sections/ServiceStepList";
import { Reviews } from "@/components/home/Reviews";
import { CtaBand } from "@/components/home/CtaBand";
import { CoverageMap } from "@/components/home/CoverageMap";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_CONTENT, getService } from "@/lib/services-content";
import { SITE } from "@/lib/site";

const AREAS = [
  "Burgess Hill",
  "Haywards Heath",
  "Hassocks",
  "Cuckfield",
  "Ditchling",
  "Lindfield",
  "Wivelsfield",
  "Keymer",
];

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  "boiler-servicing": Flame,
  "gas-safety-certificate": ClipboardCheck,
  "boiler-repairs": Wrench,
  "gas-appliances": CookingPot,
};

function firstSentence(text: string) {
  return text.split(". ")[0].replace(/\.*$/, "") + ".";
}

export function generateStaticParams() {
  return SERVICE_CONTENT.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `${SITE.url}/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.serviceType,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: ["Burgess Hill", "Haywards Heath", "Hassocks", "Cuckfield"],
    description: s.metaDescription,
    ...(s.offerPrice
      ? { offers: { "@type": "Offer", price: s.offerPrice, priceCurrency: "GBP", description: "First boiler service for new customers" } }
      : {}),
  };

  const others = SERVICE_CONTENT.filter((o) => o.slug !== s.slug);
  const listBlock = s.blocks.find((b) => b.bullets && b.bullets.length);
  const proseBlocks = s.blocks.filter((b) => b !== listBlock);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <PageHero
        eyebrow={s.eyebrow}
        title={s.h1}
        intro={s.lead}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.navTitle, href: `/services/${s.slug}` }]}
        image={s.image}
        imageAlt={s.imageAlt}
      />

      {/* Sticky context column + numbered scrolling list */}
      <section className="section bg-surface">
        <div className="container-page">
          {listBlock ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,38%)_1fr] lg:gap-16">
              {/* Numbered list — first on mobile, right on desktop */}
              <div className="lg:order-2">
                <h2 className="font-display text-xl font-bold">{listBlock.heading}</h2>
                {listBlock.body && (
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{listBlock.body}</p>
                )}
                <ServiceStepList items={listBlock.bullets!} />
              </div>

              {/* Sticky context (the "When to book" text) — second on mobile, left on desktop */}
              <div className="lg:sticky lg:top-28 lg:order-1 lg:self-start">
                <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-ink p-7 text-inverse shadow-[var(--shadow-md)] md:p-8">
                  <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
                  <div className="relative">
                    <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-white/10 text-flame">
                      <Flame className="h-6 w-6" aria-hidden />
                    </span>
                    {proseBlocks.map((b, i) => (
                      <div key={b.heading} className={i === 0 ? "mt-5" : "mt-6"}>
                        {i === 0 ? (
                          <h2 className="font-display text-2xl font-bold tracking-tight text-inverse md:text-3xl">
                            {b.heading}
                          </h2>
                        ) : (
                          <h3 className="font-display text-lg font-bold text-inverse">{b.heading}</h3>
                        )}
                        {b.body && <p className="mt-3 leading-relaxed text-inverse/80">{b.body}</p>}
                      </div>
                    ))}
                    <Button
                      href={SITE.phoneHref}
                      className="mt-7 w-full"
                      aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
                    >
                      <Phone className="h-5 w-5" aria-hidden /> Call to book
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-12">
              {s.blocks.map((b) => (
                <Reveal as="article" key={b.heading}>
                  <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{b.heading}</h2>
                  {b.body && <p className="mt-3 text-lg leading-relaxed text-muted">{b.body}</p>}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Areas I cover — text + chips alongside the live coverage map */}
      <section className="section bg-sunken" aria-labelledby="area-h">
        <Reveal className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 id="area-h" className="mt-2 font-display text-2xl font-bold md:text-3xl">
              Areas I cover
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m based in Burgess Hill and cover the surrounding Mid Sussex towns and villages,
              including these nearby.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-1.5 text-sm font-medium"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
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

      <Reviews tone="surface" />

      {/* Other services — cards */}
      <section className="section bg-sunken">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Other services</h2>
          <Reveal as="ul" className="mt-7 grid gap-5 sm:grid-cols-3">
            {others.map((o) => {
              const Icon = ICON_BY_SLUG[o.slug] ?? Flame;
              return (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{o.navTitle}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{firstSentence(o.lead)}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </Reveal>
        </div>
      </section>

      <FaqSection items={[...s.faqs]} />
      <CtaBand />
    </>
  );
}
