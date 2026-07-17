"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "ol" | "ul" | "article" | "figure";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* amount must not be a fraction: lists taller than the viewport can
         never satisfy it, so they'd stay at opacity 0 (13-town grid on mobile).
         "some" + negative margin = reveal once ~80px has scrolled into view. */
      viewport={{ once: true, amount: "some", margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, ease: [0, 0, 0.2, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
