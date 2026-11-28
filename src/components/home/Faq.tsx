"use client";

import Link from "next/link";
import { useId, useState, type ReactElement, type ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";
import { FAQS, type FaqLink } from "@/lib/site";
import { HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

const linkCls = "font-semibold text-primary underline underline-offset-2 hover:text-primary-hover";

/** Render an answer, turning each listed phrase into its link. */
function withLinks(text: string, links: FaqLink[] = []): ReactNode[] {
  let parts: (string | ReactElement)[] = [text];
  links.forEach((l, li) => {
    parts = parts.flatMap((part, pi): (string | ReactElement)[] => {
      if (typeof part !== "string" || !part.includes(l.text)) return [part];
      const [before, ...after] = part.split(l.text);
      const external = l.href.startsWith("http");
      const key = `${li}-${pi}`;
      const node = /^(https?:|tel:)/.test(l.href) ? (
        <a
          key={key}
          href={l.href}
          className={linkCls}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          {...(l.track ? { "data-track": "register_check_click", "data-location": l.track } : {})}
        >
          {l.text}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ) : (
        <Link key={key} href={l.href} className={linkCls}>
          {l.text}
        </Link>
      );
      return [before, node, after.join(l.text)];
    });
  });
  return parts;
}

/**
 * M9: one calm centred column with hairline rows (Stripe's "+" accordion
 * list). Answers are always in the HTML; the FAQPage JSON-LD is built from
 * the same FAQS array in app/page.tsx.
 */
/** The accordion on its own (used by Faq and by the merged help section). */
export function FaqList({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <div className={`border-t border-border-subtle ${className}`}>
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q-${i}`;
        const panelId = `${base}-a-${i}`;
        return (
          <div key={item.q} className="border-b border-border-subtle">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[64px] w-full items-center justify-between gap-6 py-4 text-left font-body text-base font-semibold text-ink outline-offset-[-2px] transition-colors hover:text-primary active:bg-sunken"
              >
                {item.q}
                {/* Plus that becomes a minus: the vertical bar fades out */}
                <span aria-hidden className="relative h-4 w-4 shrink-0 text-primary">
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded-full bg-current transition-[opacity,rotate] duration-200 ${
                      isOpen ? "rotate-90 opacity-0" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out max-lg:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                <p className="pb-6 pr-10 leading-relaxed text-muted">{withLinks(item.a, item.links)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Faq() {
  return (
    <section className={`bg-surface ${SECTION_Y}`} aria-labelledby="faq-h">
      <div className="container-page max-w-[720px]">
        <div className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-h" className="mt-2 font-display text-h2 font-bold">
            Answers <Accent>before you book.</Accent>
          </h2>
        </div>
        <FaqList className={HEAD_GAP} />
      </div>
    </section>
  );
}
