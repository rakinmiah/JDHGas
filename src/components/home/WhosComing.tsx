import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { SECTION_Y } from "@/components/home/rhythm";

/**
 * "What to look for when we arrive" (draft 2, 28 Nov 2026,
 * /explore/whos-coming). The first draft read as AI (icon-in-a-square
 * feature rows, a generic split). This one is an annotated photograph: the
 * real JDH photo with numbered points on what a customer can actually check
 * at the door (the Gas Safe ID, the van and uniform), and a short legend.
 * Business voice throughout; nobody is named. Lines are already published
 * (FAQ: the ID card and licence number; the clear quote before extra work)
 * or visible in the photo.
 *
 * Point positions are percentages of the 1:1 frame below (image 1200x1600,
 * object-position 50% 60%, so the frame shows y 240 to 1440).
 */

const H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";

const POINTS = [
  {
    n: 1,
    x: 5.5,
    y: 30.5,
    title: "The Gas Safe ID card",
    tag: "Gas Safe ID: ask to see it",
    below: true,
    line: "Every registered engineer carries one, with a licence number you can check on the Gas Safe Register.",
  },
  {
    n: 2,
    x: 44,
    y: 29,
    title: "A JDH Gas van and uniform",
    tag: "JDH Gas van and uniform",
    below: false,
    line: "So you know it's us before you open the door.",
  },
];

function Pin({ n }: { n: number }) {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-action font-display text-sm font-extrabold text-navy shadow-[0_0_0_4px_rgba(255,255,255,0.9)]">
      {n}
    </span>
  );
}

function Figure({ tags }: { tags: boolean }) {
  return (
    <figure className="relative aspect-square overflow-hidden rounded-[6px] bg-grey">
      <Image
        src="/images/jamie-with-van.jpg"
        alt="A JDH Gas Services engineer in JDH uniform, with a Gas Safe patch on the jacket, at the back of the liveried JDH Gas Services van"
        fill
        sizes="(max-width: 1024px) 100vw, 620px"
        className="object-cover object-[50%_60%]"
      />
      {POINTS.map((p) => (
        <span key={p.n} aria-hidden className="absolute h-0 w-0" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <span className="absolute -translate-x-1/2 -translate-y-1/2">
            <Pin n={p.n} />
          </span>
          {tags && (
            <span
              className={`absolute hidden whitespace-nowrap bg-white px-3 py-1.5 font-display text-[15px] font-extrabold tracking-[-0.015em] text-navy md:block ${
                p.below ? "-left-3 top-6" : "left-6 top-0 -translate-y-1/2"
              }`}
            >
              {p.tag}
            </span>
          )}
        </span>
      ))}
    </figure>
  );
}

/** variant "legend": numbered points on the photo, explained beside it.
 *  variant "tags": the labels sit on the photo itself (the help section's
 *  white tags), and the text column carries only the heading and the rest. */
