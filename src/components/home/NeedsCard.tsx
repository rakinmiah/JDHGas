import Link from "next/link";
import {
  Flame,
  Wrench,
  ClipboardCheck,
  Hammer,
  CookingPot,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { PriceTag } from "@/components/ui/PriceTag";
import { SITE, WHATSAPP_REPAIR_HREF } from "@/lib/site";

export type Need = {
  /** Sent as the `need` parameter of needs_card_click. */
  id: "service" | "repair" | "cp12" | "install" | "hob";
  icon: LucideIcon;
  title: string;
  sub: string;
  href: string;
  /** A confirmed "from" price (SITE.prices); null renders nothing. */
  price?: number | null;
};

/** Sep–Nov: nudge annual services before the winter rush, following the
 *  servicing page's own advice ("Late summer to autumn is the ideal time"). */
function isAutumn(d = new Date()) {
  const m = d.getMonth();
  return m >= 8 && m <= 10;
}

export function homeNeeds(): Need[] {
  return [
    {
      id: "service",
      icon: Flame,
      title: "Annual boiler service",
      sub: isAutumn() ? "Book before winter: online, or call" : "Book online, or call to arrange",
      href: "/book",
      price: SITE.prices.servicingFrom,
    },
    {
      id: "repair",
      icon: Wrench,
      title: "Boiler or heating not working",
      sub: "WhatsApp us a photo of the fault",
      href: WHATSAPP_REPAIR_HREF,
    },
    {
      id: "cp12",
      icon: ClipboardCheck,
      title: "Landlord gas safety certificate",
      sub: "CP12 for one property or a portfolio",
      href: "/services/gas-safety-certificate",
      price: SITE.prices.cp12From,
    },
    {
      id: "install",
      icon: Hammer,
      title: "New boiler",
      sub: "A clear fixed quote",
      href: "/services/boiler-heating-installation",
    },
    {
      id: "hob",
      icon: CookingPot,
      title: "Gas hob or cooker",
      sub: "Fitted and tested safely",
      href: "/services/gas-appliances",
    },
  ];
}

function NeedRow({ need }: { need: Need }) {
  const external = need.href.startsWith("http");
  const Icon = need.icon;
  const isWhatsApp = need.href.includes("wa.me");
  const className =
    "group flex min-h-[64px] items-center gap-3 px-4 py-3.5 outline-offset-[-2px] transition-colors duration-150 hover:bg-sunken active:bg-border-subtle sm:gap-4 sm:px-6";

  const content = (
    <>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary transition-colors group-hover:bg-surface sm:h-10 sm:w-10">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-snug text-ink">{need.title}</span>
        <span className="mt-0.5 block text-sm leading-snug text-muted">{need.sub}</span>
      </span>
      {need.price != null && (
        <span className="hidden sm:block">
          <PriceTag amount={need.price} />
        </span>
      )}
      {isWhatsApp ? (
        <WhatsAppGlyph className="h-5 w-5 shrink-0 text-whatsapp" />
      ) : (
        <ChevronRight
          className="h-5 w-5 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  const track = { "data-track": "needs_card_click", "data-need": need.id };

  return external ? (
    <a href={need.href} target="_blank" rel="noopener" className={className} {...track}>
      {content}
    </a>
  ) : (
    <Link href={need.href} className={className} {...track}>
      {content}
    </Link>
  );
}

/**
 * "What do you need?": routes each job type to its fastest action in one tap
 * (Simon Birch's triage card, with Origin's per-need actions). Rows are whole
 * links; GA4 gets needs_card_click via the data-track listener, plus the
 * usual whatsapp_click on the WhatsApp row.
 */
export function NeedsCard({ needs = homeNeeds() }: { needs?: Need[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-surface text-text shadow-[var(--shadow-lg)] lg:shadow-[var(--shadow-id)]">
      <h2 className="px-4 pb-3 pt-5 font-display text-h3 font-bold text-ink sm:px-6 sm:pt-6">
        What do you need?
      </h2>
      <ul className="border-t border-border-subtle">
        {needs.map((need) => (
          <li key={need.id} className="border-b border-border-subtle last:border-b-0">
            <NeedRow need={need} />
          </li>
        ))}
      </ul>
      <p className="border-t border-border-subtle bg-sunken/60 px-4 py-4 text-sm text-muted sm:px-6">
        Something else? Call{" "}
        <a
          href={SITE.phoneHref}
          className="font-semibold text-primary underline-offset-2 hover:text-primary-hover hover:underline"
        >
          {SITE.phoneDisplay}
        </a>
      </p>
    </div>
  );
}
