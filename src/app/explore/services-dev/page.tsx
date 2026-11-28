import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Services } from "@/components/home/Services";
import { Reviews } from "@/components/home/HomeSections";
import { ServicesV1, ServicesV2 } from "@/components/home/ServicesDev";
import { ServicesSelector } from "@/components/home/ServicesSelector";

/**
 * Internal: the homepage services section, development round (27 Nov 2026),
 * shown in place between the boiler strip and the reviews.
 * ?v=now | 1 (refined) | 2 (bento) | 3 (selector). Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Services development (internal)",
  robots: { index: false, follow: false },
};

export default async function ServicesDev({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v = "1" } = await searchParams;
  return (
    <main>
      <Hero fullBleed />
      <LogoStrip light />
      {v === "now" ? (
        <Services layout="top" lead="navy" band="grey" />
      ) : v === "2" ? (
        <ServicesV2 />
      ) : v === "3" ? (
        <ServicesSelector />
      ) : (
        <ServicesV1 />
      )}
      <Reviews />
    </main>
  );
}
