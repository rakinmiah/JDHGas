import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalShell({
  title,
  href,
  updated,
  children,
}: {
  title: string;
  href: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-sunken">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: title, href }]} />
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-page legal max-w-3xl">{children}</div>
      </section>
    </>
  );
}
