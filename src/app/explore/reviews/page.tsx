import type { Metadata } from "next";
import { ArrowRight, Star } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import { Reviews } from "@/components/home/HomeSections";
import { ReviewSpotlight } from "@/components/home/ReviewSpotlight";
import { getGoogleReviews } from "@/lib/google-reviews";
import { FEATURED_REVIEWS, GOOGLE_REVIEWS_URL, PHOTO_REVIEWS } from "@/lib/reviews";

/**
 * Internal comparison page for the homepage reviews, round 3 (27 Nov 2026).
 * Diagnosis of the current section: every card repeats the same widget
 * furniture (gold stars, typed quotes, divider, coloured avatar, Google G),
 * which brings six off-brand colours and makes it read like an embedded
 * Google widget; the quotes are small body text with no hierarchy; and the
 * rating is shouted twice. Both directions keep the four hand-picked reviews,
 * word for word. Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Reviews directions (internal)",
  robots: { index: false, follow: false },
};

type Data = Awaited<ReturnType<typeof getGoogleReviews>>;

function Stars({ className = "", size = "h-4 w-4" }: { className?: string; size?: string }) {
  return (
    <span aria-label="5 out of 5 stars" className={`inline-flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-current`} strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}

/** The reviewer's profile: their Google photo where they have a real one,
 *  otherwise their initial. One brand treatment for all of them (not the
 *  rainbow of avatar colours), so they add trust without adding noise. */
