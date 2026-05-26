import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { Reviews } from "@/components/home/Reviews";
import { CtaBand } from "@/components/home/CtaBand";
import { SERVICE_CONTENT, getService } from "@/lib/services-content";
import { SITE } from "@/lib/site";

const AREA_LINKS = [
  { name: "Burgess Hill", href: "/areas/burgess-hill" },
  { name: "Haywards Heath", href: "/areas/haywards-heath" },
  { name: "Hassocks", href: "/areas/hassocks" },
  { name: "Cuckfield", href: "/areas/cuckfield" },
];

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <PageHero
        eyebrow={s.eyebrow}
        title={s.h1}
        intro={s.lead}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.navTitle, href: `/services/${s.slug}` }]}
      />

      <section className="section bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_minmax(320px,40%)] lg:gap-14">
          <div className="space-y-10">
            {s.blocks.map((b) => (
              <div key={b.heading}>
                <h2 className="font-display text-2xl font-bold md:text-3xl">{b.heading}</h2>
                {b.body && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{b.body}</p>}
                {b.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {b.bullets.map((li) => (
                      <li key={li} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                        <span className="text-text">{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Areas I cover</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                Based in Burgess Hill, I cover the surrounding Mid Sussex towns and villages.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AREA_LINKS.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                    >
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
              <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6">
              <p className="font-display text-lg font-bold">Book {s.navTitle.toLowerCase()}</p>
              <p className="mt-2 text-sm text-muted">
                Gas Safe registered · {SITE.gasSafe} · {SITE.rating.value}★ from {SITE.rating.count} reviews.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button href={SITE.phoneHref} className="w-full" aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
                  <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
                </Button>
                <Button href={SITE.whatsappHref} variant="whatsapp" className="w-full">WhatsApp</Button>
                <Button href="/contact" variant="secondary" className="w-full">Send an enquiry</Button>
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border-subtle p-6">
              <p className="text-sm font-semibold text-ink">Other services</p>
              <ul className="mt-3 space-y-2 text-sm">
                {SERVICE_CONTENT.filter((o) => o.slug !== s.slug).map((o) => (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-hover">
                      {o.navTitle} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection items={[...s.faqs]} />
      <Reviews />
      <CtaBand />
    </>
  );
}
