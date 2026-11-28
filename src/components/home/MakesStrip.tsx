type Make = { name: string; src: string; h: string; badge?: string };

const MAKES: Make[] = [
  { name: "Worcester Bosch", src: "/brands/worcester.png", h: "h-7" },
  { name: "Vaillant", src: "/brands/vaillant.svg", h: "h-[34px]", badge: "Approved partner" },
  { name: "Ideal Heating", src: "/brands/ideal.svg", h: "h-8" },
  { name: "Baxi", src: "/brands/baxi.svg", h: "h-6" },
  { name: "Bosch", src: "/brands/bosch.svg", h: "h-6" },
];

/**
 * M2: the boiler makes, as one static row directly under the hero (Stripe's
 * logo row between two hairlines, without the marquee). Answers "will they
 * work on my boiler?" where the question comes up. Manufacturer marks show
 * the makes worked on; only the Vaillant partnership is an accreditation.
 */
export function MakesStrip() {
  return (
    <section aria-label="Boiler makes we work on" className="bg-surface">
      <div className="container-page">
        <div className="grid items-center gap-6 border-b border-border-subtle py-8 md:py-10 lg:grid-cols-[3fr_9fr] lg:gap-10">
          <p className="text-center text-sm font-semibold text-ink lg:text-left">
            We service and repair all the major makes
          </p>
          <ul className="grid grid-cols-3 items-center justify-items-center gap-x-6 gap-y-6 sm:grid-cols-5">
            {MAKES.map((m) => (
              <li key={m.name} className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.src}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className={`${m.h} w-auto opacity-70 brightness-0`}
                />
                {m.badge && (
                  <span className="mt-2 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-muted">
                    {m.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
