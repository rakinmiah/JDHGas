"use client";

import { useEffect } from "react";
import Script from "next/script";

// GA4 Measurement ID. Public by design (it ships in the page HTML), so it's
// baked in as the default; NEXT_PUBLIC_GA_ID can override it if ever needed.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-TSRXM048T2";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * GA4, wired only when NEXT_PUBLIC_GA_ID is set (graceful no-op otherwise, in
 * keeping with the rest of the site's env handling). Fires a `call` conversion
 * event on any tel: click so phone enquiries are measurable in GA4.
 */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="tel:"]');
      if (link && typeof window.gtag === "function") {
        window.gtag("event", "call", {
          phone_number: link.getAttribute("href")?.replace("tel:", ""),
        });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
