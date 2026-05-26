import Link from "next/link";
import { Phone, Mail, Flame } from "lucide-react";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ui/icons";
import { SITE, SERVICES } from "@/lib/site";

const AREAS = [
  { label: "Burgess Hill", href: "/areas/burgess-hill" },
  { label: "Haywards Heath", href: "/areas/haywards-heath" },
  { label: "Hassocks", href: "/areas/hassocks" },
  { label: "Cuckfield", href: "/areas/cuckfield" },
];

const PAGES = [
  { label: "About Jamie", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Our work", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

function LinkRow({ label, links }: { label?: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      {label && <span className="font-semibold text-inverse">{label}</span>}
      {links.map((l, i) => (
        <span key={l.href} className="flex items-baseline gap-x-2.5">
          {i > 0 && <span className="text-white/25" aria-hidden>·</span>}
          <Link href={l.href} className="text-steel transition-colors hover:text-flame">
            {l.label}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink-soft text-inverse" role="contentinfo">
      <div className="container-page py-12">
        {/* 1 — brand + contact */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-display text-lg font-extrabold">
              <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-md)] bg-white/10">
                <Flame className="h-5 w-5 text-flame" aria-hidden />
              </span>
              JDH <span className="text-flame">Gas</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              Gas Safe registered gas and heating engineer, covering Burgess Hill and the
              surrounding Mid Sussex towns and villages.
            </p>
            <p className="mt-3 text-sm text-steel">Gas Safe Registered · {SITE.gasSafe}</p>
          </div>

          <div className="shrink-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-steel">Get in touch</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 font-semibold hover:text-flame">
                <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-flame">
                <Mail className="h-4 w-4" aria-hidden /> {SITE.email}
              </a>
            </div>
            <div className="mt-4 flex gap-3">
              <a href={SITE.whatsappHref} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <WhatsAppGlyph className="h-5 w-5" />
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <InstagramGlyph className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 2 — compact link clusters (SEO) */}
        <nav aria-label="Footer" className="mt-10 space-y-3 border-t border-white/10 pt-8 text-sm">
          <LinkRow label="Services" links={SERVICES.map((s) => ({ label: s.title, href: s.href }))} />
          <LinkRow label="Areas" links={AREAS} />
          <LinkRow links={PAGES} />
        </nav>

        {/* 3 — legal */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} JDH Gas Services. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-flame">Privacy policy</Link>
            <Link href="/terms" className="hover:text-flame">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
