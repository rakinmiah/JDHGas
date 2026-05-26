import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, ClipboardCheck, Wrench, CookingPot } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Reviews } from "@/components/home/Reviews";
import { CtaBand } from "@/components/home/CtaBand";
import { SERVICE_CONTENT } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Our Services | JDH Gas Services, Burgess Hill",
  description:
    "Boiler servicing, landlord gas safety certificates, heating system repairs and gas hob installs in Burgess Hill & Mid Sussex. Gas Safe registered engineer.",
  alternates: { canonical: "/services" },
};

const ICONS = [Flame, ClipboardCheck, Wrench, CookingPot];

function firstSentence(text: string) {
  return text.split(". ")[0].replace(/\.*$/, "") + ".";
}

export default function ServicesHub() {
  const [featured, ...rest] = SERVICE_CONTENT;
  const FeaturedIcon = ICONS[0];

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Gas & heating services in Burgess Hill"
        intro="The gas and heating work I do as a Gas Safe registered engineer across Burgess Hill and Mid Sussex: boiler servicing, landlord gas safety certificates, heating repairs and gas hob installs. Pick a service to see what's involved."
        crumbs={[{ label: "Services", href: "/services" }]}
      />

      <section className="section bg-surface" aria-label="Our services">
        <Reveal as="ul" className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured — boiler servicing */}
          <li className="sm:col-span-2 lg:col-span-3">
            <Link
              href={`/services/${featured.slug}`}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] bg-ink p-6 text-inverse transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8"
            >
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-white/10 text-flame">
                  <FeaturedIcon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-inverse">{featured.navTitle}</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-inverse/80">{firstSentence(featured.lead)}</p>
              </div>
              <div className="relative flex shrink-0 flex-col items-start gap-4 lg:items-end">
                <span className="inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] bg-flame px-4 py-1.5 text-sm font-bold text-ink">
                  New customers from £75
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-inverse">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </li>

          {/* The other three */}
          {rest.map((s, i) => {
            const Icon = ICONS[(i + 1) % ICONS.length];
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold">{s.navTitle}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{firstSentence(s.lead)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </section>

      <Reviews />
      <CtaBand />
    </>
  );
}
