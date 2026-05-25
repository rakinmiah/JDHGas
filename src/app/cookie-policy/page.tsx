import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/LegalShell";

export const metadata: Metadata = {
  title: "Cookie Policy | JDH Gas Services",
  description: "How JDH Gas Services uses cookies on this website and how to manage your choices.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicy() {
  return (
    <LegalShell title="Cookie Policy" href="/cookie-policy" updated="25 May 2026">
      <p>
        This website uses a small number of cookies — little files stored on your device — to help
        the site work and to understand how it&apos;s used. I keep these to a minimum.
      </p>

      <h2>Essential cookies</h2>
      <p>
        These are needed for the website to function (for example, remembering your cookie choice).
        They don&apos;t track you and are always on.
      </p>

      <h2>Analytics cookies</h2>
      <p>
        With your consent, I use Google Analytics to collect anonymous statistics about how visitors
        use the site — such as which pages are popular. This helps me improve the website. No
        analytics cookies are set until you accept them, and you can decline without affecting your
        use of the site.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can accept or decline analytics cookies using the banner shown when you first visit. You
        can also block or delete cookies through your browser settings at any time, though some parts
        of the site may not work as well if you do.
      </p>

      <h2>More information</h2>
      <p>
        For more on how I handle your information, see our <a href="/privacy-policy">Privacy Policy</a>.
      </p>
    </LegalShell>
  );
}
