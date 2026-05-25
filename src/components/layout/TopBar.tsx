import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function TopBar() {
  return (
    <Link
      href="/contact?service=servicing"
      className="group block bg-ink text-inverse"
      aria-label="New customer offer: first boiler service from £75 — book now"
    >
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-flame" aria-hidden />
        <span>
          <span className="hidden sm:inline">New customer offer — </span>
          first boiler service from{" "}
          <span className="font-bold text-flame">£75</span>
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-flame">
          <span className="hidden sm:inline">Book now</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
