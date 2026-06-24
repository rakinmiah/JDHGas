"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const CONSENT_KEY = "jdh-cookie-consent";
export const CONSENT_EVENT = "jdh-consent-change";

/**
 * Cookie consent banner. Analytics cookies (GA4) aren't loaded until the
 * visitor accepts — see Analytics.tsx, which gates on the same localStorage
 * key. The choice is stored in localStorage (not a cookie), so the banner
 * itself needs no consent. Shows once, until a choice is made.
 */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — don't block the site */
    }
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[500] border-t border-white/10 bg-ink text-inverse shadow-[var(--shadow-lg)]"
    >
      <div className="container-page flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="max-w-2xl text-sm leading-relaxed text-inverse/85">
          I use Google Analytics cookies to see how the site is used and improve it. Nothing is set
          unless you accept. See the{" "}
          <Link href="/cookie-policy" className="font-semibold text-inverse underline underline-offset-2 hover:text-flame">
            cookie policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-pill)] border border-white/30 px-5 text-sm font-semibold text-inverse transition-colors hover:bg-white/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-pill)] bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
