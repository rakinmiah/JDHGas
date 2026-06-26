// GA4 event tracking, funnelled through one helper so every CTA fires the same way.
//
// GA4 only loads *after* the visitor accepts analytics cookies (see
// components/analytics/Analytics.tsx). Until then window.gtag is undefined and
// every call here is a silent no-op, so trackEvent is always safe to call on
// the client.
//
// The three lead events we fire — mark each as a "Key event" in
// GA4 → Admin → Events to count them as conversions:
//
//   whatsapp_click   a WhatsApp CTA was pressed   (any wa.me link, site-wide)
//   phone_click      a call CTA was pressed       (any tel: link, site-wide)
//   enquiry_submit   an enquiry form was sent      ({ form: "contact" | "home_enquiry" })

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
