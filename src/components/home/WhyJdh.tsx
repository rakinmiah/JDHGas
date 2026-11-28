import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Star,
  UserCheck,
  BadgePoundSterling,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

/**
 * The business case: credentials and working standards, with the branded van
 * as the image. Replaces the old "Meet Jamie" portrait section; Jamie keeps
 * one line here (same engineer every visit) and his full story on /about.
 * Every claim must stay true for a sole trader: no team or headcount claims.
 */
export async function WhyJdh() {
  const { rating, count } = await getGoogleReviews();
  const POINTS = [
    {
      icon: ShieldCheck,
      title: "Gas Safe registered",
      text: `Registration ${SITE.gasSafe}. You can check it on the Gas Safe Register.`,
    },
    {
      icon: BadgeCheck,
      title: "Vaillant approved partner",
      text: "Trained on the current Vaillant range, and we work on all the major makes.",
    },
    {
      icon: Star,
      title: `Rated ${rating} on Google`,
      text: `From ${count} reviews by customers across Mid Sussex.`,
    },
    {
      icon: UserCheck,
      title: "The same engineer every visit",
      text: "Your engineer is Jamie Hannah, so you never have to explain the job twice.",
    },
    {
      icon: BadgePoundSterling,
      title: "Clear quotes up front",
      text: "You know the price before any work starts. No surprises on the day.",
    },
    {
      icon: Sparkles,
      title: "Clean, tidy work",
      text: "A protective mat goes down, and your home is left the way we found it.",
    },
  ];

  return (
    <section className="section bg-sunken" aria-labelledby="why-h">
      <Reveal className="container-page grid items-start gap-10 md:grid-cols-[44fr_56fr] md:gap-12 lg:items-center lg:gap-16">
        <div className="order-2 md:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] ring-1 ring-border-subtle md:aspect-square">
            <Image
              src="/images/jdh-van.jpg"
              alt="The JDH Gas Services van, with the phone number, email and website on the side"
              fill
              sizes="(max-width: 768px) 92vw, 44vw"
              className="object-cover object-[50%_70%] md:object-[50%_85%]"
            />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <p className="eyebrow">Why JDH Gas</p>
          <h2 id="why-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Why homeowners and landlords choose us
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            We&apos;re a Gas Safe registered gas and heating business based in Burgess Hill. Every
            job gets the same careful approach, from an annual service to a new boiler.
          </p>

          <ul className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-surface text-primary shadow-[var(--shadow-sm)]">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            More about JDH Gas <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
