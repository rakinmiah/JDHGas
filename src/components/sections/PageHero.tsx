import { Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SITE } from "@/lib/site";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
}) {
  const copy = (
    <div>
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow mt-6">{eyebrow}</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">
        {title}
      </h1>
      {image && (
        <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] ring-1 ring-border-subtle md:hidden">
          <Image src={image} alt={imageAlt ?? ""} fill priority sizes="92vw" className="object-cover" />
        </div>
      )}
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button href={SITE.phoneHref} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
          <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phoneDisplay}
        </Button>
        <Button href={SITE.whatsappHref} variant="whatsapp">WhatsApp</Button>
        <Button href="/contact" variant="secondary">Send an enquiry</Button>
      </div>
    </div>
  );

  return (
    <section className="border-b border-border-subtle bg-sunken">
      {image ? (
        <div className="container-page grid items-stretch gap-10 py-10 md:grid-cols-2 md:py-14 lg:gap-14">
          {copy}
          <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] ring-1 ring-border-subtle md:block md:aspect-auto md:min-h-[22rem]">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="container-page py-10 md:py-14">{copy}</div>
      )}
    </section>
  );
}
