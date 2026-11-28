import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { HOME_SERVICES, SERVICES_INTRO, type HomeService } from "@/lib/home-services";
import { HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * Services development round (27 Nov 2026, /explore/services-dev). Each keeps
 * the current section's grey band, photos, CP12 graphic and hover lift, and
 * changes what read as templated: the small orange label over the heading,
 * the navy panel on the lead card, identical one-line rows and tiny
 * thumbnails.
 */

export const SVC_H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";

/** Heading left, one plain sentence right (no label above the heading).
 *  The homepage drops the sentence (`intro={false}`, 27 Nov 2026). */
export function ServicesHead({ intro = true }: { intro?: boolean } = {}) {
  if (!intro) {
    return (
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <h2 id="services-h" className={SVC_H2}>
          Gas and heating services
        </h2>
        <Link href="/services" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy underline underline-offset-4 hover:text-action-text">
          All services <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  }
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
      <h2 id="services-h" className={SVC_H2}>
        Gas and heating services
      </h2>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 lg:justify-end">
        <p className="max-w-[44ch] text-neutral lg:text-right">{SERVICES_INTRO}</p>
        <Link href="/services" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy underline underline-offset-4 hover:text-action-text">
          All services <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/** The CP12 record graphic from the current list, at any size. */
export function Cp12Art({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 72 72" className={className} preserveAspectRatio="xMidYMid meet">
      <rect x="20" y="13" width="30" height="40" rx="2" fill="#fff" />
      <rect x="25" y="20" width="14" height="3" rx="1.5" fill="#0f1f4b" />
      <rect x="25" y="28" width="20" height="2" rx="1" fill="#d6dae0" />
      <rect x="25" y="33" width="20" height="2" rx="1" fill="#d6dae0" />
      <rect x="25" y="38" width="13" height="2" rx="1" fill="#d6dae0" />
      <circle cx="48" cy="50" r="10" fill="#ff6b1a" />
      <path d="M43.5 50.2l3 3 6-6.2" fill="none" stroke="#0f1f4b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServicePhoto({ s, sizes, className = "" }: { s: HomeService; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${s.img ? "bg-grey" : "bg-navy"} ${className}`}>
      {s.img ? (
        <Image
          src={s.img.src}
          alt={s.img.alt}
          fill
          sizes={sizes}
          className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          style={{ objectPosition: s.img.pos }}
        />
      ) : (
        <Cp12Art className="absolute inset-0 h-full w-full p-[12%]" />
      )}
    </div>
  );
}

export function Checks({ items, className = "", onNavy = false }: { items: string[]; className?: string; onNavy?: boolean }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((c) => (
        <li key={c} className={`flex items-start gap-2.5 text-[15px] ${onNavy ? "text-white" : "text-navy"}`}>
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${onNavy ? "text-action" : "text-action-text"}`} strokeWidth={3} aria-hidden />
          {c}
        </li>
      ))}
    </ul>
  );
}

const lift =
  "transition-[translate,box-shadow] duration-200 hover:shadow-[0_18px_34px_-16px_rgba(15,31,75,0.35)] motion-safe:hover:-translate-y-1";

/* ---------- V1: the current layout, refined (on the homepage from
   27 Nov 2026) ----------
   Same shape (servicing large on the left, the rest listed on the right).
   The servicing card keeps its navy panel and now shows what a service
   covers. Rows get bigger photos, their own sentence and a "how to start"
   link instead of an arrow. No intro sentence under the heading. */
export function ServicesV1() {
  const [lead, ...rest] = HOME_SERVICES;
  return (
    <section aria-labelledby="services-h" className={`bg-sunken ${SECTION_Y}`}>
      <div className="container-page">
        <ServicesHead intro={false} />
        <div className={`${HEAD_GAP} grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-8`}>
          <article className={`group relative flex flex-col overflow-hidden rounded-[6px] bg-navy ${lift}`}>
            <ServicePhoto s={lead} sizes="(max-width: 1024px) 100vw, 560px" className="aspect-[16/10]" />
            <div className="flex flex-1 flex-col p-6 lg:p-8">
              <h3 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em] text-white">
                <Link href={lead.href} className="after:absolute after:inset-0 after:content-['']">
                  {lead.name}
                </Link>
              </h3>
              <p className="mt-2 text-navy-muted">{lead.line}</p>
              <Checks items={lead.checks} className="mt-5" onNavy />
              <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
                <Link
                  href={lead.action.href}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-action px-5 font-bold text-navy transition-colors hover:bg-action-hover"
                >
                  {lead.action.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href={lead.href} className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                  What&apos;s included
                </Link>
              </div>
            </div>
          </article>

          <ul className="flex flex-col gap-3">
            {rest.map((s) => (
              <li key={s.slug} className="flex-1">
                <div className={`group relative flex h-full items-center gap-5 rounded-[6px] bg-white p-3 pr-5 ${lift}`}>
                  <ServicePhoto s={s} sizes="112px" className="h-24 w-24 shrink-0 rounded-[4px] lg:h-28 lg:w-28" />
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-extrabold tracking-[-0.015em] text-navy">
                      <Link href={s.href} className="after:absolute after:inset-0 after:content-['']">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-neutral">{s.line}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-action-text">
                      {s.action.label} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- V2: bento ----------
   Size follows priority. Row one: servicing wide (photo beside what a service
   covers and the booking button) and CP12 as the certificate graphic. Row
   two: repairs, new boilers and hobs as photo cards. The strip-down hangs off
   the servicing card as the natural next step. */
export function ServicesV2() {
  const by = (slug: string) => HOME_SERVICES.find((s) => s.slug === slug)!;
  const svc = by("boiler-servicing");
  const cp12 = by("gas-safety-certificate");
  const strip = by("boiler-strip-down-service");
  const row2 = ["boiler-repairs", "boiler-heating-installation", "gas-appliances"].map(by);
  return (
    <section aria-labelledby="services-h" className={`bg-sunken ${SECTION_Y}`}>
      <div className="container-page">
        <ServicesHead />
        <div className={`${HEAD_GAP} grid gap-5 lg:grid-cols-12`}>
          {/* Servicing, wide */}
          <article className={`group relative grid overflow-hidden rounded-[6px] bg-white md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:col-span-8 ${lift}`}>
            <ServicePhoto s={svc} sizes="(max-width: 768px) 100vw, 360px" className="aspect-[16/10] md:aspect-auto md:min-h-[400px]" />
            <div className="flex flex-col p-6 lg:p-8">
              <h3 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em] text-navy">
                <Link href={svc.href} className="after:absolute after:inset-0 after:content-['']">
                  {svc.name}
                </Link>
              </h3>
              <p className="mt-2 text-neutral">{svc.line}</p>
              <Checks items={svc.checks} className="mt-5" />
              <div className="relative z-10 mt-auto pt-7">
                <Link
                  href={svc.action.href}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-action px-5 font-bold text-navy transition-colors hover:bg-action-hover"
                >
                  {svc.action.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <p className="mt-4 text-sm text-neutral">
                  Older boiler?{" "}
                  <Link href={strip.href} className="font-semibold text-navy underline underline-offset-4 hover:text-action-text">
                    Strip-down service
                  </Link>{" "}
                  every four to five years.
                </p>
              </div>
            </div>
          </article>

          {/* CP12, narrow, as the certificate */}
          <article className={`group relative flex flex-col overflow-hidden rounded-[6px] bg-white lg:col-span-4 ${lift}`}>
            <div className="relative grid h-44 place-items-center bg-navy lg:h-48">
              <Cp12Art className="h-36 w-36 lg:h-40 lg:w-40" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-navy">
                <Link href={cp12.href} className="after:absolute after:inset-0 after:content-['']">
                  {cp12.name}
                </Link>
              </h3>
              <p className="mt-2 text-[15px] text-neutral">For landlords: {cp12.line.charAt(0).toLowerCase() + cp12.line.slice(1)}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-navy group-hover:text-action-text">
                {cp12.action.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </article>

          {/* Row two */}
          {row2.map((s) => (
            <article key={s.slug} className={`group relative flex flex-col overflow-hidden rounded-[6px] bg-white lg:col-span-4 ${lift}`}>
              <ServicePhoto s={s} sizes="(max-width: 1024px) 100vw, 370px" className="aspect-[16/10]" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-navy">
                  <Link href={s.href} className="after:absolute after:inset-0 after:content-['']">
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] text-neutral">{s.line}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-navy group-hover:text-action-text">
                  {s.action.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
