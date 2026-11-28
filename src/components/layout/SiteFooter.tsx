import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { SITE, SERVICES } from "@/lib/site";
import { LOCAL_TOWNS } from "@/lib/local-pages";

/**
 * Site footer (rebuilt 27 Nov 2026): a plain column layout, the way an
 * established firm's footer reads. Brand and contact on the left, then
 * Services, Areas and Company columns; a bottom bar with the Gas Safe number
 * (one tap to the register), the legal links and cookie settings. Replaced
 * the dot-separated link rows and the round icon buttons.
 */

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Help and advice", href: "/help" },
  { label: "Book a boiler service", href: "/book" },
  { label: "Contact", href: "/contact" },
];

const AREAS = [
  { label: "Burgess Hill", href: "/" },
  ...LOCAL_TOWNS.map((t) => ({ label: t.name, href: `/${t.slug}` })),
];

const heading = "text-xs font-semibold uppercase tracking-[0.16em] text-navy-muted";
const linkCls = "text-[14.5px] text-white/85 transition-colors hover:text-white hover:underline hover:underline-offset-4";

function Column({ title, links, cols = 1 }: { title: string; links: { label: string; href: string }[]; cols?: 1 | 2 }) {
  return (
    <div>
      <p className={heading}>{title}</p>
      <ul className={`mt-4 grid gap-x-6 gap-y-2.5 ${cols === 2 ? "grid-cols-2" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white" role="contentinfo">
      <div className="container-page pb-8 pt-14 lg:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,4fr)_minmax(0,2.5fr)] lg:gap-12">
          {/* Brand and contact */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 font-display text-lg font-extrabold tracking-[-0.02em]">
              <Image src="/shield-logo.png" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
              JDH Gas Services
            </Link>
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-navy-muted">
              Boiler servicing, repairs and installs in {SITE.locality} and Mid Sussex.
            </p>
            <ul className="mt-6 space-y-2 text-[14.5px]">
              <li>
                <a href={SITE.phoneHref} className="font-display text-xl font-extrabold tracking-[-0.02em] hover:underline hover:underline-offset-4">
                  {SITE.phoneDisplay}
                </a>
                <span className="ml-2 text-navy-muted">Mon to Fri</span>
              </li>
              <li>
                <a href={SITE.mobileHref} className="text-white/85 hover:text-white hover:underline hover:underline-offset-4">
                  Mobile {SITE.mobileDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-white/85 hover:text-white hover:underline hover:underline-offset-4">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-4 pt-1">
                <a href={SITE.whatsappHref} target="_blank" rel="noopener" className="text-white/85 hover:text-white hover:underline hover:underline-offset-4">
                  WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener" className="text-white/85 hover:text-white hover:underline hover:underline-offset-4">
                  Instagram<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <Column title="Services" links={SERVICES.map((s) => ({ label: s.title, href: s.href }))} />
          <Column title="Areas we cover" links={AREAS} cols={2} />
          <Column title="Company" links={COMPANY} />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-navy-line pt-6 text-[13px] text-navy-muted lg:flex-row lg:items-center lg:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {year} JDH Gas Services</span>
            <span aria-hidden>·</span>
            <span>Gas Safe registered {SITE.gasSafe}</span>
            <a
              href={SITE.registerUrl}
              target="_blank"
              rel="noopener"
              data-track="register_check_click"
              data-location="footer"
              aria-label={`Check Gas Safe registration ${SITE.gasSafe} on the Gas Safe Register (opens in a new tab)`}
              className="inline-flex items-center gap-0.5 font-semibold text-white hover:underline hover:underline-offset-4"
            >
              Check the register <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            {SITE.companyNumber && (
              <>
                <span aria-hidden>·</span>
                <span>Company no. {SITE.companyNumber}</span>
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/areas" className="hover:text-white hover:underline hover:underline-offset-4">
              All areas
            </Link>
            <Link href="/privacy-policy" className="hover:text-white hover:underline hover:underline-offset-4">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white hover:underline hover:underline-offset-4">
              Terms
            </Link>
            <Link href="/cookie-policy" className="hover:text-white hover:underline hover:underline-offset-4">
              Cookie policy
            </Link>
            <CookieSettingsButton className="text-left hover:text-white hover:underline hover:underline-offset-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
