import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import { SITE } from "@/lib/site";
import { BOOK_HREF } from "@/lib/booking";
import { getGoogleReviews } from "@/lib/google-reviews";

/**
 * Homepage hero, modelled on Pimlico Plumbers' (pimlicoplumbers.com): an inset
 * photo card with the rating above the headline, one line of services under
 * it and the booking action. Pimlico's strip of four checks along the card's
 * base was dropped on 27 Nov 2026: it repeated the rating, subhead and button
 * (the Gas Safe number is in the footer). Adapted for JDH: flat navy panel
 * instead of type over the photo (no overlays), one strong action plus a soft
 * call action, square corners.
 *
 * Photo: the JDH van in the detailing bay, JDH's own (Rakin's pick, 27 Nov
 * 2026). It shows the old mobile on the side; /images/home/van-front.jpg is
 * the same angle re-lettered with the 01444 landline, if wanted later.
 * The previous photo was /images/home/boiler-kitchen.jpg (Worcester Bosch
 * library, object-[46%_24%], alt "A white combi boiler on a kitchen wall"),
 * which needs Worcester's written OK before going live.
 */

/** `mobile` (phones and tablets, below lg; explored 28 Nov 2026):
 *  "stack" copy then photo (live); "sheet" photo first with the navy copy
 *  sliding up over its foot; "card" photo first with the copy in an inset
 *  navy card overlapping it, on white; "overlay" the copy on the photo with
 *  no colour tint: the photo itself is exposed down, like a darker print, so
 *  the van keeps its real navy and the white type reads, all grouped at the
 *  foot of the photo; "bars" no tint at all,
 *  the rating and headline on solid navy highlight bars (Thermondo's and
 *  Rørkjøp's device). Desktop is the same in all of them. */
