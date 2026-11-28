"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Phone, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { NAV, SITE } from "@/lib/site";

function Logo({ inverse = false, strap = false }: { inverse?: boolean; strap?: boolean }) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-3 whitespace-nowrap"
      aria-label="JDH Gas Services home"
    >
      <Image
        src="/shield-logo.png"
        alt=""
        width={44}
        height={44}
        loading="eager"
        className="h-10 w-10 object-contain lg:h-11 lg:w-11"
      />
      <span className="leading-none">
        <span className={`block font-display text-lg font-extrabold tracking-tight lg:text-xl ${inverse ? "text-white" : "text-navy"}`}>
          JDH Gas Services
        </span>
        {strap && (
          <span className="mt-1.5 hidden text-[13px] font-medium text-neutral sm:block">
            Gas &amp; heating engineers · Burgess Hill &amp; Mid Sussex
          </span>
        )}
      </span>
    </Link>
  );
}

/** The services behind the desktop "Services" menu, in the homepage's order. */
const SERVICE_MENU = [
  { title: "Boiler servicing", line: "Annual safety and efficiency check, bookable online.", href: "/services/boiler-servicing" },
  { title: "Boiler repairs", line: "No heat, lost pressure, fault codes or odd noises.", href: "/services/boiler-repairs" },
  { title: "New boilers", line: "Like-for-like swaps or a full new system, fixed quote.", href: "/services/boiler-heating-installation" },
  { title: "Landlord certificates (CP12)", line: "Annual gas safety checks, certificate sent digitally.", href: "/services/gas-safety-certificate" },
  { title: "Strip-down service", line: "A deeper clean and new seals, for older boilers.", href: "/services/boiler-strip-down-service" },
  { title: "Gas hobs and cookers", line: "Fitted, connected and tightness-tested.", href: "/services/gas-appliances" },
];

