import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";

/** Internal: overlapping hero layouts for phones (28 Nov 2026). ?v=stack | sheet | card | overlay | bars. Not linked or indexed. */
export const metadata: Metadata = {
  title: "Mobile hero (internal)",
  robots: { index: false, follow: false },
};

export default async function HeroMobile({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const mobile = (["card", "stack", "overlay", "bars"].includes(v ?? "") ? v : "sheet") as "sheet";
  return (
    <main>
      <Hero fullBleed mobile={mobile} />
      <LogoStrip light />
    </main>
  );
}
