"use client";

import { useEffect } from "react";
import Script from "next/script";
import { CONSENT_KEY, CONSENT_EVENT } from "@/components/analytics/CookieBanner";
import { trackEvent } from "@/lib/analytics";

// GA4 Measurement ID. Public by design (it ships in the page HTML), so it's
// baked in as the default; NEXT_PUBLIC_GA_ID can override it if ever needed.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-TSRXM048T2";

/**
 * GA4 with advanced Consent Mode v2.
 *
 * GA always loads, but consent defaults to "denied" (set in the inline script
 * below, *before* `config`). While denied, GA sets no cookies and stores
 * nothing on the device — it only sends Google anonymous, cookieless pings it
 * can use for aggregate modelling. When the visitor accepts via the
 * CookieBanner we flip `analytics_storage` to "granted" for full measurement.
 * Ad signals stay denied throughout — this site runs no advertising.
 *
 * Also fires lead events on CTA clicks site-wide: `phone_click` on any tel:
 * link and `whatsapp_click` on any WhatsApp link. These fire regardless of
 * consent; while analytics is denied GA sends them as cookieless pings.
 */
export function Analytics() {
  // Reflect the visitor's banner choice into GA whenever it changes.
  useEffect(() => {
    function sync() {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(CONSENT_KEY);
      } catch {
        /* ignore */
      }
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: stored === "granted" ? "granted" : "denied",
        });
      }
    }
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  // Site-wide CTA lead tracking.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      const tel = el?.closest?.('a[href^="tel:"]');
      if (tel) {
        trackEvent("phone_click", {
          phone_number: tel.getAttribute("href")?.replace("tel:", ""),
        });
        return;
      }
      const wa = el?.closest?.('a[href*="wa.me"], a[href*="whatsapp.com"]');
      if (wa) {
        trackEvent("whatsapp_click");
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
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: (function(){ try { return localStorage.getItem('${CONSENT_KEY}') === 'granted' ? 'granted' : 'denied'; } catch (e) { return 'denied'; } })(),
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
