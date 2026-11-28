import { Check } from "lucide-react";

/** What a service includes, from the live servicing page's checklist. */
export const SERVICE_CHECKS = [
  "Flue gas analysis and combustion readings",
  "Gas pressure and flow checks",
  "Controls, seals and safety devices tested",
] as const;

export function ServiceChecklist() {
  return (
    <ul className="space-y-2.5">
      {SERVICE_CHECKS.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-text">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

const RECORD_ROWS = [
  { label: "Gas appliances checked", tick: true },
  { label: "Flues and pipework checked", tick: true },
  { label: "Copy to tenants within 28 days", tick: false },
  { label: "Next check due in 12 months", tick: false },
] as const;

/**
 * A drawn landlord gas safety record: an illustration of what the CP12
 * covers, not a reproduction of any official form. Hidden from assistive
 * tech; the card's text carries the meaning. Every row is a legal fact
 * (Gas Safety (Installation and Use) Regulations 1998).
 */
export function Cp12Record() {
  return (
    <figure aria-hidden className="select-none">
      <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-4 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3">
          <span className="font-display text-sm font-bold text-ink">Landlord gas safety record</span>
          <span className="h-2 w-10 rounded-full bg-sunken" />
        </div>
        <ul className="mt-3 space-y-2.5">
          {RECORD_ROWS.map((row) => (
            <li key={row.label} className="flex items-center gap-2.5 text-[0.8125rem] text-muted">
              {row.tick ? (
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] bg-feedback-success text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-[4px] border border-border-strong" />
              )}
              {row.label}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-2 text-right text-[11px] uppercase tracking-[0.12em] text-muted">
        Illustration
      </figcaption>
    </figure>
  );
}
