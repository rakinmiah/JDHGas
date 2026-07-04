"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, type ReactNode } from "react";

// Where we remember the town the visitor arrived from. Kept in sessionStorage
// (never in the URL) so this can't create a crawlable page variant — search
// engines always see the default "Burgess Hill" page.
const AREA_KEY = "jdh-area";
const HOME_AREA = "Burgess Hill";

// useLayoutEffect on the client (swaps before paint, so no flicker on the
// client-side navigation that triggers this), plain useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * A service-card link (used on the area pages) that records which town the
 * visitor came from, so the destination service page can localise its headline
 * to that town for the rest of their session.
 */
export function AreaLink({
  href,
  area,
  className,
  children,
  ...rest
}: {
  href: string;
  area: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem(AREA_KEY, area);
        } catch {
          /* sessionStorage unavailable — fall back to the default page */
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

/**
 * Localises a service page's hero headline to the town the visitor came from —
 * e.g. "Boiler servicing in Burgess Hill" becomes "… in Hove" — for that
 * visitor only.
 *
 * SEO-safe by construction: it runs purely client-side and only rewrites text
 * inside the hero section, so the server-rendered HTML that search engines
 * index is unchanged (always "Burgess Hill"). It reacts to the visitor's own
 * navigation, never to a crawler, so it is not cloaking. The "based in Burgess
 * Hill" lines, the areas-covered list and all metadata/schema sit outside the
 * hero and are left exactly as they are.
 */
export function ServiceAreaPersonalizer() {
  // Re-run on every client navigation (e.g. service → service via the cards).
  const pathname = usePathname();

  useIsoLayoutEffect(() => {
    let area: string | null = null;
    try {
      area = sessionStorage.getItem(AREA_KEY);
    } catch {
      return;
    }
    if (!area || area === HOME_AREA) return;

    const hero = document.querySelector("#main section");
    if (!hero) return;

    const walker = document.createTreeWalker(hero, NodeFilter.SHOW_TEXT);
    const targets: Text[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (node.nodeValue?.includes(HOME_AREA)) targets.push(node);
    }
    for (const node of targets) {
      node.nodeValue = node.nodeValue!.replace(/Burgess Hill/g, area);
    }
  }, [pathname]);

  return null;
}
