import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InstagramGlyph } from "@/components/ui/icons";
import { CtaBand } from "@/components/home/CtaBand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work | JDH Gas Services, Burgess Hill",
  description:
    "Recent boiler servicing, repairs & gas installations by JDH Gas Services across Burgess Hill & Mid Sussex. Real jobs by a Gas Safe engineer.",
  alternates: { canonical: "/gallery" },
};

const SHOTS = [
  { src: "/images/work/ideal-install.jpg", alt: "Finished Ideal Logic combi boiler installation by JDH Gas in Burgess Hill" },
  { src: "/images/work/analyser-worcester.jpg", alt: "Flue gas analyser used during a boiler service on a Worcester boiler" },
  { src: "/images/work/bosch-service.jpg", alt: "Servicing the internals of a Bosch boiler" },
  { src: "/images/work/baxi-service.jpg", alt: "Boiler service on a Baxi boiler in a Mid Sussex kitchen" },
  { src: "/images/work/manometer.jpg", alt: "Gas pressure test with a manometer during a gas safety check" },
  { src: "/images/work/gas-hob.jpg", alt: "Gas hob safety-checked and tested by JDH Gas" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Our work", href: "/gallery" }]} />
          <p className="eyebrow mt-6">Our work</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Real jobs, done properly
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            A look at recent boiler servicing, repairs and gas installations across Burgess Hill and
            Mid Sussex. For more, follow along on Instagram.
          </p>
          <a href={SITE.instagram} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover">
            <InstagramGlyph className="h-5 w-5" /> @jdhgasservices
          </a>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page grid grid-cols-2 gap-3 md:grid-cols-3">
          {SHOTS.map((s) => (
            <div key={s.src} className="group relative aspect-square overflow-hidden rounded-[var(--radius-lg)]">
              <Image src={s.src} alt={s.alt} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
