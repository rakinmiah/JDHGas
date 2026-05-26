import Image from "next/image";

/** The JDH Gas shield logo, used wherever the brand mark appears. */
export function BrandMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <Image
      src="/shield-logo.png"
      alt=""
      width={64}
      height={64}
      aria-hidden
      className={`${className} object-contain`}
    />
  );
}
