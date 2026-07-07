import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppGlyph } from "@/components/ui/icons";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost" | "ghostInverse";
type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-5 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[var(--shadow-sm)] hover:bg-primary-hover hover:shadow-[var(--shadow-md)] active:translate-y-px",
  secondary:
    "bg-surface text-ink border border-border-strong hover:border-primary hover:text-primary active:translate-y-px",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-hover active:translate-y-px",
  ghost:
    "text-primary hover:text-primary-hover underline-offset-4 hover:underline px-2",
  ghostInverse:
    "bg-white/10 text-inverse border border-white/25 hover:bg-white/20 active:translate-y-px",
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {variant === "whatsapp" && <WhatsAppGlyph className="h-5 w-5" />}
      {children}
    </>
  );
  // Plain <a> for external, protocol, and in-page hash links. Hash links in
  // particular must NOT use next/link — the App Router mishandles same-page
  // anchor scrolling; a native anchor + scroll-padding-top just works.
  if (
    external ||
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    const target = href.startsWith("http") ? "_blank" : undefined;
    const rel = target ? "noopener" : undefined;
    return (
      <a href={href} target={target} rel={rel} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
