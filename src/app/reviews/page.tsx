import type { Metadata } from "next";
import { Star, ArrowRight, Quote, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GoogleG } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { GoogleReviewsLink } from "@/components/ui/GoogleReviewsLink";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { REVIEWS, SITE } from "@/lib/site";
import { GOOGLE_REVIEWS_URL } from "@/lib/reviews";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = {
  title: "Reviews | JDH Gas Services, Burgess Hill",
  description:
    "What Burgess Hill & Mid Sussex customers say about JDH Gas Services: 5.0 stars on Google. Honest, thorough, Gas Safe work from engineer Jamie Hannah.",
  alternates: { canonical: "/reviews" },
};

function Stars({ size = "h-4 w-4", className = "" }: { size?: string; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-gas-safe text-gas-safe`} />
      ))}
    </div>
  );
}

function Avatar({ initial, color }: { initial: string; color: string }) {
  return (
    <span
      style={{ backgroundColor: color }}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white"
      aria-hidden
    >
      {initial}
    </span>
  );
}

const TRUST = [
  { icon: ShieldCheck, text: `Gas Safe registered · ${SITE.gasSafe}` },
  { icon: BadgeCheck, text: "Reviews verified on Google" },
  { icon: MapPin, text: "Burgess Hill & Mid Sussex" },
];

export default async function ReviewsPage() {
  const { rating, count } = await getGoogleReviews();
  const [featured, ...rest] = REVIEWS;

  return (
    <>
      {/* Hero — copy + ink rating panel */}
      <section className="border-b border-border-subtle bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Reviews", href: "/reviews" }]} />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_minmax(300px,400px)] lg:items-center lg:gap-14">
            <div>
              <p className="eyebrow">Reviews</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                What my customers say
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                I&apos;m proud of the work I do for homeowners and landlords across Burgess Hill and
                Mid Sussex. Here are some of the {count} reviews left on my Google profile.
              </p>
              <div className="mt-6">
                <Button href={GOOGLE_REVIEWS_URL}>
                  Read all on Google <ArrowRight className="h-5 w-5" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-ink p-8 text-inverse shadow-[var(--shadow-md)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/25 blur-3xl"
              />
              <div className="relative flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/10 px-3 py-1.5">
                  <GoogleG className="h-5 w-5" />
                  <span className="font-display text-sm font-bold text-inverse">Google Reviews</span>
                </span>
                <p className="mt-5 font-display text-6xl font-extrabold leading-none text-inverse">{rating}</p>
                <Stars size="h-6 w-6" className="mt-4 justify-center" />
                <p className="mt-4 text-inverse/80">
                  Based on <span className="font-semibold text-inverse">{count} reviews</span>
                </p>
              </div>
            </div>
          </div>

          {/* trust strip */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border-subtle pt-6 text-sm font-medium text-text">
            {TRUST.map((t) => (
              <li key={t.text} className="flex items-center gap-2">
                <t.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {t.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured review + masonry */}
      <section className="section bg-surface">
        <div className="container-page">
          {/* Featured */}
          <Reveal
            as="figure"
            className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-8 md:p-10"
          >
            <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/15" aria-hidden />
            <Stars size="h-5 w-5" />
            <span className="sr-only">Rated 5 out of 5.</span>
            <blockquote className="relative mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              &ldquo;{featured.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Avatar initial={featured.initial} color={featured.color} />
              <span>
                <span className="block text-sm font-semibold text-ink">{featured.name}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <GoogleG className="h-3.5 w-3.5" /> {featured.source} · {featured.date}
                </span>
              </span>
            </figcaption>
            <GoogleReviewsLink className="mt-6" />
          </Reveal>

          {/* Masonry */}
          <div className="mt-6 [column-gap:1.5rem] sm:columns-2 lg:columns-3">
            {rest.map((r, i) => (
              <Reveal
                key={r.name}
                delay={(i % 3) * 0.05}
                className="mb-6 break-inside-avoid rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 shadow-[var(--shadow-sm)]"
              >
                <figure>
                  <div className="flex items-center justify-between">
                    <Stars />
                    <GoogleG className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="sr-only">Rated 5 out of 5.</span>
                  <blockquote className="mt-4 leading-relaxed text-text">&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <Avatar initial={r.initial} color={r.color} />
                    <span>
                      <span className="block text-sm font-semibold text-ink">{r.name}</span>
                      <span className="text-xs text-muted">
                        {r.source} · {r.date}
                      </span>
                    </span>
                  </figcaption>
                  <GoogleReviewsLink className="mt-4" />
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Leave a review */}
          <div className="mt-12 flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <p className="font-display text-lg font-bold text-ink">Worked with me recently?</p>
              <p className="mt-1 text-muted">A quick Google review really helps a local business like mine.</p>
            </div>
            <Button href={GOOGLE_REVIEWS_URL} variant="secondary" className="shrink-0">
              Leave a review <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
