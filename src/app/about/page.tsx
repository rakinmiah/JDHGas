import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/home/CtaBand";
import { Reviews } from "@/components/home/Reviews";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Jamie Hannah | JDH Gas Services, Burgess Hill",
  description:
    "Meet Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services in Burgess Hill. Honest, careful work — prevention over cure.",
  alternates: { canonical: "/about" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/about#jamie`,
  name: "Jamie Hannah",
  jobTitle: "Gas Safe Registered Engineer",
  worksFor: { "@id": `${SITE.url}/#business` },
  knowsAbout: [
    "Boiler servicing",
    "Boiler and heating system repairs",
    "Gas safety certificates (CP12)",
    "Gas appliance installation",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Gas Safe Register",
    identifier: SITE.gasSafe,
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <section className="bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[58%_42%]">
            <div className="order-2 lg:order-1">
              <p className="eyebrow">About</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                Meet Jamie Hannah
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                I&apos;m the Gas Safe registered engineer behind JDH Gas Services — a local,
                independent gas and heating engineer covering Burgess Hill and Mid Sussex.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-ink px-4 py-2 text-sm font-semibold text-inverse">
                <ShieldCheck className="h-4 w-4 text-flame" aria-hidden /> Gas Safe Registered · {SITE.gasSafe}
              </span>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] lg:max-w-none">
                <Image src="/images/jamie-portrait.jpg" alt="Jamie Hannah, Gas Safe registered engineer and owner of JDH Gas Services" fill priority sizes="(max-width:1024px) 90vw, 42vw" className="object-cover object-[45%_38%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_minmax(300px,36%)] lg:gap-14">
          <div className="space-y-8 text-lg leading-relaxed text-text">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Why I started JDH Gas</h2>
              <p className="mt-3 text-muted">
                I set up JDH Gas Services to do gas work the way I&apos;d want it done in my own home —
                carefully, honestly, and explained in plain English. No rushing to the next job, no
                jargon, and no pressure to pay for things you don&apos;t need.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">How I work</h2>
              <p className="mt-3 text-muted">
                A boiler can look like it&apos;s running fine while faults quietly build up out of sight.
                I take the time to check things properly, catch problems early and keep your home safe
                and warm. That&apos;s the idea behind everything I do — <strong className="text-ink">prevention over cure.</strong>
              </p>
              <p className="mt-3 text-muted">
                I&apos;ll always turn up when I say I will, treat your home with respect, and leave it
                exactly as I found it.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">What I work on</h2>
              <ul className="mt-4 space-y-2.5 text-base">
                {[
                  "Boiler servicing on all major makes (Worcester Bosch, Vaillant, Ideal, Baxi, Bosch)",
                  "Landlord gas safety certificates (CP12) and homeowner gas safety checks",
                  "Heating system and boiler repairs",
                  "Gas hob and cooker installation",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-text">{li}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
              <Image src="/images/work/analyser-worcester.jpg" alt="Jamie using a flue gas analyser during a boiler service" fill sizes="(max-width:1024px) 100vw, 36vw" className="object-cover" />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6">
              <p className="font-display text-lg font-bold">My services</p>
              <ul className="mt-3 space-y-2 text-sm">
                {SERVICE_CONTENT.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-hover">
                      {s.navTitle} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Reviews />
      <CtaBand />
    </>
  );
}
