import Link from "next/link";
import { Star, ArrowRight, ArrowUpRight } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { GOOGLE_REVIEWS_URL } from "@/lib/reviews";
import { confirmedTown } from "@/lib/review-towns";
import { getGoogleReviews, type DisplayReview } from "@/lib/google-reviews";

type Variant = "feature" | "accent" | "compact";

/**
 * Pick the two quotes to set large, in the order the source returns them
 * (Places API order, or the fallback list): the first review of 120–320
 * characters for the wide card, then the next of 40–220 for the narrow one.
 * The rest, up to three, go in the compact row. Text is never edited.
 */
function selectReviews(reviews: DisplayReview[]) {
  const pool = [...reviews];
  const take = (min: number, max: number) => {
    const i = pool.findIndex((r) => r.text.length >= min && r.text.length <= max);
    return i === -1 ? undefined : pool.splice(i, 1)[0];
  };
  const feature = take(120, 320) ?? pool.shift();
  const accent = take(40, 220) ?? pool.shift();
  return { feature, accent, rest: pool.slice(0, 3) };
}

function Attribution({ review, inverse = false }: { review: DisplayReview; inverse?: boolean }) {
  const town = confirmedTown(review.name);
  return (
    <figcaption className={`mt-5 text-sm ${inverse ? "text-white/80" : "text-muted"}`}>
      <span className={`font-semibold ${inverse ? "text-white" : "text-ink"}`}>{review.name}</span>
      {town && <> · {town}</>}
      {review.date && <> · {review.date}</>}
    </figcaption>
  );
}

function ReviewCard({ review, variant }: { review: DisplayReview; variant: Variant }) {
  if (variant === "compact") {
    return (
      <figure className="flex h-[188px] w-[85%] shrink-0 snap-start flex-col rounded-xl bg-sunken p-5 sm:w-auto">
        <blockquote className="line-clamp-4 text-[0.9375rem] leading-relaxed text-text">
          &ldquo;{review.text}&rdquo;
        </blockquote>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <Attribution review={review} />
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            aria-label={`Read ${review.name}'s review on Google (opens in a new tab)`}
            className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
          >
            Read on Google <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </figure>
    );
  }
  const accent = variant === "accent";
  return (
    <figure
      className={`flex h-full flex-col rounded-xl p-6 md:p-8 ${
        accent ? "bg-primary text-white" : "bg-sunken"
      }`}
    >
      <blockquote
        className={`font-display font-semibold ${
          accent ? "text-h3 text-white" : "text-quote text-ink"
        }`}
      >
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <div className="mt-auto">
        <Attribution review={review} inverse={accent} />
      </div>
    </figure>
  );
}

/**
 * M5, homepage reviews: the rating stated large (Airbnb), the two strongest
 * live reviews as a 2:1 pair (Linear), the rest in a compact row. No
 * carousel, no autoplay, no reviewer photos. Other pages keep <Reviews>.
 */
export async function HomeReviews() {
  const { rating, count, reviews } = await getGoogleReviews();
  const { feature, accent, rest } = selectReviews(reviews);

  return (
    <section className="section bg-surface" aria-labelledby="reviews-h">
      <div className="container-page">
        <Reveal staticBelowLg className="text-center">
          <p className="eyebrow">Reviews</p>
          <h2 id="reviews-h" className="mt-3 font-display font-bold">
            <span className="block text-stat font-extrabold text-ink">{rating}</span>
            <span className="mt-3 flex items-center justify-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gas-safe text-gas-safe" />
              ))}
            </span>
            <span className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-2 text-h3 font-semibold text-ink">
              <GoogleG className="h-5 w-5" />
              <span>
                on Google, <Accent>from {count} reviews</Accent>
              </span>
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Every review here is from Google, shown word for word.
          </p>
        </Reveal>

        {(feature || accent) && (
          <div className="mt-10 grid gap-3 lg:mt-14 lg:grid-cols-12">
            {feature && (
              <Reveal staticBelowLg className="lg:col-span-8">
                <ReviewCard review={feature} variant="feature" />
              </Reveal>
            )}
            {accent && (
              <Reveal staticBelowLg delay={0.06} className="lg:col-span-4">
                <ReviewCard review={accent} variant="accent" />
              </Reveal>
            )}
          </div>
        )}

        {rest.length > 0 && (
          <div
            tabIndex={0}
            role="region"
            aria-label="More reviews"
            className="-mx-5 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {rest.map((r) => (
              <ReviewCard key={`${r.name}-${r.date}`} review={r} variant="compact" />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-2 hover:text-primary-hover hover:underline"
          >
            Read all {count} reviews on Google <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-2 hover:text-primary-hover hover:underline"
          >
            Reviews by town <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
