import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-ink text-inverse" aria-labelledby="cta-h">
      <div className="container-page py-16 text-center md:py-20">
        <h2 id="cta-h" className="font-display text-3xl font-bold text-inverse md:text-4xl">
          Ready to book? I&apos;d be glad to help.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-inverse/80">
          Call or message me for a boiler service, a repair or a gas safety certificate — and
          I&apos;ll get back to you quickly.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
            <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
          </Button>
          <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
        </div>
        <p className="mt-4 text-sm text-inverse/70">Monday–Friday · Burgess Hill &amp; Mid Sussex</p>
      </div>
    </section>
  );
}
