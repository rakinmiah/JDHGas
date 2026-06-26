import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | JDH Gas Services",
  description: "How JDH Gas Services collects and uses your data when you enquire. Read our privacy policy.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <LegalShell title="Privacy Policy" href="/privacy-policy" updated="26 June 2026">
      <p>
        This privacy policy explains how <strong>JDH Gas Services</strong> (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;)
        collects and uses your personal information when you use this website or get in touch. JDH
        Gas Services is a sole trader based in Burgess Hill, West Sussex.
      </p>

      <h2>What information I collect</h2>
      <p>When you submit an enquiry through this website, I collect the information you provide, which may include:</p>
      <ul>
        <li>Your name</li>
        <li>Your phone number</li>
        <li>Your email address (if you provide one)</li>
        <li>Your postcode</li>
        <li>The service you&apos;re interested in and any message or photo you choose to send</li>
      </ul>

      <h2>How I use it</h2>
      <p>
        I use this information solely to respond to your enquiry, arrange and carry out work, and
        keep a record of the jobs I&apos;ve done. I will not use your details for marketing without
        your consent, and I will never sell your information to anyone.
      </p>

      <h2>Lawful basis</h2>
      <p>
        I process your information on the basis of your <strong>consent</strong> (which you give when
        submitting the form) and my <strong>legitimate interest</strong> in responding to and
        carrying out the work you&apos;ve asked about.
      </p>

      <h2>Who I share it with</h2>
      <p>Your information is handled by a small number of trusted service providers that help run this website:</p>
      <ul>
        <li><strong>Resend</strong> — delivers enquiry emails to me.</li>
        <li><strong>Vercel</strong> — hosts this website.</li>
        <li><strong>Google Analytics</strong> — provides anonymous website usage statistics. It uses cookies only if you accept them; if you decline, it still collects anonymous, cookieless measurements that don&apos;t identify you.</li>
      </ul>

      <h2>How long I keep it</h2>
      <p>
        I keep enquiry and job records only for as long as needed to provide my service and to meet
        legal obligations (for example, gas safety records). You can ask me to delete your
        information at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK data protection law you have the right to access the information I hold about you,
        ask me to correct or delete it, or object to how I use it. To exercise any of these rights,
        contact me at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. If you&apos;re unhappy with how
        your data has been handled, you can complain to the Information Commissioner&apos;s Office
        (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener">ico.org.uk</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        This website uses a small number of cookies. See our <a href="/cookie-policy">Cookie Policy</a> for details.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Call <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> or email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalShell>
  );
}
