import Image from "next/image";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

type Props = {
  /** Extra items after the name, e.g. the rating link in the hero. */
  children?: ReactNode;
  tone?: "light" | "inverse";
  className?: string;
};

/**
 * "Your engineer: Jamie Hannah" with a 40px face avatar: Airbnb's compact
 * host byline, used in the hero and beside the contact form so the person
 * stays present while the copy stays in the business voice.
 * The avatar is a face crop of public/images/jamie-portrait.jpg.
 */
export function EngineerByline({ children, tone = "light", className = "" }: Props) {
  const inverse = tone === "inverse";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/jamie-avatar.jpg"
        alt=""
        width={40}
        height={40}
        sizes="40px"
        className={`h-10 w-10 shrink-0 rounded-full object-cover ring-2 ${
          inverse ? "ring-white/20" : "ring-border-subtle"
        }`}
      />
      <div className="min-w-0 text-sm leading-snug">
        <p className={inverse ? "text-inverse/80" : "text-muted"}>
          Your engineer:{" "}
          <span className={`font-semibold ${inverse ? "text-inverse" : "text-ink"}`}>
            {SITE.engineer}
          </span>
        </p>
        {children}
      </div>
    </div>
  );
}
