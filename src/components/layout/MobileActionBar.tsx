"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

/**
 * Thumb-reach Call / WhatsApp bar, mobile only. Slides up once the visitor has
 * scrolled past the hero, and tucks away again as they reach the closing
 * enquiry section (id="enquiry") or the very bottom of the page, so it never
 * covers the footer. Fixed + transform, so it adds no layout shift. Clicks are
 * picked up by the site-wide GA4 listener (phone_click / whatsapp_click).
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const enquiry = document.getElementById("enquiry");
      const enquiryClose = enquiry
        ? enquiry.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.offsetHeight - 140;
      setShow(window.scrollY > 480 && !enquiryClose && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[300] border-t border-border-subtle bg-surface/95 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-6px_20px_rgba(15,23,42,0.1)] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex gap-2.5">
        <Button
          href={SITE.phoneHref}
          className="flex-1"
          aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
        >
          <Phone className="h-5 w-5" aria-hidden /> Call
        </Button>
        <Button href={SITE.whatsappHref} variant="whatsapp" className="flex-1">
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
