import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Droplets, Heater, Snowflake, type LucideIcon } from "lucide-react";
import { HELP_PAGES, helpUrl } from "@/lib/help-content";
import { HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * Help and advice as a bento (explored 27 Nov 2026 on /explore/help-bento, in
 * 4, 5 and 6-card versions). Two kinds of tile on the grey band:
 *  - photo tiles: D3's tagged photos (a white question tag and an orange
 *    action tag on an equipment-led photo that matches the problem);
 *  - white tiles: for the guides with no honest photo in the library
 *    (radiators, a frozen condensate pipe, a leak), an icon, the question and
 *    one line taken from the guide itself, then the same orange action tag.
 * Tag and tile copy only restates what each guide says.
 */

type Photo = { src: string; pos: string; alt: string };
type Guide = { slug: string; q: string; cta: string; photo?: Photo; art?: "radiator" | "frozen"; icon?: LucideIcon; line?: string };

const G: Record<string, Guide> = {
  pressure: {
    slug: "boiler-losing-pressure",
    q: "Boiler losing pressure?",
    cta: "Top it up in five steps",
    photo: {
      src: "/images/work/heat-exchanger-clean.jpg",
      pos: "50% 100%",
      alt: "A pressure gauge reading 0.75 and 0.90 bar, connected to a boiler's expansion vessel",
    },
  },
  hotWater: {
    slug: "no-hot-water",
    q: "No hot water?",
    cta: "Simple checks to try",
    photo: {
      src: "/images/work/worcester-controls-check.jpg",
      pos: "92% 40%",
      alt: "A hand turning the temperature dial on the front of a boiler",
    },
  },
  noises: {
    slug: "boiler-making-banging-noises",
    q: "Banging, gurgling or whistling?",
    cta: "What each noise means",
    photo: { src: "/images/brand/hero-boiler-work.jpg", pos: "50% 30%", alt: "Gloved hands working at the burner of an opened boiler" },
  },
  vaillant: {
    slug: "vaillant-boiler-fault-codes",
    q: "Vaillant fault code showing?",
    cta: "What each code means",
    photo: {
      src: "/images/work/vaillant-ecofit-kitchen.jpg",
      pos: "50% 54%",
      alt: "A Vaillant ecoFIT boiler with its display lit, in a kitchen cupboard",
    },
  },
  radiators: {
    slug: "radiators-cold-at-bottom",
    q: "Radiators cold at the bottom?",
    cta: "Air or sludge: how to tell",
    art: "radiator",
    icon: Heater,
    line: "Cold at the top is air, and you can bleed that yourself.",
  },
  frozen: {
    slug: "frozen-condensate-pipe",
    q: "Boiler stopped in the cold?",
    cta: "How to thaw it",
    art: "frozen",
    icon: Snowflake,
    line: "An outside condensate pipe can freeze solid and shut the boiler down.",
  },
  leak: {
    slug: "boiler-leaking-water",
    q: "Boiler leaking water?",
    cta: "What to do first",
    icon: Droplets,
    line: "Water and a boiler's electrics are a bad mix. Don't leave this one.",
  },
};

