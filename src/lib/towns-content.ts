import type { Faq } from "@/components/sections/FaqSection";

export type TownContent = {
  slug: string;
  name: string;
  postcode: string;
  metaTitle: string;
  metaDescription: string;
  /** Unique localised intro — keeps each town page >=60% distinct. */
  lead: string;
  neighbours: string[];
  localNote: string;
  faqs: Faq[];
};

export const TOWN_CONTENT: TownContent[] = [
  {
    slug: "burgess-hill",
    name: "Burgess Hill",
    postcode: "RH15",
    metaTitle: "Gas Engineer & Boiler Service, Burgess Hill | JDH",
    metaDescription:
      "Local Gas Safe engineer in Burgess Hill — boiler servicing, repairs & gas safety certificates. 5-star rated. Call Jamie at JDH Gas today.",
    lead: "Burgess Hill is home — I'm based right here in the RH15 area, so for boiler servicing, repairs or a gas safety certificate I'm rarely more than a few minutes away. As a Gas Safe registered engineer, I look after homeowners and landlords right across the town.",
    neighbours: ["World's End", "St John's", "Folders Lane", "Wivelsfield"],
    localNote:
      "Being local means I can usually fit Burgess Hill jobs in quickly — and you're getting the same named engineer every time, not a different face from a call centre.",
    faqs: [
      { q: "Are you based in Burgess Hill?", a: "Yes — JDH Gas Services is based in Burgess Hill (RH15), so I cover the whole town and the surrounding Mid Sussex villages." },
      { q: "How quickly can you come out in Burgess Hill?", a: "Because I'm local, I can often get to Burgess Hill jobs quickly — call or WhatsApp me and I'll let you know the soonest I can be there." },
    ],
  },
  {
    slug: "haywards-heath",
    name: "Haywards Heath",
    postcode: "RH16",
    metaTitle: "Gas Engineer in Haywards Heath | JDH Gas Services",
    metaDescription:
      "Gas Safe registered engineer serving Haywards Heath — boiler servicing, repairs & landlord CP12 certificates. Friendly, reliable, local. Book now.",
    lead: "Haywards Heath is just up the road from my base in Burgess Hill, so it's an easy area for me to cover. Whether you're in the town centre, Bolnore Village or out towards Lindfield, I provide boiler servicing, repairs and landlord gas safety certificates as a Gas Safe registered engineer.",
    neighbours: ["Lindfield", "Bolnore Village", "Franklands Village", "Lucastes"],
    localNote:
      "There are plenty of heating firms around Haywards Heath — what sets JDH apart is that you deal with me, Jamie, directly: a named, 5-star-rated engineer, not a faceless company.",
    faqs: [
      { q: "Do you cover Haywards Heath and Lindfield?", a: "Yes — Haywards Heath, Lindfield, Bolnore Village and the surrounding RH16 area are all within my regular patch from Burgess Hill." },
      { q: "Can you do landlord certificates in Haywards Heath?", a: "Absolutely — I provide CP12 landlord gas safety certificates across Haywards Heath, with a digital copy and a reminder when the next one's due." },
    ],
  },
  {
    slug: "hassocks",
    name: "Hassocks",
    postcode: "BN6",
    metaTitle: "Gas Engineer in Hassocks | JDH Gas Services",
    metaDescription:
      "Gas Safe engineer covering Hassocks — boiler servicing, repairs & gas safety certificates. 5-star rated local service. Call or WhatsApp Jamie.",
    lead: "Hassocks sits just south of Burgess Hill, right on my doorstep — which makes it one of the areas I cover most. From annual boiler servicing to repairs and gas safety certificates, you've got a Gas Safe registered engineer close by in the BN6 area.",
    neighbours: ["Keymer", "Ditchling", "Hurstpierpoint", "Clayton"],
    localNote:
      "I look after a lot of homes around Hassocks, Keymer and Ditchling — it's a short drive from Burgess Hill, so booking in is easy.",
    faqs: [
      { q: "Do you cover Hassocks, Keymer and Ditchling?", a: "Yes — Hassocks and the neighbouring villages of Keymer, Ditchling and Hurstpierpoint (BN6) are all part of my regular area." },
      { q: "Can you service my boiler in Hassocks?", a: "Of course — annual boiler servicing in Hassocks is one of the jobs I do most. Your first service is £75 for new customers." },
    ],
  },
  {
    slug: "cuckfield",
    name: "Cuckfield",
    postcode: "RH17",
    metaTitle: "Gas Engineer in Cuckfield | JDH Gas Services",
    metaDescription:
      "Gas Safe registered engineer in Cuckfield — boiler servicing, repairs & landlord gas safety certificates. Honest, careful local work. Book today.",
    lead: "Cuckfield is a short hop north of Burgess Hill, and a village I regularly work in. For careful boiler servicing, reliable repairs or a landlord gas safety certificate in the RH17 area, I'm a Gas Safe registered engineer who's local and easy to reach.",
    neighbours: ["Whitemans Green", "Ansty", "Borde Hill", "Haywards Heath"],
    localNote:
      "Cuckfield's older and characterful homes often have boilers tucked into awkward spots — I take the time to do the job properly and leave everything as I found it.",
    faqs: [
      { q: "Do you cover Cuckfield and Ansty?", a: "Yes — Cuckfield, Whitemans Green, Ansty and the surrounding RH17 area are all within easy reach from my Burgess Hill base." },
      { q: "Do you work on older heating systems in Cuckfield?", a: "Yes — I work on all makes and ages of boiler and heating system, and I'll always give you honest advice on whether to repair or replace." },
    ],
  },
];

export function getTown(slug: string) {
  return TOWN_CONTENT.find((t) => t.slug === slug);
}
