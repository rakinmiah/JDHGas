import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { MeetJamie } from "@/components/home/MeetJamie";
import { WhyChoose } from "@/components/home/WhyChoose";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Reviews } from "@/components/home/Reviews";
import { ServiceArea } from "@/components/home/ServiceArea";
import { Faq } from "@/components/home/Faq";
import { ContactSection } from "@/components/home/ContactSection";
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
      <Hero />
      <Services />
      <Reviews />
      <WhyChoose />
      <LogoStrip />
      <MeetJamie />
      <ServiceArea />
      <Faq />
      <ContactSection />
    </>
  );
}
