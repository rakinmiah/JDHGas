import { GoogleG } from "@/components/ui/icons";
import { GOOGLE_REVIEWS_URL } from "@/lib/reviews";

/**
 * Small link shown alongside each Google review, out to the full Google
 * reviews listing so visitors can read them all (and verify they're genuine).
 */
export function GoogleReviewsLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover ${className}`}
    >
      <GoogleG className="h-4 w-4 shrink-0" />
      Read all reviews on Google
    </a>
  );
}