function Avatar({ r, dark }: { r: { name: string; photo?: string }; dark: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full font-display text-sm font-extrabold ${
        dark ? "bg-white text-navy" : "bg-navy text-white"
      }`}
    >
      {r.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.photo} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
      ) : (
        r.name.trim()[0].toUpperCase()
      )}
    </span>
  );
}

/** One compact rating line, said once (Jetson's header pattern). */
function RatingLine({ d }: { d: Data }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener"
      className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-white"
    >
      <GoogleG className="h-5 w-5" />
      <span className="font-display text-2xl font-extrabold tracking-[-0.03em]">{d.rating}</span>
      <Stars className="text-action" size="h-[18px] w-[18px]" />
      <span className="text-sm text-navy-muted">{d.count} Google reviews</span>
      <span className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">
        Read them all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </a>
  );
}

function Header({ d }: { d: Data }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
      <h2 className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold tracking-[-0.03em] text-white">
        What our customers say
      </h2>
      <RatingLine d={d} />
    </div>
  );
}

/* R1: editorial on navy. No white tiles: the four quotes set in the display
   face, in ruled columns, with one quiet attribution each. */
function R1({ d }: { d: Data }) {
  return (
    <section className="bg-navy py-16 text-white lg:py-24">
      <div className="container-page">
        <Header d={d} />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[8px] bg-navy-line sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_REVIEWS.map((r) => (
            <li key={r.name} className="flex flex-col bg-navy p-6 lg:p-7">
              <Stars className="text-action" />
              <blockquote className="mt-4 font-display text-[19px] font-semibold leading-[1.4] tracking-[-0.01em] text-white">
                {r.text}
              </blockquote>
              <div className="mt-auto flex items-center gap-3 pt-6">
                <Avatar r={r} dark />
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-white">{r.name}</span>
                  <span className="text-xs text-navy-muted">Google review</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* R2: refined cards. White cards kept, but stripped of the widget furniture:
   no avatar, no per-card logo, navy stars, the quote larger in the display
   face, the name in small capitals. */
function R2({ d }: { d: Data }) {
  return (
    <section className="bg-navy py-16 text-white lg:py-24">
      <div className="container-page">
        <Header d={d} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PHOTO_REVIEWS.map((r) => (
            <li key={r.name}>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener"
                className="flex h-full flex-col rounded-[6px] bg-white p-6 transition-[translate,box-shadow] duration-200 hover:shadow-[0_18px_34px_-14px_rgba(0,0,0,0.55)] motion-safe:hover:-translate-y-1 lg:p-7"
              >
                <Stars className="text-navy" size="h-[15px] w-[15px]" />
                <blockquote className="mt-4 whitespace-pre-line font-display text-[18px] font-semibold leading-[1.42] tracking-[-0.01em] text-navy">
                  {r.text}
                </blockquote>
                <div className="mt-auto flex items-center gap-3 pt-6">
                  <Avatar r={r} dark={false} />
                  <span className="leading-tight">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy">{r.name}</span>
                    <span className="text-xs text-neutral">Google review</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Shared card body for the S-variants (R2's card, reused). */
function PhotoCard({ r, clamp = "" }: { r: (typeof PHOTO_REVIEWS)[number]; clamp?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener"
      className="flex h-full flex-col rounded-[6px] bg-white p-6 transition-[translate,box-shadow] duration-200 hover:shadow-[0_18px_34px_-14px_rgba(0,0,0,0.55)] motion-safe:hover:-translate-y-1 lg:p-7"
    >
      <Stars className="text-navy" size="h-[15px] w-[15px]" />
      <blockquote className={`mt-3 font-display text-[17px] font-semibold leading-[1.45] tracking-[-0.01em] text-navy ${clamp}`}>
        {r.text.replace(/\n/g, " ")}
      </blockquote>
      <div className="mt-auto flex items-center gap-3 pt-5">
        <Avatar r={r} dark={false} />
        <span className="leading-tight">
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy">{r.name}</span>
          <span className="text-xs text-neutral">Google review</span>
        </span>
      </div>
    </a>
  );
}

/* S1: a 2×2 grid of wide cards. Wider cards mean fewer lines; four reviews in two short rows. */
function S1({ d }: { d: Data }) {
  return (
    <section className="bg-navy py-16 text-white lg:py-24">
      <div className="container-page">
        <Header d={d} />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {PHOTO_REVIEWS.map((r) => (
            <li key={r.name}>
              <PhotoCard r={r} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* S2: a sliding row. Wide cards (about 40% of the row each), two and a bit
   visible, the rest a swipe or an arrow away. One row tall. */
function S2({ d }: { d: Data }) {
  return (
    <section className="bg-navy py-16 text-white lg:py-24">
      <div className="container-page">
        <Header d={d} />
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:thin] sm:scroll-px-8 sm:px-8 lg:scroll-pl-[max(2rem,calc((100vw-1136px)/2))] lg:pl-[max(2rem,calc((100vw-1136px)/2))]">
        {PHOTO_REVIEWS.map((r) => (
          <li key={r.name} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[460px]">
            <PhotoCard r={r} />
          </li>
        ))}
        <li aria-hidden className="w-1 shrink-0" />
      </ul>
    </section>
  );
}

/* S3: one review at a time, set large; the four reviewers' photos switch it. */
function S3({ d }: { d: Data }) {
  return (
    <section className="bg-navy py-16 text-white lg:py-24">
      <div className="container-page">
        <Header d={d} />
        <div className="mt-10">
          <ReviewSpotlight reviews={PHOTO_REVIEWS} />
        </div>
      </div>
    </section>
  );
}

const VARIANTS = [
  { key: "now", name: "Now", note: "White widget cards: gold stars, quote marks, coloured avatars, a Google G on each.", el: () => <Reviews /> },
  { key: "R1", name: "R1. Editorial on navy", note: "No white tiles: quotes in the display face in ruled navy columns, profile pictures in one brand style; rating said once.", el: (d: Data) => <R1 d={d} /> },
  { key: "S1", name: "S1. Two by two", note: "Four wide cards in two short rows, so each review runs to fewer lines.", el: (d: Data) => <S1 d={d} /> },
  { key: "S2", name: "S2. Sliding row", note: "Wide cards in one row that slides sideways; two and a bit visible at once.", el: (d: Data) => <S2 d={d} /> },
  { key: "S3", name: "S3. One at a time", note: "One review set large; the reviewers' photos on the right switch between them (hover or tap).", el: (d: Data) => <S3 d={d} /> },
  { key: "R2", name: "R2. Refined cards", note: "White cards kept but stripped; four detailed reviews from reviewers with real photos (Suriani Hulbert, Nicole Wood, Sabrina Edwards, Eleanor de Beaulieu).", el: (d: Data) => <R2 d={d} /> },
];

export default async function ReviewsExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const only = v?.split(",");
  const d = await getGoogleReviews();
  return (
    <main>
      {VARIANTS.filter((x) => !only || only.includes(x.key)).map((x) => (
        <div key={x.key}>
          <div className="container-page py-5">
            <p className="font-display text-lg font-extrabold text-navy">{x.name}</p>
            <p className="text-sm text-neutral">{x.note}</p>
          </div>
          {x.el(d)}
        </div>
      ))}
    </main>
  );
}
