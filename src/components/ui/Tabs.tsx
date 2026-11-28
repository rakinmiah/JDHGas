"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type Tab = { id: string; label: string; panel: ReactNode };

/**
 * WAI-ARIA tabs with automatic activation (arrow keys move and select,
 * Home/End jump). Every panel is rendered (hidden ones with `hidden`) so all
 * content is in the server HTML and crawlable, and the panels share one grid
 * cell so the section height is the tallest panel's: switching never shifts
 * the page. Desktop: underline tabs; phones: a 2×2 segmented grid.
 */
export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = tabs.length - 1;
    const to =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (to === null) return;
    e.preventDefault();
    setActive(tabs[to].id);
    refs.current[to]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="grid grid-cols-2 gap-1 rounded-[var(--radius-lg)] bg-border-subtle/70 p-1 sm:flex sm:gap-8 sm:rounded-none sm:border-b sm:border-border-subtle sm:bg-transparent sm:p-0"
      >
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative min-h-[44px] rounded-[calc(var(--radius-lg)-4px)] px-3 text-[0.9375rem] font-semibold transition-colors duration-200 outline-offset-[-2px] sm:-mb-px sm:rounded-none sm:border-b-2 sm:px-0 ${
                selected
                  ? "bg-surface text-ink shadow-[var(--shadow-sm)] sm:border-primary sm:bg-transparent sm:shadow-none"
                  : "text-muted hover:text-ink sm:border-transparent"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid lg:mt-10">
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <div
              key={t.id}
              id={`${base}-panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`${base}-tab-${t.id}`}
              tabIndex={0}
              // Hidden panels stay in the grid cell (visibility, not display)
              // so the cell keeps the tallest panel's height.
              aria-hidden={!selected}
              inert={!selected}
              className={`col-start-1 row-start-1 transition-opacity duration-300 outline-offset-4 max-lg:transition-none ${
                selected ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              {t.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
