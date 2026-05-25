import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/home/CtaBand";
import { REVIEWS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews | JDH Gas Services, Burgess Hill",
  description:
    "What Burgess Hill & Mid Sussex customers say about JDH Gas Services — 5.0 stars from 24 Google reviews. Honest, thorough, Gas Safe work.",
  alternates: { canonical: "/reviews" },
};

const GOOGLE_REVIEWS = "https://www.google.com/search?q=JDH+Gas+Services+Burgess+Hill+reviews";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-gas-safe text-gas-safe" />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Reviews", href: "/reviews" }]} />
          <p className="eyebrow mt-6">Reviews</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Rated 5.0 ★ from 24 Google reviews
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            I&apos;m proud of the work I do for homeowners and landlords across Burgess Hill and Mid
            Sussex. Here are a few of my Google reviews — you can read them all on my Google profile.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Stars />
            <span className="font-semibold text-ink">5.0</span>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener" className="text-sm font-semibold text-primary hover:text-primary-hover">
              Read all 24 on Google →
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-7">
              <Stars />
              <span className="sr-only">Rated 5 out of 5.</span>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-text">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-ink">
                {r.name} <span className="font-normal text-muted">· {r.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="container-page mt-8">
          <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener" className="font-semibold text-primary hover:text-primary-hover">
            See all 24 reviews on Google →
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