/* Each version: the guides in order, with each tile's desktop span. */
const LAYOUTS: Record<4 | 5 | 6, { grid: string; cards: { g: Guide; span: string; big?: boolean }[] }> = {
  // Big photo left; a wide photo top right; a photo and a white tile under it.
  4: {
    grid: "lg:grid-cols-12 lg:auto-rows-[270px]",
    cards: [
      { g: G.pressure, span: "lg:col-span-6 lg:row-span-2", big: true },
      { g: G.vaillant, span: "lg:col-span-6" },
      { g: G.hotWater, span: "lg:col-span-3" },
      { g: G.radiators, span: "lg:col-span-3" },
    ],
  },
  // Tall photo left; photos and white tiles staggered across two rows.
  5: {
    grid: "lg:grid-cols-12 lg:auto-rows-[270px]",
    cards: [
      { g: G.pressure, span: "lg:col-span-5 lg:row-span-2", big: true },
      { g: G.hotWater, span: "lg:col-span-4" },
      { g: G.radiators, span: "lg:col-span-3" },
      { g: G.frozen, span: "lg:col-span-3" },
      { g: G.vaillant, span: "lg:col-span-4" },
    ],
  },
  // Four columns: a wide photo top left and bottom right, with photos and
  // white tiles alternating between them.
  6: {
    grid: "lg:grid-cols-4 lg:auto-rows-[290px]",
    cards: [
      { g: G.pressure, span: "lg:col-span-2", big: true },
      { g: G.noises, span: "" },
      { g: G.radiators, span: "" },
      { g: G.frozen, span: "" },
      { g: G.hotWater, span: "" },
      { g: G.vaillant, span: "lg:col-span-2", big: true },
    ],
  },
};

const lift =
  "transition-[translate,box-shadow] duration-200 hover:shadow-[0_18px_34px_-16px_rgba(15,31,75,0.35)] motion-safe:hover:-translate-y-1";

function ActionTag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap bg-action px-3 py-1.5 text-sm font-semibold text-navy transition-colors group-hover:bg-action-hover">
      {text} <ChevronRight className="h-4 w-4" aria-hidden />
    </span>
  );
}

function PhotoTile({ g, span, big }: { g: Guide; span: string; big?: boolean }) {
  const p = g.photo!;
  return (
    <Link
      href={helpUrl(g.slug)}
      className={`group relative block aspect-[16/10] overflow-hidden rounded-[6px] bg-white sm:aspect-[4/3] lg:aspect-auto ${lift} ${span}`}
    >
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={big ? "(max-width: 1024px) 100vw, 600px" : "(max-width: 1024px) 100vw, 400px"}
        className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        style={{ objectPosition: p.pos }}
      />
      <span className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-1.5 sm:bottom-5 sm:left-5">
        <span
          className={`bg-white px-3 py-1.5 font-display font-extrabold tracking-[-0.015em] text-navy ${
            big ? "text-lg sm:text-xl" : "text-[15px] sm:text-base"
          }`}
        >
          {g.q}
        </span>
        <ActionTag text={g.cta} />
      </span>
    </Link>
  );
}

/* ---------- Drawn tiles ----------
   For the two guides with no honest photo: a flat drawing of the problem
   itself, in the brand's colours, filling the tile the way a photo would,
   with the same question and action tags on top. Drawn, so they never claim
   to be a job photo. */

/** A column radiator, warm (flame orange) at the top and cold (logo sky
 *  blue) at the bottom, with sludge settled in the cold part: the guide's
 *  "cold at the bottom is sludge". */
function RadiatorArt() {
  const cols = Array.from({ length: 9 }, (_, i) => 40 + i * 24);
  return (
    <svg aria-hidden viewBox="0 0 320 200" preserveAspectRatio="xMidYMin meet" className="absolute inset-x-0 top-0 h-[72%] w-full">
      <defs>
        <clipPath id="rad-cols">
          {cols.map((x) => (
            <rect key={x} x={x} y="34" width="20" height="112" rx="9" />
          ))}
        </clipPath>
      </defs>
      {/* pipes and valves */}
      <path d="M40 136H26V200M252 136H266V200" fill="none" stroke="#0f1f4b" strokeWidth="5" />
      <rect x="18" y="152" width="16" height="13" rx="2" fill="#0f1f4b" />
      <rect x="258" y="152" width="16" height="13" rx="2" fill="#0f1f4b" />
      {/* warm top, cold bottom, sludge in the cold part */}
      <g clipPath="url(#rad-cols)">
        <rect x="30" y="30" width="240" height="62" fill="#ffc4a3" />
        <rect x="30" y="92" width="240" height="60" fill="#cfe3fb" />
        {cols.map((x, i) => (
          <g key={x} fill="#5a5f66" opacity="0.55">
            <circle cx={x + 6 + (i % 2) * 3} cy="139" r="2.6" />
            <circle cx={x + 13} cy="134" r="2" />
            <circle cx={x + 10 - (i % 3)} cy="128" r="1.6" />
          </g>
        ))}
      </g>
      {cols.map((x) => (
        <rect key={x} x={x} y="34" width="20" height="112" rx="9" fill="none" stroke="#0f1f4b" strokeWidth="2.5" />
      ))}
      <circle cx="254" cy="42" r="4.5" fill="#0f1f4b" />
      {/* labels */}
      <g fontFamily="inherit" fontSize="12" fontWeight="700" fill="#0f1f4b">
        <path d="M262 62h10" stroke="#ff6b1a" strokeWidth="3" />
        <text x="276" y="66">Warm</text>
        <path d="M262 122h10" stroke="#5cb4ff" strokeWidth="3" />
        <text x="276" y="126">Cold</text>
      </g>
    </svg>
  );
}

