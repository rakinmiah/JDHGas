import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Check, ArrowRight } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { Reviews } from "@/components/home/Reviews";
import { CtaBand } from "@/components/home/CtaBand";
import { TOWN_CONTENT, getTown } from "@/lib/towns-content";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return TOWN_CONTENT.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTown(slug);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/areas/${t.slug}` },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: `${SITE.url}/areas/${t.slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTown(slug);
  if (!t) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${t.name} · ${t.postcode}`}
        title={`Gas engineer in ${t.name}`}
        intro={t.lead}
        crumbs={[{ label: "Areas", href: "/areas" }, { label: t.name, href: `/areas/${t.slug}` }]}
      />

      <section className="section bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_minmax(300px,38%)] lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">What I can help with in {t.name}</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {SERVICE_CONTENT.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle p-5 transition-colors hover:border-primary">
                    <span className="font-display font-semibold">{s.navTitle}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold md:text-3xl">Local to {t.name}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t.localNote}</p>
            <div className="mt-5 rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-5">
              <p className="flex items-center gap-2 font-semibold text-ink">
                <MapPin className="h-5 w-5 text-primary" aria-hidden /> Nearby areas I also cover
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.neighbours.map((n) => (
                  <li key={n} className="rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3 py-1.5 text-sm text-muted">{n}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6">
              <p className="font-display text-lg font-bold">Book in {t.name}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden /> Gas Safe registered · {SITE.gasSafe}</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden /> 5.0★ from 24 Google reviews</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden /> First boiler service from £75</li>
              </ul>
              <div className="mt-4 flex flex-col gap-2">
                <a href={SITE.phoneHref} className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-pill)] bg-primary px-4 font-semibold text-white hover:bg-primary-hover">Call {SITE.phoneDisplay}</a>
                <a href={SITE.whatsappHref} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-whatsapp px-4 font-semibold text-white hover:bg-whatsapp-hover"><WhatsAppGlyph className="h-5 w-5" /> WhatsApp</a>
                <Link href="/contact" className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-pill)] border border-border-strong px-4 font-semibold hover:border-primary hover:text-primary">Send an enquiry</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection items={[...t.faqs]} heading={`Gas engineer in ${t.name} — your questions`} />
      <Reviews />
      <CtaBand />
    </>
  );
}
