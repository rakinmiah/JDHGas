import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Phone, Receipt, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import { GoogleG } from "@/components/ui/icons";
import { LogoStrip } from "@/components/home/LogoStrip";
import { SITE } from "@/lib/site";
import { BOOK_HREF } from "@/lib/booking";
import { getGoogleReviews } from "@/lib/google-reviews";
import { LOCAL_TOWNS } from "@/lib/local-pages";

/**
 * Internal comparison page for the hero's trust row. Not linked from anywhere
 * and not indexed. Delete once a direction is picked. `?v=A,B` shows a subset.
 *
 * Every fact here is already on the site: Gas Safe number, live Google
 * rating, the live town pages, fixed quotes, online booking.
 */
export const metadata: Metadata = {
  title: "Hero trust directions (internal)",
  robots: { index: false, follow: false },
};

type Rv = { rating: string; count: number };

/* ---------- shared hero top ---------- */

function Copy({ rv, children }: { rv: Rv; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
      <Link href="/reviews" className="flex w-fit flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-navy-muted hover:text-white">
        <GoogleG className="h-4.5 w-4.5" />
        <span className="whitespace-nowrap font-semibold text-white">Rated {rv.rating}</span>
        <span aria-hidden className="tracking-[1.5px] text-[#f0a800]">★★★★★</span>
        <span className="whitespace-nowrap">{rv.count} Google reviews</span>
      </Link>
      <h1 className="mt-5 font-display text-[clamp(2.125rem,1.3rem+2.3vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white">
        Boiler servicing, repairs and new boilers across Mid Sussex.
      </h1>
      <p className="mt-4 max-w-[46ch] text-base text-navy-muted sm:text-lg">
        JDH Gas Services: a Gas Safe registered heating engineer based in {SITE.locality}. Landlord gas safety
        certificates and gas hob fitting too.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
        <Link
          href={BOOK_HREF}
          className="inline-flex min-h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[4px] bg-action px-6 text-[15px] font-bold text-navy transition-colors hover:bg-action-hover sm:px-7 sm:text-base"
        >
          Book a boiler service online <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <a
          href={SITE.phoneHref}
          className="inline-flex items-center gap-2.5 whitespace-nowrap font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          <Phone className="h-4.5 w-4.5" aria-hidden /> Or call {SITE.phoneDisplay}
        </a>
      </div>
      {children}
    </div>
  );
}

function Photo({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-0">
      <Image
        src="/images/jdh-van.jpg"
        alt="The JDH Gas Services van in navy livery"
        fill
        sizes="(max-width: 1024px) 100vw, 560px"
        className="object-cover object-[50%_74%]"
      />
      {children}
    </div>
  );
}

const GRID = "grid lg:min-h-[540px] lg:grid-cols-[52fr_48fr]";

/* ---------- current (reference) ---------- */

const CHECKS = [
  `Gas Safe registered, ${SITE.gasSafe}`,
  "Annual services bookable online",
  "Fixed quotes before any work starts",
  "Landlord certificates (CP12)",
];