/** A condensate pipe leaving an outside wall on a winter night, frosted and
 *  plugged with ice at its open end. */
function FrozenArt() {
  const flakes: [number, number, number][] = [
    [34, 26, 6], [86, 54, 4], [26, 92, 4.5], [112, 20, 5], [180, 22, 4], [62, 120, 3.5], [200, 120, 3.5], [150, 40, 3],
  ];
  return (
    <svg aria-hidden viewBox="0 0 320 200" preserveAspectRatio="xMidYMin meet" className="absolute inset-x-0 top-0 h-[72%] w-full">
      {/* brick wall on the right */}
      <rect x="238" y="0" width="82" height="200" fill="#24356f" />
      <g stroke="#0f1f4b" strokeWidth="2.5">
        {Array.from({ length: 9 }, (_, r) => (
          <g key={r}>
            <path d={`M238 ${r * 22 + 11}H320`} />
            <path d={r % 2 ? `M262 ${r * 22 + 11}v22M302 ${r * 22 + 11}v22` : `M282 ${r * 22 + 11}v22`} />
          </g>
        ))}
      </g>
      {/* the pipe */}
      <path d="M238 64H152Q134 64 134 82V150" fill="none" stroke="#b4bccf" strokeWidth="14" />
      {/* frost along the top of the run */}
      <g fill="#ffffff">
        {[226, 210, 196, 181, 166].map((x, i) => (
          <ellipse key={x} cx={x} cy="56" rx={i % 2 ? 6 : 8} ry="3.2" />
        ))}
      </g>
      {/* icicles under the run */}
      <g fill="#5cb4ff">
        <path d="M216 71l4 16 4-16z" />
        <path d="M196 71l4 24 4-24z" />
        <path d="M178 71l3.5 12 3.5-12z" />
      </g>
      {/* ice plugging the open end */}
      <rect x="124" y="146" width="20" height="16" rx="5" fill="#cfe3fb" />
      <g fill="#5cb4ff">
        <path d="M127 162l3 14 3-14z" />
        <path d="M135 162l3 20 3-20z" />
      </g>
      {/* snowflakes */}
      <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
        {flakes.map(([x, y, r]) => (
          <path key={`${x}-${y}`} d={`M${x - r} ${y}h${2 * r}M${x - r / 2} ${y - r * 0.87}l${r} ${r * 1.73}M${x - r / 2} ${y + r * 0.87}l${r} ${-r * 1.73}`} />
        ))}
      </g>
    </svg>
  );
}

