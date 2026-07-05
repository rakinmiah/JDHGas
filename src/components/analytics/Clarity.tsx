"use client";

import { useEffect, useRef } from "react";
import { CONSENT_KEY, CONSENT_EVENT } from "@/components/analytics/CookieBanner";

// Microsoft Clarity project ID. Public by design (it ships in the page), so
// it's baked in as the default; NEXT_PUBLIC_CLARITY_ID can override it.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "xhnxfnbcyi";

/**
 * Microsoft Clarity (heatmaps + session recording), gated on explicit consent.
 *
 * Unlike GA4 — which we run in Consent Mode even while denied, sending only
 * anonymous cookieless pings — Clarity records real sessions and sets cookies,
 * which under UK GDPR/PECR is NOT "strictly necessary" and needs prior consent.
 * So the tag is never injected until the visitor accepts via the CookieBanner
 * (localStorage `${CONSENT_KEY}` === "granted"), and starts mid-session if they
 * accept then. Clarity masks text/inputs by default, so form fields (name,
 * phone, email, postcode) are not captured.
 */
export function Clarity() {
  const loaded = useRef(false);

  useEffect(() => {
    if (!CLARITY_ID) return;

    function granted() {
      try {
        return localStorage.getItem(CONSENT_KEY) === "granted";
      } catch {
        return false;
      }
    }

    function load() {
      if (loaded.current || !granted()) return;
      loaded.current = true;
      // Standard Clarity loader (self-injects its own async <script>).
      (function (c: any, l: Document, a: string, r: string, i: string) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        const t = l.createElement(r) as HTMLScriptElement;
        t.async = true;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        y.parentNode?.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_ID);
    }

    load(); // already-accepted visitors
    window.addEventListener(CONSENT_EVENT, load); // accepts this session
    return () => window.removeEventListener(CONSENT_EVENT, load);
  }, []);

  return null;
}
