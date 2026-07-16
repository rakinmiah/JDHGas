"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, MapPin, Search } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

type TownRef = { name: string; slug: string; postcode: string };

type Result =
  | { kind: "home" }
  | { kind: "covered"; towns: TownRef[] }
  | { kind: "likely"; prefix: string }
  | { kind: "ask"; prefix: string }
  | { kind: "invalid" };

/** Outward prefixes I'm in all the time but that don't have a live town page yet. */
const LIKELY_PREFIXES = ["RH13"];

/**
 * "Do I cover you?" — instant postcode check against the live town pages.
 * Pure client-side string matching; anything unrecognised is answered honestly
 * with a prefilled WhatsApp message rather than a false yes/no.
 */
export function PostcodeChecker({ towns }: { towns: TownRef[] }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    const raw = value.trim().toUpperCase();
    // Outward code = the bit before the space when given a full postcode.
    const outward = (raw.includes(" ") ? raw.split(/\s+/)[0] : raw).replace(/[^A-Z0-9]/g, "");
    const m = outward.match(/^([A-Z]{1,2}\d{1,2})/);
    if (!m) {
      setResult({ kind: "invalid" });
      trackEvent("postcode_check", { outcome: "invalid" });
      return;
    }
    const prefix = m[1];
    let next: Result;
    if (prefix === "RH15") {
      next = { kind: "home" };
    } else {
      const matched = towns.filter((t) => t.postcode === prefix);
      if (matched.length > 0) next = { kind: "covered", towns: matched };
      else if (LIKELY_PREFIXES.includes(prefix)) next = { kind: "likely", prefix };
      else next = { kind: "ask", prefix };
    }
    setResult(next);
    trackEvent("postcode_check", { outcome: next.kind, prefix });
  }

  const whatsappAsk = (prefix: string) =>
    `${SITE.whatsappHref}?text=${encodeURIComponent(
      `Hi Jamie, do you cover my area? My postcode starts ${prefix}`,
    )}`;

  const whatsAppCta = (prefix: string) => (
    <a
      href={whatsappAsk(prefix)}
      target="_blank"
      rel="noopener"
      className="mt-3 inline-flex min-h-[40px] items-center gap-2 rounded-[var(--radius-pill)] bg-whatsapp px-4 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-hover"
    >
      <WhatsAppGlyph className="h-4 w-4" /> Send it on WhatsApp
    </a>
  );

  return (
    <div className="max-w-xl">
      <form onSubmit={check} className="flex gap-2.5">
        <label htmlFor="postcode-check" className="sr-only">
          Your postcode
        </label>
        <input
          id="postcode-check"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setResult(null);
          }}
          placeholder="e.g. RH16 or BN6 8…"
          autoComplete="postal-code"
          className="w-full min-w-0 flex-1 rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 py-2.5 text-base outline-none transition-colors focus:border-primary"
        />
        <button
          type="submit"
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-[var(--radius-pill)] bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          <Search className="h-4 w-4" aria-hidden /> Check
        </button>
      </form>

      {result && (
        <div
          role="status"
          className="mt-4 rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-5"
        >
          {result.kind === "home" && (
            <>
              <p className="flex items-start gap-2.5 font-semibold text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" aria-hidden />
                That&apos;s my home turf. I&apos;m based right there in Burgess Hill.
              </p>
              <Link
                href="/services"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                See everything I do <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </>
          )}

          {result.kind === "covered" && (
            <>
              <p className="flex items-start gap-2.5 font-semibold text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" aria-hidden />
                Yes, that&apos;s my patch.
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {result.towns.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary"
                  >
                    <MapPin className="h-4 w-4" aria-hidden />
                    View {t.name}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ))}
              </div>
            </>
          )}

          {result.kind === "likely" && (
            <>
              <p className="flex items-start gap-2.5 font-semibold text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" aria-hidden />
                Very likely. I&apos;m in the {result.prefix}&nbsp;villages all the time. Send it
                over and I&apos;ll confirm.
              </p>
              {whatsAppCta(result.prefix)}
            </>
          )}

          {result.kind === "ask" && (
            <>
              <p className="flex items-start gap-2.5 font-semibold text-ink">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                Send it to me and I&apos;ll tell you straight away, no obligation.
              </p>
              {whatsAppCta(result.prefix)}
            </>
          )}

          {result.kind === "invalid" && (
            <p className="text-sm text-muted">
              That doesn&apos;t look like a UK postcode. Try something like{" "}
              <span className="font-semibold text-ink">RH16</span> or{" "}
              <span className="font-semibold text-ink">BN6 8AB</span>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
