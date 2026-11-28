import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { CoverageMap } from "@/components/home/CoverageMap";
import { Reveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { PostcodeChecker } from "@/components/sections/PostcodeChecker";
import { LOCAL_TOWNS } from "@/lib/local-pages";
import { SITE } from "@/lib/site";

/**
 * M7: towns, map and the postcode checker. One DOM order (intro → map →
 * checker) gives the phone order; on desktop the map moves to the right
 * column and spans both rows.
 */
export function ServiceArea() {
  const checkerTowns = LOCAL_TOWNS.map((t) => ({ name: t.name, slug: t.slug, postcode: t.postcode }));

  return (
    <section className="section bg-surface" aria-labelledby="area-h">
      <div className="container-page grid gap-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8">
        <Reveal staticBelowLg className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow">Areas</p>
          <h2 id="area-h" className="mt-2 font-display text-h2 font-bold">
            Covering Burgess Hill, Mid Sussex <Accent>and the coast.</Accent>
          </h2>
          <p className="mt-4 max-w-xl text-lead text-muted">
            We&apos;re based in Burgess Hill. Pick your town for local details and reviews.
          </p>
          <nav aria-label="Town pages">
            <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
              {LOCAL_TOWNS.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="group inline-flex min-h-[40px] items-center gap-1 rounded-[var(--radius-pill)] border border-border-subtle bg-surface px-3.5 text-sm font-medium transition-colors duration-150 hover:border-primary hover:text-primary active:bg-sunken"
                  >
                    {t.name}
                    <ArrowRight
                      className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal staticBelowLg className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="relative isolate z-0 overflow-hidden rounded-xl border border-border-subtle bg-sunken p-3">
            <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-[var(--shadow-sm)] backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              {`Based in ${SITE.locality} · ${SITE.postcodeArea}`}
            </span>
            <div
              className="aspect-[420/380] overflow-hidden rounded-[var(--radius-lg)]"
              role="region"
              aria-label="Map of the towns JDH Gas covers around Burgess Hill"
            >
              <CoverageMap />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-start-1 lg:row-start-2">
          <p className="font-semibold text-ink">Not sure we cover you?</p>
          <div className="mt-3">
            <PostcodeChecker towns={checkerTowns} />
          </div>
          <Link
            href="/areas"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-2 hover:text-primary-hover hover:underline"
          >
            See all the areas we cover <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