export function WhosComing({
  variant = "legend",
}: {
  variant?: "legend" | "tags" | "plain" | "portrait" | "bleed";
}) {
  if (variant === "plain") return <WhosComingPlain />;
  if (variant === "portrait" || variant === "bleed") return <WhosComingPortrait bleed={variant === "bleed"} />;
  const tags = variant === "tags";
  return (
    <section aria-labelledby="coming-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        <div className="lg:order-1">
          <h2 id="coming-h" className={H2}>
            What to look for when we arrive.
          </h2>
          <p className="mt-4 text-neutral sm:text-lg">
            We&apos;re Gas Safe registered, and it&apos;s easy to check when we arrive.
          </p>

          {/* The legend: numbered to match the photo. With on-photo tags it
              shows on phones only, where the tags are hidden. */}
          <ol className={`mt-8 border-t border-rule ${tags ? "md:hidden" : ""}`}>
            {POINTS.map((p) => (
              <li key={p.n} className="grid grid-cols-[2.5rem_1fr] items-start border-b border-rule py-5">
                <Pin n={p.n} />
                <span>
                  <span className="block font-display text-lg font-extrabold tracking-[-0.015em] text-navy">{p.title}</span>
                  <span className="mt-1 block text-neutral">{p.line}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className={`${tags ? "mt-8 md:mt-6" : "mt-6"} font-display text-lg font-extrabold leading-snug tracking-[-0.015em] text-navy`}>
            Then, before any extra work, we explain what we&apos;ve found and give you a clear quote.
          </p>

          <a
            href={SITE.registerUrl}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy underline underline-offset-4 hover:text-action-text"
          >
            Check a Gas Safe registration <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="lg:order-2">
          <Figure tags={tags} />
        </div>
      </div>
    </section>
  );
}

/* ---------- C: plain (28 Nov 2026) ----------
   No pins or labels on the photo. The photo stands on its own; the three
   things to expect are written as short ruled statements, each led by its
   point in bold, so they read as copy rather than a feature list. */
const PLAIN = [
  { lead: "A JDH Gas van and uniform,", rest: "so you know it's us before you open the door." },
  { lead: "A Gas Safe ID card.", rest: "Ask to see it, and check the number on the Gas Safe Register." },
  { lead: "A clear quote before any extra work.", rest: "We explain what we've found first." },
];

function WhosComingPlain() {
  return (
    <section aria-labelledby="coming-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <figure className="relative aspect-[5/4] overflow-hidden rounded-[6px] bg-grey">
          <Image
            src="/images/jamie-with-van.jpg"
            alt="A JDH Gas Services engineer in JDH uniform at the back of the liveried JDH Gas Services van"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover object-[40%_46%]"
          />
        </figure>
        <div>
          <h2 id="coming-h" className={H2}>
            What to look for when we arrive.
          </h2>
          <p className="mt-4 text-neutral sm:text-lg">
            We&apos;re Gas Safe registered, and it&apos;s easy to check when we arrive.
          </p>
          <ul className="mt-8 border-t border-navy">
            {PLAIN.map((x) => (
              <li key={x.lead} className="border-b border-rule py-4 text-[17px] leading-relaxed text-neutral">
                <span className="font-display font-extrabold tracking-[-0.01em] text-navy">{x.lead}</span> {x.rest}
              </li>
            ))}
          </ul>
          <a
            href={SITE.registerUrl}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy underline underline-offset-4 hover:text-action-text"
          >
            Check a Gas Safe registration <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Portrait and bleed (28 Nov 2026) ----------
   The photo is a 3:4 portrait. In the 5:4 frame only 60% of its height
   showed (the van cut at the bumper, the person at the shins), which is what
   read as oddly zoomed. Both versions keep it close to its own shape.
   "portrait": a 4:5 frame inside the page width, beside the text.
   "bleed": the photo runs off the left edge, full height of the section,
   echoing the hero (photo off the right edge) and the full-width map above. */
function PlainHead() {
  return (
    <>
      <h2 id="coming-h" className={H2}>
        What to look for when we arrive.
      </h2>
      <p className="mt-4 text-neutral sm:text-lg">
        We&apos;re Gas Safe registered, and it&apos;s easy to check when we arrive.
      </p>
    </>
  );
}

function PlainList() {
  return (
    <>
      <ul className="border-t border-navy">
        {PLAIN.map((x) => (
          <li key={x.lead} className="border-b border-rule py-4 text-[17px] leading-relaxed text-neutral">
            <span className="font-display font-extrabold tracking-[-0.01em] text-navy">{x.lead}</span> {x.rest}
          </li>
        ))}
      </ul>
      <a
        href={SITE.registerUrl}
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy underline underline-offset-4 hover:text-action-text"
      >
        Check a Gas Safe registration <ArrowUpRight className="h-4 w-4" aria-hidden />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </>
  );
}

function PlainBody() {
  return (
    <>
      <PlainHead />
      <div className="mt-8">
        <PlainList />
      </div>
    </>
  );
}

const PHOTO_ALT = "A JDH Gas Services engineer in JDH uniform at the back of the liveried JDH Gas Services van";

function WhosComingPortrait({ bleed }: { bleed: boolean }) {
  if (bleed) {
    return (
      <section aria-labelledby="coming-h" className="bg-surface">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto">
            <Image src="/images/jamie-with-van.jpg" alt={PHOTO_ALT} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-[30%_60%]" />
          </div>
          <div className={`px-5 sm:px-8 lg:pl-20 lg:pr-[max(2rem,calc((100vw-1136px)/2))] ${SECTION_Y}`}>
            <div className="max-w-[36rem]">
              <PlainBody />
            </div>
          </div>
        </div>
      </section>
    );
  }
  // Phones: heading and intro, then the photo, then the list. Desktop: the
  // photo spans four rows on the left; the heading and list take the middle
  // two, with flexible rows above and below, so the text block stays centred
  // against the photo.
  return (
    <section aria-labelledby="coming-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page grid gap-x-20 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-y-0">
        <div className="lg:col-start-2 lg:row-start-2">
          <PlainHead />
        </div>
        <figure className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-grey lg:col-start-1 lg:row-span-4 lg:row-start-1">
          <Image src="/images/jamie-with-van.jpg" alt={PHOTO_ALT} fill sizes="(max-width: 1024px) 100vw, 500px" className="object-cover object-[30%_60%]" />
        </figure>
        <div className="lg:col-start-2 lg:row-start-3 lg:mt-8">
          <PlainList />
        </div>
      </div>
    </section>
  );
}
