import type { Faq } from "@/components/sections/FaqSection";
import { getService, type ServiceContent } from "@/lib/services-content";
import { SITE } from "@/lib/site";

/**
 * Town location pages — ONE rich, genuinely-local page per town. Each leads with
 * the two highest-intent services (landlord CP12 + boiler servicing) as full
 * sections, then links the rest of JDH's services. Burgess Hill is intentionally
 * excluded: the homepage and the /services hubs already own it.
 *
 * The whole point (see seo/location-pages-strategy.md §C) is to NOT be a templated
 * doorway page. Every town carries a unique answer-first intro, real local
 * geography, a named Gas Safe engineer, a real job photo, the live 5.0 rating and
 * — where we have them — genuine, town-matched Google reviews (see
 * seo/review-locations.md). That trust + depth is exactly what the ranking
 * competitors lack.
 *
 * LAUNCH WAVE 1 = LOCAL_TOWNS below (review-backed core + flagship Hassocks).
 * WAVE_2_TOWNS are built but held back until they have their own review/photo.
 */

/** Services shown as full sections on every town page, in this order. */
export const SECTION_SERVICE_SLUGS = [
  "gas-safety-certificate",
  "boiler-servicing",
] as const;

/** Services linked (not expanded) lower down the page. */
export const ALSO_SERVICE_SLUGS = [
  "boiler-repairs",
  "boiler-heating-installation",
  "gas-appliances",
] as const;

/** A genuine, town-matched Google review (confirmed by Jamie; see review-locations.md). */
export type TownReview = { name: string; text: string };

export type Town = {
  slug: string;
  name: string;
  postcode: string;
  /** Neighbouring places — used for coverage copy. */
  nearby: string[];
  coast?: boolean;
  /** Answer-first, genuinely-local intro (≈50–90 words). Unique per town. */
  intro: string;
  /** One-line town-specific card blurb for the /areas hub (distinct per town). */
  blurb?: string;
  /** Real neighbourhoods/landmarks (factual geography — never fabricated jobs). */
  areas?: string[];
  /** Town-specific angle per section service, keyed by service slug. */
  serviceAngles: Record<string, string>;
  /** Genuine town-specific FAQs. */
  faqs: Faq[];
  /** Hero photo (real JDH job photo). Falls back to a default if unset. */
  photo?: string;
  photoAlt?: string;
  /** Genuine Google reviews from customers in this town. */
  reviews?: TownReview[];
};

const DEFAULT_PHOTO = "/images/work/bosch-service.jpg";

