import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Clock, Phone, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GasSafeBadge } from "@/components/ui/GasSafeBadge";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { SITE } from "@/lib/site";
import { BOOK_HREF } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book a Boiler Service Online | JDH Gas Services",
  description:
    "Book your annual boiler service online with JDH Gas Services in Burgess Hill. Choose a four-hour arrival window that suits you.",
  // noindex: the page is a booking tool (an iframe), not content. The boiler
  // servicing page is the one that should rank; it links here.
  robots: { index: false, follow: true },
  alternates: { canonical: BOOK_HREF },
};

const POINTS = [
  { icon: CalendarCheck, text: "Live availability" },
  { icon: Clock, text: "Four-hour arrival windows" },
];

/**
 * Online booking for the annual boiler service. A focused conversion page:
 * the widget section is the ink closing panel, so there's deliberately no
 * ContactSection (a second form would compete with the booking).
 */
export default function BookPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Book online", href: BOOK_HREF }]} />
          <div className="mt-6 grid gap-8 md:grid-cols-[56fr_44fr] md:items-end md:gap-10 lg:gap-14">
            <div>
              <p className="eyebrow">Book online</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                Book a boiler service
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                Choose a four-hour arrival window that suits you and book your annual boiler
                service in a few minutes.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <GasSafeBadge />
                {POINTS.map((p) => (
                  <span key={p.text} className="inline-flex items-center gap-2 text-sm font-medium text-text">
                    <p.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {p.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop only: on a phone this would push the calendar down, so a
                short version sits under the widget instead. */}
            <div className="hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-5 text-sm leading-relaxed text-muted md:block">
              <p className="font-display text-base font-semibold text-ink">Need something else?</p>
              <p className="mt-1">
                Repairs, gas safety certificates and installations are quoted first, so get in
                touch and we&apos;ll come back to you with a clear price.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-semibold">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover"
                  aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
                >
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
                </a>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover">
                  Send an enquiry <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ink text-inverse" aria-labelledby="booking-h" data-mobile-bar-stop>
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 id="booking-h" className="sr-only">Booking calendar</h2>
            <BookingWidget />
            <p className="mt-3 text-center text-sm text-inverse/70 md:hidden">
              Need a repair, certificate or install instead?{" "}
              <Link href="/contact" className="font-semibold text-inverse underline underline-offset-2">
                Send an enquiry
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