function Current({ rv }: { rv: Rv }) {
  return (
    <Wrap>
      <div className="overflow-hidden rounded-[8px] bg-navy text-white">
        <div className={GRID}>
          <Copy rv={rv} />
          <Photo />
        </div>
        <ul className="grid gap-x-8 gap-y-3 border-t border-navy-line px-6 py-5 text-sm font-semibold sm:grid-cols-2 sm:px-10 lg:flex lg:justify-center lg:gap-12 lg:px-14">
          {CHECKS.map((c) => (
            <li key={c} className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-action text-navy">
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Wrap>
  );
}

/* ---------- A: proof bar, figures first ---------- */

function proof(rv: Rv) {
  return [
    { value: SITE.gasSafe, label: "Gas Safe register number" },
    { value: `${rv.rating} ★`, label: `From ${rv.count} Google reviews` },
    { value: String(LOCAL_TOWNS.length), label: "Sussex towns we cover" },
    { value: "Fixed", label: "Quote before any work starts" },
  ];
}

function A({ rv }: { rv: Rv }) {
  return (
    <Wrap>
      <div className="overflow-hidden rounded-[8px] bg-navy text-white">
        <div className={GRID}>
          <Copy rv={rv} />
          <Photo />
        </div>
        <dl className="grid grid-cols-2 border-t border-navy-line lg:grid-cols-4">
          {proof(rv).map((p, i) => (
            <div
              key={p.label}
              className={`px-6 py-5 sm:px-10 lg:px-8 lg:py-7 ${i % 2 ? "border-l border-navy-line" : ""} ${
                i > 1 ? "border-t border-navy-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""} ${i === 0 ? "lg:pl-14" : ""}`}
            >
              <dd className="font-display text-2xl font-extrabold tracking-[-0.03em] text-white lg:text-[2rem]">{p.value}</dd>
              <dt className="mt-1 text-[13px] text-navy-muted lg:text-sm">{p.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Wrap>
  );
}

/* ---------- B: white bar straddling the card's base ---------- */

function items(rv: Rv): { icon: LucideIcon; title: string; line: string }[] {
  return [
    { icon: ShieldCheck, title: "Gas Safe registered", line: `Register no. ${SITE.gasSafe}` },
    { icon: Star, title: `Rated ${rv.rating} on Google`, line: `${rv.count} reviews` },
    { icon: CalendarCheck, title: "Book online", line: "Annual boiler services" },
    { icon: Receipt, title: "Fixed quotes", line: "Before any work starts" },
  ];
}

function B({ rv }: { rv: Rv }) {
  return (
    <Wrap tight>
      <div className="overflow-hidden rounded-[8px] bg-navy pb-12 text-white lg:pb-14">
        <div className={GRID}>
          <Copy rv={rv} />
          <Photo />
        </div>
      </div>
      <ul className="relative mx-4 -mt-10 grid grid-cols-2 rounded-[6px] bg-white outline-1 -outline-offset-1 outline-rule sm:mx-8 lg:mx-14 lg:grid-cols-4">
        {items(rv).map((it, i) => (
          <li
            key={it.title}
            className={`flex items-start gap-3 px-4 py-4 sm:px-6 lg:py-6 ${i % 2 ? "border-l border-rule" : ""} ${
              i > 1 ? "border-t border-rule lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <it.icon className="mt-0.5 h-5 w-5 shrink-0 text-action" strokeWidth={2.25} aria-hidden />
            <span>
              <span className="block font-display text-[15px] font-extrabold tracking-[-0.015em] text-navy">{it.title}</span>
              <span className="block text-[13px] text-neutral">{it.line}</span>
            </span>
          </li>
        ))}
      </ul>
    </Wrap>
  );
}

/* ---------- C: one white shelf, trust + makes (replaces the strip) ---------- */

const MAKES = [
  { name: "Worcester Bosch", src: "/brands/worcester.png", h: "h-8 lg:h-9", ratio: 192 / 75 },
  { name: "Vaillant", src: "/brands/vaillant.svg", h: "h-9 lg:h-10", ratio: 35 / 48 },
  { name: "Ideal Heating", src: "/brands/ideal.svg", h: "h-8", ratio: 204.1 / 107.3 },
  { name: "Baxi", src: "/brands/baxi.svg", h: "h-5", ratio: 3 },
  { name: "Bosch", src: "/brands/bosch.svg", h: "h-5", ratio: 433 / 97 },
];

function Mark({ m }: { m: (typeof MAKES)[number] }) {
  return (
    <span
      role="img"
      aria-label={m.name}
      className={`block ${m.h} bg-navy`}
      style={{
        aspectRatio: m.ratio,
        maskImage: `url(${m.src})`,
        WebkitMaskImage: `url(${m.src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function C({ rv }: { rv: Rv }) {
  return (
    <Wrap>
      <div className="overflow-hidden rounded-[8px] outline-1 -outline-offset-1 outline-rule">
        <div className={`${GRID} bg-navy text-white`}>
          <Copy rv={rv} />
          <Photo />
        </div>
        <div className="grid bg-white lg:grid-cols-[52fr_48fr]">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 px-6 py-6 text-sm font-semibold text-navy sm:px-10 lg:px-14 lg:py-7">
            {items(rv).map((it) => (
              <li key={it.title} className="flex items-center gap-2.5">
                <it.icon className="h-4.5 w-4.5 shrink-0 text-action" strokeWidth={2.25} aria-hidden />
                {it.title}
              </li>
            ))}
          </ul>
          <div className="border-t border-rule px-6 py-6 sm:px-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Every major boiler make</p>
            <ul className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 lg:flex-nowrap lg:gap-x-4">
              {MAKES.map((m) => (
                <li key={m.name}>
                  <Mark m={m} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

/* ---------- D: checks move into the copy column, photo runs full height ---------- */

function D({ rv }: { rv: Rv }) {
  return (
    <Wrap>
      <div className="overflow-hidden rounded-[8px] bg-navy text-white">
        <div className={GRID}>
          <Copy rv={rv}>
            <ul className="mt-9 grid gap-x-6 gap-y-2.5 border-t border-navy-line pt-6 text-sm text-navy-muted sm:grid-cols-2">
              {items(rv).map((it) => (
                <li key={it.title} className="flex items-center gap-2.5">
                  <it.icon className="h-4.5 w-4.5 shrink-0 text-action" strokeWidth={2.25} aria-hidden />
                  <span>
                    <span className="font-semibold text-white">{it.title}</span>
                    {it.title === "Gas Safe registered" ? `, ${SITE.gasSafe}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </Copy>
          <Photo />
        </div>
      </div>
    </Wrap>
  );
}

/* ---------- E: Gas Safe card pinned to the photo, the rest in the copy ---------- */

function E({ rv }: { rv: Rv }) {
  return (
    <Wrap>
      <div className="overflow-hidden rounded-[8px] bg-navy text-white">
        <div className={GRID}>
          <Copy rv={rv}>
            <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white">
              <span className="inline-flex items-center gap-2">
                <Receipt className="h-4.5 w-4.5 text-action" strokeWidth={2.25} aria-hidden /> Fixed quotes before any work starts
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarCheck className="h-4.5 w-4.5 text-action" strokeWidth={2.25} aria-hidden /> Services bookable online
              </span>
            </p>
          </Copy>
          <Photo>
            <a
              href={SITE.registerUrl}
              className="absolute bottom-4 left-4 flex items-center gap-3.5 rounded-[6px] bg-white px-4 py-3.5 text-navy sm:bottom-6 sm:left-6 sm:px-5 sm:py-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[4px] bg-navy">
                <ShieldCheck className="h-6 w-6 text-gas-safe" strokeWidth={2.25} aria-hidden />
              </span>
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral">Gas Safe registered</span>
                <span className="block font-display text-xl font-extrabold tracking-[-0.02em]">No. {SITE.gasSafe}</span>
              </span>
            </a>
          </Photo>
        </div>
      </div>
    </Wrap>
  );
}

/* ---------- page ---------- */

function Wrap({ children, tight = false }: { children: React.ReactNode; tight?: boolean }) {
  return (
    <section className={`${tight ? "pb-4 lg:pb-6" : "pb-10 lg:pb-14"} pt-4 lg:pt-5`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

const VARIANTS: { key: string; name: string; note: string; C: (p: { rv: Rv }) => React.ReactNode; strip: boolean }[] = [
  { key: "now", name: "Now", note: "Four equal checks along the card's base.", C: Current, strip: true },
  { key: "A", name: "A. Proof bar", note: "Figures first, in ruled cells: number, rating, towns, fixed quotes.", C: A, strip: true },
  { key: "B", name: "B. Straddling bar", note: "A white bar half on the navy card, half on the page, leading into the makes.", C: B, strip: true },
  { key: "C", name: "C. One shelf", note: "The card's base turns white: trust on the left, makes on the right. Replaces the strip.", C: C, strip: false },
  { key: "D", name: "D. In the copy", note: "Checks sit under the buttons; the photo runs the full height; the card ends clean.", C: D, strip: true },
  { key: "E", name: "E. Pinned credential", note: "Gas Safe as a card on the photo; quotes and booking under the buttons.", C: E, strip: true },
];

export default async function HeroTrustExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const only = v?.split(",");
  const { rating, count } = await getGoogleReviews();
  const rv = { rating, count };

  return (
    <main>
      {VARIANTS.filter((x) => !only || only.includes(x.key)).map((x) => (
        <div key={x.key} className="border-b-8 border-grey">
          <div className="container-page pt-8">
            <p className="font-display text-lg font-extrabold text-navy">{x.name}</p>
            <p className="text-sm text-neutral">{x.note}</p>
          </div>
          <x.C rv={rv} />
          {x.strip && <LogoStrip light />}
        </div>
      ))}
    </main>
  );
}
