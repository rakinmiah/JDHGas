"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { BOOKING_EMBED_URL, BOOKING_ORIGIN, BOOKING_PAGE_URL } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

/**
 * The QuoteLion/BookLion booking widget in an iframe.
 *
 * This is QuoteLion's official inline embed (`<iframe data-booklion-inline>` +
 * their booklion.js), reimplemented so it can feed GA4 and fit the page: same
 * protocol and rules as their script, without loading a third-party script.
 *
 * Protocol (version 1, per their booklion.js): the host posts
 * `{ type: "booklion:init", version: 1 }`; the widget replies with
 * `booklion:resize` (its content height) whenever it changes, and posts
 * `booklion:scroll` on mount and on every step change. There is no
 * "booking completed" message, so GA4 can see starts and step depth here,
 * but confirmed bookings only exist in QuoteLion / ServiceM8.
 */
export function BookingWidget() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const scrolls = useRef(0);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== BOOKING_ORIGIN || e.source !== frameRef.current?.contentWindow) return;
      const d = e.data as { type?: unknown; version?: unknown; height?: unknown } | null;
      if (!d || d.version !== 1 || typeof d.type !== "string") return;

      if (
        d.type === "booklion:resize" &&
        typeof d.height === "number" &&
        Number.isFinite(d.height) &&
        d.height >= 100 &&
        d.height <= 30000
      ) {
        setHeight(Math.ceil(d.height));
      } else if (d.type === "booklion:scroll") {
        // The first one is the widget mounting; each later one is a step change.
        scrolls.current += 1;
        const step = scrolls.current - 1;
        if (step < 1) return;
        if (step === 1) trackEvent("booking_start");
        trackEvent("booking_step", { step });
        // Bring the new step into view if the frame's top is off screen
        // (scrolled past, or still below the fold), as QuoteLion's script does.
        const frame = frameRef.current;
        const top = frame?.getBoundingClientRect().top ?? 0;
        if (frame && (top < 0 || top > window.innerHeight - 100)) {
          frame.scrollIntoView({ block: "start" });
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // The widget only listens for init once its app has mounted, which can be
  // after the iframe's load event, so send it a few times.
  const sendInit = () => {
    setLoaded(true);
    const post = () =>
      frameRef.current?.contentWindow?.postMessage({ type: "booklion:init", version: 1 }, BOOKING_ORIGIN);
    post();
    window.setTimeout(post, 600);
    window.setTimeout(post, 2000);
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-white/10">
        {/* Cleared on load even if the size handshake never arrives, so it can
            never sit over a working calendar. */}
        {!loaded && height === null && (
          <div
            aria-hidden
            className="absolute inset-0 grid place-items-center bg-ink-soft text-sm text-steel"
          >
            Loading the booking calendar…
          </div>
        )}
        <iframe
          ref={frameRef}
          src={BOOKING_EMBED_URL}
          title="Book a boiler service with JDH Gas Services"
          onLoad={sendInit}
          // As QuoteLion's own popup embed sets it, so a card deposit can use
          // Apple Pay / Google Pay inside the frame if the flow asks for one.
          allow="payment"
          className="block w-full border-0"
          // 760px is QuoteLion's suggested starting height; the widget then
          // reports its real height.
          style={{ height: height ?? 760 }}
        />
      </div>
      <p className="mt-4 text-center text-sm text-inverse/70">
        Trouble loading the calendar?{" "}
        <a
          href={BOOKING_PAGE_URL}
          target="_blank"
          rel="noopener"
          onClick={() => trackEvent("booking_open_external")}
          className="inline-flex items-center gap-1 font-semibold text-inverse underline underline-offset-2 hover:text-flame"
        >
          Open it in a new tab <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </p>
    </div>
  );
}
