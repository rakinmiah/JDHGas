/**
 * Jamie's away window. Everything that mentions it (site bar, form success
 * copy, the customer auto-reply) reads from here, and switches itself on and
 * off by date so nothing needs remembering on the way out or back.
 *
 * Client components call isAway() in the browser (static pages are built
 * ahead of time, so a build-time check would freeze at deploy). The contact
 * API route calls it per request on the server.
 */
export const AWAY = {
  from: "2026-09-19",
  until: "2026-10-24",
  untilLabel: "24 October",
} as const;

/** Today's date in the UK, as YYYY-MM-DD, regardless of server or device timezone. */
function ukDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(now);
}

export function isAway(now: Date = new Date()): boolean {
  const today = ukDate(now);
  return today >= AWAY.from && today <= AWAY.until;
}
