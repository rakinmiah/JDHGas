import { Phone, ShieldCheck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HomeEnquiryForm } from "@/components/home/HomeEnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export function ContactSection({ town }: { town?: string } = {}) {
  return (
    <section id="enquiry" className="section bg-ink text-inverse" aria-labelledby="contact-h">
      <Reveal className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow !text-flame">Get a quote</p>
          <h2 id="contact-h" className="mt-2 font-display text-3xl font-bold text-inverse md:text-4xl">
            {town ? `Get a free quote in ${town}` : "Get a free quote for the job"}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-inverse/80">
            Send me a few details, and a photo of the boiler if you can. I&apos;ll get back to you
            quickly with a clear, no-obligation quote and honest advice.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
              <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
            </Button>
            <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
          </div>

          <ul className="mt-8 space-y-2.5 text-sm text-inverse/80">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-flame" aria-hidden />
              Gas Safe registered · {SITE.gasSafe}
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-flame" aria-hidden />
              {town ? `${town} & the surrounding area` : "Burgess Hill & Mid Sussex"}
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-flame" aria-hidden />
              {SITE.hours}
            </li>
          </ul>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-6 text-text shadow-[var(--shadow-lg)] md:p-8">
          <HomeEnquiryForm />
        </div>
      </Reveal>
    </section>
  );
}
