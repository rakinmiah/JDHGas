"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { CoverageMap } from "@/components/home/CoverageMap";
import { PostcodeChecker, type PostcodeResult } from "@/components/sections/PostcodeChecker";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { SITE } from "@/lib/site";

type Town = { name: string; slug: string; postcode: string };

const H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";

/**
 * Homepage "Where we work" (direction B): the coverage map fills the band and
 * a white panel sits over its left side. The postcode answer replaces the town
 * links in the same fixed-height slot, so the panel, the band and the map
 * never change size; the matching town's pin lights orange on the map.
 */
/** Layouts explored 27 Nov 2026 for the join with the navy reviews above:
 *  "band" (live): map edge to edge, panel centred over its left side.
 *  "head": the heading on white above the map, so the section starts like
 *    every other one; the panel keeps only the postcode check.
 *  "bridge": the panel rides up over the navy edge, tying the two together.
 *  "inset": a normal white section, panel beside a framed map. */
export type AreaLayout = "band" | "head" | "bridge" | "inset";

export function AreaMapCheck({
  towns,
  locality,
  layout = "band",
}: {
  towns: Town[];
  locality: string;
  layout?: AreaLayout;
}) {
  const [result, setResult] = useState<PostcodeResult | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // Desktop: how much of the map the panel covers, so the towns are fitted
  // beside it. Phones: the panel sits below the map, so nothing is covered.
  const [inset, setInset] = useState(0);
  useEffect(() => {
    const measure = () => {
      const p = panelRef.current?.getBoundingClientRect();
      const s = sectionRef.current?.getBoundingClientRect();
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      setInset(desktop && p && s ? Math.round(p.right - s.left) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const highlight =
    result?.kind === "covered" ? result.towns.map((t) => `/${t.slug}`) : [];
  const whatsapp = (prefix: string) =>
    `${SITE.whatsappHref}?text=${encodeURIComponent(`Hi Jamie, do you cover my area? My postcode starts ${prefix}`)}`;

  const yes = <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" aria-hidden />;
  const link = "inline-flex items-center gap-1 text-sm font-semibold text-navy underline underline-offset-4 hover:text-action-text";

  const heading = (
    <h2 id="area-h" className={H2}>
      Based in {locality}, covering Mid Sussex
    </h2>
  );
  const checker = <PostcodeChecker towns={towns} onResult={setResult} showResult={false} />;
  const slot = (
    <>
          {/* One fixed slot: the town links, or the postcode answer in their
              place. Same height either way. */}
          <div role="status" aria-live="polite" className="mt-5 min-h-[7.25rem] text-sm leading-7">
            {!result && (
              <p className="text-neutral">
                <span className="font-semibold text-navy">Towns we cover: </span>
                {towns.map((t, i) => (
                  <span key={t.slug}>
                    <Link
                      href={`/${t.slug}`}
                      className="text-navy underline decoration-rule underline-offset-4 hover:text-action-text hover:decoration-current"
                    >
                      {t.name}
                    </Link>
                    {i < towns.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}

            {result?.kind === "home" && (
              <div className="space-y-2">
                <p className="flex items-start gap-2.5 text-base font-semibold leading-snug text-navy">
                  {yes} That&apos;s our home turf: we&apos;re based right there in {locality}.
                </p>
                <Link href="/services" className={`${link} pl-[30px]`}>
                  See everything we do <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            )}

            {result?.kind === "covered" && (
              <div className="space-y-2">
                <p className="flex items-start gap-2.5 text-base font-semibold leading-snug text-navy">
                  {yes} Yes, we cover that area. It&apos;s marked on the map.
                </p>
                <p className="flex flex-wrap gap-x-5 pl-[30px]">
                  {result.towns.map((t) => (
                    <Link key={t.slug} href={`/${t.slug}`} className={link}>
                      {t.name} <ChevronRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ))}
                </p>
              </div>
            )}

            {(result?.kind === "likely" || result?.kind === "ask") && (
              <div className="space-y-2">
                <p className="flex items-start gap-2.5 text-base font-semibold leading-snug text-navy">
                  {result.kind === "likely" ? (
                    <>
                      {yes} Very likely. We&apos;re in the {result.prefix}&nbsp;villages all the time.
                    </>
                  ) : (
                    <>
                      <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden /> Send us your postcode and
                      we&apos;ll tell you straight away, no obligation.
                    </>
                  )}
                </p>
                <a
                  href={whatsapp(result.prefix)}
                  target="_blank"
                  rel="noopener"
                  className="ml-[30px] inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp underline underline-offset-4 hover:text-whatsapp-hover"
                >
                  <WhatsAppGlyph className="h-4 w-4" /> Ask on WhatsApp <ChevronRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            )}

            {result?.kind === "invalid" && (
              <p className="text-neutral">
                That doesn&apos;t look like a UK postcode. Try something like{" "}
                <span className="font-semibold text-navy">RH16</span> or{" "}
                <span className="font-semibold text-navy">BN6 8AB</span>.
              </p>
            )}
          </div>
    </>
  );
  const map = (
    <CoverageMap highlight={highlight} homeActive={result?.kind === "home"} insetLeft={layout === "inset" ? 0 : inset} />
  );
  const panelCls = "rounded-[8px] bg-white p-6 sm:p-8 lg:pointer-events-auto lg:max-w-[460px]";

  if (layout === "inset") {
    return (
      <section ref={sectionRef} aria-labelledby="area-h" className="bg-surface py-16 md:py-24 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14">
          <div ref={panelRef}>
            {heading}
            <div className="mt-8">{checker}</div>
            {slot}
          </div>
          <div className="relative z-0 h-[340px] overflow-hidden rounded-[8px] sm:h-[420px] lg:h-[540px]">{map}</div>
        </div>
      </section>
    );
  }

  if (layout === "head") {
    return (
      <section ref={sectionRef} aria-labelledby="area-h" className="relative isolate bg-surface">
        <div className="container-page flex flex-wrap items-end justify-between gap-x-10 gap-y-3 pb-10 pt-16 md:pt-24 lg:pb-12 lg:pt-28">
          {heading}
          <p className="max-w-[40ch] text-neutral">Check your postcode, or find your town on the map.</p>
        </div>
        <div className="relative lg:flex lg:min-h-[560px] lg:items-center">
          {/* Phones: the map, then the checker below it (no overlap, so the
              coast towns stay in view) on a flat grey band that closes the
              section. A white card on white left an invisible box of padding
              and a dead gap before the next section (28 Nov 2026). */}
          <div className="relative z-0 h-[380px] sm:h-[420px] lg:absolute lg:inset-0 lg:h-auto">{map}</div>
          <div className="container-page relative z-[500] w-full bg-grey pb-10 pt-8 lg:pointer-events-none lg:bg-transparent lg:py-14">
            <div ref={panelRef} className={`${panelCls} max-lg:rounded-none max-lg:bg-transparent max-lg:p-0!`}>
              <p className="font-display text-xl font-extrabold tracking-[-0.02em] text-navy">Do we cover you?</p>
              <div className="mt-5">{checker}</div>
              {slot}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const bridge = layout === "bridge";
  return (
    <section
      ref={sectionRef}
      aria-labelledby="area-h"
      className={`relative isolate bg-grey lg:flex lg:min-h-[640px] ${bridge ? "z-10 lg:items-start" : "lg:items-center"}`}
    >
      <div className="relative z-0 h-[340px] lg:absolute lg:inset-0 lg:h-auto">{map}</div>
      <div className={`container-page relative z-[500] w-full pb-12 lg:pointer-events-none ${bridge ? "lg:pb-16 lg:pt-0" : "lg:py-16"}`}>
        <div ref={panelRef} className={`-mt-16 ${bridge ? "lg:-mt-28" : "lg:mt-0"} ${panelCls}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Where we work</p>
          <div className="mt-2">{heading}</div>
          <div className="mt-6">{checker}</div>
          {slot}
        </div>
      </div>
    </section>
  );
}
