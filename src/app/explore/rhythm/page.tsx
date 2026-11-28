import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { AreaBand } from "@/components/home/HomeSections";
import { ReviewRow } from "@/components/home/ReviewRow";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { ServicesTiers } from "@/components/home/ServicesTiers";
import { HelpFaq } from "@/components/home/HelpFaq";
import { ContactSection } from "@/components/home/ContactSection";
import { SECTION_Y } from "@/components/home/rhythm";
import { BOOK_HREF } from "@/lib/booking";
import { getGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_REVIEWS_URL, PHOTO_REVIEWS } from "@/lib/reviews";

/**
 * Internal: the whole homepage with one spacing rule (rhythm.ts), fewer
 * background changes (navy, white, navy, map, white, contact), the boiler
 * strip folded into services, and help merged with the FAQ.
 * ?s=A (service index) or ?s=B (two tiers). 27 Nov 2026. Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Homepage rhythm (internal)",
  robots: { index: false, follow: false },
};

export default async function RhythmExplore({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s } = await searchParams;
  const { rating, count } = await getGoogleReviews();
  return (
    <main>
      <Hero fullBleed />
      {s === "B" ? <ServicesTiers /> : <ServicesIndex />}
      <ReviewRow
        reviews={PHOTO_REVIEWS.slice(0, 4)}
        href={GOOGLE_REVIEWS_URL}
        rating={rating}
        count={count}
        perView={4}
        sectionY={SECTION_Y}
      >
        <p className="container-page mt-10 text-center text-navy-muted lg:mt-12">
          Annual boiler service due?{" "}
          <Link
            href={BOOK_HREF}
            className="inline-flex items-center gap-1 font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Book it online <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </ReviewRow>
      <AreaBand />
      <HelpFaq />
      <ContactSection sectionY={SECTION_Y} />
    </main>
  );
}
