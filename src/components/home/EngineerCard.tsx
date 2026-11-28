"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

const DESKTOP = "(min-width: 1024px)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getDesktop = () => window.matchMedia(DESKTOP).matches;
const getServerDesktop = () => false;

const EASE_EMPHASIS = [0.16, 1, 0.3, 1] as const;

/**
 * The engineer card (M4 signature): Airbnb's "Meet your host" card rebuilt
 * as an ID card for the business. The navy band carries the van's honeycomb
 * as its security pattern; the tick beside the portrait is a real link to the
 * Gas Safe Register.
 *
 * Motion: on desktop the card settles from a 2° tilt and a 32px drop (600ms,
 * ease-emphasis), then the tick draws itself (400ms). Phones get a 200ms fade
 * and the tick draws straight away. Reduced motion renders the end state.
 * The card remounts (key) once the client knows it is on a desktop, so the
 * tilted start state applies there; the section is below the fold, so the
 * swap is never seen.
 */
export function EngineerCard({ rating, count }: { rating: string; count: number }) {
  const reduce = useReducedMotion();
  const desktop = useSyncExternalStore(subscribe, getDesktop, getServerDesktop);

  const initial = reduce
    ? false
    : desktop
      ? { opacity: 0, y: 32, rotate: -2 }
      : { opacity: 0 };
  const settle = desktop
    ? { duration: 0.6, ease: EASE_EMPHASIS }
    : { duration: 0.2, ease: [0, 0, 0.2, 1] as const };
  const viewport = { once: true, amount: "some" as const, margin: "0px 0px -15% 0px" };

  const stats = [
    ...(count > 0
      ? [
          { value: `${rating}★`, label: "Google rating" },
          { value: String(count), label: "Google reviews" },
        ]
      : []),
    { value: SITE.gasSafe, label: "Gas Safe No." },
  ];

  return (
    <motion.div
      key={desktop ? "desktop" : "mobile"}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={viewport}
      transition={settle}
      className="overflow-hidden rounded-xl bg-surface text-text shadow-[var(--shadow-id)]"
    >
      {/* ID band */}
      <div className="tone-ink relative isolate flex items-center gap-2.5 overflow-hidden bg-ink px-5 py-3 sm:px-6">
        <div
          aria-hidden
          className="brand-hex pointer-events-none absolute inset-0 -z-10 opacity-[0.14]! [mask-image:none]! [background-size:24px_13.86px]!"
        />
        <Image src="/shield-logo.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
          JDH Gas Services · Engineer
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 sm:p-6">
        {/* Person */}
        <div className="flex flex-col items-start">
          <div className="relative">
            <Image
              src="/images/jamie-avatar.jpg"
              alt=""
              width={96}
              height={96}
              sizes="96px"
              className="h-20 w-20 rounded-full object-cover ring-4 ring-sunken lg:h-24 lg:w-24"
            />
            <a
              href={SITE.registerUrl}
              target="_blank"
              rel="noopener"
              data-track="register_check_click"
              data-location="engineer_card"
              title="Check on the Gas Safe Register"
              aria-label={`Check ${SITE.engineer}'s Gas Safe registration, number ${SITE.gasSafe}, on the Gas Safe Register (opens in a new tab)`}
              className="absolute -bottom-2.5 -right-2.5 grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:scale-[1.08] active:scale-[0.96]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary ring-[3px] ring-surface">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <motion.path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="white"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.4, ease: [0, 0, 0.2, 1], delay: desktop ? 0.7 : 0 }}
                  />
                </svg>
              </span>
            </a>
          </div>
          <h3 className="mt-4 font-display text-[1.5rem] font-bold leading-tight lg:text-[1.75rem]">
            {SITE.engineer}
          </h3>
          <p className="mt-1 text-sm leading-snug text-muted">Gas Safe registered engineer</p>
        </div>

        {/* Three stacked figures */}
        <dl className="flex flex-col justify-center divide-y divide-border-subtle">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col py-2.5 first:pt-0 last:pb-0">
              <dt className="order-2 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-[1.375rem] font-extrabold leading-tight tabular-nums text-ink">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.div>
  );
}