// ---------------------------------------------------------------------------
// WAVE 1 — live launch set (review-backed core + Hassocks)
// ---------------------------------------------------------------------------
export const LOCAL_TOWNS: Town[] = [
  {
    slug: "haywards-heath",
    name: "Haywards Heath",
    postcode: "RH16",
    nearby: ["Lindfield", "Cuckfield", "Wivelsfield"],
    intro:
      "Need a boiler serviced, a landlord certificate or a gas engineer in Haywards Heath? I'm Jamie Hannah, a Gas Safe registered engineer based a short drive away in Burgess Hill, covering all of Haywards Heath, from the Victorian terraces around the station and Bentswood to the newer homes near the Princess Royal Hospital. Same engineer every visit, honest advice and a proper job done. Call 07544 063330 to book.",
    areas: [
      "the station & Boltro Road",
      "Bentswood",
      "Lucastes",
      "Franklynn",
      "Gander Hill",
      "Ashenground",
      "the Princess Royal Hospital area",
    ],
    serviceAngles: {
      "gas-safety-certificate":
        "Haywards Heath has a busy rental market around the station and town centre, so I keep landlord CP12s simple: a digital certificate by email, a free reminder when the next one's due, and I'll arrange access directly with your tenants or letting agent.",
      "boiler-servicing":
        "Haywards Heath homes run from older floor-standing boilers in the Victorian terraces to modern combis on the newer estates. I service them all, by the book and without rushing, and explain anything I find in plain English.",
    },
    blurb:
      "Victorian terraces by the station, newer estates, and simple CP12s for the town's busy rental market.",
    photo: "/images/work/service-combi-kitchen.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Haywards Heath, servicing a combi boiler",
    reviews: [
      {
        name: "Clare O",
        text: "Jamie arrived within the time frame given and was friendly, polite and efficient - did the boiler service and discussed the outcome. Really good experience and would recommend 😊 thanks so much!",
      },
    ],
    faqs: [
      {
        q: "Do you cover Haywards Heath for boiler servicing and repairs?",
        a: "Yes. I'm based in Burgess Hill, just a few minutes away, and work across Haywards Heath, Lindfield and Cuckfield regularly. Send me your postcode and I'll confirm a same-week slot where I can.",
      },
      {
        q: "Can you do a landlord gas safety certificate (CP12) in Haywards Heath?",
        a: "Yes. I issue CP12 certificates for landlords and agents right across Haywards Heath and RH16, with a digital copy by email and a free reminder when your renewal is due.",
      },
    ],
  },
  {
    slug: "hassocks",
    name: "Hassocks",
    postcode: "BN6",
    nearby: ["Keymer", "Ditchling", "Hurstpierpoint"],
    intro:
      "Looking for a gas engineer in Hassocks? I'm Jamie Hannah, Gas Safe registered and based just up the road in Burgess Hill, so Hassocks is one of my closest patches: usually a quick trip to Stonepound crossroads, Adastra Park or out towards Keymer. Boiler servicing, landlord certificates, repairs and installs, all done properly by the same engineer each time. Call 07544 063330.",
    areas: [
      "Stonepound crossroads",
      "Adastra Park",
      "Friars Oak",
      "Parklands",
      "the Keymer side",
    ],
    serviceAngles: {
      "gas-safety-certificate":
        "Plenty of Hassocks homes near the station are let to Brighton and London commuters, so I keep landlord CP12s painless: flexible access around tenants, a digital certificate the same day where I can, and a reminder before the next one's due.",
      "boiler-servicing":
        "Being only a few minutes from Hassocks, I can usually fit a service in quickly: a thorough, by-the-book annual check that keeps your boiler safe, efficient and within its warranty.",
    },
    blurb:
      "One of my closest patches, only a quick trip from Burgess Hill, Stonepound to the Keymer side.",
    photo: "/images/work/boiler-inspection-torch.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Hassocks, inspecting an open boiler by torchlight during a service",
    reviews: [
      {
        name: "Ann Karlsson",
        text: "Jamie was very professional and turned up on time. He also carried out some work which was needed.",
      },
    ],
    faqs: [
      {
        q: "How quickly can you get to Hassocks?",
        a: "Hassocks is one of my closest areas (I'm just up the road in Burgess Hill), so I can often get there within the same week, and quickly for a breakdown. Drop me your postcode and I'll give you a time.",
      },
      {
        q: "Do you issue landlord gas safety certificates (CP12) in Hassocks?",
        a: "Yes. I provide CP12 certificates for landlords and letting agents across Hassocks, Keymer and BN6, with a digital copy by email and a free renewal reminder.",
      },
    ],
  },
  {
    slug: "hove",
    name: "Hove",
    postcode: "BN3",
    nearby: ["Portslade", "Brighton"],
    coast: true,
    intro:
      "Need a Gas Safe engineer in Hove? I'm Jamie Hannah, based in Burgess Hill and covering Hove as part of my coastal patch. Hove's mix of mansion flats, Victorian conversions and family homes keeps the work varied, from awkward flat installs to straightforward combi services. Boiler servicing, landlord CP12s and repairs, done properly with honest advice. Call 07544 063330 to book.",
    serviceAngles: {
      "gas-safety-certificate":
        "Hove has one of the busiest rental markets on the coast, so I make landlord CP12s easy: digital certificates by email, free renewal reminders, and access arranged directly with tenants or your agent.",
      "boiler-servicing":
        "From mansion-flat boilers to family-home combis, I give every Hove boiler a full, by-the-book annual service, and explain what I find in plain terms.",
    },
    blurb:
      "Mansion flats, Victorian conversions and family homes: the heart of my coastal patch.",
    photo: "/images/work/boiler-service-close.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Hove, inspecting an open boiler during an annual service",
    reviews: [
      {
        name: "Eros Negri",
        text: "Fantastic service from Jamie! Communication was clear from the start, he arrived on time, and was professional, clean, and tidy throughout. He carefully explained everything and carried out the gas hob swap as well as a gas safety certificate efficiently. Highly skilled and reliable - couldn't recommend him more.",
      },
      {
        name: "Debbie Murray",
        text: "Excellent service, professional as well as very helpful. Clean and tidy when carrying out the service. I would highly recommend 👍",
      },
    ],
    faqs: [
      {
        q: "Do you cover Hove, even though you're in Burgess Hill?",
        a: "Yes. Hove is part of my regular coastal coverage, and plenty of engineers travel further than that. Send me your postcode and I'll confirm what I can do and when.",
      },
    ],
  },
  {
    slug: "portslade",
    name: "Portslade",
    postcode: "BN41",
    nearby: ["Hove", "Southwick"],
    coast: true,
    intro:
      "After a gas engineer in Portslade? I'm Jamie Hannah, Gas Safe registered in Burgess Hill, covering Portslade, from the old village up to the seafront, alongside neighbouring Hove. Boiler servicing, landlord certificates, repairs and installs, all done by the same engineer with honest advice and a tidy finish. Call 07544 063330.",
    serviceAngles: {
      "gas-safety-certificate":
        "Landlord CP12 certificates across Portslade and BN41: a digital copy by email, free renewal reminders and access sorted with your tenants.",
      "boiler-servicing":
        "A thorough annual boiler service anywhere in Portslade, from the old village to the seafront, done properly and without rushing.",
    },
    blurb:
      "From the old village up to the seafront, covered alongside Hove on my coastal runs.",
    photo: "/images/work/analyser-older-boiler.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Portslade, testing a boiler with a flue gas analyser",
    reviews: [
      {
        name: "Emma Buckwell",
        text: "Jamie came through Ovo to look at our boiler after the first guy couldn't fix it. He managed to get our heating working again and sorted the problem. Jamie is a very polite, friendly young man and very professional. Would certainly recommend him. Left it tidy too.",
      },
    ],
    faqs: [
      {
        q: "Do you cover Portslade?",
        a: "Yes. Portslade's part of my coastal coverage alongside Hove. Send me your postcode and I'll let you know when I can get to you.",
      },
    ],
  },
  {
    slug: "hurstpierpoint",
    name: "Hurstpierpoint",
    postcode: "BN6",
    nearby: ["Hassocks", "Sayers Common", "Albourne"],
    intro:
      "Looking for a Gas Safe engineer in Hurstpierpoint? I'm Jamie Hannah, based just over in Burgess Hill, so Hurstpierpoint is one of my closest patches: an easy run to the High Street, Western Road or out towards Sayers Common. Boiler servicing, landlord certificates, repairs and installs, all done properly by the same engineer each visit. Call 07544 063330.",
    areas: ["the High Street", "Western Road", "Cuckfield Road"],
    serviceAngles: {
      "gas-safety-certificate":
        "I issue landlord CP12 certificates across Hurstpierpoint and BN6: a digital copy by email, a free reminder when it's due, and I'll arrange access with your tenants or agent.",
      "boiler-servicing":
        "From the village-centre cottages to the newer closes, I give every Hurstpierpoint boiler a thorough, by-the-book annual service: no rushing, and a clear summary of anything I find.",
    },
    blurb:
      "An easy run from Burgess Hill, from the High Street cottages to the newer closes.",
    photo: "/images/work/boiler-inspection-close.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Hurstpierpoint, inspecting an open boiler during a service",
    reviews: [
      {
        name: "Sarah Minnis",
        text: "Thank you Jamie for the great job today. Highly recommend!",
      },
      {
        name: "Andy Wagstaff",
        text: "Jamie serviced our boiler and did a really good job. He is very conscientious, polite and his communication from start to finish was excellent. Recommended.",
      },
      {
        name: "Leon Ellerton",
        text: "Excellent, thorough and polite",
      },
    ],
    faqs: [
      {
        q: "Do you cover Hurstpierpoint?",
        a: "Yes. Hurstpierpoint is one of my closest areas to Burgess Hill, so I'm there regularly. Send your postcode and I'll confirm a same-week slot where I can.",
      },
      {
        q: "Can you do a landlord gas safety certificate (CP12) in Hurstpierpoint?",
        a: "Yes, for landlords and letting agents across Hurstpierpoint and BN6, with a digital certificate by email and a free renewal reminder.",
      },
    ],
  },
  {
    slug: "lewes",
    name: "Lewes",
    postcode: "BN7",
    nearby: ["Ringmer", "Kingston", "Ditchling"],
    intro:
      "Need a Gas Safe engineer in Lewes? I'm Jamie Hannah, covering the county town from my Burgess Hill base. Lewes runs from steep-street period houses near the Castle and Cliffe to the newer estates out towards Landport and Nevill, so I see everything from older system boilers to modern combis. Boiler servicing, landlord CP12s, repairs and installs: same engineer, honest advice, tidy work. Call 07544 063330.",
    areas: ["the Castle & Cliffe", "Landport", "Nevill", "Wallands"],
    serviceAngles: {
      "gas-safety-certificate":
        "Lewes has a deep rental market, so I keep landlord CP12s simple: a digital certificate by email, a free renewal reminder, and access arranged with your tenants or agent.",
      "boiler-servicing":
        "Lewes's older, characterful homes often have boilers in awkward spots. I take the time to service them properly wherever they are, and explain anything I find in plain terms.",
    },
    blurb:
      "Steep-street period houses to the newer estates, with boilers in awkward spots done properly.",
    photo: "/images/work/analyser-worcester.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Lewes, diagnosing a boiler with a flue gas analyser",
    reviews: [
      {
        name: "Gary Eke",
        text: "Jamie first visited us under our Ovo cover to fix a fault with our boiler that was left over from a previous plumber. He was extremely professional, personable and friendly, not to mention meticulous. After carefully working through the faults, he was able to find the cause of the problem and came back at the earliest opportunity with a replacement part to solve the problem. We have already had him back to fix an issue with our radiators! Can't recommend Jamie highly enough.",
      },
    ],
    faqs: [
      {
        q: "Do you cover Lewes?",
        a: "Yes. I cover Lewes and the surrounding villages from Burgess Hill. Send me your postcode and I'll let you know the soonest I can get to you.",
      },
      {
        q: "Can you issue a landlord gas safety certificate (CP12) in Lewes?",
        a: "Yes, for landlords and agents across Lewes and the BN7/BN8 area, with a digital copy by email and a reminder when it's next due.",
      },
    ],
  },
  {
    slug: "henfield",
    name: "Henfield",
    postcode: "BN5",
    nearby: ["Small Dole", "Woodmancote", "Partridge Green"],
    intro:
      "After a Gas Safe engineer in Henfield? I'm Jamie Hannah, covering Henfield and the surrounding villages from nearby Burgess Hill. From the High Street and village cottages to the newer closes off the Brighton Road, I look after boilers and heating of every age. Servicing, landlord certificates, repairs and installs, all done properly by the same engineer with a tidy finish. Call 07544 063330.",
    areas: ["the High Street", "Brighton Road", "Small Dole", "Woodmancote"],
    serviceAngles: {
      "gas-safety-certificate":
        "Landlord CP12 certificates across Henfield and BN5: a digital certificate by email, a free renewal reminder, and I'll sort access with your tenants.",
      "boiler-servicing":
        "A full, unhurried annual boiler service anywhere in Henfield, keeping your boiler safe, efficient and within its warranty.",
    },
    blurb:
      "Henfield and the villages around it: boilers and heating of every age.",
    photo: "/images/work/bosch-rafters-controls.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Henfield, working on a Bosch boiler tucked under the rafters",
    reviews: [
      {
        name: "Max",
        text: "We hired Jamie to carry out some gas work for us and he did a fantastic job. He was professional, efficient and even left everything clean and tidy afterwards. Highly recommended!",
      },
    ],
    faqs: [
      {
        q: "Do you cover Henfield?",
        a: "Yes. I cover Henfield and nearby villages from Burgess Hill. Drop me your postcode and I'll confirm a slot.",
      },
    ],
  },
  {
    slug: "horsham",
    name: "Horsham",
    postcode: "RH12",
    nearby: ["Southwater", "Broadbridge Heath", "Roffey"],
    intro:
      "Need a gas engineer in Horsham? I'm Jamie Hannah, Gas Safe registered and based in Burgess Hill, covering Horsham as the north-west edge of my patch. From the older terraces around the town centre and Roffey to the newer developments at Highwood and Kilnwood Vale, I look after boiler servicing, landlord CP12s, repairs and installs: same engineer every visit, honest advice and tidy work. Call 07544 063330 to book.",
    areas: [
      "the town centre & Carfax",
      "Roffey",
      "Southwater",
      "Broadbridge Heath",
      "Highwood Village",
      "Kilnwood Vale",
    ],
    serviceAngles: {
      "gas-safety-certificate":
        "Horsham has one of the busiest rental markets in my patch, so I keep landlord CP12s simple across RH12 and RH13: flexible access with your tenants or agent, a digital certificate by email and a free reminder before renewal.",
      "boiler-servicing":
        "Horsham runs from older town-centre terraces to brand-new estates where the boiler is still under warranty. An annual service keeps that warranty valid, and I do it by the book, with no rushing.",
    },
    blurb:
      "The north-west edge of my patch: town-centre terraces to the new estates at Highwood and Kilnwood Vale.",
    photo: "/images/work/analyser-probe-service.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Horsham, testing a boiler with a flue gas analyser probe",
    reviews: [
      {
        name: "Gary Woolnough",
        text: "First class service from Jamie very professional thank you",
      },
      {
        name: "Diana Dodds",
        text: "Excellent and diligent engineer, hope he does my gas boiler service when next due",
      },
      {
        name: "Suriani Hulbert",
        text: "Excellent service. Jamie carried out a very thorough inspection and identified issue with our external water flow that had been missed by four previous engineers during their annual services. Professional and meticulous throughout. Highly recommend.",
      },
    ],
    faqs: [
      {
        q: "Do you cover Horsham?",
        a: "Yes. Horsham is about half an hour from my Burgess Hill base and I cover the whole RH12 and RH13 area, including Southwater and Broadbridge Heath. Send me your postcode and I'll confirm a slot.",
      },
      {
        q: "Do you do landlord gas safety certificates (CP12) in Horsham?",
        a: "Yes. I issue CP12 certificates for landlords and letting agents across Horsham, RH12 and RH13, with a digital copy by email and a free renewal reminder.",
      },
    ],
  },
  {
    slug: "cuckfield",
    name: "Cuckfield",
    postcode: "RH17",
    nearby: ["Haywards Heath", "Lindfield", "Ansty"],
    intro:
      "Need a Gas Safe engineer in Cuckfield? I'm Jamie Hannah, based just down the road in Burgess Hill, looking after boilers and heating across Cuckfield's village homes and the newer properties towards Haywards Heath. Older cottages often have boilers tucked into awkward cupboards and lofts, which is no problem for a proper, unhurried service. Boiler servicing, landlord certificates, repairs and installs. Call 07544 063330.",
    serviceAngles: {
      "gas-safety-certificate":
        "I issue landlord CP12 certificates across Cuckfield and the wider RH17 area: a digital copy by email, a reminder when it's due, and I'll sort access with your tenants.",
      "boiler-servicing":
        "Cuckfield's older village properties often hide their boilers away in cupboards and lofts; I take the time to service them properly wherever they are, and explain anything I find.",
    },
    blurb:
      "Village homes and older cottages with boilers in awkward spots, minutes from my Burgess Hill base.",
    photo: "/images/work/worcester-controls-check.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Cuckfield, checking the controls on a Worcester boiler",
    faqs: [
      {
        q: "Do you cover Cuckfield?",
        a: "Yes. Cuckfield's just a few minutes from my Burgess Hill base, so I'm there regularly. Send your postcode and I'll confirm a slot.",
      },
    ],
  },
  {
    slug: "ditchling",
    name: "Ditchling",
    postcode: "BN6",
    nearby: ["Hassocks", "Keymer", "Westmeston"],
    intro:
      "After a gas engineer in Ditchling? I'm Jamie Hannah, Gas Safe registered in nearby Burgess Hill, and Ditchling's period cottages and village homes are right on my regular route out towards the Downs. For an annual boiler service, a landlord certificate or a repair, you get the same engineer every time and an honest, tidy job. Call 07544 063330 to book.",
    serviceAngles: {
      "gas-safety-certificate":
        "Landlord CP12 certificates across Ditchling and BN6, with a digital copy by email and a free reminder when your renewal's due.",
      "boiler-servicing":
        "Ditchling's older cottages can have characterful, tucked-away boilers. I service them carefully and by the book, with no rushing.",
    },
    blurb:
      "Period cottages and village homes on my regular route out towards the Downs.",
    photo: "/images/work/boiler-panel-work.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Ditchling, working on an open boiler during a service",
    faqs: [
      {
        q: "Do you cover Ditchling?",
        a: "Yes. Ditchling is on my regular route from Burgess Hill towards the Downs, so I'm there often. Drop me your postcode for a slot.",
      },
    ],
  },
  {
    slug: "lindfield",
    name: "Lindfield",
    postcode: "RH16",
    nearby: ["Haywards Heath", "Cuckfield"],
    intro:
      "Looking for a Gas Safe engineer in Lindfield? I'm Jamie Hannah, based a short drive away in Burgess Hill. Lindfield's conservation-area homes and High Street properties are only minutes from Haywards Heath and well within my patch. Boiler servicing, landlord certificates, repairs and installs, done properly by the same engineer each visit. Call 07544 063330.",
    serviceAngles: {
      "gas-safety-certificate":
        "CP12 landlord certificates across Lindfield and RH16: straightforward, digital, with a free renewal reminder.",
      "boiler-servicing":
        "From period homes on the High Street to newer builds, I give every Lindfield boiler a thorough annual service, without the rush.",
    },
    blurb:
      "Conservation-area homes and High Street properties, minutes from Haywards Heath.",
    photo: "/images/work/worcester-service-complete.jpg",
    photoAlt:
      "A Worcester boiler freshly serviced by JDH Gas, with the Gas Safe registered mat laid out",
    faqs: [
      {
        q: "Do you cover Lindfield?",
        a: "Yes. Lindfield's just minutes from Haywards Heath and my Burgess Hill base, so I'm there regularly. Send your postcode and I'll confirm a time.",
      },
    ],
  },
  {
    slug: "wivelsfield",
    name: "Wivelsfield",
    postcode: "RH17",
    nearby: ["Haywards Heath", "Burgess Hill", "Ditchling"],
    intro:
      "Need a boiler engineer in Wivelsfield? I'm Jamie Hannah, Gas Safe registered just down the road in Burgess Hill, so Wivelsfield and Wivelsfield Green are part of my everyday coverage. Boiler servicing, landlord CP12s, repairs and new installs: same engineer every time, honest advice, proper work. Call 07544 063330 to get booked in.",
    serviceAngles: {
      "gas-safety-certificate":
        "Landlord gas safety certificates across Wivelsfield and Wivelsfield Green, with a digital copy by email and a free renewal reminder.",
      "boiler-servicing":
        "Being right on the edge of Burgess Hill, Wivelsfield is a quick trip for me: a thorough annual service that keeps your boiler safe and warranty-valid.",
    },
    blurb:
      "Right on the edge of Burgess Hill: Wivelsfield and Wivelsfield Green are everyday territory.",
    photo: "/images/work/worcester-service-gloved.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Wivelsfield, servicing the internals of an open Worcester boiler",
    faqs: [
      {
        q: "Do you cover Wivelsfield?",
        a: "Yes. Wivelsfield and Wivelsfield Green sit right next to my Burgess Hill base, so they're part of my everyday patch. Send a postcode for a slot.",
      },
    ],
  },
  {
    slug: "keymer",
    name: "Keymer",
    postcode: "BN6",
    nearby: ["Hassocks", "Ditchling"],
    intro:
      "Looking for a gas engineer in Keymer? I'm Jamie Hannah, Gas Safe registered and based nearby in Burgess Hill. Keymer blends straight into Hassocks at the foot of the Downs, so it's one of my closest and quickest areas to reach. Boiler servicing, landlord certificates, repairs and installs, all done properly by the same engineer. Call 07544 063330.",
    serviceAngles: {
      "gas-safety-certificate":
        "CP12 landlord certificates across Keymer and BN6: flexible tenant access, a same-day digital certificate where I can, and a free renewal reminder.",
      "boiler-servicing":
        "Keymer's a quick hop from Burgess Hill, so I can usually fit a thorough annual service in promptly.",
    },
    blurb:
      "Tucked between Hassocks and Ditchling, one of my closest patches.",
    photo: "/images/work/worcester-torchlit-service.jpg",
    photoAlt:
      "Jamie Hannah, Gas Safe registered engineer covering Keymer, inspecting an open Worcester boiler by torchlight during a service",
    faqs: [
      {
        q: "How quickly can you reach Keymer?",
        a: "Keymer's one of my closest areas (minutes from Burgess Hill), so I can usually get there the same week, and fast for a breakdown.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// WAVE 2 — built, but held back until each has its own review/photo. Not wired
// to the route or sitemap yet; promote into LOCAL_TOWNS when ready.
// ---------------------------------------------------------------------------
export const WAVE_2_TOWNS: Town[] = [
  {
    slug: "lancing",
    name: "Lancing",
    postcode: "BN15",
    nearby: ["Shoreham-by-Sea", "Sompting"],
    coast: true,
    intro:
      "Looking for a Gas Safe engineer in Lancing? I'm Jamie Hannah, based in Burgess Hill and covering Lancing, between Shoreham and Worthing, as the western edge of my coastal patch. Boiler servicing, landlord CP12s, repairs and installs, done properly by the same engineer every time. Call 07544 063330 to book in.",
    serviceAngles: {
      "gas-safety-certificate":
        "CP12 landlord certificates across Lancing and BN15, with a digital certificate by email and a free renewal reminder.",
      "boiler-servicing":
        "A full, unhurried annual boiler service anywhere in Lancing, keeping your boiler safe, efficient and within warranty.",
    },
    faqs: [
      {
        q: "Do you cover Lancing?",
        a: "Yes. Lancing marks the western edge of my coastal coverage, between Shoreham and Worthing. Drop me your postcode and I'll confirm.",
      },
    ],
  },
];

/** Resolved service content for the full sections, in display order. */
export const SECTION_SERVICES: ServiceContent[] = SECTION_SERVICE_SLUGS.map(
  (slug) => getService(slug)!,
);

/** Resolved service content for the "also offered" links. */
export const ALSO_SERVICES: ServiceContent[] = ALSO_SERVICE_SLUGS.map(
  (slug) => getService(slug)!,
);

/**
 * Town-specific blurbs for the three secondary services (repairs, installation,
 * gas appliances). Kept lighter than the two full lead sections on purpose — the
 * canonical depth stays on the /services hubs — but written per-town so each page
 * genuinely covers all five services without becoming a duplicated template.
 */
const ALSO_ANGLES: Record<string, Record<string, string>> = {
  "haywards-heath": {
    "boiler-repairs":
      "Lost heating or hot water in Haywards Heath? I carry out fast, honest repairs on all major boiler makes, from the older systems in the Victorian terraces to modern combis on the newer estates.",
    "boiler-heating-installation":
      "Planning a new boiler in Haywards Heath? From a like-for-like swap to a full system upgrade (Glow-worm, Vaillant, Ideal and Worcester Bosch), with a clear fixed quote.",
    "gas-appliances":
      "Gas hob or cooker fitting in Haywards Heath: I install, swap and tightness-test gas appliances, including ones you've bought yourself.",
  },
  hassocks: {
    "boiler-repairs":
      "Heating trouble in Hassocks? I'm only a few minutes away in Burgess Hill, so I can usually reach a breakdown quickly and give you an honest fix or quote.",
    "boiler-heating-installation":
      "New boiler in Hassocks: a like-for-like swap or a full system upgrade, fitted properly with a fixed price up front and the warranty registered.",
    "gas-appliances":
      "Gas hob and cooker installation in Hassocks, safely fitted, swapped and tightness-tested.",
  },
  hove: {
    "boiler-repairs":
      "Boiler broken down in Hove? I repair all major makes, including the awkward mansion-flat and conversion setups Hove is full of. Send me the fault and I'll get you booked in.",
    "boiler-heating-installation":
      "New boiler in Hove: I handle flat and family-home installs alike, with honest advice on the right boiler and a clear fixed quote.",
    "gas-appliances":
      "Gas hob and cooker fitting in Hove: safely installed and tested, and happy to fit an appliance you've already bought.",
  },
  portslade: {
    "boiler-repairs":
      "Heating or hot water down in Portslade? I carry out reliable repairs on all major boiler makes, from the old village down to the seafront.",
    "boiler-heating-installation":
      "New boiler or heating system in Portslade, fitted properly with a clear fixed quote and your manufacturer's warranty registered.",
    "gas-appliances":
      "Gas hob and cooker installation in Portslade: safe fitting, removal and tightness testing.",
  },
  hurstpierpoint: {
    "boiler-repairs":
      "Boiler fault in Hurstpierpoint? I'm just over in Burgess Hill, so I can usually get to a breakdown quickly with an honest diagnosis and quote.",
    "boiler-heating-installation":
      "New boiler in Hurstpierpoint, from a like-for-like swap to a full upgrade. Glow-worm, Vaillant, Ideal and Worcester Bosch, fixed quote up front.",
    "gas-appliances":
      "Gas hob and cooker fitting in Hurstpierpoint, safely installed and tightness-tested.",
  },
  lewes: {
    "boiler-repairs":
      "Lost heating in Lewes? I repair all major boiler makes, including the older systems common in the town's period and hillside homes.",
    "boiler-heating-installation":
      "New boiler in Lewes: like-for-like or a full system upgrade, fitted properly with a clear fixed quote, even in trickier period properties.",
    "gas-appliances":
      "Gas hob and cooker fitting in Lewes: installed and safety-tested, including appliances you've bought yourself.",
  },
  henfield: {
    "boiler-repairs":
      "Boiler or heating fault in Henfield? I carry out honest, reliable repairs on all major makes across the village and surrounding lanes.",
    "boiler-heating-installation":
      "New boiler in Henfield, from a like-for-like swap to a full heating system, with a clear fixed quote and the warranty registered.",
    "gas-appliances":
      "Gas hob and cooker installation in Henfield: safely fitted, swapped and tightness-tested.",
  },
};

/** Town-specific angle for any of the five services (lead two + secondary three). */
export function serviceAngle(town: Town, serviceSlug: string): string | undefined {
  return town.serviceAngles[serviceSlug] ?? ALSO_ANGLES[town.slug]?.[serviceSlug];
}

export function getTown(slug: string): Town | undefined {
  return LOCAL_TOWNS.find((t) => t.slug === slug);
}

/** Hero photo for a town, falling back to the default service image. */
export function townPhoto(town: Town): { src: string; alt: string } {
  return {
    src: town.photo ?? DEFAULT_PHOTO,
    alt:
      town.photoAlt ??
      `Jamie Hannah, Gas Safe registered engineer covering ${town.name}, servicing a boiler`,
  };
}

/** The other live towns, for the "areas I cover" internal-link mesh. */
export function otherTowns(town: Town): Town[] {
  return LOCAL_TOWNS.filter((t) => t.slug !== town.slug);
}

/** Town-page meta title. */
export function townMetaTitle(town: Town): string {
  return `Boiler Service & Gas Engineer in ${town.name} | JDH Gas`;
}

/** Town-page meta description. */
export function townMetaDescription(town: Town): string {
  return `Gas Safe registered engineer covering ${town.name} (${town.postcode}): boiler servicing from £85, landlord gas safety certificates (CP12), repairs & installs. Same local engineer, rated 5.0. Call 07544 063330.`;
}

/** Absolute URL for a town page, used in canonical + JSON-LD. */
export function townUrl(slug: string): string {
  return `${SITE.url}/${slug}`;
}
