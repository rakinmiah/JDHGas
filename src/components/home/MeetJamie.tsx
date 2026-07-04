import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Clock, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  { icon: ShieldCheck, text: "Gas Safe registered · 977838" },
  { icon: MessageCircle, text: "Honest advice" },
  { icon: Clock, text: "On time, no rushing off" },
  { icon: Sparkles, text: "Clean, tidy work" },
];

export function MeetJamie() {
  return (
    <section className="section bg-sunken" aria-label="Meet Jamie">
      <div className="container-page grid items-center gap-10 md:grid-cols-[46fr_54fr] md:gap-12 lg:gap-16">
        <div>
          {/* heading above the image on mobile/tablet — single <h2> lives in the
              text column below; this visual duplicate is a non-heading so the
              document outline keeps exactly one "Meet Jamie" heading */}
          <div className="md:hidden" aria-hidden>
            <p className="eyebrow">Meet your engineer</p>
            <p className="mt-2 font-display text-3xl font-bold">Meet Jamie</p>
          </div>
          <Reveal className="relative mx-auto mt-5 w-full max-w-sm md:mx-0 md:mt-0 md:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] md:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src="/images/jamie-portrait.jpg"
                alt="Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services"
                fill
                sizes="(max-width: 768px) 90vw, 46vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
            {/* On-the-job inset — real work, Gas Safe patch on show */}
            <div className="absolute -bottom-6 -right-3 w-[44%] overflow-hidden rounded-[var(--radius-lg)] border-4 border-sunken shadow-[var(--shadow-lg)] sm:-right-5">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/work/bosch-rafters-service.jpg"
                  alt="Jamie servicing a Bosch boiler tucked under the rafters"
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {/* heading sits in the text column on desktop */}
          <p className="eyebrow hidden md:block">Meet your engineer</p>
          <h2 className="mt-3 hidden font-display text-3xl font-bold md:block md:text-4xl">
            Meet Jamie
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted md:mt-5">
            I started JDH Gas Services to do the job properly, the way I&apos;d want it done in
            my own home. I&apos;m Gas Safe registered, and I&apos;ll always explain what needs
            doing in clear, everyday terms and treat your home like it&apos;s my own.
          </p>

          <blockquote className="mt-6 border-l-2 border-primary pl-4">
            <p className="font-display text-xl font-bold text-primary md:text-2xl">
              &ldquo;Prevention over cure.&rdquo;
            </p>
            <footer className="mt-1 text-sm text-muted">— Jamie Hannah</footer>
          </blockquote>

          <ul className="mt-7 grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-2.5 text-sm font-medium text-text">
                <p.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {p.text}
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            More about me <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
