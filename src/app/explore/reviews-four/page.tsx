import type { Metadata } from "next";
import { ReviewRow } from "@/components/home/ReviewRow";
import { getGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_REVIEWS_URL, PHOTO_REVIEWS } from "@/lib/reviews";

/** Internal: the homepage reviews row with four cards visible on desktop
 *  (27 Nov 2026), against the live three. ?v=3 or ?v=4. Not linked or indexed. */
export const metadata: Metadata = {
  title: "Reviews four-up (internal)",
  robots: { index: false, follow: false },
};

export default async function ReviewsFour({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const { rating, count } = await getGoogleReviews();
  return (
    <main>
      <ReviewRow reviews={PHOTO_REVIEWS} href={GOOGLE_REVIEWS_URL} rating={rating} count={count} perView={v === "3" ? 3 : 4}>
        <p className="container-page mt-8 text-center text-navy-muted">
          Annual boiler service due? <span className="font-semibold text-white underline underline-offset-4">Book it online</span>
        </p>
      </ReviewRow>
    </main>
  );
}
