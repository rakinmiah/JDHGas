import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
  /** Which corners stay rounded below 1024px, where the panel runs full-bleed. */
  mobileCorners?: "top" | "bottom" | "all";
  className?: string;
  /** Classes for the outer <section> (e.g. bottom spacing before the footer). */
  outerClassName?: string;
};

const MOBILE_CORNERS = {
  top: "rounded-t-panel",
  bottom: "rounded-b-panel",
  all: "rounded-panel",
} as const;

/**
 * A navy panel inset from the viewport edge (24px gutters, `radius-panel`)
 * with the van's honeycomb entering from the top-right corner. Full-bleed
 * below 1024px. After Monzo's inset hero card (website-plan/rebrand/05-modules.md).
 * Used for the closing contact section; the hero builds the same look inline
 * because its needs card overlaps the panel edge on mobile.
 */
export function InsetPanel({
  children,
  id,
  mobileCorners = "all",
  className = "",
  outerClassName = "",
  ...rest
}: Props) {
  return (
    <section id={id} className={`mx-auto max-w-[1200px] md:px-8 ${outerClassName}`} {...rest}>
      <div
        className={`tone-ink relative isolate overflow-hidden bg-ink text-inverse ${MOBILE_CORNERS[mobileCorners]} lg:rounded-panel ${className}`}
      >
        <div aria-hidden className="brand-hex pointer-events-none absolute inset-0 -z-10" />
        {children}
      </div>
    </section>
  );
}
