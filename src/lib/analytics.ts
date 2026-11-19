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
//
// Online booking (/book, the QuoteLion widget) adds intent signals. They are
// NOT conversions: the widget never tells us a booking was completed, so
// confirmed bookings only exist in QuoteLion / ServiceM8.
//
//   booking_start          first step change inside the booking widget
//   booking_step           every step change ({ step: 1, 2, 3… screens deep })
//   booking_open_external  the "open it in a new tab" fallback link

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
