import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function MeetJamie() {
  return (
    <section className="section bg-sunken" aria-labelledby="jamie-h">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-ink text-inverse">
          <div className="grid items-center gap-8 p-6 md:grid-cols-[42%_58%] md:p-10 lg:p-12">
            <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] md:max-w-none">
              <Image
                src="/images/jamie-portrait.jpg"
                alt="Jamie Hannah, the Gas Safe registered engineer behind JDH Gas Services"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover object-[45%_40%]"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow !text-flame">Meet your engineer</p>
              <h2 id="jamie-h" className="mt-3 font-display text-3xl font-bold text-inverse md:text-4xl">
                Meet Jamie
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-inverse/85">
                I started JDH Gas Services to do gas work the way I&apos;d want it done in my own
                home — carefully, honestly, and explained in plain English. I&apos;m Gas Safe
                registered and I treat every boiler, and every home, like it matters. No rushing
                to the next job.
              </p>
              <p className="mt-7 font-display text-2xl font-bold text-flame md:text-3xl">
                &ldquo;Prevention over cure.&rdquo;
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/10 px-3.5 py-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4 text-flame" aria-hidden /> Gas Safe Registered · 977838
                </span>
                <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-inverse hover:text-flame">
                  More about me <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
