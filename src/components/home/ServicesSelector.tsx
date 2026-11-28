"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { HOME_SERVICES } from "@/lib/home-services";
import { Checks, ServicePhoto, ServicesHead } from "@/components/home/ServicesDev";
import { HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * Services V3: a selector (after Feenstra's "Go straight to" panel). The six
 * services as a list on the left; choosing one (hover or tap) shows its photo,
 * what's involved and how to start on the right. Every service gets real
 * depth without six cards on the page. Each name is still a plain link to its
 * page, so nothing depends on the hover.
 */
export function ServicesSelector() {
  const [i, setI] = useState(0);
  const s = HOME_SERVICES[i];
  return (
    <section aria-labelledby="services-h" className={`bg-sunken ${SECTION_Y}`}>
      <div className="container-page">
        <ServicesHead />
        <div className={`${HEAD_GAP} grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10`}>
          <ul className="border-t border-rule">
            {HOME_SERVICES.map((x, k) => {
              const on = k === i;
              return (
                <li key={x.slug} className="border-b border-rule">
                  <Link
                    href={x.href}
                    onMouseEnter={() => setI(k)}
                    onFocus={() => setI(k)}
                    aria-current={on ? "true" : undefined}
                    className={`group flex items-center justify-between gap-4 border-l-[3px] py-4 pl-4 pr-2 transition-colors lg:py-5 ${
                      on ? "border-action bg-white" : "border-transparent hover:bg-white/60"
                    }`}
                  >
                    <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-navy lg:text-[1.5rem]">{x.name}</span>
                    <ArrowRight
                      className={`h-5 w-5 shrink-0 transition-[translate,color,opacity] ${on ? "translate-x-0 text-action-text opacity-100" : "-translate-x-1 opacity-0"}`}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <article aria-live="polite" className="group overflow-hidden rounded-[6px] bg-white">
            <ServicePhoto key={s.slug} s={s} sizes="(max-width: 1024px) 100vw, 660px" className="aspect-[16/9]" />
            <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:p-8">
              <div>
                <h3 className="font-display text-[1.6rem] font-extrabold leading-tight tracking-[-0.025em] text-navy">{s.name}</h3>
                <p className="mt-2 text-neutral">{s.line}</p>
              </div>
              <div className="flex flex-col">
                <Checks items={s.checks} />
                <Link
                  href={s.action.href}
                  className={`mt-6 inline-flex min-h-[48px] w-fit items-center gap-2 rounded-[4px] px-5 font-bold transition-colors ${
                    s.slug === "boiler-servicing"
                      ? "bg-action text-navy hover:bg-action-hover"
                      : "border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white"
                  }`}
                >
                  {s.action.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
