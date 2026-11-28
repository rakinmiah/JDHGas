import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BrandMarks, LogoStrip } from "@/components/home/LogoStrip";
import { ServicesV1 } from "@/components/home/ServicesDev";

/**
 * Internal: tying the hero and the boiler-make strip together (28 Nov 2026).
 * ?v=now | A (makes inside the hero) | B (a white bar over the hero's foot) |
 * C (a slim rail that reads as the hero's footer). Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Hero and strip (internal)",
  robots: { index: false, follow: false },
};

const LABEL = "We service and repair every major boiler make";

export default async function HeroStrip({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v = "A" } = await searchParams;
  return (
    <main>
      {v === "A" ? (
        <Hero
          fullBleed
          footer={
            <div className="mt-10 border-t border-navy-line pt-6">
              <p className="text-sm text-navy-muted">{LABEL}</p>
              <BrandMarks tone="white" small className="mt-4" />
            </div>
          }
        />
      ) : (
        <Hero fullBleed />
      )}

      {v === "B" && (
        <div className="relative z-10 flow-root bg-sunken">
          <div className="container-page">
            <div className="-mt-12 flex flex-col gap-6 rounded-[8px] bg-white px-6 py-6 shadow-[0_22px_44px_-22px_rgba(15,31,75,0.5)] lg:flex-row lg:items-center lg:gap-12 lg:px-10">
              <p className="shrink-0 font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">Every major make,<br className="hidden lg:block" /> serviced and repaired</p>
              <BrandMarks className="flex-1" />
            </div>
          </div>
        </div>
      )}

      {v === "C" && (
        <div className="border-b border-rule bg-surface">
          <div className="container-page flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-14 lg:py-8">
            <p className="shrink-0 text-sm font-semibold text-navy">{LABEL}</p>
            <BrandMarks className="flex-1" />
          </div>
        </div>
      )}

      {v === "now" && <LogoStrip light />}
      <ServicesV1 />
    </main>
  );
}
