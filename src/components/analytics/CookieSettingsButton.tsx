"use client";

import { CONSENT_OPEN_EVENT } from "@/components/analytics/CookieBanner";

/** Footer "Cookie settings": reopens the consent banner so a choice can be changed. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
