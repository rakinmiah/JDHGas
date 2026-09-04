import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/home/ContactSection";
import { Reveal } from "@/components/ui/Reveal";
import { HELP_PAGES, helpUrl } from "@/lib/help-content";

export const metadata: Metadata = {
  title: "Boiler & Heating Help Guides | JDH Gas Services",
  description:
    "Boiler and heating help from a Gas Safe engineer: losing pressure, no hot water, cold radiators, fault codes and more. What to check, and when to call.",
  alternates: { canonical: "/help" },
};

export default function HelpHub() {
  return (
    <>
      <PageHero
        eyebrow="Help guides"
        title="Boiler and heating help guides"
        intro="Common boiler and heating faults explained: what is likely to be wrong, the checks that are safe to do yourself, and when to call a Gas Safe engineer. No jargon and no DIY gas work."
        crumbs={[{ label: "Help", href: "/help" }]}
        primaryCta="whatsapp"
      />

      <section className="section bg-surface" aria-labelledby="guides-h">
        <div className="container-page">
          <h2 id="guides-h" className="sr-only">
            All help guides
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HELP_PAGES.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.05}>
                <Link
                  href={helpUrl(p.slug)}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                >
                  <h3 className="font-display text-lg font-semibold">{p.h1}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.metaDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read the guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex items-start gap-3 rounded-[var(--radius-md)] border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p>
              <strong>Smell gas?</strong>{" "}Don&rsquo;t troubleshoot. Call the National Gas Emergency
              line free on <a href="tel:0800111999" className="font-semibold underline">0800 111 999</a> first.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
