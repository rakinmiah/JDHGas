import { BRANDS } from "@/lib/site";

export function LogoStrip() {
  return (
    <section className="section bg-sunken" aria-labelledby="brands-h">
      <div className="container-page text-center">
        <h2 id="brands-h" className="font-display text-2xl font-bold md:text-3xl">
          I service and repair every major make
        </h2>
        <p className="mt-2 text-muted">
          Including Worcester Bosch, Vaillant, Ideal, Baxi and more.
        </p>
        {/* Text wordmarks for now — official brand SVGs to be sourced (manifest). */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BRANDS.map((b) => (
            <li
              key={b}
              className="font-display text-xl font-bold uppercase tracking-wide text-steel transition-colors hover:text-ink md:text-2xl"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
