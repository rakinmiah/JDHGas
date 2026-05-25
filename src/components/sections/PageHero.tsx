import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SITE } from "@/lib/site";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="bg-sunken">
      <div className="container-page py-10 md:py-14">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
            <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
          </Button>
          <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
          <Button href="/contact" variant="secondary">Send an enquiry</Button>
        </div>
      </div>
    </section>
  );
}
