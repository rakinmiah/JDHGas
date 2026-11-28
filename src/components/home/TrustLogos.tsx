import { ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Pimlico's accreditation row under the hero. JDH's one registration (Gas
 * Safe, shown as text: the official mark needs the licensed pack), the
 * Vaillant partnership, then the boiler makes worked on.
 */
const MAKES = [
  { name: "Vaillant approved partner", src: "/brands/vaillant.svg", h: "h-10" },
  { name: "Worcester Bosch", src: "/brands/worcester.png", h: "h-7" },
  { name: "Ideal Heating", src: "/brands/ideal.svg", h: "h-8" },
  { name: "Baxi", src: "/brands/baxi.svg", h: "h-6" },
  { name: "Bosch", src: "/brands/bosch.svg", h: "h-6" },
];

export function TrustLogos() {
  return (
    <section aria-label="Registration and boiler makes" className="bg-surface">
      <div className="container-page">
        <ul className="grid grid-cols-3 items-center justify-items-center gap-x-6 gap-y-8 py-10 sm:grid-cols-6 lg:py-12">
          <li className="col-span-3 sm:col-span-1">
            <a
              href={SITE.registerUrl}
              target="_blank"
              rel="noopener"
              data-track="register_check_click"
              data-location="trust_logos"
              className="flex items-center gap-2.5 text-navy"
              aria-label={`Gas Safe registered, number ${SITE.gasSafe}. Check on the Gas Safe Register (opens in a new tab)`}
            >
              <ShieldCheck className="h-8 w-8 text-navy" aria-hidden />
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-sm font-bold">Gas Safe registered</span>
                <span className="block text-xs text-neutral">No. {SITE.gasSafe}</span>
              </span>
            </a>
          </li>
          {MAKES.map((m) => (
            <li key={m.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt={m.name}
                className={`${m.h} w-auto max-w-[120px] object-contain opacity-70 grayscale`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
