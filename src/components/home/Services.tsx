import Link from "next/link";
import { Flame, Wrench, ClipboardCheck, CookingPot, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/site";

const ICONS = { Flame, Wrench, ClipboardCheck, CookingPot } as const;

export function Services() {
  return (
    <section className="section bg-surface" aria-labelledby="services-h">
      <div className="container-page">
        <p className="eyebrow">Services</p>
        <h2 id="services-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
          What I can help with
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Reveal as="li" key={s.href} delay={i * 0.06}>
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
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
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
