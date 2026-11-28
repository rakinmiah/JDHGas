import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

/**
 * The thin bar above the header: three checkable facts in a quiet register
 * (after Rørkjøp's three-tick utility bar). It scrolls away; only the main
 * header bar below it is sticky. Phones show the Gas Safe item only.
 */
export async function UtilityBar() {
  const { rating, count } = await getGoogleReviews();
  // Display is set per item (not in this shared string) so `hidden` never
  // competes with `inline-flex` on the same element.
  const item = "items-center gap-1.5 whitespace-nowrap";
  const tick = <Check className="h-3.5 w-3.5 shrink-0 text-flame" aria-hidden />;

  return (
    <div className="tone-ink bg-ink-soft text-[0.8125rem] text-steel">
      <div className="container-page flex h-8 items-center justify-center lg:h-9 lg:justify-between">
        <a
          href={SITE.registerUrl}
          target="_blank"
          rel="noopener"
          data-track="register_check_click"
          data-location="header"
          aria-label={`Gas Safe registered, number ${SITE.gasSafe}. Check on the Gas Safe Register (opens in a new tab)`}
          className={`${item} inline-flex transition-colors hover:text-inverse`}
        >
          {tick}
          {`Gas Safe registered · No. ${SITE.gasSafe}`}
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
        </a>
        {count > 0 && (
          <Link
            href="/reviews"
            className={`${item} hidden transition-colors hover:text-inverse lg:inline-flex`}
          >
            {tick}
            {`Rated ${rating} from ${count} Google reviews`}
          </Link>
        )}
        <p className={`${item} hidden lg:inline-flex`}>
          {tick}
          {`Monday to Friday · ${SITE.locality} & Mid Sussex`}
        </p>
      </div>
    </div>
  );
}
