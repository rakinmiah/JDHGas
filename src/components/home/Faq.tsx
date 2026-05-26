"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-sunken" aria-labelledby="faq-h">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Common questions
        </h2>
        <dl className="mt-8 divide-y divide-border-subtle border-y border-border-subtle">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left hover:text-primary"
                  >
                    <span className="font-display text-lg font-semibold">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </dt>
                <dd
                  className={`grid overflow-hidden transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="min-h-0 leading-relaxed text-muted">{item.a}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
