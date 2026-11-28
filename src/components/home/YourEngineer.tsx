import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Clock, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { EngineerCard } from "@/components/home/EngineerCard";
import { SITE, WHATSAPP_PHOTO_HREF } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

/**
 * M4, the signature: proves who is coming before the door opens. A working
 * photo of Jamie (the JDH mat in frame reads "Gas Safe 977838") with the
 * engineer card overlapping its top-right corner on desktop and its bottom
 * edge on phones. The page's one mid-page navy section.
 *
 * One DOM order (heading → photo + card → text) serves both layouts: on
 * desktop a 12-column grid moves the heading to the right of the photo.
 */
export async function YourEngineer() {
  const { rating, count } = await getGoogleReviews();

  const facts = [
    { icon: BadgeCheck, text: "Vaillant approved partner" },
    { icon: MapPin, text: `Based in ${SITE.locality}, covering Mid Sussex` },
    { icon: Clock, text: "Works Monday to Friday" },
    ...(SITE.tradingSince ? [{ icon: Clock, text: `Trading since ${SITE.tradingSince}` }] : []),
  ];

  return (
    <section
      className="section tone-ink relative isolate overflow-hidden bg-ink text-inverse"
      aria-labelledby="engineer-h"
    >
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-6">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end lg:pl-10">
          <p className="eyebrow text-flame!">Your engineer</p>
          <h2 id="engineer-h" className="mt-2 font-display text-h2 font-bold text-inverse">
            You&apos;ll know exactly <Accent>who&apos;s coming.</Accent>
          </h2>
        </div>

        {/* Photo with the card layered over it. object-position 100% crops the
            top edge, where a customer's wall print sits (media-inventory.md B8). */}
        <div className="relative lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:pt-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-ink-soft">
            <Image
              src="/images/work/boiler-panel-work.jpg"
              alt="Jamie Hannah working on the control panel of an opened Worcester boiler, with the JDH Gas mat showing Gas Safe registration 977838"
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover object-[38%_100%]"
            />
          </div>
          <div className="relative z-(--z-raised) mx-4 -mt-16 sm:mx-auto sm:max-w-[440px] lg:absolute lg:-right-16 lg:top-0 lg:mx-0 lg:mt-0 lg:w-[400px] lg:max-w-none">
            <EngineerCard rating={rating} count={count} />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:pl-10">
          <p className="max-w-xl text-lead text-inverse/80">
            JDH Gas Services is built around one Gas Safe registered engineer, {SITE.engineer}. The
            person who quotes your job is the person who does it, from an annual service to a new
            boiler.
          </p>

          <ul className="mt-6 space-y-3">
            {facts.map((f) => (
              <li key={f.text} className="flex items-center gap-3 text-inverse/90">
                <f.icon className="h-5 w-5 shrink-0 text-steel" aria-hidden />
                {f.text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button href={WHATSAPP_PHOTO_HREF} variant="ghostInverse" className="min-h-[48px]">
              <WhatsAppGlyph className="h-5 w-5" /> WhatsApp Jamie a photo
            </Button>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-semibold text-flame underline-offset-2 hover:underline"
            >
              Read Jamie&apos;s story <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-8 flex gap-3 border-t border-white/15 pt-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-flame" aria-hidden />
            <p className="text-sm leading-relaxed text-inverse/80">
              Check any gas engineer before work starts. Every registered engineer carries a Gas
              Safe ID card with a licence number you can look up.{" "}
              <a
                href={SITE.hseCheckUrl}
                target="_blank"
                rel="noopener"
                aria-label="How to check an engineer, on the HSE website (opens in a new tab)"
                className="inline-flex items-center gap-0.5 font-semibold text-inverse underline underline-offset-2 hover:text-flame"
              >
                How to check an engineer (HSE)
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
