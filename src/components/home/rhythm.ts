/**
 * One spacing rule for homepage sections (explored 27 Nov 2026 on
 * /explore/rhythm). Measured before: section padding ran 64, 80 and 96px with
 * no pattern, and the gap under headings anywhere from 12 to 105px.
 */

/** Section padding: 64px phones, 96px tablets, 112px desktop (128px was
 *  tried first, with the restructured sections, and rejected). */
export const SECTION_Y = "py-16 md:py-24 lg:py-28";

/** Gap between a section's heading block and its content: 40px, 48px desktop. */
export const HEAD_GAP = "mt-10 lg:mt-12";

/** Section heading (h2), the same size everywhere. */
export const H2_CLS =
  "font-display text-[clamp(2rem,1.4rem+2vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-navy";