function ArtTile({ g, span }: { g: Guide; span: string }) {
  const dark = g.art === "frozen";
  return (
    <Link
      href={helpUrl(g.slug)}
      className={`group relative block aspect-[16/10] overflow-hidden rounded-[6px] sm:aspect-[4/3] lg:aspect-auto ${
        dark ? "bg-navy" : "bg-white"
      } ${lift} ${span}`}
    >
      <span className="absolute inset-0 transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.03]">
        {g.art === "radiator" ? <RadiatorArt /> : <FrozenArt />}
      </span>
      <span className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-1.5 sm:bottom-5 sm:left-5">
        <span
          className={`px-3 py-1.5 font-display text-[15px] font-extrabold tracking-[-0.015em] text-navy sm:text-base ${
            dark ? "bg-white" : "bg-grey"
          }`}
        >
          {g.q}
        </span>
        <ActionTag text={g.cta} />
      </span>
    </Link>
  );
}

function TextTile({ g, span }: { g: Guide; span: string }) {
  const Icon = g.icon!;
  return (
    <Link href={helpUrl(g.slug)} className={`group flex flex-col rounded-[6px] bg-white p-6 ${lift} ${span}`}>
      <span aria-hidden className="grid h-11 w-11 place-items-center rounded-[4px] bg-grey text-navy">
        <Icon className="h-5.5 w-5.5" />
      </span>
      <span className="mt-4 shrink-0 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-navy">{g.q}</span>
      <span className="mt-2 shrink-0 text-[15px] leading-snug text-neutral">{g.line}</span>
      <span className="mt-auto pt-5">
        <ActionTag text={g.cta} />
      </span>
    </Link>
  );
}

/* ---------- Treatments for the two guides with no photo (round 2) ----------
   "type":  big display type, the guide's own question in a few words.
   "icon":  one oversized line icon cropped off the tile's corner.
   "quote": a pull-quote from the guide in display type.
   "photos": no drawn tiles; those two guides move to "More guides" and the
             bento is all photos (noises and a leak take their places). */
export type NoPhoto = "type" | "icon" | "quote" | "photos" | "drawn";

const NO_PHOTO: Record<string, { eyebrow: string; type: string; quote: string }> = {
  "radiators-cold-at-bottom": {
    eyebrow: "Radiators",
    type: "Top or bottom?",
    quote: "Cold at the top is air. Cold at the bottom is sludge.",
  },
  "frozen-condensate-pipe": {
    eyebrow: "Cold weather",
    type: "0°C",
    quote: "Every cold snap, this is the fault we get called about most.",
  },
};

function Tags({ g, qBg = "bg-grey" }: { g: Guide; qBg?: string }) {
  return (
    <span className="flex flex-col items-start gap-1.5">
      <span className={`px-3 py-1.5 font-display text-[15px] font-extrabold tracking-[-0.015em] text-navy sm:text-base ${qBg}`}>
        {g.q}
      </span>
      <ActionTag text={g.cta} />
    </span>
  );
}

