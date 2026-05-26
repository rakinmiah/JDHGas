"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Clock, BadgePoundSterling, Sparkles, MessageSquare, type LucideIcon } from "lucide-react";

const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Clock, title: "On time, every time", text: "When I say I'll be there, I'm there. No vague windows, no no-shows." },
  { icon: BadgePoundSterling, title: "Honest pricing", text: "A fair price up front, and straight advice on what needs doing now and what can wait." },
  { icon: Sparkles, title: "Clean and respectful", text: "I treat your home with care and leave it exactly as I found it." },
  { icon: MessageSquare, title: "Explained in plain English", text: "No jargon. I'll tell you what I've found and why it matters." },
];

/**
 * Value cards whose icon tiles light up in sequence as the grid enters view,
 * echoing the homepage "How it works" lighting without implying ordered steps.
 */
export function ValuesGrid() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const [active, setActive] = useState(reduce ? VALUES.length : 0);

  const thresholds = VALUES.map((_, i) => i / VALUES.length);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    let c = 0;
    for (let i = 0; i < VALUES.length; i++) if (v >= thresholds[i]) c = i + 1;
    setActive((prev) => (prev === c ? prev : c));
  });

  return (
    <ul ref={ref} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {VALUES.map((v, i) => {
        const on = i < active;
        return (
          <motion.li
            key={v.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1], delay: i * 0.05 }}
            className={`rounded-[var(--radius-lg)] border bg-surface p-6 transition-[border-color,box-shadow] duration-300 ${
              on
                ? "border-primary/30 shadow-[var(--shadow-md)]"
                : "border-border-subtle shadow-[var(--shadow-sm)]"
            }`}
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-[var(--radius-md)] transition-colors duration-300 ${
                on ? "bg-primary text-white" : "bg-sunken text-primary"
              }`}
            >
              <v.icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
          </motion.li>
        );
      })}
    </ul>
  );
}
