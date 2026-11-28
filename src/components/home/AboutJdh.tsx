import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, MapPin, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";
import { HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * Homepage "About JDH Gas" (explored 28 Nov 2026, /explore/about). Business
 * first: it introduces JDH Gas Services, not Jamie, and Jamie appears once,
 * in the photo the live site used (jamie-with-van.jpg), named in a small
 * caption for trust. Copy is the business-voice version of what the site
 * already says (About page, old Meet Jamie block, FAQ). Facts are only ones
 * already published: Gas Safe 977838, Vaillant approved partner, the live
 * Google rating, the makes we work on. No team, no years, no guarantees
 * (those claims are gated in site.ts).
 */

const H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";

const HEADING = "Gas and heating work, done properly.";
const BODY =
  "JDH Gas Services is a Gas Safe registered gas and heating business based in Burgess Hill, servicing, repairing and fitting boilers across Mid Sussex. We explain what we find in clear, everyday terms, treat your home with care, and give you a clear price before any work starts.";

const BODY_SHORT =
  "JDH Gas Services is a Gas Safe registered gas and heating business based in Burgess Hill, servicing, repairing and fitting boilers across Mid Sussex. We explain what we find in clear, everyday terms and treat your home with care.";

type Fact = { title: string; line: string; href?: string; external?: boolean };

async function facts(): Promise<Fact[]> {
  const { rating, count } = await getGoogleReviews();
  return [
    { title: "Gas Safe registered", line: `Registration ${SITE.gasSafe}. Check it on the register`, href: SITE.registerUrl, external: true },
    { title: "Vaillant approved partner", line: "Extra manufacturer training and backing on Vaillant boilers" },
    { title: `Rated ${rating} on Google`, line: `From ${count} customer reviews`, href: "/reviews" },
    { title: "Every major boiler make", line: "Worcester Bosch, Vaillant, Ideal, Baxi and Bosch" },
  ];
}

function FactBody({ f }: { f: Fact }) {
  const inner = (
    <>
      <span className="block font-display text-lg font-extrabold tracking-[-0.015em] text-navy">{f.title}</span>
      <span className="mt-0.5 block text-[15px] text-neutral">
        {f.line}
        {f.href &&
          (f.external ? (
            <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
          ) : (
            <ArrowRight className="ml-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
          ))}
      </span>
    </>
  );
  if (!f.href) return <div className="py-4">{inner}</div>;
  return (
    <a
      href={f.href}
      {...(f.external ? { target: "_blank", rel: "noopener" } : {})}
      className="group block py-4 [&>span:first-child]:group-hover:underline [&>span:first-child]:group-hover:underline-offset-4"
    >
      {inner}
      {f.external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

function Photo({ className, sizes }: { className: string; sizes: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-[6px] bg-grey ${className}`}>
      <Image
        src="/images/jamie-with-van.jpg"
        alt="Jamie Hannah, Gas Safe registered engineer, standing at the back of the JDH Gas Services van"
        fill
        sizes={sizes}
        className="object-cover object-[35%_55%]"
      />
    </figure>
  );
}

const moreLink = (
  <Link href="/about" className="inline-flex items-center gap-1.5 font-semibold text-navy underline underline-offset-4 hover:text-action-text">
    More about JDH Gas <ArrowRight className="h-4 w-4" aria-hidden />
  </Link>
);

/* A1: split. The photo on the left, the business on the right: heading, one
   paragraph, then four checkable facts in a ruled two-by-two grid. */
export async function AboutSplit() {
  const list = await facts();
  return (
    <section aria-labelledby="about-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <Photo className="aspect-[4/5] lg:aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 460px" />
        <div>
          <h2 id="about-h" className={H2}>
            {HEADING}
          </h2>
          <p className="mt-4 max-w-[58ch] text-neutral sm:text-lg">{BODY}</p>
          <ul className="mt-8 grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
            {list.map((f) => (
              <li key={f.title} className="border-b border-rule">
                <FactBody f={f} />
              </li>
            ))}
          </ul>
          <div className="mt-8">{moreLink}</div>
        </div>
      </div>
    </section>
  );
}

/* A2: heading row, then three columns. Like the services header: heading on
   the left, the link on the right; under it the photo, the paragraph, and the
   facts as a ruled list. */
export async function AboutColumns() {
  const list = await facts();
  return (
    <section aria-labelledby="about-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <h2 id="about-h" className={H2}>
            {HEADING}
          </h2>
          {moreLink}
        </div>
        <div className={`${HEAD_GAP} grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,4fr)] lg:gap-12`}>
          <Photo className="aspect-[4/5] md:row-span-2 lg:row-span-1" sizes="(max-width: 768px) 100vw, 370px" />
          <p className="text-neutral sm:text-lg lg:pt-1">{BODY}</p>
          <ul className="border-t border-rule">
            {list.map((f) => (
              <li key={f.title} className="border-b border-rule">
                <FactBody f={f} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- A3: the split, developed (28 Nov 2026) ----------
   Photo and the business side by side, then the credentials as a full-width
   base row, so the section ends on proof and leads into the reviews below.
   The photo is cropped wider to drop most of the studio ceiling and frame
   the person with the livery. Each credential carries its own mark: the
   Gas Safe stand-in shield (not the official logo), the Vaillant mark, the
   Google G with the live rating, and a pin for where we're based. */
function Mark({ kind }: { kind: "gas" | "vaillant" | "quote" | "local" }) {
  const box = "grid h-11 w-11 shrink-0 place-items-center rounded-[6px]";
  if (kind === "gas")
    return (
      <span aria-hidden className={`${box} bg-gas-safe/15`}>
        <ShieldCheck className="h-6 w-6 text-navy" />
      </span>
    );
  if (kind === "vaillant")
    return (
      <span aria-hidden className={`${box} bg-grey`}>
        <span
          className="block h-7 bg-navy"
          style={{
            aspectRatio: 35 / 48,
            maskImage: "url(/brands/vaillant.svg)",
            WebkitMaskImage: "url(/brands/vaillant.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </span>
    );
  if (kind === "quote")
    return (
      <span aria-hidden className={`${box} bg-grey`}>
        <FileText className="h-6 w-6 text-navy" />
      </span>
    );
  return (
    <span aria-hidden className={`${box} bg-grey`}>
      <MapPin className="h-6 w-6 text-navy" />
    </span>
  );
}

export async function AboutDeveloped() {
  // The Google rating isn't repeated here: the reviews section directly below
  // opens with it.
  const creds: { kind: "gas" | "vaillant" | "quote" | "local"; title: string; line: string; href?: string; external?: boolean }[] = [
    { kind: "gas", title: "Gas Safe registered", line: `Registration ${SITE.gasSafe}. Check it on the register`, href: SITE.registerUrl, external: true },
    { kind: "vaillant", title: "Vaillant approved partner", line: "Extra manufacturer training and backing" },
    { kind: "quote", title: "Clear prices", line: "A clear quote before any extra work" },
    { kind: "local", title: `Based in ${SITE.locality}`, line: "Covering Mid Sussex and down to the coast" },
  ];

  return (
    <section aria-labelledby="about-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <figure className="relative aspect-[5/4] overflow-hidden rounded-[6px] bg-grey">
            <Image
              src="/images/jamie-with-van.jpg"
              alt="A JDH Gas Services engineer standing at the back of the navy JDH Gas Services van"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-[40%_46%]"
            />
          </figure>
          <div>
            <h2 id="about-h" className={H2}>
              {HEADING}
            </h2>
            <p className="mt-5 text-neutral sm:text-lg">{BODY_SHORT}</p>
            <div className="mt-8">{moreLink}</div>
          </div>
        </div>

        <ul className={`${HEAD_GAP} grid border-t border-navy sm:grid-cols-2 lg:grid-cols-4`}>
          {creds.map((c, i) => {
            const body = (
              <>
                <Mark kind={c.kind} />
                <span className="min-w-0">
                  <span className="block font-display text-base font-extrabold tracking-[-0.015em] text-navy">{c.title}</span>
                  <span className="mt-0.5 block text-sm text-neutral">
                    {c.line}
                    {c.href &&
                      (c.external ? (
                        <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
                      ) : (
                        <ArrowRight className="ml-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
                      ))}
                  </span>
                </span>
              </>
            );
            const cls = "flex h-full items-start gap-4 py-6";
            return (
              <li
                key={c.kind}
                className={`border-b border-rule lg:border-b-0 lg:pr-6 ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}
              >
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                    className={`group ${cls} [&_span.font-display]:group-hover:underline [&_span.font-display]:group-hover:underline-offset-4`}
                  >
                    {body}
                    {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
