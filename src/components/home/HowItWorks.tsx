import { Phone } from "lucide-react";
import { Tabs, type Tab } from "@/components/ui/Tabs";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { SITE, WHATSAPP_REPAIR_HREF } from "@/lib/site";

type Step = { title: string; text: string };

function Steps({ steps, cta }: { steps: Step[]; cta: React.ReactNode }) {
  return (
    <div>
      <ol className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 lg:block">
            {/* Number, joined to the next by a hairline (vertical on phones) */}
            <div className="relative flex flex-col items-center lg:flex-row">
              <span className="font-display text-[2.5rem] font-extrabold leading-none tabular-nums text-primary">
                0{i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="mt-3 w-px flex-1 bg-border-strong lg:ml-4 lg:mt-0 lg:h-px lg:w-auto"
                />
              )}
            </div>
            <div className="pb-2 lg:mt-5 lg:pb-0">
              <h3 className="font-display text-h3 font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 lg:mt-10">{cta}</div>
    </div>
  );
}

const ctaCls = "w-full min-h-[48px] sm:w-auto";

/**
 * M6: how each job runs, one tab per job type (Heatable's per-product tabs),
 * because a CP12 and a repair genuinely run differently. Replaces the old
 * one-size four-step strip and its scroll-linked rail (the page keeps one
 * signature: M4).
 */
export function HowItWorks() {
  const tabs: Tab[] = [
    {
      id: "service",
      label: "Boiler service",
      panel: (
        <Steps
          steps={[
            {
              title: "Book online or call",
              text: "Choose a time online, or call or WhatsApp and we'll arrange one.",
            },
            {
              title: "Your service",
              text: "Flue gas analysis, pressure checks and safety tests. It usually takes 30 to 60 minutes.",
            },
            {
              title: "Your record",
              text: "You're left with a record of the work and a clear summary of the boiler's condition.",
            },
          ]}
          cta={
            <Button href="/book" className={ctaCls}>
              Book a service online
            </Button>
          }
        />
      ),
    },
    {
      id: "repair",
      label: "Repair",
      panel: (
        <Steps
          steps={[
            {
              title: "Send a photo",
              text: "WhatsApp a photo of the boiler and any fault code, or call and describe the problem.",
            },
            {
              title: "A clear quote first",
              text: "We find the fault and tell you what it costs before any work starts.",
            },
            {
              title: "Fixed and explained",
              text: "We explain what we found, what needs doing now and what can wait.",
            },
          ]}
          cta={
            <Button href={WHATSAPP_REPAIR_HREF} variant="whatsapp" className={ctaCls}>
              WhatsApp a photo
            </Button>
          }
        />
      ),
    },
    {
      id: "cp12",
      label: "Landlord certificate",
      panel: (
        <Steps
          steps={[
            {
              title: "Send the details",
              text: "Tell us the property address and who to contact for access.",
            },
            {
              title: "We arrange access",
              text: "We liaise with your tenant or letting agent to book a time.",
            },
            {
              title: "Certificate by email",
              text: "Your digital certificate is emailed to you, with a reminder when the next one is due.",
            },
          ]}
          cta={
            <Button
              href={SITE.phoneHref}
              className={ctaCls}
              aria-label={`Call JDH Gas about a CP12 on ${SITE.phoneDisplay}`}
            >
              <Phone className="h-5 w-5" aria-hidden /> Call about a CP12
            </Button>
          }
        />
      ),
    },
    {
      id: "install",
      label: "New boiler",
      panel: (
        <Steps
          steps={[
            {
              title: "Tell us about your home",
              text: "Call, WhatsApp or send a photo of your current boiler.",
            },
            { title: "A clear fixed quote", text: "You get a clear fixed quote for the work." },
            {
              title: "Fitted properly",
              text: "Your new boiler is fitted properly, and everything is explained in plain terms.",
            },
          ]}
          cta={
            <Button href="#enquiry" className={ctaCls}>
              Get a quote
            </Button>
          }
        />
      ),
    },
  ];

  return (
    <section className="section bg-sunken" aria-labelledby="how-h">
      <div className="container-page">
        <SectionIntro
          id="how-h"
          eyebrow="How it works"
          title={
            <>
              Every job, <Accent>step by step.</Accent>
            </>
          }
          aside={
            <p>
              Pick your job to see how it runs. Whatever it is, you get a clear price before any work
              starts.
            </p>
          }
        />
        <div className="mt-10 lg:mt-14">
          <Tabs tabs={tabs} label="Choose a job" />
        </div>
      </div>
    </section>
  );
}
