import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandMark";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { ServiceStepList } from "@/components/sections/ServiceStepList";
import { ContactSection } from "@/components/home/ContactSection";
import { Reveal } from "@/components/ui/Reveal";
import { HELP_PAGES, getHelpPage, helpUrl } from "@/lib/help-content";
import { SITE, OG_IMAGE, TWITTER_IMAGE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return HELP_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getHelpPage(slug);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: helpUrl(p.slug) },
    openGraph: { title: p.metaTitle, description: p.metaDescription, url: `${SITE.url}${helpUrl(p.slug)}`, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.metaDescription, images: [TWITTER_IMAGE] },
  };
}

/** The one warning every help page carries, above everything else. */
function GasSafetyNote() {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <p>
        <strong>Smell gas?</strong>{" "}Stop here. Open windows and doors, don&rsquo;t flick switches,
        and call the National Gas Emergency line free on{" "}
        <a href="tel:0800111999" className="font-semibold underline">0800 111 999</a>{" "}
        before anything else.
      </p>
    </div>
  );
}

export default async function HelpPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getHelpPage(slug);
  if (!p) notFound();

  const whatsappLink = `${SITE.whatsappHref}?text=${encodeURIComponent(p.whatsappText)}`;
  const related = HELP_PAGES.filter((o) => o.slug !== p.slug);

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.h1}
        intro={p.lead}
        crumbs={[{ label: "Help", href: "/help" }, { label: p.navTitle, href: helpUrl(p.slug) }]}
        primaryCta="whatsapp"
      />

      {/* What's going on */}
      <section className="section bg-surface" aria-labelledby="causes-h">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <GasSafetyNote />
            <h2 id="causes-h" className="mt-10 font-display text-2xl font-bold tracking-tight md:text-3xl">
              What&rsquo;s going on
            </h2>
            <div className="mt-2 space-y-8">
              {p.causes.map((c) => (
                <Reveal as="article" key={c.heading}>
                  <h3 className="mt-6 font-display text-lg font-semibold">{c.heading}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safe checks, or the fault-code list */}
      {p.checks.length > 0 && (
        <section className="section bg-sunken" aria-labelledby="checks-h">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <h2 id="checks-h" className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                {p.checksHeading ?? "Safe things to try first"}
              </h2>
              <ServiceStepList items={p.checks} />
            </div>
          </div>
        </section>
      )}

      {p.faultCodes && p.faultCodes.length > 0 && (
        <section className="section bg-sunken" aria-labelledby="codes-h">
          <div className="container-page">
            <h2 id="codes-h" className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              The codes, one by one
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {p.faultCodes.map((f) => (
                <Reveal as="li" key={f.code}>
                  <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6">
                    <span className="inline-flex w-fit items-center rounded-[var(--radius-pill)] bg-ink px-3 py-1 font-display text-sm font-bold text-inverse">
                      {f.code}
                    </span>
                    <p className="mt-3 font-semibold">{f.meaning}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{f.advice}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* When to stop and call */}
      <section className="section bg-surface" aria-labelledby="call-h">
        <div className="container-page">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-lg)] bg-ink p-7 text-inverse shadow-[var(--shadow-md)] md:p-9">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
            <div className="relative">
              <BrandMark className="h-12 w-12" />
              <h2 id="call-h" className="mt-5 font-display text-2xl font-bold tracking-tight text-inverse md:text-3xl">
                When to stop and get me in
              </h2>
              <ul className="mt-5 space-y-3">
                {p.stopAndCall.map((s) => (
                  <li key={s} className="flex items-start gap-3 leading-relaxed text-inverse/85">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-flame" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-inverse/85">
                I&rsquo;m Jamie, a Gas Safe registered engineer (No. {SITE.gasSafe}) in Burgess Hill.
                I handle{" "}
                <Link href="/services/boiler-repairs" className="font-semibold text-inverse underline decoration-flame underline-offset-4 hover:decoration-2">
                  boiler and heating repairs in Burgess Hill
                </Link>{" "}
                and across Mid Sussex, Mon to Fri with some evenings.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={whatsappLink} variant="whatsapp" className="flex-1 sm:flex-none">
                  WhatsApp me a photo
                </Button>
                <Button
                  href={SITE.phoneHref}
                  className="flex-1 sm:flex-none"
                  aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
                >
                  <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={p.faqs} tone="sunken" />

      {/* Related guides */}
      <section className="section bg-surface" aria-labelledby="related-h">
        <div className="container-page">
          <h2 id="related-h" className="font-display text-xl font-bold">
            More boiler help
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {related.map((o) => (
              <li key={o.slug}>
                <Link
                  href={helpUrl(o.slug)}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-border-strong px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {o.navTitle}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
