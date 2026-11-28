import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CookingPot, FileCheck2, Flame, Layers, Wrench, type LucideIcon } from "lucide-react";
import { BOOK_HREF } from "@/lib/booking";
import { SVCS, type Svc } from "./data";

/**
 * Internal comparison page for the homepage services section. Not linked from
 * anywhere and not indexed. Delete once a direction is picked.
 *
 * Round 2: A (picked from round 1) as it was, four developments of it, and
 * two new directions.
 */
export const metadata: Metadata = {
  title: "Services directions (internal)",
  robots: { index: false, follow: false },
};

const by = (k: string) => SVCS.find((s) => s.key === k)!;
const LEAD = by("servicing");
const REST = SVCS.filter((s) => s.key !== "servicing");

// From the boiler servicing page's "What's included" list (lib/services-content.ts).
const INCLUDED = ["Flue gas and combustion readings", "Gas pressure and flow checks", "Controls, seals and safety devices tested"];

const ICONS: Record<string, LucideIcon> = {
  repairs: Wrench,
  new: Flame,
  cp12: FileCheck2,
  strip: Layers,
  hobs: CookingPot,
};

const H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";

function Label({ id, name, note }: { id: string; name: string; note: string }) {
  return (
    <div className="border-y border-rule bg-[#fafbfc]">
      <div className="container-page flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
        <span className="font-display text-sm font-extrabold text-navy">{id}</span>
        <span className="text-sm font-semibold text-navy">{name}</span>
        <span className="text-sm text-neutral">{note}</span>
      </div>
    </div>
  );
}

function Pic({ img, sizes, className = "" }: { img: { src: string; pos?: string; contain?: boolean }; sizes: string; className?: string }) {
  return (
    <Image
      src={img.src}
      alt=""
      fill
      sizes={sizes}
      className={`${img.contain ? "object-contain p-2" : "object-cover"} ${className}`}
      style={img.pos ? { objectPosition: img.pos } : undefined}
    />
  );
}

/** A small square image for list rows: the photo, or a CP12 block. */
function Thumb({ s, size = "h-16 w-16", dark = false }: { s: Svc; size?: string; dark?: boolean }) {
  const img = s.maker;
  // On navy (dark) the CP12 block flips to white so it doesn't vanish.
  const box = img?.contain
    ? dark
      ? "bg-white"
      : "bg-white outline-1 -outline-offset-1 outline-rule"
    : img
      ? "bg-grey"
      : dark
        ? "bg-white"
        : "bg-navy";
  return (
    <span className={`relative ${size} shrink-0 overflow-hidden rounded-[4px] ${box}`}>
      {img ? (
        <Pic img={img} sizes="96px" />
      ) : (
        <span
          className={`absolute inset-0 grid place-items-center font-display text-[15px] font-extrabold tracking-[-0.03em] ${
            dark ? "text-navy" : "text-white"
          }`}
        >
          CP12
        </span>
      )}
    </span>
  );
}

