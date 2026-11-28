import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HelpGuides } from "@/components/home/HomeSections";
import { HELP_PAGES, helpUrl } from "@/lib/help-content";

/**
 * Internal comparison page for the homepage help area, round 2: photo cards
 * built on Feenstra's device (feenstra.com): big photos, no text block under
 * them, two short solid tags stacked on the photo (the question, then the
 * action). Not linked or indexed; delete once a direction is picked.
 */
export const metadata: Metadata = {
  title: "Help directions (internal)",
  robots: { index: false, follow: false },
};

const H2 = "font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy";

type Card = { slug: string; q: string; cta: string; src: string; pos: string };

// Tag copy is short and only says what each guide contains.
const CARDS: Card[] = [
  { slug: "boiler-losing-pressure", q: "Boiler losing pressure?", cta: "Top it up in five steps", src: "/images/work/manometer.jpg", pos: "40% 45%" },
  { slug: "boiler-making-banging-noises", q: "Banging, gurgling or whistling?", cta: "What each noise means", src: "/images/work/heat-exchanger-clean.jpg", pos: "50% 40%" },
  { slug: "vaillant-boiler-fault-codes", q: "Vaillant fault code showing?", cta: "What each code means", src: "/images/work/boiler-panel-work.jpg", pos: "50% 35%" },
];

const moreThan = (shown: Card[]) => HELP_PAGES.filter((g) => !shown.some((c) => c.slug === g.slug));

/** One photo card: the photo, and two stacked tags on its bottom-left. */
function TagCard({ c, aspect, sizes, big = false }: { c: Card; aspect: string; sizes: string; big?: boolean }) {
  return (
    <Link href={helpUrl(c.slug)} className={`group relative block overflow-hidden rounded-[6px] bg-grey ${aspect}`}>
      <Image
        src={c.src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        style={{ objectPosition: c.pos }}
      />
      <span className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-1.5 sm:bottom-5 sm:left-5">
        <span
          className={`bg-white px-3 py-1.5 font-display font-extrabold tracking-[-0.015em] text-navy ${
            big ? "text-lg sm:text-xl" : "text-[15px] sm:text-base"
          }`}
        >
          {c.q}
        </span>
        <span className="inline-flex items-center gap-1 bg-action px-3 py-1.5 text-sm font-semibold text-navy transition-colors group-hover:bg-action-hover">
          {c.cta} <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 className={H2}>Help and advice</h2>
      <Link
        href="/help"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border-[1.5px] border-navy px-4 text-sm font-semibold text-navy hover:bg-white"
      >
        All guides <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

function MoreLine({ shown = CARDS }: { shown?: Card[] }) {
  const MORE = moreThan(shown);
  return (
    <p className="mt-6 text-sm leading-7 text-neutral">
      <span className="font-semibold text-navy">More guides: </span>
      {MORE.map((g, i) => (
        <span key={g.slug}>
          <Link href={helpUrl(g.slug)} className="text-navy underline decoration-rule underline-offset-4 hover:text-action-text hover:decoration-current">
            {g.navTitle}
          </Link>
          {i < MORE.length - 1 ? " · " : ""}
        </span>
      ))}
    </p>
  );
}

/* D1: Feenstra almost exactly. Two wide photos side by side, tags on each;
   the other guides as one line underneath. */
function D1() {
  return (
    <section className="bg-grey py-16 lg:py-24">
      <div className="container-page">
        <Header />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {CARDS.slice(0, 2).map((c) => (
            <TagCard key={c.slug} c={c} aspect="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 560px" big />
          ))}
        </div>
        <MoreLine shown={CARDS.slice(0, 2)} />
      </div>
    </section>
  );
}

/* D2: the three guides kept, as tall photos with the tags on them and no text
   underneath. */
function D2() {
  return (
    <section className="bg-grey py-16 lg:py-24">
      <div className="container-page">
        <Header />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <TagCard key={c.slug} c={c} aspect="aspect-[4/5]" sizes="(max-width: 768px) 100vw, 370px" />
          ))}
        </div>
        <MoreLine />
      </div>
    </section>
  );
}

/* D3: one large photo (the most common problem) beside two stacked smaller
   ones. */
function D3() {
  return (
    <section className="bg-grey py-16 lg:py-24">
      <div className="container-page">
        <Header />
        <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:grid-rows-2">
          <TagCard c={CARDS[0]} aspect="aspect-[4/3] md:row-span-2 md:aspect-auto md:min-h-[520px]" sizes="(max-width: 768px) 100vw, 660px" big />
          {CARDS.slice(1).map((c) => (
            <TagCard key={c.slug} c={c} aspect="aspect-[16/10] md:aspect-auto md:min-h-[250px]" sizes="(max-width: 768px) 100vw, 470px" />
          ))}
        </div>
        <MoreLine />
      </div>
    </section>
  );
}

const VARIANTS = [
  { key: "now", name: "Now", note: "Three photo cards with a title block under each, then the promise row.", el: <HelpGuides /> },
  { key: "D1", name: "D1. Feenstra two-up", note: "Two wide photos with question and action tags; the other guides as one line.", el: <D1 /> },
  { key: "D2", name: "D2. Three tall cards", note: "The same three guides as tall photos, tags on the photo, nothing underneath.", el: <D2 /> },
  { key: "D3", name: "D3. One large, two small", note: "Pressure as the big photo, noises and fault codes stacked beside it.", el: <D3 /> },
];

export default async function HelpExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const only = v?.split(",");
  return (
    <main>
      {VARIANTS.filter((x) => !only || only.includes(x.key)).map((x) => (
        <div key={x.key} className="border-b-8 border-white">
          <div className="container-page py-5">
            <p className="font-display text-lg font-extrabold text-navy">{x.name}</p>
            <p className="text-sm text-neutral">{x.note}</p>
          </div>
          {x.el}
        </div>
      ))}
    </main>
  );
}
