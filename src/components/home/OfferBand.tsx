import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function OfferBand() {
  return (
    <section className="bg-surface" aria-labelledby="offer-h">
      <div className="container-page py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">New customer offer</p>
          <h2 id="offer-h" className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Your first boiler service from{" "}
            <span className="text-primary">£85</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            A full, Gas Safe registered boiler service for new customers across Burgess Hill
            and Mid Sussex. No call-out charge, no surprises.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/contact?service=servicing">Book your service</Button>
          </div>
          <p className="mt-4 text-sm text-muted">
            Prices for repairs and certificates? Just ask for a quote.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
