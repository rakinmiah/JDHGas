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

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-inverse" role="contentinfo">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-md)] bg-white/10">
              <Flame className="h-5 w-5 text-flame" aria-hidden />
            </span>
            JDH <span className="text-flame">Gas</span>
          </div>
          <p className="mt-4 text-sm text-steel">
            Gas Safe Registered · {SITE.gasSafe}
          </p>
          <p className="text-sm text-steel">
            {SITE.locality}, {SITE.region}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-flame">
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

        <nav aria-label="Services">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-steel">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-inverse/90 hover:text-flame">{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Areas">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-steel">Areas</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {AREAS.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="text-inverse/90 hover:text-flame">{a.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="More">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-steel">More</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="text-inverse/90 hover:text-flame">About Jamie</Link></li>
            <li><Link href="/reviews" className="text-inverse/90 hover:text-flame">Reviews</Link></li>
            <li><Link href="/contact" className="text-inverse/90 hover:text-flame">Contact</Link></li>
            <li><Link href="/privacy-policy" className="text-inverse/90 hover:text-flame">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-inverse/90 hover:text-flame">Terms</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 text-xs text-steel">
          © {year} JDH Gas Services. Gas Safe Registered {SITE.gasSafe}.
        </div>
      </div>
    </footer>
  );
}
