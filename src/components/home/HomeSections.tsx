import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { AreaMapCheck, type AreaLayout } from "@/components/home/AreaMapCheck";
import { SITE } from "@/lib/site";
import { BOOK_HREF } from "@/lib/booking";
import { LOCAL_TOWNS } from "@/lib/local-pages";
import { HELP_PAGES, helpUrl } from "@/lib/help-content";
import { getGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_REVIEWS_URL, PHOTO_REVIEWS } from "@/lib/reviews";
import { ReviewRow } from "@/components/home/ReviewRow";
import { HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * The homepage sections after services: reviews, booking band, area band,
 * help and advice. First built in Pimlico Plumbers' order;
 * on 27 Nov 2026 the numbers, booking-steps and Why us sections gave way to
 * Jetson's statement band (a Feenstra-style promise row followed, then went
 * too: everything in it was already said elsewhere on the page) (reports/Trade
 * references round 2.md). No 24/7 or emergency claims (JDH works Monday to
 * Friday), every figure is real, flat colour, square corners.
 */

const H2 =
  "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold tracking-[-0.03em] text-navy";

/* ---------- Booking band (Jetson's "We handle everything" statement band;
   replaced Pimlico's three-step booking strip, 27 Nov 2026). One line, one
   sentence, the booking action. Facts as before: online booking, Monday to
   Friday, every check done and recorded. ---------- */
export function BookingBand() {
  return (
    <section aria-labelledby="book-h" className="bg-surface py-16 lg:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Annual boiler service</p>
          <h2
            id="book-h"
            className="mt-3 font-display text-[clamp(2.25rem,1.4rem+3.2vw,4rem)] font-extrabold leading-[1] tracking-[-0.04em] text-navy"
          >
            Book online.
            <br />
            <span className="text-neutral">We do the rest.</span>
          </h2>
        </div>
        <div>
          <p className="max-w-[44ch] text-base leading-relaxed text-neutral sm:text-lg">
            Pick a date for your annual boiler service online. We confirm a time with you, Monday to Friday, carry
            out every check and leave a record of the work.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={BOOK_HREF}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-action px-5 font-semibold text-navy transition-colors hover:bg-action-hover"
            >
              Book a service online <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/services/boiler-servicing"
              className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-neutral"
            >
              What a service covers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews (direction S2 from /explore/reviews, 27 Nov 2026):
   the rating said once beside the heading, then a sliding row of detailed
   reviews from customers with their own Google photo (PHOTO_REVIEWS in
   lib/reviews.ts), word for word. One centred line closes the band
   (direction C1 from /explore/booking): "Annual boiler service due? Book it
   online". It replaced the standalone BookingBand, then a heavier closing
   row (B3a) that read as clunky. ---------- */
export async function Reviews() {
  const { rating, count } = await getGoogleReviews();
  return (
    // Four cards, all visible at once on desktop (27 Nov 2026); the fifth
    // photo review (Jeff Brockett) was dropped so the row doesn't slide there.
    <ReviewRow reviews={PHOTO_REVIEWS.slice(0, 4)} href={GOOGLE_REVIEWS_URL} rating={rating} count={count} perView={4} sectionY={SECTION_Y} headGap={HEAD_GAP}>
      <p className="container-page mt-10 text-center text-navy-muted lg:mt-12">
        Annual boiler service due?{" "}
        <Link
          href={BOOK_HREF}
          className="inline-flex items-center gap-1 font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
        >
          Book it online <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
    </ReviewRow>
  );
}

/* ---------- Area band (Pimlico's "Built for London" band) ---------- */
export function AreaBand({ layout = "band" }: { layout?: AreaLayout } = {}) {
  // Direction B from /explore/area (27 Nov 2026). The panel, postcode answer
  // and map live in AreaMapCheck (client) so the answer can light the map.
  const towns = LOCAL_TOWNS.map((t) => ({ name: t.name, slug: t.slug, postcode: t.postcode }));
  return <AreaMapCheck towns={towns} locality={SITE.locality} layout={layout} />;
}

/* ---------- Help and advice (direction D3 from /explore/help, after
   Feenstra's tagged photos): one large photo and two stacked, each with a
   white question tag and an orange action tag, no text underneath. Photos are
   equipment-led and match each problem; no faces (27 Nov 2026). ---------- */
type GuideCard = { slug: string; q: string; cta: string; src: string; pos: string; alt: string };

const GUIDE_CARDS: GuideCard[] = [
  {
    slug: "boiler-losing-pressure",
    q: "Boiler losing pressure?",
    cta: "Top it up in five steps",
    src: "/images/work/heat-exchanger-clean.jpg",
    pos: "50% 100%",
    alt: "A pressure gauge reading 0.75 and 0.90 bar, connected to a boiler's expansion vessel",
  },
  {
    slug: "boiler-making-banging-noises",
    q: "Banging, gurgling or whistling?",
    cta: "What each noise means",
    src: "/images/brand/hero-boiler-work.jpg",
    pos: "50% 30%",
    alt: "Gloved hands working at the burner of an opened boiler",
  },
  {
    slug: "vaillant-boiler-fault-codes",
    q: "Vaillant fault code showing?",
    cta: "What each code means",
    src: "/images/work/vaillant-ecofit-kitchen.jpg",
    pos: "50% 54%",
    alt: "A Vaillant ecoFIT boiler with its display lit, in a kitchen cupboard",
  },
];

function GuideTagCard({ c, className, sizes, big = false }: { c: GuideCard; className: string; sizes: string; big?: boolean }) {
  return (
    <Link href={helpUrl(c.slug)} className={`group relative block overflow-hidden rounded-[6px] bg-white ${className}`}>
      <Image
        src={c.src}
        alt={c.alt}
        fill
        sizes={sizes}
        className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        style={{ objectPosition: c.pos }}
      />
      <span className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-1.5 sm:bottom-5 sm:left-5">
        <span
          className={`bg-white px-3 py-1.5 font-display font-extrabold tracking-[-0.015em] text-navy ${
            big ? "text-lg sm:text-xl" : "text-[15px] sm:text-base"
          }`}
        >
          {c.q}
        </span>
        <span className="inline-flex items-center gap-1 bg-action px-3 py-1.5 text-sm font-semibold text-navy transition-colors group-hover:bg-action-hover">
          {c.cta} <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

export function HelpGuides() {
  const more = HELP_PAGES.filter((g) => !GUIDE_CARDS.some((c) => c.slug === g.slug));
  return (
    <section aria-labelledby="guides-h" className="bg-grey py-16 lg:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="guides-h" className={H2}>
            Help and advice
          </h2>
          <Link
            href="/help"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border-[1.5px] border-navy px-4 text-sm font-semibold text-navy hover:bg-white"
          >
            All guides <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:grid-rows-2">
          <GuideTagCard
            c={GUIDE_CARDS[0]}
            className="aspect-[4/3] md:row-span-2 md:aspect-auto md:min-h-[520px]"
            sizes="(max-width: 768px) 100vw, 660px"
            big
          />
          {GUIDE_CARDS.slice(1).map((c) => (
            <GuideTagCard
              key={c.slug}
              c={c}
              className="aspect-[16/10] md:aspect-auto md:min-h-[250px]"
              sizes="(max-width: 768px) 100vw, 470px"
            />
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-neutral">
          <span className="font-semibold text-navy">More guides: </span>
          {more.map((g, i) => (
            <span key={g.slug}>
              <Link
                href={helpUrl(g.slug)}
                className="text-navy underline decoration-rule underline-offset-4 hover:text-action-text hover:decoration-current"
              >
                {g.navTitle}
              </Link>
              {i < more.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
