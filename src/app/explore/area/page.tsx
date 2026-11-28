import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CoverageMap } from "@/components/home/CoverageMap";
import { PostcodeChecker } from "@/components/sections/PostcodeChecker";
import { AreaMapBand } from "@/components/home/AreaMapBand";
import { AreaBand } from "@/components/home/HomeSections";
import { LOCAL_TOWNS } from "@/lib/local-pages";
import { SITE } from "@/lib/site";

/**
 * Internal comparison page for the homepage "Where we work" section. Not
 * linked from anywhere and not indexed. Delete once a direction is picked.
 * `?v=A` shows one.
 */
export const metadata: Metadata = {
  title: "Area directions (internal)",
  robots: { index: false, follow: false },
};

const H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";
const towns = LOCAL_TOWNS.map((t) => ({ name: t.name, slug: t.slug, postcode: t.postcode }));

function Checker() {
  return (
    <div className="rounded-[6px] bg-white p-4 outline-1 -outline-offset-1 outline-rule sm:p-5">
      <p className="mb-3 text-sm font-semibold text-navy">Check your postcode</p>
      <PostcodeChecker towns={towns} />
    </div>
  );
}

/** Towns as one line of quiet links, not thirteen arrowed rows. */
function TownLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-7 text-neutral ${className}`}>
      <span className="font-semibold text-navy">Town pages: </span>
      {LOCAL_TOWNS.map((t, i) => (
        <span key={t.slug}>
          <Link href={`/${t.slug}`} className="text-navy underline decoration-rule underline-offset-4 hover:text-action-text hover:decoration-current">
            {t.name}
          </Link>
          {i < LOCAL_TOWNS.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

function BaseChip() {
  return (
    <span className="absolute left-3 top-3 z-[500] inline-flex items-center gap-1.5 rounded-[4px] bg-white px-3 py-1.5 text-xs font-semibold text-navy outline-1 -outline-offset-1 outline-rule">
      <MapPin className="h-3.5 w-3.5 text-action" aria-hidden />
      Based in {SITE.locality} · {SITE.postcodeArea}
    </span>
  );
}

/* A: split, the map on the right */
function A() {
  return (
    <section className="bg-grey py-16 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Where we work</p>
          <h2 className={`mt-2 ${H2}`}>Based in {SITE.locality}, covering Mid Sussex</h2>
          <div className="mt-6">
            <Checker />
          </div>
          <TownLine className="mt-6" />
        </div>
        <div className="relative isolate z-0 aspect-[5/4] overflow-hidden rounded-[8px] bg-white outline-1 -outline-offset-1 outline-rule">
          <BaseChip />
          <CoverageMap />
        </div>
      </div>
    </section>
  );
}

/* B: the map fills the band, a white panel sits over its left side */
function B() {
  return (
    <section className="relative isolate bg-grey">
      <div className="relative z-0 h-[340px] lg:absolute lg:inset-0 lg:h-auto">
        <CoverageMap />
      </div>
      <div className="container-page relative z-[500] pb-12 lg:pointer-events-none lg:py-20">
        <div className="-mt-16 rounded-[8px] bg-white p-6 shadow-[0_18px_40px_-20px_rgba(15,31,75,0.45)] sm:p-8 lg:pointer-events-auto lg:mt-0 lg:max-w-[460px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Where we work</p>
          <h2 className={`mt-2 ${H2}`}>Based in {SITE.locality}, covering Mid Sussex</h2>
          <div className="mt-6">
            <PostcodeChecker towns={towns} />
          </div>
          <TownLine className="mt-5" />
        </div>
      </div>
    </section>
  );
}

/* C: the checker leads, a wide map below with the towns as chips */
function C() {
  return (
    <section className="bg-grey py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Where we work</p>
          <h2 className={`mt-2 ${H2}`}>Based in {SITE.locality}, covering Mid Sussex</h2>
          <div className="mt-6 text-left">
            <Checker />
          </div>
        </div>
        <div className="relative isolate z-0 mt-10 aspect-[4/3] overflow-hidden rounded-[8px] bg-white outline-1 -outline-offset-1 outline-rule sm:aspect-[21/9]">
          <BaseChip />
          <CoverageMap />
        </div>
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {LOCAL_TOWNS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="inline-flex min-h-[36px] items-center rounded-[4px] bg-white px-3 text-sm font-semibold text-navy outline-1 -outline-offset-1 outline-rule hover:text-action-text"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const VARIANTS = [
  { key: "now", name: "Now (homepage)", note: "B, as on the homepage.", el: <AreaBand /> },
  
  { key: "A", name: "A. Split with map", note: "Heading and checker left, the coverage map right, towns as one line of links.", el: <A /> },
  { key: "B", name: "B. Map band", note: "The map fills the band; a white panel holds heading, checker and town links.", el: <B /> },
  {
    key: "B2",
    name: "B2. Map band, brand",
    note: "Map toned blue-grey, JDH shield at the base, navy pins, flat sheet flush to the left edge, list hover lights the pin.",
    el: <AreaMapBand towns={towns} locality={SITE.locality} postcodeArea={SITE.postcodeArea} />,
  },
  { key: "C", name: "C. Checker first", note: "Centred checker, a wide map below, towns as small chips.", el: <C /> },
];

export default async function AreaExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const only = v?.split(",");
  return (
    <main>
      {VARIANTS.filter((x) => !only || only.includes(x.key)).map((x) => (
        <div key={x.key} className="border-b-8 border-white">
          <div className="container-page py-5">
            <p className="font-display text-lg font-extrabold text-navy">{x.name}</p>
            <p className="text-sm text-neutral">{x.note}</p>
          </div>
          {x.el}
        </div>
      ))}
    </main>
  );
}
