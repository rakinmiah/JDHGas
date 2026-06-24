import type { Faq } from "@/components/sections/FaqSection";

export type ServiceBlock = { heading: string; body?: string; bullets?: string[] };

export type ServiceContent = {
  slug: string;
  navTitle: string;
  h1: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  /** Answer-first lead paragraph (40–80 words). */
  lead: string;
  blocks: ServiceBlock[];
  image: string;
  imageAlt: string;
  serviceType: string;
  offerPrice?: string;
  faqs: Faq[];
};

export const SERVICE_CONTENT: ServiceContent[] = [
  {
    slug: "boiler-servicing",
    navTitle: "Boiler servicing",
    eyebrow: "Boiler servicing",
    h1: "Boiler servicing in Burgess Hill",
    metaTitle: "Boiler Service in Burgess Hill | JDH Gas Services",
    metaDescription:
      "Annual boiler servicing in Burgess Hill by a Gas Safe registered engineer. Thorough safety & efficiency checks. First service from £85. Book today.",
    lead: "A boiler service is an annual safety and efficiency check carried out by a Gas Safe registered engineer. I inspect and test your boiler's key components, check it's burning safely, and flag anything that needs attention, so small issues are caught before they become breakdowns. Your first service is £85 for new customers.",
    image: "/images/work/bosch-service.jpg",
    imageAlt: "Jamie servicing the internals of a boiler during an annual service in Burgess Hill",
    serviceType: "Boiler Servicing",
    offerPrice: "85",
    blocks: [
      {
        heading: "What's included in your service",
        body: "Every service is done by the book, with no rushing and no skipped steps. I take my time and explain anything I find in clear, everyday terms.",
        bullets: [
          "Full visual inspection of the boiler and its installation",
          "Flue gas analysis and combustion readings to confirm it's burning safely",
          "Gas pressure and flow checks",
          "Testing of controls, seals and safety devices",
          "Checking the casing, fans and heat exchanger",
          "A clear summary of the boiler's condition and any recommendations",
        ],
      },
      {
        heading: "When to book",
        body: "Late summer to autumn is the ideal time. It gets your boiler ready before the winter workload, and beats the cold-snap rush. If it's been more than 12 months, or you've just moved in, it's worth booking in.",
      },
    ],
    faqs: [
      { q: "How much is a boiler service?", a: "A boiler service is £85 for new customers. It's a full Gas Safe check. If anything needs repairing, I'll always give you a clear quote before doing any extra work." },
      { q: "How long does a boiler service take?", a: "A standard boiler service usually takes 30–60 minutes, depending on the make and how accessible the boiler is. I won't rush it. A proper service is worth doing well." },
      { q: "How often should a boiler be serviced?", a: "Once every 12 months by a Gas Safe registered engineer. It keeps the boiler safe and efficient, and most manufacturer warranties require an annual service to stay valid." },
      { q: "Do I need a service to keep my warranty valid?", a: "In most cases yes. Boiler manufacturers usually require proof of an annual service to honour the warranty. I'll leave you with a record of the work either way." },
    ],
  },
  {
    slug: "gas-safety-certificate",
    navTitle: "Gas safety certificates (CP12)",
    eyebrow: "Landlord gas safety certificates",
    h1: "Landlord gas safety certificates (CP12) in Burgess Hill",
    metaTitle: "Landlord Gas Safety Certificate, Burgess Hill | JDH",
    metaDescription:
      "Landlord CP12 gas safety certificates in Burgess Hill from a Gas Safe engineer. Legal annual checks, fast turnaround, digital copy. Book today.",
    lead: "A CP12, the Landlord Gas Safety Certificate, is a legal requirement. UK landlords must have every gas appliance, pipe and flue in a rented property checked every 12 months by a Gas Safe registered engineer. I carry out CP12 checks across Burgess Hill and Mid Sussex, with a digital certificate sent straight to you.",
    image: "/images/work/manometer.jpg",
    imageAlt: "Gas pressure test being carried out as part of a landlord gas safety check in Burgess Hill",
    serviceType: "Gas Safety Certificate (CP12)",
    blocks: [
      {
        heading: "What the law requires",
        bullets: [
          "An annual check of all gas appliances, pipework and flues (every 12 months)",
          "A copy of the certificate given to existing tenants within 28 days of the check",
          "A copy given to any new tenant before they move in",
          "Records kept for at least two years",
        ],
      },
      {
        heading: "For landlords and letting agents",
        body: "Whether it's one property or a portfolio, I make CP12s straightforward: a digital certificate by email, a reminder when your next one is due, and I'm happy to liaise directly with tenants or your agent to arrange access.",
      },
      {
        heading: "Homeowners",
        body: "You don't legally need a CP12 if you own your home, but an annual gas safety check is a sensible way to be sure your appliances are safe. Just ask and I'll sort it.",
      },
    ],
    faqs: [
      { q: "What is a CP12 / landlord gas safety certificate?", a: "A CP12 is the Landlord Gas Safety Certificate. By law, landlords must have every gas appliance, pipe and flue in a rented property checked every 12 months by a Gas Safe registered engineer." },
      { q: "How long is a gas safety certificate valid?", a: "A CP12 is valid for 12 months and must be renewed annually. You must give tenants a copy within 28 days of the check, and keep records for at least two years." },
      { q: "Do homeowners need a gas safety certificate?", a: "No. A CP12 is a legal requirement only for landlords. Homeowners aren't required to have one, but an annual gas safety check is still strongly recommended for peace of mind." },
      { q: "What does a CP12 cover?", a: "It covers all fixed gas appliances (boiler, cooker, fire), the gas pipework and the flues, checking they're safe, correctly installed and burning properly." },
      { q: "How much is a landlord gas safety certificate?", a: "It depends on how many gas appliances need checking. Send me your postcode and the number of appliances and I'll give you a clear price." },
    ],
  },
  {
    slug: "boiler-repairs",
    navTitle: "Heating system repairs",
    eyebrow: "Heating system & boiler repairs",
    h1: "Heating system & boiler repairs in Burgess Hill",
    metaTitle: "Boiler Repair in Burgess Hill | JDH Gas Services",
    metaDescription:
      "Fast, reliable boiler & heating repairs in Burgess Hill from Gas Safe engineer Jamie Hannah. All major brands fixed. Call or WhatsApp for a quick response.",
    lead: "If your boiler's stopped, your heating's gone cold or you've lost hot water, I carry out fast, reliable repairs on boilers and full heating systems, on every major make. Tell me what's happening (a photo of the boiler and any fault code helps) and I'll get you booked in quickly and give you an honest answer on what it needs.",
    image: "/images/work/analyser-worcester.jpg",
    imageAlt: "Diagnosing a boiler fault with a flue gas analyser during a repair in Burgess Hill",
    serviceType: "Heating System & Boiler Repair",
    blocks: [
      {
        heading: "Common problems I fix",
        bullets: [
          "No hot water or heating",
          "Boiler losing pressure or leaking",
          "Boiler showing a fault code or locking out",
          "Radiators cold at the bottom or not heating up",
          "Strange noises like banging, gurgling or whistling",
          "Pilot light or ignition problems",
        ],
      },
      {
        heading: "Repair or replace? I'll tell you straight",
        body: "Not every fault is worth fixing on an old boiler, and not every old boiler needs replacing. I'll give you honest advice on whether a repair makes sense or whether your money is better spent elsewhere. No pressure, no upsell.",
      },
      {
        heading: "Response times",
        body: "I work Monday to Friday and prioritise breakdowns where I can. I don't claim to be a 24/7 emergency service, but I'll always be upfront about when I can get to you.",
      },
    ],
    faqs: [
      { q: "Why won't my boiler fire up?", a: "Common causes are low pressure, a tripped lockout/fault code, a frozen condensate pipe in winter, or a faulty component like the ignition or fan. Send me the make and any fault code and I'll know where to start." },
      { q: "Why is my boiler losing pressure?", a: "Usually a small leak somewhere in the system or a failed expansion vessel. If you're topping it up often, it's worth getting looked at before it causes bigger problems." },
      { q: "Should I repair or replace my boiler?", a: "It depends on the boiler's age, the fault and the repair cost. As a rough guide, if a boiler is over ~12 years old and facing an expensive repair, replacement is often the better value, but I'll give you honest advice for your situation." },
      { q: "Do you repair all makes of boiler?", a: "Yes.I work on all the major makes including Worcester Bosch, Vaillant, Ideal, Baxi and Bosch." },
    ],
  },
  {
    slug: "boiler-heating-installation",
    navTitle: "Boiler & heating installation",
    eyebrow: "Boiler & heating installation",
    h1: "Boiler & heating installation in Burgess Hill",
    metaTitle: "Boiler Installation in Burgess Hill | JDH Gas Services",
    metaDescription:
      "New boiler & heating installation in Burgess Hill by Gas Safe engineer Jamie Hannah. Honest advice, a clear fixed quote and a tidy install. Get a free quote.",
    lead: "From a like-for-like boiler swap to a full new heating system, fitted properly. I specialise in Glow-worm, Vaillant, Ideal and Worcester Bosch, and I'll help you choose the right boiler for your home and budget, with honest advice and a clear, fixed quote before any work starts.",
    image: "/images/work/ideal-install.jpg",
    imageAlt: "A new boiler freshly installed by JDH Gas in Burgess Hill",
    serviceType: "Boiler Installation",
    blocks: [
      {
        heading: "What a new installation includes",
        body: "Done properly, to current regulations, with no shortcuts.",
        bullets: [
          "Advice on the right boiler for your home and budget",
          "Supply and fit (Glow-worm, Vaillant, Ideal, Worcester Bosch)",
          "Safe removal and disposal of your old boiler",
          "A chemical flush and system inhibitor",
          "New controls, filter and any pipework needed",
          "Commissioning, safety checks and Gas Safe registration",
        ],
      },
      {
        heading: "Repair or replace? I'll tell you straight",
        body: "Not every old boiler needs replacing. If yours can be repaired and it's worth it, I'll say so, rather than sell you one you don't need. And if a new boiler is the better value, I'll recommend what suits your home, not the priciest option.",
      },
      {
        heading: "A clear quote, and a warranty that stays valid",
        body: "No surprises. After a quick visit or a few photos, you get a written, fixed quote covering the boiler, parts and labour. And because I'm Gas Safe registered, I register every installation, so your manufacturer's warranty stays valid.",
      },
    ],
    faqs: [
      { q: "How much does a new boiler cost?", a: "It depends on the boiler and your home, so I give every customer a clear, fixed quote first, with no obligation. Send me a few photos or book a quick visit and I'll price it up properly." },
      { q: "How long does a boiler installation take?", a: "A straightforward combi swap is usually a day. A bigger job, like moving the boiler or upgrading the system, can take two to three. I'll always tell you what to expect up front." },
      { q: "Do you do like-for-like boiler swaps?", a: "Yes. If you're happy with where your boiler is and just want it replaced with a similar model, a like-for-like swap is usually the quickest and most cost-effective option, often done in a day. I'll tell you if a different setup would suit you better." },
      { q: "Which boiler should I get?", a: "It depends on your home and how you use hot water. Combis suit smaller homes with one bathroom; system boilers suit larger homes with higher demand. I'll recommend what genuinely fits, not the priciest option." },
      { q: "Which boiler brands do you install?", a: "I specialise in Glow-worm, Vaillant, Ideal and Worcester Bosch boilers. They're reliable, well-supported and come with strong manufacturer warranties. If you've got a preference, just ask." },
      { q: "Do you remove the old boiler?", a: "Yes. I safely disconnect, remove and dispose of your old boiler as part of the job, and leave everything clean and tidy." },
      { q: "Will my new boiler be under warranty?", a: "Yes. New boilers come with a manufacturer's warranty, and because I'm Gas Safe registered I register the installation so your warranty stays valid. You'll get all the paperwork." },
    ],
  },
  {
    slug: "gas-appliances",
    navTitle: "Gas hob installs",
    eyebrow: "Gas hob & cooker installation",
    h1: "Gas hob & cooker installation in Burgess Hill",
    metaTitle: "Gas Hob & Cooker Fitting Burgess Hill | JDH Gas",
    metaDescription:
      "Gas Safe hob & cooker installation in Burgess Hill. Safe fitting, removal and tightness testing of gas appliances by Jamie Hannah. Get in touch.",
    lead: "By law, gas hobs and cookers must be installed by a Gas Safe registered engineer. I fit new gas hobs and cookers, safely remove old ones, and tightness-test the connection so you know it's safe to use. Happy to fit an appliance you've already bought. Just send me the details.",
    image: "/images/work/gas-hob.jpg",
    imageAlt: "Newly installed gas hob safety-checked and tested by JDH Gas in Burgess Hill",
    serviceType: "Gas Appliance Installation",
    blocks: [
      {
        heading: "What I do",
        bullets: [
          "Install new gas hobs and cookers",
          "Safely disconnect and remove old appliances",
          "Check and update the gas connection and isolation",
          "Tightness-test and confirm safe operation",
          "Leave everything clean and ready to use",
        ],
      },
      {
        heading: "Bought your own appliance?",
        body: "No problem. If you've ordered a new hob or cooker, I can fit it for you. Send me the make and model and a photo of where it's going, and I'll let you know what's involved.",
      },
    ],
    faqs: [
      { q: "Do I need a Gas Safe engineer to fit a gas hob?", a: "Yes.it's a legal requirement that any gas appliance is installed by a Gas Safe registered engineer. Fitting one yourself or using an unregistered installer is unsafe and illegal." },
      { q: "Can you fit a gas hob I've already bought?", a: "Absolutely. Send me the make and model and a photo of the space, and I'll confirm what's needed and give you a price." },
      { q: "Do you remove the old appliance?", a: "Yes.I'll safely disconnect and remove your old hob or cooker as part of the job." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICE_CONTENT.find((s) => s.slug === slug);
}
