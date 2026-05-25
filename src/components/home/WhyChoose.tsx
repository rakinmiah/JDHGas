import { ShieldCheck, Clock, BadgePoundSterling } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Thorough & Gas Safe",
    blurb: "Every job done by the book, by a Gas Safe registered engineer who takes his time.",
  },
  {
    icon: Clock,
    title: "On time & tidy",
    blurb: "I turn up when I say I will and leave your home exactly as I found it.",
  },
  {
    icon: BadgePoundSterling,
    title: "Honest pricing",
    blurb: "Clear prices, no call-out surprises — and I'll tell you straight if something can wait.",
  },
];

export function WhyChoose() {
  return (
    <section className="section bg-surface" aria-labelledby="why-h">
      <div className="container-page">
        <p className="eyebrow">Why JDH</p>
        <h2 id="why-h" className="mt-2 font-display text-3xl font-bold md:text-4xl">
          Why people choose JDH Gas
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-7 shadow-[var(--shadow-sm)]">
                <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-ink text-flame">
                  <v.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.blurb}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
