"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import type { TownReview } from "@/lib/local-pages";

// Town pages carry at most two reviews. Shown as one large, left-aligned quote
// (the right column of a two-column section); with two, slowly auto-advance.
const ADVANCE_MS = 7000;

export function TownReviews({ reviews }: { reviews: TownReview[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const multiple = reviews.length > 1;

  // Honour prefers-reduced-motion: no auto-advance, no slide animation.
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  // Slow auto-advance; pauses on hover/focus.
  useEffect(() => {
    if (!multiple || paused || reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % reviews.length),
      ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [multiple, paused, reduced, reviews.length]);

  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-7 shadow-[var(--shadow-md)] md:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className={`flex ${reduced ? "" : "transition-transform duration-700 ease-out"}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className="w-full shrink-0"
              aria-hidden={multiple && i !== index}
            >
              <div className="flex gap-1" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-5 w-5 fill-gas-safe text-gas-safe"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-5 max-w-3xl font-display text-xl font-semibold leading-relaxed tracking-tight text-ink sm:text-2xl md:leading-[1.45]">
                {r.text}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3.5 border-t border-border-subtle pt-6">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-bold text-white"
                  aria-hidden
                >
                  {r.name.trim()[0]}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{r.name}</span>
                  <span className="flex items-center gap-1.5 text-sm text-muted">
                    <GoogleG className="h-4 w-4" /> Google review
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {multiple && (
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
            aria-label="Previous review"
            className="grid h-10 w-10 place-items-center rounded-full border border-border-strong bg-surface text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % reviews.length)}
            aria-label="Next review"
            className="grid h-10 w-10 place-items-center rounded-full border border-border-strong bg-surface text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
