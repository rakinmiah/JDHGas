"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";

type R = { name: string; text: string; photo: string };

/**
 * Homepage reviews (direction S2, refined 27 Nov 2026): the heading and the
 * rating (said once) with the row's arrows beside it, then a full-width row
 * of wide white cards, three visible at once on desktop, that slides
 * sideways through all five. Swipe on phones; arrows or a trackpad on
 * desktop.
 */
export function ReviewRow({
  reviews,
  href,
  rating,
  count,
  children,
  perView = 3,
  sectionY = "py-14 lg:py-16",
  headGap = "mt-8",
}: {
  reviews: R[];
  href: string;
  rating: string;
  count: number;
  /** Optional closing line under the row (inside the navy band). */
  children?: React.ReactNode;
  /** Cards visible at once on desktop (4 explored 27 Nov 2026). */
  perView?: 3 | 4;
  /** Vertical padding classes for the band. */
  sectionY?: string;
  /** Gap between the heading row and the cards. */
  headGap?: string;
}) {
  const four = perView === 4;
  const row = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };
  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-navy-line text-white transition-colors hover:bg-white hover:text-navy";

  return (
    <section aria-labelledby="reviews-h" className={`bg-navy text-white ${sectionY}`}>
      <div className="container-page flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <h2
          id="reviews-h"
          className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold tracking-[-0.03em] text-white"
        >
          What our customers say
        </h2>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={href} target="_blank" rel="noopener" className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
            <GoogleG className="h-5 w-5" />
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em]">{rating}</span>
            <span aria-label="5 out of 5 stars" className="text-lg tracking-[2px] text-action">
              ★★★★★
            </span>
            <span className="text-sm text-navy-muted">{count} Google reviews</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">
              Read them all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {/* Arrows only when there are more cards than fit; with four cards and
              four across (xl) they would do nothing. */}
          <div className={`hidden gap-2 lg:flex ${four && reviews.length <= 4 ? "xl:hidden" : ""}`}>
            <button type="button" onClick={() => move(-1)} aria-label="Previous reviews" className={arrow}>
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="More reviews" className={arrow}>
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Full width: a small gutter each side, three cards across on desktop. */}
      <ul
        ref={row}
        className={`${headGap} flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden`}
      >
        {reviews.map((r) => (
          <li key={r.name} className={`w-[85%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] ${four ? "lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]" : "lg:w-[calc((100%-2rem)/3)]"}`}>
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className={`flex h-full flex-col rounded-[6px] bg-white transition-[translate,box-shadow] ${four ? "p-5 xl:p-6" : "p-6"} duration-200 hover:shadow-[0_18px_34px_-14px_rgba(0,0,0,0.55)] motion-safe:hover:-translate-y-1`}
            >
              <span className="sr-only">Read {r.name}&rsquo;s review on Google (opens in a new tab). </span>
              <span aria-label="5 out of 5 stars" className="inline-flex gap-0.5 text-navy">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-[15px] w-[15px] fill-current" strokeWidth={0} aria-hidden />
                ))}
              </span>
              <blockquote className={`mt-3 font-display font-semibold leading-[1.45] tracking-[-0.01em] text-navy ${four ? "text-[16px]" : "text-[17px]"}`}>
                {r.text.replace(/\n/g, " ")}
              </blockquote>
              <div className="mt-auto flex items-center gap-3 pt-5">
                <span aria-hidden className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-grey">
                  {/* Google profile photo; no-referrer or googleusercontent can refuse it. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy">{r.name}</span>
                  <span className="text-xs text-neutral">Google review</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}
