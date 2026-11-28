"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type R = { name: string; text: string; photo: string };

/**
 * One review at a time, set large, with the reviewers' photos as the way to
 * switch between them. Short (one quote tall) and every review shows in full.
 * Explored for the homepage reviews, 27 Nov 2026.
 */
export function ReviewSpotlight({ reviews }: { reviews: R[] }) {
  const [i, setI] = useState(0);
  const r = reviews[i];
  return (
    <div className="grid gap-8 rounded-[8px] bg-white p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
      <figure aria-live="polite">
        <span aria-label="5 out of 5 stars" className="inline-flex gap-0.5 text-navy">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden />
          ))}
        </span>
        <blockquote className="mt-4 min-h-[7.5rem] whitespace-pre-line font-display text-[clamp(1.25rem,1rem+0.8vw,1.6rem)] font-semibold leading-[1.38] tracking-[-0.015em] text-navy">
          {r.text}
        </blockquote>
        <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral">
          {r.name} <span className="normal-case tracking-normal">· Google review</span>
        </figcaption>
      </figure>
      <div role="tablist" aria-label="Choose a review" className="flex gap-3 lg:flex-col">
        {reviews.map((x, k) => (
          <button
            key={x.name}
            role="tab"
            aria-selected={k === i}
            aria-label={`Review from ${x.name}`}
            onClick={() => setI(k)}
            onMouseEnter={() => setI(k)}
            className={`h-14 w-14 overflow-hidden rounded-full transition-[box-shadow,opacity] ${
              k === i ? "opacity-100 shadow-[0_0_0_3px_#fff,0_0_0_5px_#ff6b1a]" : "opacity-60 hover:opacity-100"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.photo} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
