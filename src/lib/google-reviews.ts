import { REVIEWS, SITE } from "@/lib/site";

export type DisplayReview = {
  name: string;
  initial: string;
  color: string;
  date: string;
  text: string;
  /** Reviewer's public Google profile photo (absent on the fallback set). */
  photo?: string;
};

export type ReviewsData = {
  rating: string;
  count: number;
  reviews: DisplayReview[];
  /** "google" when live from the Places API, "fallback" when using the hardcoded set. */
  source: "google" | "fallback";
};

const AVATAR_COLORS = ["#2563eb", "#0f766e", "#8da2bc", "#b45309", "#7c3aed", "#0891b2"];

function initialOf(name: string) {
  return (name.trim()[0] || "?").toUpperCase();
}

const FALLBACK: ReviewsData = {
  rating: SITE.rating.value,
  count: SITE.rating.count,
  reviews: REVIEWS.map((r) => ({
    name: r.name,
    initial: r.initial,
    color: r.color,
    date: r.date,
    text: r.text,
  })),
  source: "fallback",
};

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id",
      },
      body: JSON.stringify({ textQuery: "JDH Gas Services Burgess Hill RH15" }),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.places?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Live Google reviews via the Places API (New). Returns rating + total count +
 * up to 5 reviews (Google's hard cap). Falls back to the verified hardcoded set
 * when GOOGLE_PLACES_API_KEY is unset or the request fails. Cached for 24h.
 */
export async function getGoogleReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return FALLBACK;

  try {
    const placeId = await resolvePlaceId(apiKey);
    if (!placeId) return FALLBACK;

    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        "Accept-Language": "en-GB",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return FALLBACK;
    const data = await res.json();

    const reviews: DisplayReview[] = (data.reviews ?? [])
      .map((rv: Record<string, unknown>, i: number) => {
        const author =
          (rv.authorAttribution as { displayName?: string; photoUri?: string }) ?? {};
        const textObj = (rv.text as { text?: string }) ?? (rv.originalText as { text?: string }) ?? {};
        const name = author.displayName || "Google user";
        return {
          name,
          initial: initialOf(name),
          color: AVATAR_COLORS[i % AVATAR_COLORS.length],
          date: (rv.relativePublishTimeDescription as string) || "",
          text: textObj.text || "",
          photo: author.photoUri || undefined,
        };
      })
      .filter((r: DisplayReview) => r.text);

    if (!reviews.length) return FALLBACK;

    return {
      rating: data.rating ? Number(data.rating).toFixed(1) : SITE.rating.value,
      count: data.userRatingCount ?? SITE.rating.count,
      reviews,
      source: "google",
    };
  } catch {
    return FALLBACK;
  }
}