function NoPhotoTile({ g, span, mode }: { g: Guide; span: string; mode: Exclude<NoPhoto, "photos" | "drawn"> }) {
  // Built only from what the homepage already uses: navy or white grounds
  // (the hero and reviews), the display face, small-caps eyebrows in
  // action-text, line icons, and the photo tiles' own tag pair at the foot.
  const c = NO_PHOTO[g.slug];
  const Icon = g.icon!;
  const frozen = g.slug === "frozen-condensate-pipe";
  const base = `group relative flex min-h-[230px] flex-col overflow-hidden rounded-[6px] p-5 sm:p-6 ${lift} ${span}`;
  const tags = (dark: boolean) => (
    <span className="relative mt-auto pt-5">
      <Tags g={g} qBg={dark ? "bg-white" : "bg-grey"} />
    </span>
  );

  if (mode === "type") {
    // Radiators on white; the frozen pipe on navy (the hero's ground).
    return (
      <Link href={helpUrl(g.slug)} className={`${base} ${frozen ? "bg-navy" : "bg-white"}`}>
        <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${frozen ? "text-navy-muted" : "text-action-text"}`}>
          {c.eyebrow}
        </span>
        <span
          className={`mt-2 font-display font-extrabold leading-[0.95] tracking-[-0.045em] ${
            frozen ? "text-[clamp(4rem,3rem+3vw,5.5rem)] text-white" : "text-[clamp(2.4rem,1.8rem+1.6vw,3.1rem)] text-navy"
          }`}
        >
          {c.type}
        </span>
        {tags(frozen)}
      </Link>
    );
  }

  if (mode === "icon") {
    // One large line icon (the header and contact rows use the same set),
    // navy on white for radiators, white on navy for the cold.
    return (
      <Link href={helpUrl(g.slug)} className={`${base} ${frozen ? "bg-navy" : "bg-white"}`}>
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className={`absolute -right-8 -top-8 h-52 w-52 transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.04] ${
            frozen ? "text-navy-line" : "text-rule"
          }`}
        />
        <span className={`relative text-xs font-semibold uppercase tracking-[0.16em] ${frozen ? "text-navy-muted" : "text-action-text"}`}>
          {c.eyebrow}
        </span>
        {tags(frozen)}
      </Link>
    );
  }

  // quote: set like the homepage review cards (white card, display face, navy).
  return (
    <Link href={helpUrl(g.slug)} className={`${base} bg-white`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">{c.eyebrow}</span>
      <span className="mt-2 font-display text-[clamp(1.2rem,1rem+0.5vw,1.4rem)] font-extrabold leading-[1.22] tracking-[-0.02em] text-navy">
        {c.quote}
      </span>
      {tags(false)}
    </Link>
  );
}

/** Photo for the leak guide, used only in the all-photos treatment: the
 *  pipework and filling loop under a boiler, no person. */
const LEAK_PHOTO: Guide = {
  slug: "boiler-leaking-water",
  q: "Boiler leaking water?",
  cta: "What to do first",
  photo: { src: "/images/work/ideal-install.jpg", pos: "50% 78%", alt: "The pipework and filling loop under a wall-hung boiler" },
};

export function HelpBento({ count, noPhoto = "type" }: { count: 4 | 5 | 6; noPhoto?: NoPhoto }) {
  const base = LAYOUTS[count];
  // All-photos: noises and the leak take the two drawn tiles' places.
  const layout =
    noPhoto === "photos"
      ? {
          ...base,
          cards: base.cards.map((c) =>
            c.g.slug === "radiators-cold-at-bottom"
              ? { ...c, g: G.noises }
              : c.g.slug === "frozen-condensate-pipe"
                ? { ...c, g: LEAK_PHOTO }
                : c,
          ),
        }
      : base;
  const more = HELP_PAGES.filter((h) => !layout.cards.some((c) => c.g.slug === h.slug));
  return (
    <section aria-labelledby="guides-h" className={`bg-grey ${SECTION_Y}`}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="guides-h"
            className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy"
          >
            Help and advice
          </h2>
          <Link
            href="/help"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border-[1.5px] border-navy px-4 text-sm font-semibold text-navy hover:bg-white"
          >
            All guides <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className={`${HEAD_GAP} grid gap-5 sm:grid-cols-2 ${layout.grid}`}>
          {layout.cards.map(({ g, span, big }) =>
            g.photo ? (
              <PhotoTile key={g.slug} g={g} span={span} big={big} />
            ) : g.art && noPhoto === "drawn" ? (
              <ArtTile key={g.slug} g={g} span={span} />
            ) : g.art && noPhoto !== "photos" && noPhoto !== "drawn" ? (
              <NoPhotoTile key={g.slug} g={g} span={span} mode={noPhoto} />
            ) : (
              <TextTile key={g.slug} g={g} span={span} />
            ),
          )}
        </div>
        {more.length > 0 && (
          <p className="mt-6 text-sm leading-7 text-neutral">
            <span className="font-semibold text-navy">More guides: </span>
            {more.map((h, i) => (
              <span key={h.slug}>
                <Link
                  href={helpUrl(h.slug)}
                  className="text-navy underline decoration-rule underline-offset-4 hover:text-action-text hover:decoration-current"
                >
                  {h.navTitle}
                </Link>
                {i < more.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
