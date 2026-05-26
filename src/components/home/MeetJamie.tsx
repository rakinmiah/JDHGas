import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Clock, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  { icon: ShieldCheck, text: "Gas Safe registered · 977838" },
  { icon: MessageCircle, text: "Honest, plain-English advice" },
  { icon: Clock, text: "On time, no rushing off" },
  { icon: Sparkles, text: "Clean, tidy work" },
];

export function MeetJamie() {
  return (
    <section className="section bg-sunken" aria-labelledby="jamie-h">
      <div className="container-page grid items-center gap-10 md:grid-cols-[46%_54%] md:gap-12 lg:gap-16">
        <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] md:mx-0 md:max-w-none">
          <Image
            src="/images/jamie-portrait.jpg"
            alt="Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services"
            fill
            sizes="(max-width: 768px) 90vw, 46vw"
            className="object-cover object-[50%_25%]"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Meet your engineer</p>
          <h2 id="jamie-h" className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Meet Jamie
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            I started JDH Gas Services to do gas work the way I&apos;d want it done in my own
            home — carefully, honestly, and explained in plain English. I&apos;m Gas Safe
            registered and I treat every boiler, and every home, like it matters.
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
