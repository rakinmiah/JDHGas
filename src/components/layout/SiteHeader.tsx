"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { NAV, SITE } from "@/lib/site";

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-display font-extrabold text-lg tracking-tight"
      aria-label="JDH Gas Services — home"
    >
      <Image src="/shield-logo.png" alt="" width={40} height={40} priority className="h-9 w-9 object-contain" />
      <span className={inverse ? "text-inverse" : "text-ink"}>
        JDH <span className="text-primary">Gas</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
          )
        : [];
    focusables()[0]?.focus();
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
      menuBtnRef.current?.focus();
    };
  }, [open]);

  return (
    <>
    <header
      className={`transition-all duration-200 ${
        scrolled
          ? "bg-surface/95 backdrop-blur border-b border-border-subtle shadow-[var(--shadow-sm)]"
          : "bg-surface"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between"
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-[var(--radius-pill)] px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                  active
                    ? "bg-sunken text-primary"
                    : "text-text hover:bg-sunken hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={SITE.phoneHref}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-pill)] bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}
          >
            <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-pill)] bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white hover:bg-whatsapp-hover transition-colors"
          >
            <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        <button
          ref={menuBtnRef}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6 text-ink" />
        </button>
      </nav>
    </header>

    {open && (
      <div
        ref={dialogRef}
          className="fixed inset-0 z-[300] bg-ink/95 backdrop-blur lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="container-page flex h-16 items-center justify-between">
            <Logo inverse />
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)]"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6 text-inverse" />
            </button>
          </div>
          <div className="container-page mt-6 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-white/10 py-4 text-xl font-semibold ${
                    active ? "text-flame" : "text-inverse"
                  }`}
                >
                  {item.label}
                  {active && <span className="h-2 w-2 rounded-full bg-flame" aria-hidden />}
                </Link>
              );
            })}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-primary px-5 text-base font-semibold text-white"
              >
                <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-whatsapp px-5 text-base font-semibold text-white"
              >
                <WhatsAppGlyph className="h-5 w-5" /> WhatsApp me
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
