"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

/** The six services, in the homepage services order, with their one-liners. */
const SERVICES = [
  { title: "Boiler servicing", line: "Annual safety and efficiency check, bookable online.", href: "/services/boiler-servicing" },
  { title: "Boiler repairs", line: "No heat, lost pressure, fault codes or odd noises.", href: "/services/boiler-repairs" },
  { title: "New boilers", line: "Like-for-like swaps or a full new system, fixed quote.", href: "/services/boiler-heating-installation" },
  { title: "Landlord certificates (CP12)", line: "Annual gas safety checks, certificate sent digitally.", href: "/services/gas-safety-certificate" },
  { title: "Strip-down service", line: "A deeper clean and new seals, for older boilers.", href: "/services/boiler-strip-down-service" },
  { title: "Gas hobs and cookers", line: "Fitted, connected and tightness-tested.", href: "/services/gas-appliances" },
];

const LINKS = [
  { label: "Areas", href: "/areas" },
  { label: "Help", href: "/help" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap" aria-label="JDH Gas Services home">
      <Image src="/shield-logo.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
      <span className="font-display text-xl font-extrabold tracking-tight text-navy">JDH Gas Services</span>
    </Link>
  );
}

const link = "text-[0.9375rem] font-semibold text-navy transition-colors hover:text-action-text";

/**
 * Single-row header mock-ups (27 Nov 2026), from /explore/header. One row,
 * 76px, with the five services behind a "Services" menu.
 * H1: nav centred between the logo and the actions; the phone keeps its
 *     "Call us, Mon to Fri" label.
 * H2: nav set straight after the logo, the phone as a plain line; lighter.
 */
export function HeaderMock({ variant, startOpen = false }: { variant: "H1" | "H2"; startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || startOpen) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open, startOpen]);

  const services = (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`svc-${variant}`}
        onClick={() => setOpen((o) => !o)}
        className={`${link} inline-flex items-center gap-1.5 ${open ? "text-action-text" : ""}`}
      >
        Services <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
    </li>
  );

  const nav = (
    <nav aria-label="Primary">
      <ul className={`flex items-center ${variant === "H1" ? "gap-8" : "gap-7"}`}>
        {services}
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={link}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const book = (
    <Link
      href="/book"
      className="inline-flex h-11 shrink-0 items-center rounded-[4px] bg-action px-5 text-sm font-bold text-navy transition-colors hover:bg-action-hover"
    >
      Book a boiler service
    </Link>
  );

  return (
    <div ref={wrap} className="relative z-20 border-b border-rule bg-surface">
      <div className="container-page flex h-[76px] items-center gap-8">
        <Logo />
        {variant === "H1" ? (
          <>
            <div className="flex flex-1 justify-center">{nav}</div>
            <div className="flex items-center gap-5">
              <a href={SITE.phoneHref} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-[4px] border border-rule text-navy">
                  <Phone className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span className="leading-none">
                  <span className="block text-xs font-medium text-neutral">Call us, Mon to Fri</span>
                  <span className="mt-1 block whitespace-nowrap font-display text-[1.0625rem] font-extrabold tracking-tight text-navy">
                    {SITE.phoneDisplay}
                  </span>
                </span>
              </a>
              {book}
            </div>
          </>
        ) : (
          <>
            <div className="ml-4 flex-1">{nav}</div>
            <div className="flex items-center gap-6">
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 whitespace-nowrap font-display text-[1.0625rem] font-extrabold tracking-tight text-navy hover:text-action-text">
                <Phone className="h-4.5 w-4.5" aria-hidden /> {SITE.phoneDisplay}
              </a>
              {book}
            </div>
          </>
        )}
      </div>

      {/* The services menu: a full-width white panel under the bar, ruled
          rows in two columns (the services list's own language), and one
          line pointing at the phone for anyone unsure. */}
      {open && (
        <div id={`svc-${variant}`} className="absolute inset-x-0 top-full border-y border-rule bg-surface shadow-[0_24px_40px_-24px_rgba(15,31,75,0.35)]">
          <div className="container-page grid gap-10 py-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,3fr)]">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="group flex items-start justify-between gap-4 border-b border-rule py-3.5">
                    <span>
                      <span className="block font-display text-[16px] font-extrabold tracking-[-0.01em] text-navy group-hover:underline group-hover:underline-offset-4">
                        {s.title}
                      </span>
                      <span className="text-sm text-neutral">{s.line}</span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-navy transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-action-text" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-rule pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-3.5">
              <p className="font-display text-[16px] font-extrabold tracking-[-0.01em] text-navy">Not sure what you need?</p>
              <p className="mt-1 text-sm text-neutral">Describe the problem or send a photo of the boiler and we&apos;ll point you the right way.</p>
              <a href={SITE.phoneHref} className="mt-3 inline-flex items-center gap-2 font-semibold text-navy underline underline-offset-4">
                <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
