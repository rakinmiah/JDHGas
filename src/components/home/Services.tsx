import { SECTION_Y } from "@/components/home/rhythm";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BOOK_HREF } from "@/lib/booking";

/**
 * Homepage services (direction A from website-plan/rebrand/homepage-draft,
 * services-directions.png). The one service people can book online leads as
 * a big navy card; the other five are a short ruled list with a thumbnail
 * and one line each. Fuller copy lives on each service page
 * (lib/services-content.ts).
 *
 * Servicing, repairs, strip-down and hob photos: JDH's own jobs. New boilers:
 * Vaillant's product photography from JDH's social posts (confirm Vaillant's
 * installer terms allow it before going live).
 */
type Img = { src: string; pos?: string; contain?: boolean };
type Svc = { title: string; line: string; href: string; img: Img | null };

const LEAD = {
  title: "Boiler servicing",
  line: "Annual safety and efficiency check, bookable online.",
  href: "/services/boiler-servicing",
  img: { src: "/images/work/boiler-inspection-torch.jpg", pos: "60% 45%" },
};

const REST: Svc[] = [
  {
    title: "Boiler repairs",
    line: "No heat, lost pressure, fault codes or odd noises.",
    href: "/services/boiler-repairs",
    img: { src: "/images/work/bosch-rafters-service.jpg", pos: "60% 40%" },
  },
  {
    title: "New boilers",
    line: "Like-for-like swaps or a full new system, fixed quote.",
    href: "/services/boiler-heating-installation",
    img: { src: "/images/home/vaillant-living-room.jpg", pos: "62% 45%" },
  },
  {
    title: "Landlord certificates (CP12)",
    line: "Annual gas safety checks, certificate sent digitally.",
    href: "/services/gas-safety-certificate",
    img: null,
  },
  {
    title: "Strip-down service",
    line: "A deeper clean and new seals, for older boilers.",
    href: "/services/boiler-strip-down-service",
    img: { src: "/images/work/strip-down-service.jpg", pos: "50% 40%" },
  },
  {
    title: "Gas hobs and cookers",
    line: "Fitted, connected and tightness-tested.",
    href: "/services/gas-appliances",
    img: { src: "/images/home/hob-job.jpg", pos: "30% 45%" },
  },
];

/** Square list thumbnail: the photo, or the CP12 graphic. Decorative (the
 *  row's title says what it is). */
