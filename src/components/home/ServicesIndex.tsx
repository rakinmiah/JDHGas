import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BOOK_HREF } from "@/lib/booking";
import { BrandMarks } from "@/components/home/LogoStrip";
import { H2_CLS, HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * Services, direction A: a service index (explored 27 Nov 2026). Numbered,
 * full-width ruled rows with the name set large and one specific sentence
 * each, taken from that service page's own introduction. No thumbnails and no
 * navy box; the only button is "Book online" on the one service that is
 * bookable. The boiler makes close the section instead of a separate band.
 */
const ROWS = [
  {
    name: "Boiler servicing",
    line: "An annual safety and efficiency check that catches small issues before they become breakdowns.",
    href: "/services/boiler-servicing",
    book: true,
  },
  {
    name: "Boiler repairs",
    line: "Boiler stopped, heating cold or no hot water? Send a photo and the fault code and we'll get you booked in.",
    href: "/services/boiler-repairs",
  },
  {
    name: "New boilers",
    line: "From a like-for-like swap to a full new system, with a clear, fixed quote before any work starts.",
    href: "/services/boiler-heating-installation",
  },
  {
    name: "Landlord certificates",
    tag: "CP12",
    line: "Every gas appliance, pipe and flue checked each year, with the certificate sent to you digitally.",
    href: "/services/gas-safety-certificate",
  },
  {
    name: "Strip-down service",
    line: "Every four to five years: the heat exchanger and burner cleaned, worn seals and electrodes replaced.",
    href: "/services/boiler-strip-down-service",
  },
  {
    name: "Gas hobs and cookers",
    line: "Fitted, old ones safely removed, and the connection tightness-tested. Already bought one? We can fit it.",
    href: "/services/gas-appliances",
  },
];

export function ServicesIndex() {
  return (
    <section aria-labelledby="services-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="services-h" className={H2_CLS}>
            What we do
          </h2>
          <Link href="/services" className="inline-flex items-center gap-1.5 font-semibold text-navy underline underline-offset-4 hover:text-action-text">
            All services <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ol className={`${HEAD_GAP} border-t border-navy`}>
          {ROWS.map((r, i) => (
            <li key={r.href} className="relative border-b border-rule">
              <div className="group grid gap-x-8 gap-y-2 py-6 transition-colors md:grid-cols-[3.5rem_minmax(0,5fr)_minmax(0,6fr)_9.5rem] md:items-center lg:py-7">
                <span className="font-display text-sm font-extrabold tabular-nums text-action-text">0{i + 1}</span>
                <Link
                  href={r.href}
                  className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-extrabold leading-tight tracking-[-0.025em] text-navy after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[6px]"
                >
                  {r.name}
                  {r.tag && <span className="ml-2 align-middle text-sm font-bold tracking-normal text-neutral">({r.tag})</span>}
                </Link>
                <p className="text-neutral md:pr-4">{r.line}</p>
                <span className="relative z-10 flex items-center gap-4 md:justify-end">
                  {r.book && (
                    <Link
                      href={BOOK_HREF}
                      className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-[4px] bg-action px-4 text-sm font-bold text-navy transition-colors hover:bg-action-hover"
                    >
                      Book online
                    </Link>
                  )}
                  <ArrowUpRight
                    className="hidden h-6 w-6 text-navy transition-[translate,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-action-text md:block"
                    aria-hidden
                  />
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-16">
          <p className="font-display text-lg font-extrabold tracking-[-0.015em] text-navy">
            Every major boiler make
          </p>
          <BrandMarks />
        </div>
      </div>
    </section>
  );
}
