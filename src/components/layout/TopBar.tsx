import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function TopBar() {
  return (
    <Link
      href="/contact?service=servicing"
      className="group block bg-ink text-inverse"
    >
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-flame" aria-hidden />
        <span className="inline-flex items-center gap-1 font-semibold text-flame">
          Book a boiler service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
