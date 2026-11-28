import { Reveal } from "@/components/ui/Reveal";

/** `ratio` is the file's width / height, so the navy logo masks keep shape. */
type Logo = { name: string; src: string; h: string; ratio: number; hLight?: string };

const LOGOS: Logo[] = [
  { name: "Worcester Bosch", src: "/brands/worcester.png", h: "h-9 md:h-10", ratio: 192 / 75, hLight: "h-11 md:h-[3.25rem]" },
  { name: "Vaillant", src: "/brands/vaillant.svg", h: "h-10 md:h-11", ratio: 35 / 48, hLight: "h-11 md:h-[3.25rem]" },
  { name: "Ideal Heating", src: "/brands/ideal.svg", h: "h-9 md:h-10", ratio: 204.1 / 107.3 },
  { name: "Baxi", src: "/brands/baxi.svg", h: "h-6 md:h-7", ratio: 300 / 100 },
  { name: "Bosch", src: "/brands/bosch.svg", h: "h-6 md:h-7", ratio: 433 / 97 },
];

/**
 * The boiler-make strip. Two tones:
 * - `light` (homepage): sits on white, heading in brand orange (action; 2.9:1 on white, chosen by Rakin), logos in navy,
 *   one line of copy, logos spread across the container on desktop.
 * - navy (default; interior pages until their rebrand stage): flat navy band,
 *   logos in white. `compact` gives the slimmer interior variant.
 */
export function LogoStrip({ compact = false, light = false }: { compact?: boolean; light?: boolean } = {}) {
  if (light) {
    return (
      <section aria-labelledby="brands-h" className="bg-surface">
        <Reveal className="container-page">
          <div className="pb-12 pt-12 md:pb-14 md:pt-14">
            <h2
              id="brands-h"
              className="text-center font-display text-[15px] font-extrabold tracking-[-0.015em] text-action sm:text-lg md:text-xl"
            >
              We service and repair every major boiler make
            </h2>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 sm:gap-x-14 md:mt-7 lg:flex-nowrap lg:justify-between lg:px-10">
              {LOGOS.map((logo) => (
                <li key={logo.name} className="flex items-center">
                  <span
                    role="img"
                    aria-label={logo.name}
                    className={`block ${logo.hLight ?? logo.h} bg-navy`}
                    style={{
                      aspectRatio: logo.ratio,
                      maskImage: `url(${logo.src})`,
                      WebkitMaskImage: `url(${logo.src})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-navy text-white" aria-labelledby="brands-h">
      <Reveal
        className={`container-page relative text-center ${compact ? "py-8 md:py-9" : "py-9 md:py-10"}`}
      >
        {!compact && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Every major make</p>}
        <h2
          id="brands-h"
          className={`text-balance font-display font-extrabold tracking-[-0.025em] text-white ${
            compact ? "text-lg md:text-xl" : "mt-2 text-xl md:text-2xl"
          }`}
        >
          {compact ? "All the major makes, serviced and repaired" : "Whatever boiler you’ve got, we service and repair it"}
        </h2>
        <ul
          className={`flex flex-wrap items-center justify-center ${
            compact ? "mt-6 gap-x-10 gap-y-5 sm:gap-x-14" : "mt-7 gap-x-10 gap-y-6 sm:gap-x-16"
          }`}
        >
          {LOGOS.map((logo) => (
            <li key={logo.name} className="flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                className={`${logo.h} w-auto opacity-70 brightness-0 invert transition-opacity duration-200 hover:opacity-100 ${
                  compact ? "scale-90" : ""
                }`}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/** The light strip's logos on their own, navy marks in a row (for sections
 *  that carry the boiler makes inside them rather than as a band). */
const SMALL_H: Record<string, string> = {
  "Worcester Bosch": "h-7",
  Vaillant: "h-8",
  "Ideal Heating": "h-7",
  Baxi: "h-[1.15rem]",
  Bosch: "h-[1.15rem]",
};

export function BrandMarks({
  className = "",
  tone = "navy",
  small = false,
}: {
  className?: string;
  tone?: "navy" | "white";
  small?: boolean;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-y-5 lg:flex-nowrap ${small ? "gap-x-7" : "gap-x-10 lg:justify-between"} ${className}`}>
      {LOGOS.map((logo) => (
        <li key={logo.name} className="flex items-center">
          <span
            role="img"
            aria-label={logo.name}
            className={`block ${small ? SMALL_H[logo.name] : logo.h} ${tone === "white" ? "bg-white" : "bg-navy"}`}
            style={{
              aspectRatio: logo.ratio,
              maskImage: `url(${logo.src})`,
              WebkitMaskImage: `url(${logo.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </li>
      ))}
    </ul>
  );
}
