import { Star } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { getGoogleReviews } from "@/lib/google-reviews";

const GOOGLE_REVIEWS = "https://www.google.com/search?q=JDH+Gas+Services+Burgess+Hill+reviews";

export async function Reviews({ tone = "sunken" }: { tone?: "sunken" | "surface" } = {}) {
  const { rating, count, reviews } = await getGoogleReviews();

  return (
    <section
      className={`section overflow-x-clip ${tone === "surface" ? "bg-surface" : "bg-sunken"}`}
      aria-labelledby="reviews-h"
    >
      <Reveal className="container-page">
        <p className="eyebrow">What our customers say</p>
        <h2 id="reviews-h" className="mt-2 max-w-2xl font-display text-3xl font-bold md:text-4xl">
          Trusted across Burgess Hill &amp; Mid Sussex
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center lg:gap-10">
          <div className="text-center lg:text-left">
            <p className="font-display text-2xl font-extrabold tracking-wide text-ink">EXCELLENT</p>
            <div className="mt-2 flex justify-center lg:justify-start" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-7 w-7 fill-gas-safe text-gas-safe" />
              ))}
            </div>
            <p className="mt-2 text-muted">
              <span className="sr-only">Rated {rating} out of 5. </span>Based on{" "}
              <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener" className="font-semibold text-ink underline underline-offset-2">
                {count} reviews
              </a>
            </p>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2" aria-label="Read JDH Gas reviews on Google">
              <GoogleG className="h-7 w-7" />
              <span className="font-display text-xl font-bold text-ink">Google</span>
            </a>
          </div>

          <ReviewsCarousel reviews={[...reviews]} />
        </div>
      </Reveal>
    </section>
  );
}
