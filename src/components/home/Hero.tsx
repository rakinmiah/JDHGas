import Image from "next/image";
import Link from "next/link";
import { Phone, Star, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GoogleG } from "@/components/ui/icons";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

const TRUST = ["All makes of boiler", "Free quotes", "Quick to respond"];

export async function Hero() {
  const { rating, count } = await getGoogleReviews();
  return (
    <section className="relative border-b border-border-subtle bg-sunken">
      <div className="container-page grid items-center gap-8 py-12 md:grid-cols-[44fr_56fr] md:gap-8 md:py-16 lg:gap-12 lg:py-20">
        {/* Portrait — contained on mobile/tablet; full-bleed on desktop */}
        <div className="order-1 md:order-2">
          <div className="mx-auto max-w-md md:mx-0 md:max-w-none">
            {/* eyebrow above the image on mobile only */}
            <p className="eyebrow mb-4 md:hidden">Gas Safe registered · Burgess Hill &amp; Mid Sussex</p>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-border-subtle lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:aspect-auto lg:w-[54vw] lg:rounded-none lg:ring-0">
              <Image
                src="/images/work/bosch-service.jpg"
                alt="Jamie Hannah, Gas Safe registered engineer, servicing an open Bosch boiler in Burgess Hill"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 46vw, 54vw"
                className="object-cover object-[50%_32%]"
              />
            </div>
          </div>
        </div>

        {/* Copy (overlaps image on mobile; left column on tablet/desktop) */}
        <div className="relative z-10 order-2 -mt-16 mx-auto w-full max-w-md rounded-[var(--radius-lg)] bg-surface p-6 shadow-[var(--shadow-lg)] md:order-1 md:mt-0 md:max-w-none md:rounded-none md:bg-transparent md:p-0 md:shadow-none lg:max-w-lg">
          <p className="eyebrow hidden md:block">Gas Safe registered · Burgess Hill &amp; Mid Sussex</p>
          <h1 className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem] md:mt-3 md:text-[2.25rem] lg:text-[3.5rem]">
            Your local gas &amp; heating engineer in Burgess Hill.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:mt-4 lg:text-lg">
            Boiler servicing, repairs and gas safety, done properly by a local engineer you can
            actually get hold of.
          </p>
          <Link
            href="/reviews"
            className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-2 shadow-[var(--shadow-sm)] transition-colors hover:border-primary"
            aria-label={`Rated ${rating} out of 5 from ${count} Google reviews`}
          >
            <span className="hidden text-xs font-bold uppercase tracking-wide text-ink lg:inline">Excellent</span>
            <GoogleG className="h-5 w-5 shrink-0" />
            <span className="flex shrink-0 gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gas-safe text-gas-safe" />
              ))}
            </span>
            <span className="text-sm text-muted">{count} reviews</span>
          </Link>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
              <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
            </Button>
            <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-text">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
