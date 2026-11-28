import type { ReactNode } from "react";

/**
 * The accent rule: one phrase per H1/H2, in electric blue on light surfaces
 * and sky blue on navy (`.tone-ink` sets the colour). Never on H3 or below,
 * never more than once per heading, never combined with another treatment.
 */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent">{children}</span>;
}
