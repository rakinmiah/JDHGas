import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GasSafeBadge } from "@/components/ui/GasSafeBadge";
import { HeroSocialProof } from "@/components/sections/HeroSocialProof";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

export async function Hero() {
  const { rating, count, reviews } = await getGoogleReviews();
  return (
    <section className="relative border-b border-border-subtle bg-sunken">
      <div className="container-page grid items-center gap-8 py-12 md:grid-cols-[44fr_56fr] md:gap-8 md:py-16 lg:gap-12 lg:py-20">
        {/* Portrait — contained on mobile/tablet; full-bleed on desktop */}
        <div className="order-1 md:order-2">
          <div className="mx-auto max-w-md md:mx-0 md:max-w-none">
            {/* eyebrow above the image on mobile only */}
            <p className="eyebrow mb-4 md:hidden">Burgess Hill &amp; Mid Sussex</p>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-border-subtle md:aspect-[4/5] lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:aspect-auto lg:w-[54vw] lg:rounded-none lg:ring-0">
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
          <p className="eyebrow hidden md:block">Burgess Hill &amp; Mid Sussex</p>
          <h1 className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem] md:mt-3 md:text-[2.25rem] lg:text-[3.5rem]">
            Your local gas &amp; heating engineer in Burgess Hill.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:mt-4 lg:text-lg">
            Boiler servicing, boiler &amp; heating repairs/installation, gas safety certificates,
            done properly by Jamie, a local Gas Safe engineer.
          </p>
          <GasSafeBadge className="mt-4" />
          <div className="mt-6">
            <HeroSocialProof rating={rating} count={count} reviews={reviews} />
          </div>
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            <Button
              href={SITE.phoneHref}
              className="w-full md:w-auto"
              aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
            >
              <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
            </Button>
            <div className="flex gap-3 md:contents">
              <Button href={SITE.whatsappHref} variant="whatsapp" className="flex-1 md:flex-none">
                WhatsApp
              </Button>
              <Button href="/contact" variant="secondary" className="flex-1 md:flex-none">
                <span className="md:hidden">Enquire</span>
                <span className="hidden md:inline">Send an enquiry</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
