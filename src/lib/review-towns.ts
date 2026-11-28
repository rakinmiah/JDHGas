import { LOCAL_TOWNS } from "@/lib/local-pages";

/**
 * Reviewer → town, only for reviews already confirmed to a town (Jamie's GBP
 * owner reply names it; see seo/review-locations.md). Built from the town
 * pages' own review lists, so a review gains a town label on the homepage
 * only once it is already attached to that town page. Never guess a town.
 */
const TOWN_BY_REVIEWER = new Map<string, string>(
  LOCAL_TOWNS.flatMap((town) =>
    (town.reviews ?? []).map((r) => [r.name.trim().toLowerCase(), town.name] as const),
  ),
);

export function confirmedTown(reviewerName: string): string | undefined {
  return TOWN_BY_REVIEWER.get(reviewerName.trim().toLowerCase());
}