function BookButton({ label = "Book a service online" }: { label?: string }) {
  return (
    <a
      href={BOOK_HREF}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-action px-5 font-semibold text-navy hover:bg-action-hover"
    >
      {label} <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}

function AllServices({ tone = "navy" }: { tone?: "navy" | "white" }) {
  return (
    <Link
      href="/services"
      className={`inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 ${
        tone === "white" ? "text-white" : "text-navy"
      }`}
    >
      All services <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

/* A, as in round 1 */
function A() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div className="overflow-hidden rounded-[8px] bg-navy">
          <div className="relative aspect-[16/10]">
            <Pic img={LEAD.maker!} sizes="(max-width: 1024px) 100vw, 640px" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Bookable online</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-[1.75rem]">{LEAD.title}</h3>
            <p className="mt-2 text-[15px] text-navy-muted">{LEAD.line}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BookButton />
              <Link href={LEAD.href} className="text-sm font-semibold text-white underline underline-offset-4">
                What a service covers
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className={H2}>Gas and heating services</h2>
          <ul className="mt-6 border-t border-rule">
            {REST.map((s) => (
              <li key={s.key} className="border-b border-rule">
                <Link href={s.href} className="group flex items-center gap-4 py-4">
                  <Thumb s={s} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">{s.title}</span>
                    <span className="mt-0.5 block text-sm text-neutral">{s.line}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-navy" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* A2: heading across the top, the lead card side by side (photo left, navy
   right) with what a service includes, and the other five as one row of
   compact cards with matching 4:3 photos. */
function A2() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={H2}>Gas and heating services</h2>
          <AllServices />
        </div>

        <div className="mt-8 grid overflow-hidden rounded-[8px] bg-navy md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px]">
            <Pic img={LEAD.maker!} sizes="(max-width: 768px) 100vw, 640px" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Bookable online</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-[2rem]">Annual boiler service</h3>
            <ul className="mt-5 space-y-2.5">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] text-white">
                  <Check className="h-4 w-4 shrink-0 text-action" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BookButton />
              <Link href={LEAD.href} className="text-sm font-semibold text-white underline underline-offset-4">
                What a service covers
              </Link>
            </div>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {REST.map((s) => (
            <li key={s.key}>
              <Link href={s.href} className="group block">
                <span
                  className={`relative block aspect-[4/3] overflow-hidden rounded-[6px] ${
                    s.maker?.contain ? "bg-white outline-1 -outline-offset-1 outline-rule" : s.maker ? "bg-grey" : "bg-navy"
                  }`}
                >
                  {s.maker ? (
                    <Pic img={s.maker} sizes="(max-width: 768px) 50vw, 230px" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center font-display text-4xl font-extrabold tracking-[-0.04em] text-white">
                      CP12
                    </span>
                  )}
                </span>
                <span className="mt-3 flex items-start justify-between gap-2">
                  <span className="font-display text-[15px] font-extrabold leading-snug tracking-[-0.015em] text-navy">{s.title}</span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-navy transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
          {/* Phones: fills the sixth slot of the two-column grid. */}
          <li className="md:hidden">
            <Link
              href="/services"
              className="flex aspect-[4/3] flex-col justify-end rounded-[6px] bg-grey p-4 font-display text-[15px] font-extrabold text-navy"
            >
              All services
              <ArrowRight className="mt-2 h-4 w-4" aria-hidden />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* A3: A on a grey band. Navy lead card on the left, the list in a white
   panel on the right, so nothing is white on white. Rows stretch to match
   the card's height. */
function A3() {
  return (
    <section className="bg-grey py-16 lg:py-20">
      <div className="container-page grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="flex flex-col overflow-hidden rounded-[8px] bg-navy">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1">
            <Pic img={LEAD.maker!} sizes="(max-width: 1024px) 100vw, 640px" />
          </div>
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Bookable online</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-[1.75rem]">{LEAD.title}</h3>
              <p className="mt-1.5 text-[15px] text-navy-muted">Annual safety and efficiency check.</p>
            </div>
            <BookButton label="Book online" />
          </div>
        </div>

        <div className="flex flex-col rounded-[8px] bg-white p-6 sm:p-8">
          <h2 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-extrabold leading-tight tracking-[-0.03em] text-navy">
            Everything else we do
          </h2>
          <ul className="mt-5 flex flex-1 flex-col border-t border-rule">
            {REST.map((s) => (
              <li key={s.key} className="flex flex-1 border-b border-rule">
                <Link href={s.href} className="group flex min-w-0 flex-1 items-center gap-4 py-3.5">
                  <Thumb s={s} size="h-14 w-14" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-extrabold tracking-[-0.015em] text-navy">{s.title}</span>
                    <span className="mt-0.5 block text-[13.5px] text-neutral">{s.line}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-navy transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-5">
            <AllServices />
          </div>
        </div>
      </div>
    </section>
  );
}

/* A4: the lead photo runs to the card edges with a solid navy box set into
   its lower corner (flat, no fade). The list swaps the mixed thumbnails for
   one set of line icons, so every row looks alike. */
function A4() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="container-page">
        <h2 className={H2}>Gas and heating services</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="relative min-h-[460px] overflow-hidden rounded-[8px] bg-grey lg:min-h-[520px]">
            <Pic img={LEAD.maker!} sizes="(max-width: 1024px) 100vw, 680px" />
            <div className="absolute bottom-0 left-0 w-full bg-navy p-6 sm:bottom-6 sm:left-6 sm:w-auto sm:max-w-[400px] sm:rounded-[6px] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Bookable online</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-white">{LEAD.title}</h3>
              <p className="mt-1.5 text-[15px] text-navy-muted">{LEAD.line}</p>
              <div className="mt-5">
                <BookButton />
              </div>
            </div>
          </div>
          <ul className="flex flex-col border-t border-rule">
            {REST.map((s) => {
              const Icon = ICONS[s.key];
              return (
                <li key={s.key} className="flex flex-1 border-b border-rule">
                  <Link href={s.href} className="group flex flex-1 items-center gap-4 py-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[4px] bg-grey text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">{s.title}</span>
                      <span className="mt-0.5 block text-sm text-neutral">{s.line}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-navy transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              );
            })}
            <li className="pt-5">
              <AllServices />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* A5: A's layout (lead card left, list right) reversed into a navy
   section: a white lead card, and the list in white type with A's photo
   thumbnails. Strongest contrast with the white hero above. It would sit next
   to the navy boiler strip, so the strip would move further down. */
function A5() {
  return (
    <section className="bg-navy py-16 lg:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div className="overflow-hidden rounded-[8px] bg-white">
          <div className="relative aspect-[16/10]">
            <Pic img={LEAD.maker!} sizes="(max-width: 1024px) 100vw, 680px" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Bookable online</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy sm:text-[1.75rem]">{LEAD.title}</h3>
            <p className="mt-2 text-[15px] text-neutral">{LEAD.line}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BookButton />
              <Link href={LEAD.href} className="text-sm font-semibold text-navy underline underline-offset-4">
                What a service covers
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
            Gas and heating services
          </h2>
          <ul className="mt-6 border-t border-navy-line">
            {REST.map((s) => (
              <li key={s.key} className="border-b border-navy-line">
                <Link href={s.href} className="group flex items-center gap-4 py-4">
                  <Thumb s={s} dark />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[17px] font-extrabold tracking-[-0.015em] text-white">{s.title}</span>
                    <span className="mt-0.5 block text-sm text-navy-muted">{s.line}</span>
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] border border-navy-line text-white transition-colors group-hover:border-action group-hover:bg-action group-hover:text-navy">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-5">
            <AllServices tone="white" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* E (new): split by who it's for. Homeowners and landlords each get a panel
   with their own short list. */
function ERow({ s, dark, label }: { s: Svc; dark?: boolean; label?: string }) {
  return (
    <li className={`border-b ${dark ? "border-navy-line" : "border-rule"}`}>
      <Link href={s.href} className="group flex items-center justify-between gap-4 py-3.5">
        <span className={`font-display text-[17px] font-extrabold tracking-[-0.015em] ${dark ? "text-white" : "text-navy"}`}>
          {label ?? s.title}
        </span>
        <ArrowRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${dark ? "text-white" : "text-navy"}`} aria-hidden />
      </Link>
    </li>
  );
}

function E() {
  const home = [by("servicing"), by("repairs"), by("new"), by("strip"), by("hobs")];
  const landlord = [by("cp12"), by("servicing"), by("repairs")];
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="container-page">
        <h2 className={H2}>Gas and heating services</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[8px] border border-rule">
            <div className="relative aspect-[16/9]">
              <Pic img={by("new").maker!} sizes="(max-width: 1024px) 100vw, 580px" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral">For homeowners</p>
              <p className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy">Your boiler, looked after</p>
              <ul className="mt-5 border-t border-rule">
                {home.map((s) => (
                  <ERow key={s.key} s={s} label={s.key === "servicing" ? "Boiler servicing, bookable online" : undefined} />
                ))}
              </ul>
            </div>
          </div>
          <div className="overflow-hidden rounded-[8px] bg-navy">
            <div className="relative grid aspect-[16/9] place-items-center bg-grey">
              <span className="font-display text-[clamp(4rem,3rem+5vw,7rem)] font-extrabold leading-none tracking-[-0.05em] text-navy">CP12</span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">For landlords</p>
              <p className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-white">Gas safety for your lets</p>
              <ul className="mt-5 border-t border-navy-line">
                {landlord.map((s) => (
                  <ERow key={s.key} s={s} dark />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* F (new): start from the visitor's situation, in their words. Big
   plain-language rows; the first one goes straight to online booking. */
function F() {
  const rows: { need: string; to: string; href: string; book?: boolean }[] = [
    { need: "My boiler is due its annual service", to: "Book online", href: BOOK_HREF, book: true },
    { need: "My boiler has stopped working", to: "Boiler repairs", href: by("repairs").href },
    { need: "I need a new boiler", to: "New boilers", href: by("new").href },
    { need: "I need a landlord gas safety certificate", to: "CP12 certificates", href: by("cp12").href },
    { need: "My older boiler needs a deeper clean", to: "Strip-down service", href: by("strip").href },
    { need: "I'm fitting a gas hob or cooker", to: "Gas hobs and cookers", href: by("hobs").href },
  ];
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div>
          <h2 className={H2}>What do you need?</h2>
          <p className="mt-3 text-[15px] text-neutral">Pick the one that fits and we&apos;ll take it from there.</p>
          <div className="relative mt-8 hidden aspect-[4/5] overflow-hidden rounded-[8px] bg-grey lg:block">
            <Pic img={LEAD.maker!} sizes="380px" />
          </div>
        </div>
        <ul className="border-t border-rule">
          {rows.map((r) => (
            <li key={r.need} className="border-b border-rule">
              <a href={r.href} className="group flex items-center justify-between gap-6 py-5 sm:py-6">
                <span className="font-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-extrabold leading-snug tracking-[-0.02em] text-navy">
                  {r.need}
                </span>
                <span
                  className={`inline-flex shrink-0 items-center gap-2 rounded-[4px] px-3.5 py-2 text-sm font-semibold transition-colors ${
                    r.book ? "bg-action text-navy hover:bg-action-hover" : "bg-grey text-navy group-hover:bg-navy group-hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">{r.to}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default async function ServicesExplore({ searchParams }: { searchParams: Promise<{ only?: string }> }) {
  // ?only=A2,A3 shows just those sections (for screenshots).
  const { only } = await searchParams;
  const show = (id: string) => !only || only.split(",").includes(id);
  return (
    <>
      <div className="container-page py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral">Internal, not indexed</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">Services section: round 2</h1>
        <p className="mt-2 max-w-2xl text-neutral">
          A as it was, four ways of developing it (A2 to A5), and two new directions (E, F). Same services and short
          lines throughout.
        </p>
      </div>
      {show("A") && (
        <>
          <Label id="A" name="As in round 1" note="For reference." />
          <A />
        </>
      )}
      {show("A2") && (
        <>
          <Label id="A2" name="Wide lead card + photo row" note="Heading on top. Lead card side by side, with what a service includes. The other five as matching photo cards." />
          <A2 />
        </>
      )}
      {show("A3") && (
        <>
          <Label id="A3" name="A on grey" note="Navy lead card and a white list panel on a grey band: nothing white on white. Rows match the card's height." />
          <A3 />
        </>
      )}
      {show("A4") && (
        <>
          <Label id="A4" name="Photo-led lead, icon list" note="Lead photo to the edges with a solid navy box set in. One icon set replaces the mixed thumbnails." />
          <A4 />
        </>
      )}
      {show("A5") && (
        <>
          <Label id="A5" name="A reversed on navy" note="A's layout on navy: white lead card left, the list with photo thumbnails right. Needs the boiler strip moved further down." />
          <A5 />
        </>
      )}
      {show("E") && (
        <>
          <Label id="E" name="By who it's for" note="New: a homeowners panel and a landlords panel, each with its own list." />
          <E />
        </>
      )}
      {show("F") && (
        <>
          <Label id="F" name="What do you need?" note="New: plain-language rows in the visitor's words. The first goes straight to booking." />
          <F />
        </>
      )}
    </>
  );
}
