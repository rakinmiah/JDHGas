import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin, ShieldCheck, Star } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { CoverageMap } from "@/components/home/CoverageMap";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = {
  title: "Contact | JDH Gas Services, Burgess Hill Gas Engineer",
  description:
    "Call 07544 063330, WhatsApp or message Jamie at JDH Gas Services in Burgess Hill for boiler servicing, repairs and gas safety certificates.",
  alternates: { canonical: "/contact" },
};

const rowCls = "flex items-center gap-3 text-inverse transition-colors hover:text-flame";

export default async function ContactPage() {
  const { rating, count } = await getGoogleReviews();
  return (
    <>
      <section className="border-b border-border-subtle bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          <p className="eyebrow mt-6">Get in touch</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Book a job or ask me anything
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Send a quick enquiry, add a photo of your boiler or appliance if you can, and I&apos;ll
            get back to you with a clear answer or quote. Prefer to talk? Call or WhatsApp me.
          </p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_minmax(320px,380px)] lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Send an enquiry</h2>
            <p className="mt-2 max-w-xl text-muted">
              Fill this in and I&apos;ll come back to you with a clear answer or quote. A photo of the
              job helps if you&apos;ve got one.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Ink contact panel */}
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-ink p-6 text-inverse shadow-[var(--shadow-md)] md:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/25 blur-3xl"
              />
              <div className="relative">
                <h2 className="font-display text-lg font-bold text-inverse">Prefer to talk?</h2>
                <ul className="mt-4 space-y-3.5 text-sm font-medium">
                  <li>
                    <a href={SITE.phoneHref} className={rowCls} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
                      <Phone className="h-5 w-5 shrink-0 text-flame" aria-hidden />
                      <span>
                        Call <span className="font-bold">{SITE.phoneDisplay}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={SITE.whatsappHref} target="_blank" rel="noopener" className={rowCls}>
                      <WhatsAppGlyph className="h-5 w-5 shrink-0" /> WhatsApp me
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${SITE.email}`} className={`${rowCls} break-all`}>
                      <Mail className="h-5 w-5 shrink-0 text-flame" aria-hidden /> {SITE.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-steel">
                    <Clock className="h-5 w-5 shrink-0 text-flame" aria-hidden /> {SITE.hours}
                  </li>
                </ul>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-inverse">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-flame" aria-hidden /> Gas Safe registered · {SITE.gasSafe}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-steel">
                    <span className="flex gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-gas-safe text-gas-safe" />
                      ))}
                    </span>
                    {rating} from {count} Google reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Coverage map */}
            <div className="relative isolate z-0 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-3 shadow-[var(--shadow-sm)]">
              <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-[var(--shadow-sm)] backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                Based in Burgess Hill · {SITE.postcodeArea}
              </span>
              <div className="aspect-[420/340]">
                <CoverageMap />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
