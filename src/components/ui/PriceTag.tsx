type Props = {
  /** A confirmed "from" price in pounds, or null while it awaits Jamie's sign-off. */
  amount: number | null;
  /** Shown when amount is null. Omit to render nothing (a gated slot). */
  fallback?: string;
  className?: string;
};

/**
 * "From £N" chip. Prices only ever come from SITE.prices, which stays null
 * until Jamie confirms the figure (website-plan/rebrand/00-intake.md, C15/C16),
 * so an unconfirmed price can never render.
 */
export function PriceTag({ amount, fallback, className = "" }: Props) {
  const text = amount == null ? fallback : `From £${amount}`;
  if (!text) return null;
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] bg-sunken px-2.5 py-1 text-[0.8125rem] font-semibold tabular-nums text-ink ${className}`}
    >
      {text}
    </span>
  );
}
