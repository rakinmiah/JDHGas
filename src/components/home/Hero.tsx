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
      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[44%_56%] lg:gap-8 lg:py-20">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Gas Safe registered · Burgess Hill &amp; Mid Sussex</p>
          <h1 className="mt-3 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-[3.5rem]">
            Your local gas engineer in Burgess Hill — boiler servicing, repairs &amp; gas safety.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m Jamie Hannah, a Gas Safe registered engineer. Honest, thorough work on
            every make of boiler — done properly the first time.
          </p>
          <Link
            href="/reviews"
            className="mt-6 inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-4 py-2 shadow-[var(--shadow-sm)] transition-colors hover:border-primary"
            aria-label="Rated 5.0 out of 5 from 24 Google reviews"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-ink">Excellent</span>
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gas-safe text-gas-safe" />
              ))}
            </span>
            <span className="text-sm text-muted">24 reviews</span>
            <GoogleG className="h-5 w-5" />
          </Link>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
              <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
            </Button>
            <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
          </div>
          <a
            href="/services/boiler-servicing"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            New customer? First boiler service from £75 <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        {/* Portrait */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:aspect-[1/1] lg:max-w-none">
            <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-border-subtle">
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
      </div>
    </section>
  );
}
