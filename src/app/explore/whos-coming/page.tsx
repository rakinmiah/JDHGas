import type { Metadata } from "next";
import { AreaBand } from "@/components/home/HomeSections";
import { HelpBento } from "@/components/home/HelpBento";
import { WhosComing } from "@/components/home/WhosComing";

/** Internal: the "who's coming" draft between the map and help, as on the homepage (28 Nov 2026). ?v=legend | tags | plain | portrait | bleed. Not linked or indexed. */
export const metadata: Metadata = {
  title: "Who's coming (internal)",
  robots: { index: false, follow: false },
};

export default async function WhosComingExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  return (
    <main>
      <AreaBand layout="head" />
      <WhosComing variant={(["tags", "plain", "portrait", "bleed"].includes(v ?? "") ? v : "legend") as "legend"} />
      <HelpBento count={5} noPhoto="photos" />
    </main>
  );
}
