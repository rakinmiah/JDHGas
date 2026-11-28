import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BOOK_HREF } from "@/lib/booking";
import { BrandMarks } from "@/components/home/LogoStrip";
import { H2_CLS, HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * Services, direction B: two tiers (explored 27 Nov 2026). The three jobs
 * most people come for as three tall photo columns, each with its own way in;
 * the other three as one plain ruled row of text links underneath. No card
 * boxes: photo, then type on the white page. Sentences come from each service
 * page's own introduction. The boiler makes close the section.
 */
const MAIN = [
  {
    name: "Boiler servicing",
    line: "An annual safety and efficiency check that catches small issues before they become breakdowns.",
    href: "/services/boiler-servicing",
    action: { label: "Book online", href: BOOK_HREF },
    img: { src: "/images/work/boiler-inspection-torch.jpg", pos: "60% 45%", alt: "Inspecting an opened boiler by torchlight" },
  },
  {
    name: "Boiler repairs",
    line: "Boiler stopped, heating cold or no hot water? Send a photo and the fault code and we'll get you booked in.",
    href: "/services/boiler-repairs",
    action: { label: "Repairs and fault codes", href: "/services/boiler-repairs" },
    img: { src: "/images/work/bosch-rafters-service.jpg", pos: "60% 40%", alt: "Working on an opened boiler in an airing cupboard" },
  },
  {
    name: "New boilers",
    line: "From a like-for-like swap to a full new system, with a clear, fixed quote before any work starts.",
    href: "/services/boiler-heating-installation",
    action: { label: "Get a fixed quote", href: "/services/boiler-heating-installation" },
    img: { src: "/images/home/vaillant-living-room.jpg", pos: "62% 45%", alt: "A wall-hung Vaillant boiler in a living room" },
  },
];

const MORE = [
  { name: "Landlord certificates (CP12)", line: "Checked each year, certificate sent digitally.", href: "/services/gas-safety-certificate" },
  { name: "Strip-down service", line: "A deeper clean every four to five years.", href: "/services/boiler-strip-down-service" },
  { name: "Gas hobs and cookers", line: "Fitted and tightness-tested.", href: "/services/gas-appliances" },
];

export function ServicesTiers() {
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

        <ul className={`${HEAD_GAP} grid gap-10 md:grid-cols-3 md:gap-8`}>
          {MAIN.map((s) => (
            <li key={s.href} className="group relative flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-grey md:aspect-[4/5]">
                <Image
                  src={s.img.src}
                  alt={s.img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 370px"
                  className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                  style={{ objectPosition: s.img.pos }}
                />
              </div>
              <h3 className="mt-6 font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em] text-navy">
                <Link href={s.href} className="after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[6px]">
                  {s.name}
                </Link>
              </h3>
              <p className="mt-2 text-neutral">{s.line}</p>
              <Link
                href={s.action.href}
                className="relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 font-semibold text-navy underline decoration-action decoration-2 underline-offset-[6px] hover:text-action-text"
              >
                {s.action.label} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-14 grid border-t border-navy md:grid-cols-3 lg:mt-16">
          {MORE.map((m) => (
            <li key={m.href} className="border-b border-rule md:border-b-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8">
              <Link href={m.href} className="group flex items-start justify-between gap-4 py-5 md:pr-8">
                <span>
                  <span className="block font-display text-lg font-extrabold tracking-[-0.015em] text-navy group-hover:underline group-hover:underline-offset-4">
                    {m.name}
                  </span>
                  <span className="text-sm text-neutral">{m.line}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-navy transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-action-text" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-16">
          <p className="font-display text-lg font-extrabold tracking-[-0.015em] text-navy">Every major boiler make</p>
          <BrandMarks />
        </div>
      </div>
    </section>
  );
}
