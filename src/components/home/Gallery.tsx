import Image from "next/image";
import { InstagramGlyph } from "@/components/ui/icons";
import { SITE } from "@/lib/site";

const SHOTS = [
  { src: "/images/work/ideal-install.jpg", alt: "Finished Ideal Logic combi boiler installation by JDH Gas", big: true },
  { src: "/images/work/analyser-worcester.jpg", alt: "Flue gas analyser used during a boiler service on a Worcester boiler" },
  { src: "/images/work/bosch-service.jpg", alt: "Servicing the internals of a Bosch boiler" },
  { src: "/images/work/baxi-service.jpg", alt: "Boiler service on a Baxi boiler in a Mid Sussex kitchen" },
  { src: "/images/work/gas-hob.jpg", alt: "Gas hob safety-checked and tested by JDH Gas" },
];

export function Gallery() {
  return (
    <section className="section bg-surface" aria-labelledby="work-h">
      <div className="container-page">
        <p className="eyebrow">Recent work</p>
        <h2 id="work-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Real jobs, done properly
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {SHOTS.map((s) => (
            <div
              key={s.src}
              className={`group relative overflow-hidden rounded-[var(--radius-lg)] ${
                s.big ? "col-span-2 row-span-2 aspect-[4/5] md:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover"
          >
            <InstagramGlyph className="h-5 w-5" /> See more on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
