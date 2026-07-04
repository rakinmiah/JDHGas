import { Reveal } from "@/components/ui/Reveal";

const LOGOS = [
  { name: "Worcester Bosch", src: "/brands/worcester.png", h: "h-12" },
  { name: "Vaillant", src: "/brands/vaillant.svg", h: "h-16" },
  { name: "Ideal Heating", src: "/brands/ideal.svg", h: "h-14" },
  { name: "Baxi", src: "/brands/baxi.svg", h: "h-10" },
  { name: "Bosch", src: "/brands/bosch.svg", h: "h-10" },
];

/**
 * The brand-make wall. `compact` gives a slimmer, single-line variant for the
 * interior pages (town + areas) — same trust cue, less vertical weight.
 */
export function LogoStrip({ compact = false }: { compact?: boolean } = {}) {
  return (
    <section className="relative overflow-hidden bg-ink text-inverse" aria-labelledby="brands-h">
      {/* soft brand glow — the design element behind the logos */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(59,130,246,0.18),transparent)] ${
          compact ? "h-32" : "h-48"
        }`}
        aria-hidden
      />
      <Reveal
        className={`container-page relative text-center ${compact ? "py-10 md:py-12" : "py-14 md:py-16"}`}
      >
        {!compact && <p className="eyebrow !text-flame">Every major make</p>}
        <h2
          id="brands-h"
          className={`font-display font-bold ${
            compact ? "text-xl text-flame md:text-2xl" : "mt-2 text-2xl text-inverse md:text-3xl"
          }`}
        >
          {compact ? "All the major makes, serviced & repaired" : "Whatever boiler you’ve got, I can fix it"}
        </h2>
        <ul
          className={`flex flex-wrap items-center justify-center ${
            compact ? "mt-7 gap-x-10 gap-y-6 sm:gap-x-14" : "mt-10 gap-x-14 gap-y-9 sm:gap-x-20"
          }`}
        >
          {LOGOS.map((logo) => (
            <li key={logo.name} className="flex items-center">
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
        {!compact && (
          <p className="mx-auto mt-9 max-w-md text-sm text-inverse/60">
            Worcester Bosch, Vaillant, Ideal, Baxi and the rest. If it runs on gas, I can service or fix it.
          </p>
        )}
      </Reveal>
    </section>
  );
}
