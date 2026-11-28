import Link from "next/link";
import { Star } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import type { DisplayReview } from "@/lib/google-reviews";

/**
 * The hero social-proof block: overlapping reviewer avatars, the live Google
 * rating, and the "Trusted by N+" line. Only reviewers with a real Google
 * profile photo make the stack; coloured initials are the fallback when no
 * photos are available at all (e.g. the offline fallback review set).
 */
export function HeroSocialProof({
  rating,
  count,
  reviews = [],
  tone = "light",
}: {
  rating: string;
  count: number;
  reviews?: DisplayReview[];
  /** "inverse" for navy surfaces (the homepage hero). */
  tone?: "light" | "inverse";
}) {
  const inverse = tone === "inverse";
  const ring = inverse ? "ring-ink" : "ring-surface";
  const strong = inverse ? "text-inverse" : "text-ink";
  const withPhotos = reviews.filter((r) => r.photo);
  const avatars = (withPhotos.length > 0 ? withPhotos : reviews).slice(0, 7);

  return (
    <div>
      {avatars.length > 0 && (
        <div className="flex items-center" aria-hidden>
          {avatars.map((r, i) => (
            <span
              key={`${r.name}-${i}`}
              style={{ backgroundColor: r.color, zIndex: avatars.length - i }}
              className={`grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full font-display text-sm font-bold text-white ring-2 ${ring} ${
                i > 0 ? "-ml-2.5" : ""
              }`}
            >
              {r.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                r.initial
              )}
            </span>
          ))}
          {count > avatars.length && (
            <span className={`z-0 -ml-2.5 grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-inverse ring-2 ${ring} ${inverse ? "bg-primary" : "bg-ink"}`}>
              +{count - avatars.length}
            </span>
          )}
        </div>
      )}
      <Link
        href="/reviews"
        className="mt-3 inline-flex flex-wrap items-center gap-x-1.5 gap-y-1"
        aria-label={`Rated ${rating} out of 5 from ${count} Google reviews`}
      >
        <span className="flex shrink-0 gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4.5 w-4.5 fill-gas-safe text-gas-safe" />
          ))}
        </span>
        <span className={`font-display text-lg font-bold ${strong}`}>{rating}</span>
        <span className={`text-sm ${inverse ? "text-steel" : "text-muted"}`}>on</span>
        <GoogleG className="h-4.5 w-4.5 shrink-0" />
        <span className={`font-display text-base font-bold ${strong}`}>Google</span>
      </Link>
      <p className={`mt-2 flex items-center gap-2 text-sm font-medium ${inverse ? "text-inverse/85" : "text-text"}`}>
        <span className="h-2 w-2 shrink-0 rounded-full bg-whatsapp" aria-hidden />
        <span>
          Trusted by <span className={`font-bold ${strong}`}>{count}+</span> customers
          <span className="hidden sm:inline"> across Burgess Hill &amp; Mid Sussex</span>
        </span>
      </p>
    </div>
  );
}