function Thumb({ img }: { img: Img | null }) {
  return (
    <span
      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-[4px] lg:h-[4.5rem] lg:w-[4.5rem] ${
        img?.contain ? "bg-white outline-1 -outline-offset-1 outline-rule" : img ? "bg-grey" : "bg-navy"
      }`}
    >
      {img ? (
        <Image
          src={img.src}
          alt=""
          fill
          sizes="72px"
          className={img.contain ? "object-contain p-2" : "object-cover"}
          style={img.pos ? { objectPosition: img.pos } : undefined}
        />
      ) : (
        // No photo shows a certificate (media-inventory.md), so CP12 gets a
        // flat graphic: a record sheet with a tick, in brand colours. A
        // graphic, not a facsimile of a real gas safety record.
        <svg aria-hidden viewBox="0 0 72 72" className="absolute inset-0 h-full w-full">
          <rect x="20" y="13" width="30" height="40" rx="2" fill="#fff" />
          <rect x="25" y="20" width="14" height="3" rx="1.5" fill="#0f1f4b" />
          <rect x="25" y="28" width="20" height="2" rx="1" fill="#d6dae0" />
          <rect x="25" y="33" width="20" height="2" rx="1" fill="#d6dae0" />
          <rect x="25" y="38" width="13" height="2" rx="1" fill="#d6dae0" />
          <circle cx="48" cy="50" r="10" fill="#ff6b1a" />
          <path d="M43.5 50.2l3 3 6-6.2" fill="none" stroke="#0f1f4b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

type Layout = "side" | "top" | "flip";
type Tone = "navy" | "grey" | "white";

/**
 * `layout`, `lead` and `band` exist for the hero-to-services flow test
 * (/explore/flow); the homepage uses the defaults. Remove the unused ones
 * once a direction is picked.
 * - side: heading top-right beside the lead card (current)
 * - top:  a full-width heading row, then lead card left and list right
 * - flip: heading and list on the left, lead card on the right
 */
export function Services({
  layout = "side",
  lead = "navy",
  band = "white",
}: { layout?: Layout; lead?: Tone; band?: "white" | "grey" } = {}) {
  const dark = lead === "navy";
  const leadBg = dark ? "bg-navy" : lead === "grey" ? "bg-grey" : "bg-white outline-1 -outline-offset-1 outline-rule";
  const sectionBg = band === "grey" ? `bg-sunken ${SECTION_Y}` : "bg-surface pb-12 pt-4 lg:pb-16 lg:pt-6";

  const heading = (
    <h2
      id="services-h"
      className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy"
    >
      Gas and heating services
    </h2>
  );

  const allLink = (
    <Link
      href="/services"
      className="inline-flex items-center gap-2 self-start text-sm font-semibold text-navy underline underline-offset-4"
    >
      All services <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );

  const leadCard = (pos: string) => (
    // Hover: the card lifts and the photo eases in (motion-safe only).
    <div
      className={`group/lead overflow-hidden rounded-[8px] ${leadBg} transition-[translate,box-shadow] duration-200 ease-out hover:shadow-[0_18px_36px_-16px_rgba(15,31,75,0.45)] motion-safe:hover:-translate-y-1 ${pos}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={LEAD.img.src}
          alt="Inspecting an opened boiler by torchlight, with the JDH Gas Services mat below"
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover/lead:scale-[1.03]"
          style={{ objectPosition: LEAD.img.pos }}
        />
      </div>
      <div className="p-6 sm:p-8">
        <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-action" : "text-neutral"}`}>Bookable online</p>
        <h3
          className={`mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.75rem] ${dark ? "text-white" : "text-navy"}`}
        >
          {LEAD.title}
        </h3>
        <p className={`mt-2 text-[15px] ${dark ? "text-navy-muted" : "text-neutral"}`}>{LEAD.line}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={BOOK_HREF}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-action px-5 font-semibold text-navy transition-colors hover:bg-action-hover"
          >
            Book a service online <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={LEAD.href}
            className={`text-sm font-semibold underline underline-offset-4 ${dark ? "text-white hover:text-navy-muted" : "text-navy hover:text-neutral"}`}
          >
            What a service covers
          </Link>
        </div>
      </div>
    </div>
  );

  const list = (pos: string, withAll: boolean, topRule = true) => (
    <div className={`flex flex-col ${pos}`}>
      {/* Desktop: the rows share the lead card's height, so both columns end
          together. */}
      <ul className={`${topRule ? "border-t border-rule" : ""} lg:flex lg:flex-1 lg:flex-col`}>
        {REST.map((s) => (
          <li key={s.href} className="border-b border-rule lg:flex lg:flex-1">
            {/* Hover and keyboard focus: the row lifts off the grey band as a
                white card, and the arrow turns orange and nudges right. */}
            <Link
              href={s.href}
              className="group -mx-3 flex items-center gap-4 rounded-[6px] px-3 py-4 transition-[background-color,translate,box-shadow] duration-200 ease-out hover:bg-white hover:shadow-[0_10px_24px_-14px_rgba(15,31,75,0.4)] focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-navy motion-safe:hover:-translate-y-0.5 lg:flex-1 lg:gap-5"
            >
              <Thumb img={s.img} />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">{s.title}</span>
                <span className="mt-0.5 block text-sm text-neutral">{s.line}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-navy transition-[translate,color] duration-200 group-hover:translate-x-1 group-hover:text-action-text" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
      {withAll && <div className="mt-5 flex">{allLink}</div>}
    </div>
  );

  if (layout === "top") {
    return (
      <section aria-labelledby="services-h" className={sectionBg}>
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5 lg:pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">What we do</p>
              <div className="mt-2">{heading}</div>
            </div>
            {allLink}
          </div>
          <div className="mt-5 grid gap-y-6 lg:mt-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-14">
            {leadCard("")}
            {list("mt-2 lg:mt-0", false, false)}
          </div>
        </div>
      </section>
    );
  }

  if (layout === "flip") {
    return (
      <section aria-labelledby="services-h" className={sectionBg}>
        <div className="container-page grid gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14">
          <div className="lg:col-start-1 lg:row-start-1">{heading}</div>
          {leadCard("lg:col-start-2 lg:row-span-2 lg:row-start-1")}
          {list("mt-4 lg:col-start-1 lg:row-start-2 lg:mt-0", true)}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="services-h" className={sectionBg}>
      {/* Phones: heading, lead card, list. Desktop: lead card on the left
          spanning both rows; heading then list on the right. */}
      <div className="container-page grid gap-y-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14">
        <div className="lg:col-start-2 lg:row-start-1">{heading}</div>
        {leadCard("lg:col-start-1 lg:row-span-2 lg:row-start-1")}
        {list("mt-4 lg:col-start-2 lg:row-start-2 lg:mt-0", true)}
      </div>
    </section>
  );
}
