import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { ServicesV1 } from "@/components/home/ServicesDev";
import { WhosComing } from "@/components/home/WhosComing";
import { Reviews, AreaBand } from "@/components/home/HomeSections";
import { HelpBento } from "@/components/home/HelpBento";
import { Faq } from "@/components/home/Faq";
import { ContactSection } from "@/components/home/ContactSection";
import { SECTION_Y } from "@/components/home/rhythm";
import { FAQS } from "@/lib/site";

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      {/* Order (28 Nov 2026): hero, makes, services, reviews (with the
          booking line), area, what to look for when we arrive, help, then the
          FAQ and the enquiry form close the page. */}
      <Hero fullBleed mobile="overlay" />
      <LogoStrip light />
      <ServicesV1 />
      <Reviews />
      <AreaBand layout="head" />
      <WhosComing variant="portrait" />
      <HelpBento count={5} noPhoto="photos" />
      <Faq />
      <ContactSection sectionY={SECTION_Y} />
    </>
  );
}
