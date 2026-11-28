import type { Metadata } from "next";
import { ServicesV1 } from "@/components/home/ServicesDev";
import { Reviews } from "@/components/home/HomeSections";
import { AboutColumns, AboutDeveloped, AboutSplit } from "@/components/home/AboutJdh";

/**
 * Internal: a homepage "About JDH Gas" section (28 Nov 2026), shown between
 * the services and the reviews. ?v=1 (split) | 2 (columns) | 3 (split, developed). Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "About section (internal)",
  robots: { index: false, follow: false },
};

export default async function AboutExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  return (
    <main>
      <ServicesV1 />
      {v === "2" ? <AboutColumns /> : v === "3" ? <AboutDeveloped /> : <AboutSplit />}
      <Reviews />
    </main>
  );
}
