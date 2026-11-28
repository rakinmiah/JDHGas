import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { AreaBand, BookingBand, Reviews } from "@/components/home/HomeSections";
import { BOOK_HREF } from "@/lib/booking";
import { ReviewRow } from "@/components/home/ReviewRow";
import { getGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_REVIEWS_URL, PHOTO_REVIEWS } from "@/lib/reviews";

/**
 * Internal comparison page for the homepage booking band (27 Nov 2026).
 * Diagnosis of the current band: a slogan set at 64px (bigger than the hero's
 * own headline) with a grey second line that reads as disabled text, and
 * nothing else in a tall white band, wedged between the navy reviews and the
 * map. It reads as a SaaS tagline rather than a job a firm does.
 * Each direction is shown between the real reviews and map: /explore/booking?v=B1.
 * Copy only restates what the site already says (the booking paragraph and the
 * servicing checklist in services-content.ts). Not linked or indexed.
 */
export const metadata: Metadata = {
  title: "Booking directions (internal)",
  robots: { index: false, follow: false },
};

const H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";
const EYEBROW = "text-xs font-semibold uppercase tracking-[0.16em] text-action-text";
const PARA =
  "Pick a date for your annual boiler service online. We confirm a time with you, Monday to Friday, carry out every check and leave a record of the work.";

// From the boiler servicing page's "What's included" list (services-content.ts).
const CHECKS = [
  "Full visual inspection of the boiler and its installation",
  "Flue gas analysis and combustion readings",
  "Gas pressure and flow checks",
  "Testing of controls, seals and safety devices",
  "A clear summary of the boiler's condition",
];

function Actions() {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link
        href={BOOK_HREF}
        className="inline-flex min-h-[50px] items-center gap-2 rounded-[4px] bg-action px-6 font-bold text-navy transition-colors hover:bg-action-hover"
      >
        Book a service online <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <Link href="/services/boiler-servicing" className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-neutral">
        What a service covers
      </Link>
    </div>
  );
}

/* B1: the service sheet. Heading at the page's normal section size, and the
   right column becomes what the customer actually gets: the checklist, set
   like the job sheet left after a visit. Grey band, so it separates cleanly
   from the navy above and the map below. */
