import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TOWNS, SITE } from "@/lib/site";

const LINKED: Record<string, string> = {
  "Burgess Hill": "/areas/burgess-hill",
  "Haywards Heath": "/areas/haywards-heath",
  Hassocks: "/areas/hassocks",
  Cuckfield: "/areas/cuckfield",
};

export function ServiceArea() {
  return (
    <section className="section bg-sunken" aria-labelledby="area-h">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[55%_45%]">
        <div>
          <p className="eyebrow">Service area</p>
          <h2 id="area-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Covering Burgess Hill &amp; Mid Sussex
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Based in Burgess Hill, I cover the surrounding Mid Sussex towns and villages —
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {TOWNS.map((t) =>
              LINKED[t] ? (
                <li key={t}>
                  <Link
                    href={LINKED[t]}
                    className="inline-block rounded-[var(--radius-pill)] border border-border-strong bg-surface px-3.5 py-1.5 text-sm font-medium hover:border-primary hover:text-primary"
                  >
                    {t}
                  </Link>
                </li>
              ) : (
                <li
                  key={t}
                  className="inline-block rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 py-1.5 text-sm font-medium text-muted"
                >
                  {t}
                </li>
              )
            )}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="text-muted">Not sure if I reach you? Just ask —</span>
            <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp me</Button>
          </div>
        </div>

        <div
          className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-[radial-gradient(circle_at_50%_40%,#e8eef7,#dde6f2)] shadow-[var(--shadow-sm)]"
          role="img"
          aria-label="Map of the JDH Gas service area across Mid Sussex"
        >
          <div className="flex flex-col items-center text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-[var(--shadow-md)]">
              <MapPin className="h-7 w-7" aria-hidden />
            </span>
            <span className="mt-3 font-display text-xl font-bold text-ink">Burgess Hill</span>
            <span className="text-sm text-muted">&amp; surrounding Mid Sussex</span>
          </div>
        </div>
      </div>
    </section>
  );
}
