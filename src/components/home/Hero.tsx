import Image from "next/image";
import Link from "next/link";
import { Phone, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GoogleG } from "@/components/ui/icons";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-sunken">
      {/* layered depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-8%] h-[42rem] w-[42rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-25%] left-[-8%] h-[30rem] w-[30rem] rounded-full bg-flame/10 blur-3xl" />
      </div>
      <div className="container-page grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[44%_56%] lg:gap-8 lg:py-20">
        {/* Portrait (top on mobile/tablet, right on desktop) */}
        <div className="order-1 lg:order-2">
          <div className="mx-auto max-w-md lg:max-w-none">
            {/* eyebrow above the image on mobile/tablet only */}
            <p className="eyebrow mb-4 lg:hidden">Gas Safe registered · Burgess Hill &amp; Mid Sussex</p>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-border-subtle lg:aspect-[1/1]">
              <Image
                src="/images/work/bosch-service.jpg"
                alt="Jamie Hannah, Gas Safe registered engineer, servicing an open Bosch boiler in Burgess Hill"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 56vw"
                className="object-cover object-[50%_32%]"
              />
            </div>
          </div>
        </div>

        {/* Copy (overlaps the image bottom on mobile/tablet; left column on desktop) */}
        <div className="relative z-10 order-2 -mt-16 mx-auto w-full max-w-md rounded-[var(--radius-lg)] bg-surface p-6 shadow-[var(--shadow-lg)] lg:order-1 lg:mt-0 lg:max-w-none lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none">
          {/* eyebrow shown in the copy column on desktop only */}
          <p className="eyebrow hidden lg:block">Gas Safe registered · Burgess Hill &amp; Mid Sussex</p>
          <h1 className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem] md:text-5xl lg:mt-3 lg:text-[3.5rem]">
            Your local gas engineer in Burgess Hill — boiler servicing, repairs &amp; gas safety.
          </h1>
          <Link
            href="/reviews"
            className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-2 shadow-[var(--shadow-sm)] transition-colors hover:border-primary"
            aria-label="Rated 5.0 out of 5 from 24 Google reviews"
          >
            <span className="hidden text-xs font-bold uppercase tracking-wide text-ink sm:inline">Excellent</span>
            <GoogleG className="h-5 w-5 shrink-0" />
            <span className="flex shrink-0 gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gas-safe text-gas-safe" />
              ))}
            </span>
            <span className="text-sm text-muted">24 reviews</span>
          </Link>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
              <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
            </Button>
            <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
          </div>
          <a
            href="/services/boiler-servicing"
            className="mt-5 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
          >
            New customer? First boiler service from{" "}
            <span className="whitespace-nowrap">
              £75 <ArrowRight className="inline-block h-4 w-4 align-middle" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
