import Link from "next/link";
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
    <section className="section bg-surface" aria-labelledby="area-h">
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

        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle shadow-[var(--shadow-sm)]">
          <iframe
            title="Map showing JDH Gas Services' base in Burgess Hill and the Mid Sussex service area"
            src="https://maps.google.com/maps?q=Burgess%20Hill,%20West%20Sussex&z=12&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
