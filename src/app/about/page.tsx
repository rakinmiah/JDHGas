import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Check,
  Phone,
  Flame,
  ClipboardCheck,
  Wrench,
  CookingPot,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Reviews } from "@/components/home/Reviews";
import { CtaBand } from "@/components/home/CtaBand";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Jamie Hannah | JDH Gas Services, Burgess Hill",
  description:
    "Meet Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services in Burgess Hill. Honest, careful work, prevention over cure.",
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

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  "boiler-servicing": Flame,
  "gas-safety-certificate": ClipboardCheck,
  "boiler-repairs": Wrench,
  "gas-appliances": CookingPot,
};

function firstSentence(text: string) {
  return text.split(". ")[0].replace(/\.*$/, "") + ".";
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* Hero — portrait + overlap copy card on mobile, split on desktop */}
      <section className="border-b border-border-subtle bg-sunken">
        <div className="container-page pt-6">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        </div>
        <div className="container-page grid gap-8 pb-10 pt-4 md:grid-cols-[44fr_56fr] md:items-center md:gap-10 md:py-10 lg:gap-14">
          <div className="order-1 md:order-2">
            <div className="mx-auto max-w-md md:mx-0 md:max-w-none">
              <p className="eyebrow mb-4 md:hidden">About</p>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] ring-1 ring-border-subtle md:aspect-auto md:h-[28rem]">
                <Image
                  src="/images/jamie-portrait.jpg"
                  alt="Jamie Hannah, Gas Safe registered engineer and owner of JDH Gas Services"
                  fill
                  priority
                  sizes="(max-width: 768px) 92vw, 50vw"
                  className="object-cover object-[45%_48%]"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 order-2 -mt-16 mx-auto w-full max-w-md rounded-[var(--radius-lg)] bg-surface p-6 shadow-[var(--shadow-lg)] md:order-1 md:mt-0 md:max-w-none md:self-center md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
            <p className="eyebrow hidden md:block">About</p>
            <h1 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl md:mt-2 md:text-5xl">
              Meet Jamie Hannah
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted lg:text-lg">
              I&apos;m the Gas Safe registered engineer behind JDH Gas Services, a local, independent
              gas and heating engineer covering Burgess Hill and Mid Sussex.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-ink px-4 py-2 text-sm font-semibold text-inverse">
              <ShieldCheck className="h-4 w-4 text-flame" aria-hidden /> Gas Safe Registered · {SITE.gasSafe}
            </span>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
                <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
              </Button>
              <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ethos band */}
      <section className="relative overflow-hidden bg-ink text-inverse">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
        />
        <Reveal className="container-page relative grid gap-6 py-12 md:grid-cols-[auto_auto_1fr] md:items-center md:gap-10 md:py-16 lg:gap-12">
          <div className="flex items-center gap-5">
            <span className="grid h-32 w-32 shrink-0 place-items-center rounded-[var(--radius-lg)] bg-white/10 text-flame">
              <Flame className="h-16 w-16" aria-hidden />
            </span>
            <p className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-inverse md:text-4xl">
              Prevention
              <br />
              over cure.
            </p>
          </div>
          <span
            aria-hidden
            className="h-px w-16 shrink-0 rounded-full bg-flame md:h-24 md:w-0.5 md:self-center"
          />
          <div>
            <p className="text-lg leading-relaxed text-inverse/85">
              A boiler can look like it&apos;s running fine while faults quietly build up out of
              sight. I take the time to check things properly, catch problems early, and keep your
              home safe and warm, so a small fix today saves a cold-weather breakdown later.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-inverse">
              {["Faults caught early", "Safer, more efficient heating", "Fewer winter breakdowns"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-flame" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Story */}
      <section className="section bg-surface">
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(300px,42%)] lg:gap-14">
            <div className="max-w-xl">
              <p className="eyebrow">My story</p>
              <p className="mt-4 font-display text-2xl font-bold leading-[1.25] tracking-tight text-ink md:text-[2rem]">
                I started JDH Gas to do gas work the way I&apos;d want it done in my own home:
                carefully, honestly, and explained in plain English.
              </p>
              <div className="mt-6 space-y-4 border-l-2 border-primary pl-5 text-lg leading-relaxed text-muted">
                <p>
                  No rushing to the next job, no jargon, and no pressure to pay for things you
                  don&apos;t need.
                </p>
                <p>
                  Whether it&apos;s a quick service or a tricky repair, you get the same care and the
                  same straight answers, and I&apos;ll always turn up when I say I will and leave your
                  home exactly as I found it.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-display text-base font-bold text-ink">Jamie Hannah</p>
                <p className="text-sm text-muted">Founder &amp; Gas Safe registered engineer</p>
              </div>
            </div>
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] ring-1 ring-border-subtle lg:sticky lg:top-24">
              <Image
                src="/images/work/analyser-worcester.jpg"
                alt="Jamie using a flue gas analyser during a boiler service in Burgess Hill"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-sunken">
        <div className="container-page">
          <p className="eyebrow">How I do things</p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">What you can expect</h2>
          <ValuesGrid />
        </div>
      </section>

      <LogoStrip />

      {/* What I do — service cards */}
      <section className="section bg-surface">
        <div className="container-page">
          <p className="eyebrow">What I do</p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">How I can help</h2>
          <Reveal as="ul" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CONTENT.map((s) => {
              const Icon = ICON_BY_SLUG[s.slug] ?? Flame;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-md)]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{s.navTitle}</h3>
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
        </div>
      </section>

      <Reviews />
      <CtaBand />
    </>
  );
}