/** The other desktop links, after "Services". */
const DESKTOP_NAV = [
  { label: "Areas", href: "/areas" },
  { label: "Help", href: "/help" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * The sticky header: one row, 76px (direction H2 from /explore/header,
 * 27 Nov 2026; it replaced a two-row bar that pinned 126px). Desktop (xl, from
 * 1280px): logo, then Services (a menu panel of the six services) and the
 * other links, then the phone and the Book button. Below 1280px the links
 * don't fit beside the actions, so the menu button takes over. The mobile menu
 * renders through a portal into <body>: the bar uses backdrop-filter once
 * scrolled, and the sticky wrapper in layout.tsx creates its own stacking
 * context, so a menu nested inside would be trapped beneath the mobile
 * action bar.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // The services menu remembers the page it was opened on, so it is closed
  // again as soon as the route changes.
  const [svcPath, setSvcPath] = useState<string | null>(null);
  const svcOpen = svcPath === pathname;
  const setSvcOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setSvcPath((cur) => {
      const was = cur === pathname;
      return (typeof next === "function" ? next(was) : next) ? pathname : null;
    });
  const svcRef = useRef<HTMLDivElement>(null);
  const svcBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isActive = (href: string) => pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the services menu on Escape or a click outside it.
  useEffect(() => {
    if (!svcOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!svcRef.current?.contains(e.target as Node)) setSvcPath(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSvcPath(null);
        svcBtnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [svcOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Mobile menu: focus management, Escape to close, Tab focus-trap.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusables = () =>
      dialog
        ? Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
        : [];
    focusables()[0]?.focus();
    const menuBtn = menuBtnRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      menuBtn?.focus();
    };
  }, [open]);

  const callLabel = `Call JDH Gas on ${SITE.phoneDisplay}`;

  return (
    <>
      <header
        ref={svcRef}
        className={`relative border-b bg-surface transition-[border-color] duration-200 ${
          scrolled || svcOpen ? "border-rule" : "border-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-8 lg:h-[76px]">
          <Logo />

          <nav aria-label="Primary" className="hidden flex-1 xl:block">
            <ul className="flex items-center gap-7">
              <li>
                <button
                  ref={svcBtnRef}
                  type="button"
                  aria-expanded={svcOpen}
                  aria-controls="services-menu"
                  onClick={() => setSvcOpen((o) => !o)}
                  className={`inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold transition-colors hover:text-action-text ${
                    svcOpen ? "text-action-text" : "text-navy"
                  } ${isActive("/services") && !svcOpen ? "underline decoration-action decoration-2 underline-offset-[10px]" : ""}`}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${svcOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
              </li>
              {DESKTOP_NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[0.9375rem] font-semibold text-navy transition-colors hover:text-action-text ${
                        active ? "underline decoration-action decoration-2 underline-offset-[10px]" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 xl:gap-6">
            <a
              href={SITE.phoneHref}
              aria-label={callLabel}
              className="hidden items-center gap-2 whitespace-nowrap font-display text-[1.0625rem] font-extrabold tracking-tight text-navy transition-colors hover:text-action-text xl:inline-flex"
            >
              <Phone className="h-4.5 w-4.5" aria-hidden /> {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.phoneHref}
              aria-label={callLabel}
              className="grid h-11 w-11 place-items-center rounded-[4px] bg-navy text-white xl:hidden"
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <Link
              href="/book"
              className="hidden h-11 items-center whitespace-nowrap rounded-[4px] bg-action px-5 text-sm font-bold text-navy transition-colors hover:bg-action-hover md:inline-flex"
            >
              Book a boiler service
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-[4px] transition-colors hover:bg-grey xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6 text-navy" aria-hidden />
            </button>
          </div>
        </div>

        {/* Services menu (desktop): a full-width white panel under the bar,
            ruled rows in two columns like the homepage services list, and a
            pointer to the phone for anyone unsure. */}
        {svcOpen && (
          <div
            id="services-menu"
            className="absolute inset-x-0 top-full hidden border-b border-rule bg-surface shadow-[0_24px_40px_-24px_rgba(15,31,75,0.35)] xl:block"
          >
            <div className="container-page grid grid-cols-[minmax(0,8fr)_minmax(0,3fr)] gap-10 py-8">
              <ul className="grid grid-cols-2 gap-x-10">
                {SERVICE_MENU.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={() => setSvcOpen(false)}
                      aria-current={pathname === s.href ? "page" : undefined}
                      className="group flex items-start justify-between gap-4 border-b border-rule py-3.5"
                    >
                      <span>
                        <span className="block font-display text-[16px] font-extrabold tracking-[-0.01em] text-navy group-hover:underline group-hover:underline-offset-4">
                          {s.title}
                        </span>
                        <span className="text-sm text-neutral">{s.line}</span>
                      </span>
                      <ArrowRight
                        className="mt-1 h-4 w-4 shrink-0 text-navy transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-action-text"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-l border-rule pl-8 pt-3.5">
                <p className="font-display text-[16px] font-extrabold tracking-[-0.01em] text-navy">Not sure what you need?</p>
                <p className="mt-1 text-sm text-neutral">
                  Describe the problem or send a photo of the boiler and we&apos;ll point you the right way.
                </p>
                <a href={SITE.phoneHref} className="mt-3 inline-flex items-center gap-2 font-semibold text-navy underline underline-offset-4">
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {open &&
        createPortal(
          <div
            ref={dialogRef}
            id="mobile-menu"
            className="anim-sheet-in fixed inset-0 z-(--z-overlay) flex h-dvh flex-col overflow-y-auto bg-ink text-inverse tone-ink xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-page flex h-16 shrink-0 items-center justify-between">
              <Logo inverse />
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] hover:bg-white/10"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6 text-inverse" aria-hidden />
              </button>
            </div>
            <div className="container-page mt-4 flex flex-1 flex-col pb-8">
              <ul>
                {NAV.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-semibold ${
                          active ? "text-flame" : "text-inverse"
                        }`}
                      >
                        {item.label}
                        {active && <span className="h-2 w-2 rounded-full bg-flame" aria-hidden />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center gap-1.5 font-semibold text-flame"
              >
                Book a boiler service online <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={SITE.phoneHref}
                  aria-label={callLabel}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[4px] bg-action px-5 text-base font-bold text-navy"
                >
                  <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[4px] bg-whatsapp px-5 text-base font-semibold text-white"
                >
                  <WhatsAppGlyph className="h-5 w-5" /> WhatsApp
                </a>
              </div>
              <p className="mt-6 text-sm text-steel">
                Monday to Friday · Gas Safe {SITE.gasSafe}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
