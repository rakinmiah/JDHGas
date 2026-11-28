import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { LogoStrip } from "@/components/home/LogoStrip";

/**
 * Internal comparison page for the join between the hero and services. Not
 * linked from anywhere and not indexed. Delete once a direction is picked.
 * `?v=F1` shows one.
 */
export const metadata: Metadata = {
  title: "Hero to services flow (internal)",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  { key: "now", name: "Now", note: "Heading top-right; a second navy photo card straight under the navy hero.", el: <Services /> },
  { key: "F1", name: "F1. Heading first", note: "A full-width heading row opens the section; lead card stays navy.", el: <Services layout="top" /> },
  { key: "F2", name: "F2. Heading first, light lead", note: "As F1, with the lead card in light grey so the hero is the only navy block up top.", el: <Services layout="top" lead="grey" /> },
  { key: "F3", name: "F3. Grey band", note: "Services on a grey band with a white lead card; the colour change marks the new section.", el: <Services layout="top" lead="white" band="grey" /> },
  { key: "F4", name: "F4. Flipped", note: "Heading and list on the left where the eye lands; light lead card on the right.", el: <Services layout="flip" lead="grey" /> },
  { key: "F5", name: "F5. Strip as the bridge", note: "The boiler strip back between, then F2.", el: <><LogoStrip light /><Services layout="top" lead="grey" /></> },
];

export default async function FlowExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const only = v?.split(",");
  return (
    <main>
      {VARIANTS.filter((x) => !only || only.includes(x.key)).map((x) => (
        <div key={x.key} className="border-b-8 border-grey">
          <div className="container-page pt-6">
            <p className="font-display text-lg font-extrabold text-navy">{x.name}</p>
            <p className="text-sm text-neutral">{x.note}</p>
          </div>
          <Hero />
          {x.el}
        </div>
      ))}
    </main>
  );
}
