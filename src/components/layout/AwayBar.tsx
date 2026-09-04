"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Plane } from "lucide-react";
import { AWAY, isAway } from "@/lib/away";

/**
 * Swaps the top offer bar for an away notice during Jamie's away window.
 * Decided in the browser so static pages don't freeze on their build date;
 * first paint matches the server (offer), then flips if away.
 */
export function AwayBar({ children }: { children: ReactNode }) {
  const [away, setAway] = useState(false);
  useEffect(() => {
    setAway(isAway());
  }, []);

  if (!away) return <>{children}</>;

  return (
    <div className="bg-ink text-inverse" role="status">
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-sm">
        <Plane className="h-4 w-4 shrink-0 text-flame" aria-hidden />
        <span>
          Jamie is away until <span className="font-bold text-flame">{AWAY.untilLabel}</span>.
          <span className="hidden sm:inline"> Enquiries sent now will be answered when he&rsquo;s back.</span>
        </span>
      </div>
    </div>
  );
}
