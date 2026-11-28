import type { Metadata } from "next";
import { HelpBento, type NoPhoto } from "@/components/home/HelpBento";

/**
 * Internal comparison page for the homepage help section as a bento, in 4,
 * 5 and 6-card versions (27 Nov 2026): /explore/help-bento?v=4 (or 5, 6).
 * &t= picks the treatment for the guides with no photo: type, icon, quote,
 * photos (all-photo bento) or drawn.
 * Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Help bento directions (internal)",
  robots: { index: false, follow: false },
};

export default async function HelpBentoExplore({ searchParams }: { searchParams: Promise<{ v?: string; t?: string }> }) {
  const { v, t } = await searchParams;
  const noPhoto = (["type", "icon", "quote", "photos", "drawn"].includes(t ?? "") ? t : "type") as NoPhoto;
  const n = Number(v);
  const counts = n === 4 || n === 5 || n === 6 ? [n as 4 | 5 | 6] : ([4, 5, 6] as const);
  return (
    <main>
      {counts.map((c) => (
        <HelpBento key={c} count={c} noPhoto={noPhoto} />
      ))}
    </main>
  );
}
