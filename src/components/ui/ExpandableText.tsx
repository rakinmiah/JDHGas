"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A paragraph that clamps on small screens with a Read more / Read less
 * toggle. The toggle only renders when the text is actually truncated (or has
 * been expanded), so unclamped screens (md+) and short texts never show it.
 * The full text is always in the DOM — clamping is purely visual.
 */
export function ExpandableText({
  text,
  className = "",
  clampClass = "line-clamp-5 md:line-clamp-none",
}: {
  text: string;
  className?: string;
  clampClass?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (!expanded) setTruncated(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [expanded, text]);

  return (
    <>
      <p ref={ref} className={`${className} ${expanded ? "" : clampClass}`}>
        {text}
      </p>
      {(truncated || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-1.5 text-sm font-semibold text-primary hover:text-primary-hover md:hidden"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
}
