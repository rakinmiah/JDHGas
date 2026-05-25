import Link from "next/link";
import { ShieldCheck, Star, MapPin, Wrench } from "lucide-react";
import { SITE } from "@/lib/site";

const items = [
  { icon: ShieldCheck, label: `Gas Safe registered · ${SITE.gasSafe}` },
  { icon: Star, label: "5.0 ★ from 24 Google reviews", href: "/reviews" },
  { icon: MapPin, label: "Covering Burgess Hill & Mid Sussex" },
  { icon: Wrench, label: "All makes of boiler serviced" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border-subtle bg-surface" aria-label="Why trust JDH Gas">
      <ul className="container-page grid grid-cols-2 gap-x-6 gap-y-4 py-5 text-sm font-medium md:flex md:items-center md:justify-between md:py-4">
        {items.map(({ icon: Icon, label, href }) => {
          const inner = (
            <span className="flex items-center gap-2 text-text">
              <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              {label.includes("5.0") ? (
                <span><span className="sr-only">Rated </span>{label}</span>
              ) : (
                label
              )}
            </span>
          );
          return (
            <li key={label}>
              {href ? (
                <Link href={href} className="hover:text-primary">{inner}</Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
