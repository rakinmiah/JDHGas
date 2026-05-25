import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/home/CtaBand";
import { TOWN_CONTENT } from "@/lib/towns-content";
import { TOWNS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas We Cover | JDH Gas Services, Mid Sussex",
  description:
    "JDH Gas Services covers Burgess Hill, Haywards Heath, Hassocks, Cuckfield & nearby Mid Sussex villages. Gas Safe registered engineer Jamie Hannah.",
  alternates: { canonical: "/areas" },
};

export default function AreasHub() {
  const extra = TOWNS.filter((t) => !TOWN_CONTENT.some((c) => c.name === t));
  return (
    <>
      <PageHero
        eyebrow="Areas covered"
        title="Covering Burgess Hill & Mid Sussex"
        intro="Based in Burgess Hill, I cover the surrounding Mid Sussex towns and villages as a Gas Safe registered engineer. Here are the main areas — not sure if I reach you? Just ask."
        crumbs={[{ label: "Areas", href: "/areas" }]}
      />
      <section className="section bg-surface">
        <div className="container-page grid gap-5 sm:grid-cols-2">
          {TOWN_CONTENT.map((t) => (
            <Link
              key={t.slug}
              href={`/areas/${t.slug}`}
              className="group flex flex-col rounded-[var(--radius-lg)] border border-border-subtle p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
            >
              <span className="flex items-center gap-2 font-display text-xl font-semibold">
                <MapPin className="h-5 w-5 text-primary" aria-hidden /> {t.name}
              </span>
              <span className="mt-1 text-sm text-muted">{t.postcode}</span>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{t.lead.split(".")[0]}.</p>
              <span className="mt-4 inline-flex items-center gap-1 font-semibold text-primary">
                Gas engineer in {t.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <div className="container-page mt-8">
          <p className="text-muted">
            I also cover {extra.join(", ")} and other nearby villages. <Link href="/contact" className="font-semibold text-primary hover:text-primary-hover">Get in touch</Link> to check.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
