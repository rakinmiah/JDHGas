import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Services } from "@/components/home/Services";
import { MeetJamie } from "@/components/home/MeetJamie";
import { WhyChoose } from "@/components/home/WhyChoose";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Reviews } from "@/components/home/Reviews";
import { Gallery } from "@/components/home/Gallery";
import { ServiceArea } from "@/components/home/ServiceArea";
import { Faq } from "@/components/home/Faq";
import { CtaBand } from "@/components/home/CtaBand";
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
      <TrustBar />
      <Services />
      <Reviews />
      <MeetJamie />
      <WhyChoose />
      <LogoStrip />
      <Gallery />
      <ServiceArea />
      <Faq />
      <CtaBand />
    </>
  );
}
