import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, ClipboardCheck, Wrench, CookingPot } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/home/CtaBand";
import { SERVICE_CONTENT } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Our Services | JDH Gas Services, Burgess Hill",
  description:
    "Boiler servicing, landlord gas safety certificates, heating system repairs & gas hob installs in Burgess Hill & Mid Sussex. Gas Safe registered engineer.",
  alternates: { canonical: "/services" },
};

const ICONS = [Flame, ClipboardCheck, Wrench, CookingPot];

export default function ServicesHub() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Gas & heating services across Mid Sussex"
        intro="Everything I offer as a Gas Safe registered engineer in Burgess Hill — boiler servicing, landlord gas safety certificates, heating system repairs and gas hob installs. Honest work, done properly the first time."
        crumbs={[{ label: "Services", href: "/services" }]}
      />
      <section className="section bg-surface">
        <div className="container-page grid gap-5 sm:grid-cols-2">
          {SERVICE_CONTENT.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold">{s.navTitle}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{s.lead.split(".")[0]}.</p>
                <span className="mt-4 inline-flex items-center gap-1 font-semibold text-primary">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
