import type { Metadata } from "next";
import { AreaBand, Reviews } from "@/components/home/HomeSections";
import type { AreaLayout } from "@/components/home/AreaMapCheck";

/**
 * Internal: the join between the navy reviews and the map band (27 Nov 2026).
 * ?v=band (live) | head | bridge | inset. Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Reviews to map join (internal)",
  robots: { index: false, follow: false },
};

export default async function AreaJoin({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const layout = (["band", "head", "bridge", "inset"].includes(v ?? "") ? v : "head") as AreaLayout;
  return (
    <main>
      <Reviews />
      <AreaBand layout={layout} />
    </main>
  );
}
