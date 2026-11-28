import { Mail, Phone } from "lucide-react";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { SITE } from "@/lib/site";

/**
 * The closing section on every page (direction E2 from /explore/contact,
 * 27 Nov 2026): a full-bleed split that runs into the footer. Navy on the
 * left with the heading and the three ways in; the compact one-page
 * QuoteForm on grey on the right (grey from 27 Nov 2026, so the form side
 * no longer runs into a white section above it, such as the homepage FAQ). Replaced the navy inset panel, the
 * three-step wizard and the engineer byline. Keeps id="enquiry" (in-page
 * "Get a quote" links and the mobile action bar key on it). Town pages pass
 * `town` for their own heading. `ruled` adds a top rule for pages where a grey
 * section sits directly above it.
 */
export function ContactSection({
  town,
  ruled = false,
  sectionY = "py-12 lg:py-16",
}: { town?: string; ruled?: boolean; sectionY?: string } = {}) {
  const row = "group flex items-center gap-4 border-b border-navy-line py-3.5";
  const title =
    "block font-display text-[17px] font-extrabold tracking-[-0.015em] text-white group-hover:underline group-hover:underline-offset-4";
  return (
    <section id="enquiry" aria-labelledby="contact-h" className={`relative isolate bg-grey ${ruled ? "border-t border-rule" : ""}`}>
      {/* Navy left half on desktop; it meets the navy footer below. */}
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-1/2 bg-navy lg:block" />
      <div className="container-page relative grid lg:grid-cols-2">
        <div className={`-mx-5 bg-navy px-5 text-white sm:-mx-8 sm:px-8 lg:mx-0 lg:bg-transparent lg:pl-0 lg:pr-16 ${sectionY}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">Get in touch</p>
          <h2
            id="contact-h"
            className="mt-2 font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white"
          >
            {town ? `Get a free quote in ${town}.` : "Tell us about the job."}
          </h2>
          <p className="mt-3 max-w-md text-navy-muted">
            Tell us what&apos;s wrong or send a photo of the boiler, and we&apos;ll come back to you with a clear price.
          </p>

          <ul className="mt-6 border-t border-navy-line">
            <li>
              <a href={SITE.phoneHref} className={row} aria-label={`Call JDH Gas on ${SITE.phoneDisplay}`}>
                <Phone className="h-5 w-5 shrink-0 text-white" aria-hidden />
                <span className="flex-1">
                  <span className={title}>{SITE.phoneDisplay}</span>
                  <span className="text-sm text-navy-muted">Call us, Monday to Friday</span>
                </span>
              </a>
            </li>
            <li>
              <a href={SITE.whatsappHref} target="_blank" rel="noopener" className={row}>
                <WhatsAppGlyph className="h-5 w-5 shrink-0 text-white" />
                <span className="flex-1">
                  <span className={title}>WhatsApp us</span>
                  <span className="text-sm text-navy-muted">Send a photo of the boiler or the fault code</span>
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={row}>
                <Mail className="h-5 w-5 shrink-0 text-white" aria-hidden />
                <span className="flex-1">
                  <span className={title}>{SITE.email}</span>
                  <span className="text-sm text-navy-muted">Email us</span>
                </span>
              </a>
            </li>
          </ul>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-muted">
            If we&apos;re out on a job, leave a message or send a WhatsApp and we&apos;ll call you back.
          </p>
        </div>

        <div className={`lg:pl-16 ${sectionY}`}>
          <h3 className="mb-5 font-display text-xl font-extrabold tracking-[-0.02em] text-navy">Ask for a quote</h3>
          <QuoteForm formName={town ? "town_contact" : "contact_section"} compact />
        </div>
      </div>
    </section>
  );
}