function B1() {
  return (
    <section aria-labelledby="b1-h" className="bg-grey py-14 lg:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        <div>
          <p className={EYEBROW}>Annual boiler service</p>
          <h2 id="b1-h" className={`mt-3 ${H2}`}>
            Book your boiler service online.
          </h2>
          <p className="mt-4 max-w-[46ch] text-neutral sm:text-lg">{PARA}</p>
          <Actions />
        </div>
        <div className="rounded-[6px] border border-rule bg-white">
          <div className="flex items-center justify-between border-b border-rule px-6 py-4 sm:px-8">
            <p className="font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">Every service includes</p>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral">Gas Safe registered</p>
          </div>
          <ul className="divide-y divide-rule px-6 sm:px-8">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-start gap-3.5 py-3.5 text-navy">
                <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* B2: photo and three steps. A finished service (the boiler closed up, the
   JDH mat still beneath it) beside how booking works, in three short steps
   taken from the existing paragraph. White band. */
function B2() {
  const steps = [
    { t: "Pick a date online", d: "Choose a day that suits you on our booking page." },
    { t: "We confirm a time", d: "We get in touch to confirm a time, Monday to Friday." },
    { t: "Every check, on record", d: "We carry out every check and leave a record of the work." },
  ];
  return (
    <section aria-labelledby="b2-h" className="bg-surface py-14 lg:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-grey lg:aspect-auto">
          <Image
            src="/images/work/worcester-service-complete.jpg"
            alt="A boiler closed up after its annual service, with the JDH Gas Services mat beneath it"
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-cover object-[50%_62%]"
          />
        </div>
        <div>
          <p className={EYEBROW}>Annual boiler service</p>
          <h2 id="b2-h" className={`mt-3 ${H2}`}>
            Book your boiler service online.
          </h2>
          <ol className="mt-8 border-t border-rule">
            {steps.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-rule py-4">
                <span className="font-display text-lg font-extrabold text-action-text">0{i + 1}</span>
                <span>
                  <span className="block font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">{s.t}</span>
                  <span className="text-neutral">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
          <Actions />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { t: "Pick a date online", d: "Choose a day that suits you on our booking page." },
  { t: "We confirm a time", d: "We get in touch to confirm a time, Monday to Friday." },
  { t: "Every check, on record", d: "We carry out every check and leave a record of the work." },
];

function StepList({ tight = false }: { tight?: boolean }) {
  return (
    <ol className="border-t border-rule">
      {STEPS.map((s, i) => (
        <li key={s.t} className={`grid grid-cols-[2.75rem_1fr] items-baseline border-b border-rule ${tight ? "py-3" : "py-4"}`}>
          <span className="font-display text-base font-extrabold text-action-text">0{i + 1}</span>
          <span>
            <span className="block font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">{s.t}</span>
            <span className="text-[15px] text-neutral">{s.d}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

const SERVICE_PHOTO = {
  src: "/images/work/worcester-service-complete.jpg",
  alt: "A boiler closed up after its annual service, with the JDH Gas Services mat beneath it",
};

/* B2a: bleed. The photo runs off the left edge of the screen, full height
   of the band (the hero's photo runs off the right, the contact split's navy
   off the left), so the band reads as part of the page's structure rather
   than a box in the middle. Steps tightened; about 500px tall. */
function B2a() {
  return (
    <section aria-labelledby="b2a-h" className="bg-surface">
      <div className="grid lg:min-h-[500px] lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
        <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-0">
          <Image src={SERVICE_PHOTO.src} alt={SERVICE_PHOTO.alt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-[50%_40%]" />
        </div>
        <div className="flex flex-col justify-center px-5 py-12 sm:px-8 lg:px-16 lg:py-14">
          <div className="lg:max-w-[36rem]">
            <p className={EYEBROW}>Annual boiler service</p>
            <h2 id="b2a-h" className={`mt-2 ${H2}`}>
              Book your boiler service online.
            </h2>
            <div className="mt-6">
              <StepList tight />
            </div>
            <Actions />
          </div>
        </div>
      </div>
    </section>
  );
}

/* B2b: photo with the job sheet. B2's photo and steps, plus B1's substance:
   a white "every service includes" card laid over the foot of the photo,
   like the record left on the boiler. Inside the container. */
function B2b() {
  return (
    <section aria-labelledby="b2b-h" className="bg-surface py-14 lg:py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-grey lg:aspect-[1/1]">
            <Image src={SERVICE_PHOTO.src} alt={SERVICE_PHOTO.alt} fill sizes="(max-width: 1024px) 100vw, 540px" className="object-cover object-[50%_20%]" />
          </div>
          <div className="relative -mt-16 ml-4 mr-4 rounded-[6px] bg-white px-5 py-4 shadow-[0_18px_40px_-18px_rgba(15,31,75,0.45)] sm:ml-auto sm:mr-6 sm:w-[78%] lg:absolute lg:-right-6 lg:bottom-6 lg:mt-0 lg:w-[72%]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral">Every service includes</p>
            <ul className="mt-2.5 space-y-1.5">
              {CHECKS.slice(0, 4).map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[14px] leading-snug text-navy">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-action-text" strokeWidth={3} aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className={EYEBROW}>Annual boiler service</p>
          <h2 id="b2b-h" className={`mt-2 ${H2}`}>
            Book your boiler service online.
          </h2>
          <div className="mt-6">
            <StepList tight />
          </div>
          <Actions />
        </div>
      </div>
    </section>
  );
}

/* B2c: steps across. The heading and button on one line, then a wide photo
   strip beside the three steps set as columns. Shortest of the photo
   versions. */
function B2c() {
  return (
    <section aria-labelledby="b2c-h" className="bg-surface py-14 lg:py-16">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <p className={EYEBROW}>Annual boiler service</p>
            <h2 id="b2c-h" className={`mt-2 ${H2}`}>
              Book your boiler service online.
            </h2>
          </div>
          <div className="-mt-7">
            <Actions />
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-grey lg:aspect-auto lg:min-h-[240px]">
            <Image src={SERVICE_PHOTO.src} alt={SERVICE_PHOTO.alt} fill sizes="(max-width: 1024px) 100vw, 380px" className="object-cover object-[50%_30%]" />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[6px] bg-rule sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex flex-col bg-grey p-6">
                <span className="font-display text-3xl font-extrabold tracking-[-0.03em] text-action-text">0{i + 1}</span>
                <span className="pt-8 font-display text-[17px] font-extrabold tracking-[-0.015em] text-navy">{s.t}</span>
                <span className="mt-1 text-[15px] text-neutral">{s.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* B3: a slim booking bar. Not a section with a slogan, just the prompt and
   the button on one line, ruled top and bottom inside the container. The
   lightest touch: it lets the reviews run straight into the map. */
function B3() {
  return (
    <section aria-labelledby="b3-h" className="bg-surface py-10 lg:py-12">
      <div className="container-page">
        <div className="flex flex-col gap-6 rounded-[6px] border border-rule px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-start gap-5">
            <span aria-hidden className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-grey text-navy sm:grid">
              <CalendarDays className="h-6 w-6" />
            </span>
            <div>
              <h2 id="b3-h" className="font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-extrabold tracking-[-0.025em] text-navy">
                Annual boiler service due?
              </h2>
              <p className="mt-1 max-w-[60ch] text-neutral">
                Pick a date online. We confirm a time with you, Monday to Friday, and leave a record of the work.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={BOOK_HREF}
              className="inline-flex min-h-[50px] items-center gap-2 rounded-[4px] bg-action px-6 font-bold text-navy transition-colors hover:bg-action-hover"
            >
              Book a service online <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/services/boiler-servicing" className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-neutral">
              What a service covers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- B3, developed in the homepage's own language (27 Nov 2026) ----------
   What the rest of the page already uses: ruled rows (services list, contact
   channels), flat navy and grey bands with no outlines, white cards with a
   soft lift (reviews), orange only on actions, small caps eyebrows. B3's
   outlined box and grey icon circle used none of these. */

const BAR_TITLE = "Annual boiler service due?";
const BAR_LINE = "Pick a date online. We confirm a time with you, Monday to Friday, and leave a record of the work.";

function BookButton({ onNavy = false }: { onNavy?: boolean }) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
      <Link
        href={BOOK_HREF}
        className="inline-flex min-h-[50px] items-center gap-2 rounded-[4px] bg-action px-6 font-bold text-navy transition-colors hover:bg-action-hover"
      >
        Book a service online <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <Link
        href="/services/boiler-servicing"
        className={`text-sm font-semibold underline underline-offset-4 ${
          onNavy ? "text-white decoration-white/40 hover:decoration-white" : "text-navy hover:text-neutral"
        }`}
      >
        What a service covers
      </Link>
    </div>
  );
}

/* B3a: the reviews' closing line. No section of its own: a ruled line at
   the foot of the navy reviews band turns "what customers say" straight into
   "book yours". One fewer band between the reviews and the map. */
async function B3a() {
  const { rating, count } = await getGoogleReviews();
  return (
    <ReviewRow reviews={PHOTO_REVIEWS} href={GOOGLE_REVIEWS_URL} rating={rating} count={count}>
      <div className="container-page mt-10">
        <div className="flex flex-col gap-5 border-t border-navy-line pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-extrabold tracking-[-0.025em] text-white">
              {BAR_TITLE}
            </h2>
            <p className="mt-1 max-w-[62ch] text-navy-muted">{BAR_LINE}</p>
          </div>
          <BookButton onNavy />
        </div>
      </div>
    </ReviewRow>
  );
}

/* B3b: the bridge. A white bar that straddles the edge of the navy reviews
   band (navy behind its top half, white behind its bottom half), lifted like
   the review cards. Hard colour edge, no gradient. */
function B3b() {
  return (
    <section aria-labelledby="b3b-h" className="relative isolate bg-surface pb-12 lg:pb-16">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-navy" />
      <div className="container-page">
        <div className="flex flex-col gap-6 rounded-[6px] bg-white px-6 py-7 shadow-[0_22px_44px_-20px_rgba(15,31,75,0.45)] sm:px-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-8">
          <div className="flex items-start gap-5">
            <span aria-hidden className="hidden h-12 w-12 shrink-0 place-items-center rounded-[4px] bg-navy text-white sm:grid">
              <CalendarDays className="h-6 w-6" />
            </span>
            <div>
              <h2 id="b3b-h" className="font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-extrabold tracking-[-0.025em] text-navy">
                {BAR_TITLE}
              </h2>
              <p className="mt-1 max-w-[60ch] text-neutral">{BAR_LINE}</p>
            </div>
          </div>
          <BookButton />
        </div>
      </div>
    </section>
  );
}

/* B3c: the ruled row. Open, like the services list: a rule above and below,
   the prompt, the three steps in one line, the button. About 180px. */
function B3c() {
  return (
    <section aria-labelledby="b3c-h" className="bg-surface py-10 lg:py-12">
      <div className="container-page">
        <div className="grid gap-6 border-y border-rule py-7 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] lg:items-center lg:gap-12">
          <div>
            <p className={EYEBROW}>Annual boiler service</p>
            <h2 id="b3c-h" className="mt-1.5 font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-extrabold tracking-[-0.025em] text-navy">
              Due a service? Book it online.
            </h2>
          </div>
          <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-7 lg:justify-center">
            {STEPS.map((x, i) => (
              <li key={x.t} className="flex items-baseline gap-2 whitespace-nowrap text-[15px] font-semibold text-navy">
                <span className="font-display text-sm font-extrabold text-action-text">0{i + 1}</span>
                {x.t}
              </li>
            ))}
          </ol>
          <BookButton />
        </div>
      </div>
    </section>
  );
}

/* ---------- Round 3 (27 Nov 2026): B3a felt clunky (a second heading,
   a paragraph and two buttons under the cards). Lighter closings. ---------- */
async function RowWith({ children }: { children?: React.ReactNode }) {
  const { rating, count } = await getGoogleReviews();
  return (
    <ReviewRow reviews={PHOTO_REVIEWS} href={GOOGLE_REVIEWS_URL} rating={rating} count={count}>
      {children}
    </ReviewRow>
  );
}

/* C1: one line, centred under the cards: a question and a text link. */
function C1() {
  return (
    <RowWith>
      <p className="container-page mt-8 text-center text-navy-muted">
        Annual boiler service due?{" "}
        <Link
          href={BOOK_HREF}
          className="inline-flex items-center gap-1 font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
        >
          Book it online <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
    </RowWith>
  );
}

/* C2: one compact row on the same line as the cards' left edge: the question
   in white, the button beside it. No paragraph, no second link, no rule. */
function C2() {
  return (
    <RowWith>
      <div className="container-page mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="font-display text-lg font-extrabold tracking-[-0.015em] text-white">Annual boiler service due?</p>
        <Link
          href={BOOK_HREF}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] bg-action px-5 text-sm font-bold text-navy transition-colors hover:bg-action-hover"
        >
          Book a service online <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </RowWith>
  );
}

/* C3: nothing under the cards. Booking already sits in the header, the hero
   and the services list. */
function C3() {
  return <RowWith />;
}

const VARIANTS: Record<string, { name: string; note: string; el: () => React.ReactNode; ownReviews?: boolean }> = {
  C1: { name: "C1. One line", note: "A centred question and text link under the cards.", el: () => <C1 />, ownReviews: true },
  C2: { name: "C2. Compact row", note: "The question and the button, nothing else.", el: () => <C2 />, ownReviews: true },
  C3: { name: "C3. Nothing", note: "The reviews end with the cards.", el: () => <C3 />, ownReviews: true },
  B3a: { name: "B3a. The reviews' closing line", note: "No band of its own: a ruled line at the foot of the navy reviews.", el: () => <B3a />, ownReviews: true },
  B3b: { name: "B3b. The bridge", note: "A lifted white bar straddling the edge of the navy reviews band.", el: () => <B3b /> },
  B3c: { name: "B3c. The ruled row", note: "Open row ruled top and bottom, like the services list: prompt, three steps, button.", el: () => <B3c /> },
  now: { name: "Now", note: "64px slogan with a grey second line, paragraph and button.", el: () => <BookingBand /> },
  B1: { name: "B1. Service sheet", note: "Grey band; normal-size heading and the button on the left, the servicing checklist as a white job sheet on the right.", el: () => <B1 /> },
  B2: { name: "B2. Photo and steps", note: "A finished service photo beside three booking steps, then the button.", el: () => <B2 /> },
  B2a: { name: "B2a. Photo to the edge", note: "The photo runs off the left edge, full height of the band; steps tightened.", el: () => <B2a /> },
  B2b: { name: "B2b. Photo with the job sheet", note: "B2 plus a white checklist card over the foot of the photo.", el: () => <B2b /> },
  B2c: { name: "B2c. Steps across", note: "Heading and button on one line; a photo strip beside the three steps as columns.", el: () => <B2c /> },
  B3: { name: "B3. Slim booking bar", note: "One ruled line: the prompt on the left, the button on the right. Reviews run almost straight into the map.", el: () => <B3 /> },
};

export default async function BookingExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const one = v && VARIANTS[v];
  if (one) {
    // In context: the real reviews above and the real map band below.
    return (
      <main>
        {!one.ownReviews && <Reviews />}
        {one.el()}
        <AreaBand />
      </main>
    );
  }
  return (
    <main>
      {Object.entries(VARIANTS).map(([k, x]) => (
        <div key={k}>
          <div className="container-page py-5">
            <p className="font-display text-lg font-extrabold text-navy">{x.name}</p>
            <p className="text-sm text-neutral">{x.note}</p>
          </div>
          {x.el()}
        </div>
      ))}
    </main>
  );
}
