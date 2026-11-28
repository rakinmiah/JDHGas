import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { ContactSection } from "@/components/home/ContactSection";
import { SITE } from "@/lib/site";

/**
 * Internal comparison page for the closing contact section and the new
 * one-page QuoteForm. Not linked or indexed; delete once a direction is
 * picked. No "Your engineer" byline in any version.
 */
export const metadata: Metadata = {
  title: "Contact directions (internal)",
  robots: { index: false, follow: false },
};

const H2 = "font-display text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em]";
const LEAD = "Describe the job or send a photo of the boiler. We'll get back to you quickly with honest advice and a clear price.";
const HONEST = "We're often out on jobs, so we can't always answer straight away. Leave a message or send a WhatsApp and we'll get back to you.";

/** The three ways in, as ruled rows. */
function Channels({ dark = false }: { dark?: boolean }) {
  const row = `flex items-center gap-4 border-b py-4 ${dark ? "border-navy-line" : "border-rule"}`;
  const strong = `font-display text-lg font-extrabold tracking-[-0.015em] ${dark ? "text-white" : "text-navy"}`;
  const sub = `text-sm ${dark ? "text-navy-muted" : "text-neutral"}`;
  const icon = `h-5 w-5 shrink-0 ${dark ? "text-white" : "text-navy"}`;
  return (
    <ul className={`border-t ${dark ? "border-navy-line" : "border-rule"}`}>
      <li>
        <a href={SITE.phoneHref} className={`${row} group`}>
          <Phone className={icon} aria-hidden />
          <span className="flex-1">
            <span className={`block ${strong} group-hover:underline group-hover:underline-offset-4`}>{SITE.phoneDisplay}</span>
            <span className={sub}>Call us, Monday to Friday</span>
          </span>
        </a>
      </li>
      <li>
        <a href={SITE.whatsappHref} target="_blank" rel="noopener" className={`${row} group`}>
          <WhatsAppGlyph className={icon} />
          <span className="flex-1">
            <span className={`block ${strong} group-hover:underline group-hover:underline-offset-4`}>WhatsApp us</span>
            <span className={sub}>Send a photo of the boiler or the fault code</span>
          </span>
        </a>
      </li>
      <li>
        <a href={`mailto:${SITE.email}`} className={`${row} group`}>
          <Mail className={icon} aria-hidden />
          <span className="flex-1">
            <span className={`block ${strong} group-hover:underline group-hover:underline-offset-4`}>{SITE.email}</span>
            <span className={sub}>Email us</span>
          </span>
        </a>
      </li>
    </ul>
  );
}

/* E1: a light grey band. Channels on the left, the form in a flat white panel
   on the right. The page ends grey, then the navy footer. */
function E1() {
  return (
    <section className="bg-grey py-16 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Get in touch</p>
          <h2 className={`mt-2 text-navy ${H2}`}>Tell us about the job.</h2>
          <p className="mt-4 max-w-md text-neutral">{LEAD}</p>
          <div className="mt-8">
            <Channels />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral">{HONEST}</p>
        </div>
        <div className="rounded-[8px] bg-white p-6 outline-1 -outline-offset-1 outline-rule sm:p-8">
          <h3 className="mb-6 font-display text-xl font-extrabold tracking-[-0.02em] text-navy">Ask for a quote</h3>
          <QuoteForm formName="explore_e1" />
        </div>
      </div>
    </section>
  );
}

/* E2: full-bleed split that becomes the top of the footer: navy on the left
   (heading and channels), white on the right (the form). */
function E2() {
  return (
    <section className="relative isolate bg-white">
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-1/2 bg-navy lg:block" />
      <div className="container-page relative grid lg:grid-cols-2">
        <div className="-mx-5 bg-navy px-5 py-14 text-white sm:-mx-8 sm:px-8 lg:mx-0 lg:bg-transparent lg:py-24 lg:pl-0 lg:pr-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Get in touch</p>
          <h2 className={`mt-2 text-white ${H2}`}>Tell us about the job.</h2>
          <p className="mt-4 max-w-md text-navy-muted">{LEAD}</p>
          <div className="mt-8">
            <Channels dark />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-muted">{HONEST}</p>
        </div>
        <div className="py-14 lg:py-24 lg:pl-16">
          <h3 className="mb-6 font-display text-xl font-extrabold tracking-[-0.02em] text-navy">Ask for a quote</h3>
          <QuoteForm formName="explore_e2" />
        </div>
      </div>
    </section>
  );
}

/* E3: form first. A centred heading, the ways in as one line, then the form
   wide in two columns on white. */
function E3() {
  return (
    <section className="border-t border-rule bg-white py-16 lg:py-24">
      <div className="container-page"><div className="mx-auto max-w-[820px]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Get in touch</p>
        <h2 className={`mt-2 text-center text-navy ${H2}`}>Tell us about the job.</h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-neutral">{LEAD}</p>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] font-semibold text-navy">
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2 underline underline-offset-4">
            <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
          </a>
          <a href={SITE.whatsappHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 underline underline-offset-4">
            <WhatsAppGlyph className="h-4 w-4" /> WhatsApp a photo
          </a>
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 underline underline-offset-4">
            <Mail className="h-4 w-4" aria-hidden /> {SITE.email}
          </a>
        </p>
        <div className="mt-10 border-t border-rule pt-10">
          <QuoteForm formName="explore_e3" />
        </div>
        <p className="mt-6 text-center text-sm text-neutral">{HONEST}</p>
      </div></div>
    </section>
  );
}

const VARIANTS = [
  { key: "now", name: "Now", note: "Navy inset panel, three-step wizard with icon tiles, engineer byline.", el: <ContactSection /> },
  { key: "E1", name: "E1. Grey band", note: "Channels as ruled rows on the left, the one-page form in a flat white panel on the right.", el: <E1 /> },
  { key: "E2", name: "E2. Split into the footer", note: "Navy left half (heading and channels) running into the footer, the form on white beside it.", el: <E2 /> },
  { key: "E3", name: "E3. Form first", note: "Centred heading, the ways in as one line, the form wide on white.", el: <E3 /> },
];

export default async function ContactExplore({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const only = v?.split(",");
  return (
    <main>
      {VARIANTS.filter((x) => !only || only.includes(x.key)).map((x) => (
        <div key={x.key}>
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
