"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Numbered list whose circles light up sequentially as you scroll through it,
 * matching the homepage "How it works" progress strip.
 */
export function ServiceStepList({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  // both anchors at 60% down the viewport: progress == fraction of the list
  // scrolled past that line, so each row lights as its centre crosses it
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const [active, setActive] = useState(reduce ? items.length : 1);

  // thresholds (0–1) at which each item activates as the list scrolls past
  const thresholds = items.map((_, i) => (i + 0.5) / items.length);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    let c = 1;
    for (let i = 0; i < items.length; i++) if (v >= thresholds[i]) c = i + 1;
    setActive((prev) => (prev === c ? prev : c));
  });

  return (
    <ol ref={ref} className="mt-7 border-t border-border-subtle">
      {items.map((li, i) => {
        const on = i < active;
        return (
          <Reveal
            as="li"
            key={li}
            delay={i * 0.05}
            className="flex items-center gap-5 border-b border-border-subtle py-5"
          >
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border font-display text-lg font-bold transition-colors duration-300 ${
                on ? "border-primary bg-primary text-white" : "border-border-strong bg-surface text-muted"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-lg leading-snug text-text">{li}</span>
          </Reveal>
        );
      })}
    </ol>
  );
}
