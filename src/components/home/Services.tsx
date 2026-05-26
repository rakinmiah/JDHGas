import Link from "next/link";
import { Wrench, ClipboardCheck, CookingPot, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";
import { SERVICES } from "@/lib/site";

const ICONS = { Wrench, ClipboardCheck, CookingPot } as const;

export function Services() {
  const [featured, ...rest] = SERVICES;

  return (
    <section className="section bg-surface" aria-labelledby="services-h">
      <div className="container-page">
        <p className="eyebrow">Services</p>
        <h2 id="services-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
          What I can help with
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured — boiler servicing: a wide ink banner carrying the £75 hook */}
          <Reveal as="li" className="lg:col-span-3">
            <Link
              href={featured.href}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] bg-ink p-6 text-inverse transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
              />
              <div className="relative">
                <BrandMark className="h-14 w-14" />
                <h3 className="mt-4 font-display text-lg font-semibold text-inverse">{featured.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-inverse/80">{featured.blurb}</p>
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
          </Reveal>

          {/* The other three — light cards in a row beneath */}
          {rest.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Reveal as="li" key={s.href} delay={(i + 1) * 0.06}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
