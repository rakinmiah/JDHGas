import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "@/components/home/Faq";
import { HELP_PAGES, helpUrl } from "@/lib/help-content";
import { H2_CLS, HEAD_GAP, SECTION_Y } from "@/components/home/rhythm";

/**
 * Help and the FAQ merged into one section (explored 27 Nov 2026). They were
 * two question-and-answer sections back to back. Booking questions on the
 * left (the FAQ accordion), boiler problems on the right as a plain list of
 * the help guides. No photos: the page already shows the job photos above.
 */
export function HelpFaq() {
  return (
    <section aria-labelledby="faq-h" className={`bg-surface ${SECTION_Y}`}>
      <div className="container-page">
        <h2 id="faq-h" className={H2_CLS}>
          Questions, answered
        </h2>

        <div className={`${HEAD_GAP} grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <h3 className="font-display text-xl font-extrabold tracking-[-0.02em] text-navy">Before you book</h3>
            <FaqList className="mt-4" />
          </div>

          <div>
            <h3 className="font-display text-xl font-extrabold tracking-[-0.02em] text-navy">Problem with your boiler?</h3>
            <p className="mt-1 text-neutral">Safe checks to try first, and when to call us.</p>
            <ul className="mt-4 border-t border-border-subtle">
              {HELP_PAGES.map((g) => (
                <li key={g.slug} className="border-b border-border-subtle">
                  <Link href={helpUrl(g.slug)} className="group flex min-h-[64px] items-center justify-between gap-4 py-4 font-semibold text-ink">
                    <span className="group-hover:underline group-hover:underline-offset-4">{g.navTitle}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-navy transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-action-text"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/help" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy underline underline-offset-4 hover:text-action-text">
              All help guides <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
