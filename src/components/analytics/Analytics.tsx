"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_KEY, CONSENT_EVENT } from "@/components/analytics/CookieBanner";

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
 * GA4, loaded only after the visitor accepts analytics cookies via the
 * CookieBanner (consent stored in localStorage under CONSENT_KEY). No GA
 * script or cookie is set until then. Also fires a `call` conversion event
 * on any tel: click so phone enquiries are measurable.
 */
export function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setGranted(localStorage.getItem(CONSENT_KEY) === "granted");
      } catch {
        /* ignore */
      }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  useEffect(() => {
    if (!granted) return;
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
  }, [granted]);

  if (!GA_ID || !granted) return null;

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
