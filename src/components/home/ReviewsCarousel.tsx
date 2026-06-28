"use client";

import { useEffect, useRef } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import { GoogleReviewsLink } from "@/components/ui/GoogleReviewsLink";
import type { DisplayReview } from "@/lib/google-reviews";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gas-safe text-gas-safe" />
      ))}
    </div>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: DisplayReview[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const step = () => {
    const t = trackRef.current;
    if (!t) return 360;
    const card = t.querySelector("figure");
    return card ? card.offsetWidth + 20 : 360;
  };

  const move = (dir: number) => trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  // Auto-advance; pause on hover/focus/touch; respect reduced-motion.
  useEffect(() => {
    const t = trackRef.current;
    if (!t || reviews.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      if (t.scrollLeft + t.clientWidth >= t.scrollWidth - 12) {
        t.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        t.scrollBy({ left: step(), behavior: "smooth" });
      }
    }, 4000);
    return () => window.clearInterval(id);
  }, [reviews.length]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <div className="relative min-w-0">
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onTouchStart={pause}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <figure
            key={`${r.name}-${i}`}
            className="flex shrink-0 basis-[85%] snap-start flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 shadow-[var(--shadow-sm)] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full font-display text-lg font-bold text-white" style={{ backgroundColor: r.color }} aria-hidden>
                  {r.initial}
                </span>
                <div>
                  <figcaption className="font-semibold text-ink">{r.name}</figcaption>
                  {r.date && <p className="text-xs text-muted">{r.date}</p>}
                </div>
              </div>
              <GoogleG className="h-5 w-5" />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <Stars />
              <BadgeCheck className="h-4 w-4 text-primary" aria-label="Verified Google review" />
              <span className="sr-only">Rated 5 out of 5, verified.</span>
            </div>
            <blockquote className="mt-3 line-clamp-5 flex-1 text-sm leading-relaxed text-text">{r.text}</blockquote>
            <GoogleReviewsLink className="mt-3" />
          </figure>
        ))}
      </div>

      <div className="mt-4 flex gap-2 lg:absolute lg:-top-16 lg:right-0 lg:mt-0">
        <button type="button" onClick={() => move(-1)} aria-label="Previous reviews" className="grid h-10 w-10 place-items-center rounded-full border border-border-strong bg-surface text-ink transition-colors hover:border-primary hover:text-primary">
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next reviews" className="grid h-10 w-10 place-items-center rounded-full border border-border-strong bg-surface text-ink transition-colors hover:border-primary hover:text-primary">
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
