import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE, TOWNS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | JDH Gas Services, Burgess Hill Gas Engineer",
  description:
    "Call 07544 063330, WhatsApp or message Jamie at JDH Gas Services in Burgess Hill for boiler servicing, repairs and gas safety certificates.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-sunken">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Book a job or ask me anything
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Send a quick enquiry — add a photo of your boiler or appliance if you can, and I&apos;ll
            get back to you with a clear answer or quote. Prefer to talk? Call or WhatsApp me.
          </p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="sr-only">Enquiry form</h2>
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6">
              <h2 className="font-display text-lg font-bold">Get in touch directly</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={SITE.phoneHref} className="flex items-center gap-3 font-semibold text-ink hover:text-primary">
                    <Phone className="h-5 w-5 text-primary" aria-hidden /> {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={SITE.whatsappHref} target="_blank" rel="noopener" className="flex items-center gap-3 font-semibold text-ink hover:text-primary">
                    <WhatsAppGlyph className="h-5 w-5 text-whatsapp" /> WhatsApp me
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-ink hover:text-primary">
                    <Mail className="h-5 w-5 text-primary" aria-hidden /> {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted">
                  <Clock className="h-5 w-5 text-primary" aria-hidden /> Monday–Friday
                </li>
              </ul>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <MapPin className="h-5 w-5 text-primary" aria-hidden /> Areas I cover
              </h2>
              <p className="mt-3 text-sm text-muted">
                {TOWNS.join(" · ")} and the surrounding Mid Sussex area.
              </p>
            </div>

            <div className="rounded-[var(--radius-lg)] bg-ink p-6 text-inverse">
              <p className="text-sm font-semibold">Gas Safe Registered · {SITE.gasSafe}</p>
              <p className="mt-1 text-sm text-steel">Rated 5.0 ★ from 24 Google reviews</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
