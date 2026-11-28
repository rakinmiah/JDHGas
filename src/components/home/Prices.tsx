import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { SITE, WHATSAPP_REPAIR_HREF } from "@/lib/site";

type Row = {
  service: string;
  figure: string;
  line: string;
  action: { label: string; href: string; whatsapp?: boolean };
};

const actionCls =
  "inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-primary underline-offset-2 hover:text-primary-hover hover:underline";

function Action({ action }: { action: Row["action"] }) {
  const content = (
    <>
      {action.whatsapp && <WhatsAppGlyph className="h-4 w-4 text-whatsapp" />}
      {action.label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </>
  );
  // Native <a> for tel:, wa.me and #hash links (HANDOVER §2: next/link
  // mishandles same-page anchors).
  if (/^(https?:|tel:|#)/.test(action.href)) {
    const external = action.href.startsWith("http");
    return (
      <a
        href={action.href}
        className={actionCls}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={action.href} className={actionCls}>
      {content}
    </Link>
  );
}

/**
 * M8: a price list, not a plan table. "From" prices for the two fixed-scope
 * services come only from SITE.prices (null until Jamie confirms, then the
 * row reads "Ask for a price" and the heading switches to "How our prices
 * work"); everything else states the honest rule: quoted before any work.
 */
export function Prices() {
  const { servicingFrom, cp12From } = SITE.prices;
  const priced = servicingFrom != null && cp12From != null;

  const rows: Row[] = [
    {
      service: "Boiler service",
      figure: servicingFrom != null ? `From £${servicingFrom}` : "Ask for a price",
      line: "Annual service, booked online or by phone.",
      action: { label: "Book online", href: "/book" },
    },
    {
      service: "Landlord gas safety certificate",
      figure: cp12From != null ? `From £${cp12From}` : "Ask for a price",
      line: "One property or a whole portfolio.",
      action: { label: "Call about a CP12", href: SITE.phoneHref },
    },
    {
      service: "Repairs",
      figure: "Quoted first",
      line: "We find the fault and quote before any work.",
      action: { label: "WhatsApp a photo", href: WHATSAPP_REPAIR_HREF, whatsapp: true },
    },
    {
      service: "New boilers",
      figure: "Fixed quote",
      line: "Every installation gets a clear fixed quote.",
      action: { label: "Get a quote", href: "#enquiry" },
    },
  ];

  return (
    <section className="section bg-sunken" aria-labelledby="prices-h">
      <div className="container-page grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal staticBelowLg>
          <p className="eyebrow">Prices</p>
          <h2 id="prices-h" className="mt-2 font-display text-h2 font-bold">
            {priced ? (
              <>
                Clear prices, <Accent>before any work starts.</Accent>
              </>
            ) : (
              <>
                How our prices <Accent>work.</Accent>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-md text-lead text-muted">
            {priced
              ? "Servicing and landlord certificates have a starting price. Repairs and new boilers are quoted once we know what's needed, and you agree the price before we begin."
              : "Every job is priced before any work starts. Tell us what you need and we'll give you a clear price, and you agree it before we begin."}
          </p>
          {SITE.claims.noServicePlan && (
            <p className="mt-4 font-semibold text-ink">No contract or plan: you book once a year.</p>
          )}
        </Reveal>

        <Reveal staticBelowLg delay={0.06}>
          <dl className="border-t border-border-strong">
            {rows.map((r) => (
              <div
                key={r.service}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-border-strong py-5 md:grid-cols-[minmax(0,1fr)_12.5rem_10.5rem] md:items-center md:gap-x-6"
              >
                <dt className="font-display text-h3 font-semibold text-ink">{r.service}</dt>
                <dd className="whitespace-nowrap text-right font-display text-[1.25rem] font-bold tabular-nums text-ink md:text-[1.5rem]">
                  {r.figure}
                </dd>
                <dd className="col-span-2 text-sm text-muted md:col-span-1 md:col-start-1 md:row-start-2">
                  {r.line}
                </dd>
                <dd className="col-span-2 mt-2 md:col-span-1 md:col-start-3 md:row-span-2 md:row-start-1 md:mt-0 md:text-right">
                  <Action action={r.action} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
