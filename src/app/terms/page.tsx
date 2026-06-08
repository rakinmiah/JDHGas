import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | JDH Gas Services",
  description: "The terms that apply when you use the JDH Gas Services website and book our work.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalShell title="Terms of Service" href="/terms" updated="25 May 2026">
      <p>
        These terms apply to your use of the JDH Gas Services website. By using this website, you
        agree to them.
      </p>

      <h2>About this website</h2>
      <p>
        This website provides information about the gas and heating services offered by JDH Gas
        Services, a sole trader based in Burgess Hill, West Sussex, and a way to get in touch.
      </p>

      <h2>Enquiries and quotes</h2>
      <p>
        Submitting an enquiry through this website does not create a contract. Any prices mentioned
        on the site (such as the £85 first-service offer) are indicative; I&apos;ll confirm pricing
        and details with you directly before carrying out any work. The terms of the work itself are
        agreed between us at the time of booking.
      </p>

      <h2>Accuracy</h2>
      <p>
        I aim to keep the information on this website accurate and up to date, but I can&apos;t
        guarantee it&apos;s complete or error-free. Information here is for general guidance and is not
        a substitute for professional advice for your specific situation.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, branding and images on this website belong to JDH Gas Services and may not be
        copied or reused without permission.
      </p>

      <h2>Liability</h2>
      <p>
        Nothing in these terms limits my liability for anything that can&apos;t lawfully be limited.
        Otherwise, I&apos;m not liable for any loss arising from your use of this website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the law of England and Wales.</p>

      <h2>Contact</h2>
      <p>
        Questions? Call <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> or email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalShell>
  );
}
