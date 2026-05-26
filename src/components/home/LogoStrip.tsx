import { Reveal } from "@/components/ui/Reveal";

const LOGOS = [
  { name: "Worcester Bosch", src: "/brands/worcester.png", h: "h-12" },
  { name: "Vaillant", src: "/brands/vaillant.svg", h: "h-16" },
  { name: "Ideal Heating", src: "/brands/ideal.svg", h: "h-14" },
  { name: "Baxi", src: "/brands/baxi.svg", h: "h-10" },
  { name: "Bosch", src: "/brands/bosch.svg", h: "h-10" },
];

export function LogoStrip() {
  return (
    <section className="relative overflow-hidden bg-ink text-inverse" aria-labelledby="brands-h">
      {/* soft brand glow — the design element behind the logos */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(59,130,246,0.18),transparent)]"
        aria-hidden
      />
      <Reveal className="container-page relative py-14 text-center md:py-16">
        <p className="eyebrow !text-flame">Every major make</p>
        <h2 id="brands-h" className="mt-2 font-display text-2xl font-bold text-inverse md:text-3xl">
          Whatever boiler you&apos;ve got, I can fix it
        </h2>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-9 sm:gap-x-20">
          {LOGOS.map((logo) => (
            <li key={logo.name} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                className={`${logo.h} w-auto opacity-70 brightness-0 invert transition-opacity duration-200 hover:opacity-100`}
              />
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-9 max-w-md text-sm text-inverse/60">
          Worcester Bosch, Vaillant, Ideal, Baxi and every other major make — serviced, repaired and certified.
        </p>
      </Reveal>
    </section>
  );
}
