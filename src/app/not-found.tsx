import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section bg-surface">
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          That page doesn&apos;t exist
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          The page you&apos;re after has moved or never existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-pill)] bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
            Back to homepage
          </Link>
          <a href={SITE.phoneHref} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-border-strong px-6 font-semibold hover:border-primary hover:text-primary">
            <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
