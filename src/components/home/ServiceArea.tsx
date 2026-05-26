import { MapPin, Users, BadgePoundSterling, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CoverageMap } from "@/components/home/CoverageMap";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

const POINTS = [
  { icon: MapPin, text: `Based in Burgess Hill (${SITE.postcodeArea})` },
  { icon: Users, text: "Homeowners & landlords" },
  { icon: BadgePoundSterling, text: "Free, no-obligation quotes" },
  { icon: Clock, text: "Quick to respond" },
];

function ReachBox() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-6">
      <h3 className="font-display text-lg font-semibold text-ink">Not sure if I reach you?</h3>
      <p className="mt-1.5 text-muted">
        Send me your postcode and I&apos;ll tell you if I cover you. No obligation.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
          <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
        </Button>
        <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp me</Button>
      </div>
    </div>
  );
}

export function ServiceArea() {
  return (
    <section className="section bg-surface" aria-labelledby="area-h">
      <Reveal className="container-page grid items-start gap-10 md:grid-cols-2 lg:items-center lg:gap-14">
        {/* Left — text (+ the box on desktop) */}
        <div>
          <p className="eyebrow">Service area</p>
          <h2 id="area-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Covering Burgess Hill &amp; Mid Sussex
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            I&apos;m based in Burgess Hill and cover the surrounding Mid Sussex towns and
            villages: Haywards Heath, Hassocks, Cuckfield, Ditchling, Lindfield, Wivelsfield,
            Keymer and the bits in between.
          </p>

          <ul className="mt-6 grid max-w-md gap-x-5 gap-y-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-2.5 text-sm font-medium text-text">
                <p.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {p.text}
              </li>
            ))}
          </ul>

          {/* desktop: box sits below the text in the left column */}
          <div className="mt-8 hidden lg:block">
            <ReachBox />
          </div>
        </div>

        {/* Right — map (+ the box on mobile/tablet) */}
        <div className="space-y-6">
          <div className="relative isolate z-0 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-3 shadow-[var(--shadow-sm)]">
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-surface/90 px-3 py-1.5 text-xs font-semibold shadow-[var(--shadow-sm)] backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              Based in Burgess Hill · {SITE.postcodeArea}
            </span>
            <div className="aspect-[420/380]">
              <CoverageMap />
            </div>
          </div>

          {/* mobile/tablet: box sits below the map in the right column */}
          <div className="lg:hidden">
            <ReachBox />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
