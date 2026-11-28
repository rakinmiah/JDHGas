import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HeaderMock } from "./HeaderMock";

/**
 * Internal comparison page for a single-row header (27 Nov 2026). The live
 * header is two rows, both sticky: about 126px pinned on screen. These are one
 * row, 76px. Each is shown over the real hero: /explore/header?v=H1, H2, or
 * H1open (the Services menu open). The live header still shows above them
 * here; captures hide it. Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Header directions (internal)",
  robots: { index: false, follow: false },
};

export default async function HeaderExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v = "H1" } = await searchParams;
  const variant = v.startsWith("H2") ? "H2" : "H1";
  return (
    <main>
      <HeaderMock variant={variant} startOpen={v.endsWith("open")} />
      <Hero fullBleed />
    </main>
  );
}
