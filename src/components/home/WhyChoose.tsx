"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Phone, Clock, ShieldCheck, BadgePoundSterling } from "lucide-react";

const STEPS = [
  { icon: Phone, title: "Get in touch", text: "Call, WhatsApp or send a quick enquiry — add a photo of the boiler if you can." },
  { icon: Clock, title: "I arrive on time", text: "When I say I'll be there, I'm there — and I treat your home with respect." },
  { icon: ShieldCheck, title: "A proper, thorough job", text: "Done by the book by a Gas Safe engineer, with no rushing off to the next call." },
  { icon: BadgePoundSterling, title: "Honest price, explained", text: "A fair price and straight advice on what needs doing — and what can wait." },
];

// evenly spaced along the full-width strip: 0%, 33.3%, 66.6%, 100%
// (so 01 sits at the far-left end and 04 at the far-right end of the line)
const POS = STEPS.map((_, i) => (i / (STEPS.length - 1)) * 100);
// progress thresholds (0–1) at which each circle activates — same points as POS
const THRESHOLDS = STEPS.map((_, i) => i / (STEPS.length - 1)); // 0, .33, .66, 1

export function WhyChoose() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [active, setActive] = useState(reduce ? STEPS.length : 1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    let c = 1;
    for (let i = 0; i < STEPS.length; i++) if (v >= THRESHOLDS[i]) c = i + 1;
    setActive((prev) => (prev === c ? prev : c));
  });

  return (
    <section className="section bg-surface" aria-labelledby="how-h">
      <div ref={ref} className="container-page">
        <p className="eyebrow">How it works</p>
        <h2 id="how-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
          From first message to job done
        </h2>
        <p className="mt-3 max-w-xl text-lg text-muted">
          Booking me is simple — no call centres, no runaround. Here&apos;s how it goes.
        </p>

        {/* progress rail (desktop) — fills as you scroll */}
        <div className="relative mt-14 mb-10 hidden h-12 lg:block" aria-hidden>
          {/* track inset by one circle-radius (1.5rem) each side, so the end
              circles' outer edges land exactly on the box-row edges — the
              strip's overall extent then matches the four cards exactly */}
          <div className="absolute top-1/2 h-0.5 -translate-y-1/2" style={{ left: "1.5rem", right: "1.5rem" }}>
            <div className="absolute inset-0 rounded-full bg-border-strong" />
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-primary"
              style={{ width: reduce ? "100%" : fill }}
            />
            {!reduce && (
              <motion.span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"
                style={{ left: fill }}
              />
            )}
            {/* circles: at the track ends (01 / 04) and evenly spaced between */}
            {STEPS.map((s, i) => {
              const on = i < active;
              return (
                <span
                  key={s.title}
                  className={`absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-display text-lg font-bold transition-colors duration-300 ${
                    on ? "border-primary bg-primary text-white" : "border-border-strong bg-surface text-muted"
                  }`}
                  style={{ left: `${POS[i]}%` }}
                >
                  0{i + 1}
                </span>
              );
            })}
          </div>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-surface text-primary">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display text-base font-semibold leading-tight">{s.title}</h3>
                <span className="ml-auto font-display text-sm font-bold text-primary/40 lg:hidden">0{i + 1}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
