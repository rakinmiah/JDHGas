import { Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ExpandableText } from "@/components/ui/ExpandableText";
import { GasSafeBadge } from "@/components/ui/GasSafeBadge";
import { HeroSocialProof } from "@/components/sections/HeroSocialProof";
import type { DisplayReview } from "@/lib/google-reviews";
import { SITE } from "@/lib/site";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  imageAlt,
  rating,
  reviewCount,
  reviews,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
  rating?: string;
  reviewCount?: number;
  reviews?: DisplayReview[];
}) {
  const buttons = (
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
  );

  const meta =
    rating && reviewCount != null ? (
      <div className="mt-5 flex flex-col items-start gap-3">
        <GasSafeBadge />
        <HeroSocialProof rating={rating} count={reviewCount} reviews={reviews} />
      </div>
    ) : null;

  // Text-only hero (e.g. services hub) — unchanged stacked layout.
  if (!image) {
    return (
      <section className="border-b border-border-subtle bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-6">{eyebrow}</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
          {meta}
          {buttons}
        </div>
      </section>
    );
  }

  // Image hero — overlap copy card on mobile (mirrors homepage), split on desktop.
  return (
    <section className="border-b border-border-subtle bg-sunken">
      <div className="container-page pt-6">
        <Breadcrumbs items={crumbs} />
      </div>
      <div className="container-page grid gap-8 pb-10 pt-4 md:grid-cols-[44fr_56fr] md:items-stretch md:gap-10 md:py-10 lg:gap-14">
        {/* Image — first on mobile, right column on desktop */}
        <div className="order-1 md:order-2">
          <div className="mx-auto max-w-md md:mx-0 md:h-full md:max-w-none">
            <p className="eyebrow mb-4 md:hidden">{eyebrow}</p>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] ring-1 ring-border-subtle md:aspect-auto md:h-full md:min-h-[22rem]">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                priority
                sizes="(max-width: 768px) 92vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Copy — overlap card on mobile, left column on desktop */}
        <div className="relative z-10 order-2 -mt-16 mx-auto w-full max-w-md rounded-[var(--radius-lg)] bg-surface p-6 shadow-[var(--shadow-lg)] md:order-1 md:mt-0 md:max-w-none md:self-center md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
          <p className="eyebrow hidden md:block">{eyebrow}</p>
          <h1 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl md:mt-2 md:text-5xl">
            {title}
          </h1>
          <ExpandableText
            text={intro}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted lg:text-lg"
          />
          {meta}
          {buttons}
        </div>
      </div>
    </section>
  );
}