export async function Hero({
  fullBleed = false,
  footer,
  mobile = "stack",
}: {
  fullBleed?: boolean;
  footer?: React.ReactNode;
  mobile?: "stack" | "sheet" | "card" | "overlay" | "bars";
} = {}) {
  const { rating, count } = await getGoogleReviews();
  // Phone overlay: type on solid navy bars over an untinted photo.
  const hl = fullBleed && mobile === "bars";
  const ov = fullBleed && mobile === "overlay";
  const bar = "max-lg:bg-navy max-lg:[box-decoration-break:clone] max-lg:[-webkit-box-decoration-break:clone]";

  const copy = (
    <>
      {count > 0 && (
        <Link
          href="/reviews"
          className={`flex w-fit flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-navy-muted hover:text-white ${
            hl ? "max-lg:flex-nowrap max-lg:gap-x-2 max-lg:rounded-[4px] max-lg:bg-navy max-lg:px-3 max-lg:py-1.5 max-lg:text-[13px]" : ""
          }`}
        >
          <GoogleG className="h-4.5 w-4.5" />
          <span className="whitespace-nowrap font-semibold text-white">Rated {rating}</span>
          <span aria-hidden className="tracking-[1.5px] text-[#f0a800]">★★★★★</span>
          <span className="whitespace-nowrap">{count} Google reviews</span>
        </Link>
      )}

      <h1
        id="hero-h"
        className={`mt-5 text-balance font-display text-[clamp(2.125rem,1.3rem+2.3vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white ${
          hl ? "max-lg:mt-3 max-lg:leading-[1.34]" : ""
        }`}
      >
        <span className={hl ? `${bar} max-lg:px-2.5 max-lg:pb-[0.14em] max-lg:pt-[0.04em]` : ""}>
          Boiler servicing, repairs and new boilers across Mid Sussex.
        </span>
      </h1>

      <p
        className={`mt-4 max-w-[46ch] text-base text-navy-muted sm:text-lg ${
          hl ? "max-lg:hidden" : ov ? "max-lg:text-white/90" : ""
        }`}
      >
        Gas Safe registered and based in {SITE.locality}. We also do landlord gas safety certificates and
        gas hob fitting.
      </p>

      <div
        className={`mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 ${
          hl ? "max-lg:mt-auto max-lg:pt-8" : ""
        }`}
      >
        <Link
          href={BOOK_HREF}
          className="inline-flex min-h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[4px] bg-action px-6 text-[15px] font-bold sm:px-7 sm:text-base text-navy transition-colors hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book a boiler service online <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <a
          href={SITE.phoneHref}
          aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
          className={`inline-flex items-center gap-2.5 whitespace-nowrap font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white ${
            hl ? "max-lg:w-fit max-lg:rounded-[4px] max-lg:bg-navy max-lg:px-3.5 max-lg:py-2.5" : ""
          }`}
        >
          <Phone className="h-4.5 w-4.5" aria-hidden /> Or call {SITE.phoneDisplay}
        </a>
      </div>
    </>
  );

  const photo = (sizes: string, extra = "", imgExtra = "") => (
    <div className={`relative min-h-[320px] overflow-hidden sm:min-h-[400px] lg:min-h-0 ${extra}`}>
      <Image
        src="/images/jdh-van.jpg"
        alt="The JDH Gas Services van in navy livery"
        fill
        preload
        sizes={sizes}
        className={`object-cover object-[50%_74%] ${imgExtra}`}
      />
    </div>
  );

  // Full-bleed (27 Nov 2026): edge to edge, but sized like the boxed card it
  // replaced so it doesn't feel spaced out: a fixed height (not the full
  // screen), the photo slightly wider than the copy, and the copy block
  // centred in its half rather than pinned to the page's content line (which
  // left a wide strip of empty navy on the far left).
  if (fullBleed) {
    return (
      <section
        aria-labelledby="hero-h"
        className={`text-white ${mobile === "card" ? "bg-surface pb-6 sm:pb-8 lg:bg-navy lg:pb-0" : "bg-navy"} ${
          mobile === "overlay" || mobile === "bars" ? "relative isolate" : ""
        }`}
      >
        <div
          className={`grid lg:min-h-[540px] lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] ${
            mobile === "bars" ? "max-lg:min-h-[740px]" : mobile === "overlay" ? "max-lg:min-h-[640px]" : ""
          }`}
        >
          <div
            className={`relative z-10 flex flex-col justify-center lg:px-16 lg:py-16 ${
              mobile === "sheet"
                ? "-mt-10 rounded-t-[16px] bg-navy px-5 pb-12 pt-9 sm:px-8 lg:mt-0 lg:rounded-none"
                : mobile === "card"
                  ? "mx-4 -mt-24 rounded-[8px] bg-navy px-6 py-8 shadow-[0_24px_48px_-24px_rgba(15,31,75,0.55)] sm:mx-8 sm:px-8 lg:mx-0 lg:mt-0 lg:rounded-none lg:shadow-none"
                  : mobile === "bars"
                    ? "z-[2] px-5 pb-6 pt-6 sm:px-8"
                    : mobile === "overlay"
                      ? "z-[2] px-5 pb-10 pt-40 sm:px-8 max-lg:justify-end max-lg:[text-shadow:0_1px_14px_rgba(0,0,0,0.35)] max-lg:[&_a.bg-action]:[text-shadow:none]"
                    : "px-5 py-12 sm:px-8"
            }`}
          >
            <div className={`lg:mx-auto lg:w-full lg:max-w-[34rem] ${hl ? "max-lg:flex max-lg:flex-1 max-lg:flex-col" : ""}`}>
              {copy}
              {footer}
            </div>
          </div>
          {photo(
            "(max-width: 1024px) 100vw, 54vw",
            mobile === "overlay" || mobile === "bars"
              ? "max-lg:absolute max-lg:inset-0 max-lg:z-0 max-lg:min-h-0"
              : mobile === "stack"
                ? ""
                : "max-lg:order-first",
            // Exposure, not a tint: darker and slightly punchier, true colour.
            mobile === "overlay" ? "max-lg:brightness-[0.62] max-lg:contrast-[1.1] max-lg:saturate-[1.1]" : "",
          )}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="hero-h" className="pb-10 pt-4 lg:pb-14 lg:pt-5">
      <div className="container-page">
        <div className="overflow-hidden rounded-[8px] bg-navy text-white">
          <div className="grid lg:min-h-[540px] lg:grid-cols-[55fr_45fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-16">{copy}</div>
            {photo("(max-width: 1024px) 100vw, 560px")}
          </div>
        </div>
      </div>
    </section>
  );
}
