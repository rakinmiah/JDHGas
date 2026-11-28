import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  /** The heading. Wrap one phrase in <Accent>. */
  title: ReactNode;
  id: string;
  /** Optional paragraph set to the right of the heading on desktop. */
  aside?: ReactNode;
  className?: string;
};

/**
 * Section header: eyebrow + H2 on the left, an optional paragraph on the
 * right from 1024px (Linear's heading-left / body-right template on the
 * P3 44fr/56fr grid). Stacks on mobile with the heading first.
 */
export function SectionIntro({ eyebrow, title, id, aside, className = "" }: Props) {
  return (
    <div
      className={`grid gap-4 lg:grid-cols-[44fr_56fr] lg:items-end lg:gap-16 ${className}`}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-2 font-display text-h2 font-bold">
          {title}
        </h2>
      </div>
      {aside && <div className="text-lead text-muted lg:pb-1">{aside}</div>}
    </div>
  );
}
