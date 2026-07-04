import { ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * The Gas Safe credential, badge-weight: yellow-accented pill with the
 * registration number (the bit customers can verify on the Gas Safe register).
 * If Jamie supplies the official Gas Safe Register logo pack, the shield icon
 * can be swapped for the real mark here in one place.
 */
export function GasSafeBadge({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-gas-safe/40 bg-gas-safe/10 px-3.5 py-1.5 text-sm font-semibold text-ink ${className}`}
    >
      <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-gas-safe" aria-hidden />
      Gas Safe Registered
      <span className="font-medium text-muted">No. {SITE.gasSafe}</span>
    </p>
  );
}
