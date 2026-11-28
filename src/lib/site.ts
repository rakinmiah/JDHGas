export const SITE = {
  name: "JDH Gas Services",
  engineer: "Jamie Hannah",
  url: "https://www.jdhgas.co.uk",
  // The main number (office landline, Nov 2026). Every call button, the schema
  // and the NAP use this: it's the one Jamie wants most people to ring.
  phoneDisplay: "01444 670 101",
  phoneHref: "tel:+441444670101",
  // Jamie's mobile, now the backup: shown quietly on /contact and in the footer
  // only. WhatsApp stays on it (a landline can't take WhatsApp).
  mobileDisplay: "07544 063330",
  mobileHref: "tel:+447544063330",
  whatsappHref: "https://wa.me/447544063330",
  email: "info@jdhgas.co.uk",
  gasSafe: "977838",
  instagram: "https://www.instagram.com/jdhgasservices/",
  locality: "Burgess Hill",
  region: "West Sussex",
  postcodeArea: "RH15",
  // Offline fallback only: the live rating and count come from the Places API
  // (getGoogleReviews). Never display this count directly. Updated to the live
  // figure on 24 Nov 2026.
  rating: { value: "5.0", count: 113 },
  hours: "Mon–Fri",
  // Gas Safe Register: the site blocks automated requests, so this is the
  // homepage. Swap for a deep "check an engineer" URL once one is confirmed
  // by hand (website-plan/rebrand/HOMEPAGE-PLAN.md, A5).
  registerUrl: "https://www.gassaferegister.co.uk/",
  hseCheckUrl: "https://www.hse.gov.uk/gas/gas-safe-register-check.htm",

  // Gated facts. Each renders nothing (or its honest fallback) until Jamie
  // confirms it. Claim IDs refer to website-plan/rebrand/00-intake.md.
  prices: {
    servicingFrom: null as number | null, // C15
    cp12From: null as number | null, // C16
  },
  companyNumber: null as string | null, // C21
  tradingSince: null as number | null, // C21
  claims: {
    noServicePlan: false, // C17: true only once Jamie confirms he sells no plan
  },
} as const;

/** WhatsApp links with a starter message, so a repair enquiry arrives with
 *  what Jamie needs to quote (a photo and the fault code). */
export const WHATSAPP_REPAIR_HREF = `${SITE.whatsappHref}?text=${encodeURIComponent(
  "Hi JDH Gas, my boiler or heating isn’t working. Here’s a photo of the boiler and any fault code:",
)}`;
export const WHATSAPP_PHOTO_HREF = `${SITE.whatsappHref}?text=${encodeURIComponent(
  "Hi Jamie, here’s a photo of my boiler:",
)}`;

// File-convention share images (app/opengraph-image.tsx + app/twitter-image.tsx),
// resolved against metadataBase. Pages that set their own `openGraph`/`twitter`
// in generateMetadata must reference these explicitly — a per-page social block
// without `images` drops the file-convention image for that page.
const SHARE_IMAGE_ALT = `${SITE.name}: Gas Safe registered engineer in Burgess Hill & Mid Sussex`;
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SHARE_IMAGE_ALT };
export const TWITTER_IMAGE = { url: "/twitter-image", width: 1200, height: 630, alt: SHARE_IMAGE_ALT };

// "Home" is not listed: the logo is the home link.
export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Help", href: "/help" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    title: "Boiler servicing",
    blurb:
      "Annual servicing that keeps your boiler running safely and your warranty valid.",
    href: "/services/boiler-servicing",
    icon: "Flame",
  },
  {
    title: "Boiler strip-down service",
    blurb:
      "A deeper clean every four to five years, stripping the boiler down to clear what a standard service can't reach.",
    href: "/services/boiler-strip-down-service",
    icon: "Cog",
  },
  {
    title: "Landlord gas safety certificates",
    blurb:
      "CP12 certificates for landlords, plus gas safety checks for homeowners.",
    href: "/services/gas-safety-certificate",
    icon: "ClipboardCheck",
  },
  {
    title: "Heating system repairs",
    blurb:
      "Repairs for when your heating or hot water stops working, on boilers and full systems.",
    href: "/services/boiler-repairs",
    icon: "Wrench",
  },
  {
    title: "Boiler & heating installation",
    blurb:
      "New boilers and full heating systems, fitted properly with a clear fixed quote.",
    href: "/services/boiler-heating-installation",
    icon: "Hammer",
  },
  {
    title: "Gas hob installs",
    blurb:
      "Fitting and testing gas hobs and cookers safely.",
    href: "/services/gas-appliances",
    icon: "CookingPot",
  },
] as const;

export const SERVICE_OPTIONS = [
  "Boiler servicing",
  "Boiler strip-down service",
  "Landlord gas safety certificate (CP12)",
  "Heating system repair",
  "Boiler or heating installation",
  "Gas hob install",
  "Something else",
] as const;

export const TOWNS = [
  "Burgess Hill",
  "Haywards Heath",
  "Hassocks",
  "Cuckfield",
  "Ditchling",
  "Wivelsfield",
  "Lindfield",
  "Keymer",
  "Hove",
  "Portslade",
  "Lancing",
] as const;

export const BRANDS = ["Worcester Bosch", "Vaillant", "Ideal", "Baxi", "Bosch"] as const;

export const REVIEWS = [
  {
    name: "Josh Cuthbert",
    initial: "J",
    color: "#2563eb",
    date: "2 months ago",
    source: "Google review",
    text: "Outstanding service from JDH! I recently had Jamie round for an annual boiler service and could not fault him — on time, super polite with real professionalism. I won't be going anywhere else.",
  },
  {
    name: "Mortimer Mouse",
    initial: "M",
    color: "#0f766e",
    date: "2 weeks ago",
    source: "Google review",
    text: "Jamie arranged to fix my boiler very promptly. He arranged the part needed before arriving and diagnosed the problem efficiently and conscientiously. He also spotted another issue that hadn't been noticed by other engineers and remediated. Would thoroughly recommend Jamie for all boiler engineering work.",
  },
  {
    name: "Emma Buckwell",
    initial: "E",
    color: "#8da2bc",
    date: "3 weeks ago",
    source: "Google review",
    text: "Jamie came through Ovo to look at our boiler after the first guy couldn't fix it. He managed to get our heating working again and sorted the problem. Jamie is a very polite, friendly young man and very professional. Would certainly recommend him. Left it tidy too.",
  },
  {
    name: "Eros Negri",
    initial: "E",
    color: "#b45309",
    date: "a week ago",
    source: "Google review",
    text: "Fantastic service from Jamie! Communication was clear from the start, he arrived on time, and was professional, clean and tidy throughout. He carefully explained everything and carried out the gas hob swap.",
  },
  {
    name: "Ellie Naicker",
    initial: "E",
    color: "#7c3aed",
    date: "a week ago",
    source: "Google review",
    text: "Outstanding service from Jamie! He came out to look at my boiler, arrived promptly and was extremely helpful. Ordered the part and came back not even a day later to fit. Definitely would recommend to anyone — thank you so much again!",
  },
  {
    name: "Max",
    initial: "M",
    color: "#0891b2",
    date: "2 months ago",
    source: "Local Guide",
    text: "We hired Jamie to carry out some gas work for us and he did a fantastic job. He was professional, efficient and even left everything clean and tidy afterwards. Highly recommended!",
  },
  {
    name: "Nasim Pakdel",
    initial: "N",
    color: "#2563eb",
    date: "2 weeks ago",
    source: "Google review",
    text: "Outstanding service from JDH. Jamie was on time, professional and very polite during the annual boiler service. I highly recommend JDH and will definitely be a returning customer.",
  },
  {
    name: "Sabir",
    initial: "S",
    color: "#0f766e",
    date: "2 months ago",
    source: "Google review",
    text: "Came and replaced my old heater with new ones as well as a few other bits. Reliable and thorough, and made sure the job was done to last. Top quality and reliable work received.",
  },
  {
    name: "Richard Chitty",
    initial: "R",
    color: "#8da2bc",
    date: "3 days ago",
    source: "Google review",
    text: "Jamie is a polite and efficient engineer. He explained everything to our satisfaction. Would definitely use him again.",
  },
  {
    name: "Toby Lewis",
    initial: "T",
    color: "#b45309",
    date: "2 months ago",
    source: "Google review",
    text: "Good, reliable, efficient service from Jamie. Would definitely recommend!",
  },
] as const;

/** A phrase inside an FAQ answer that renders as a link (the JSON-LD gets plain text). */
export type FaqLink = { text: string; href: string; track?: string };
export type HomeFaq = { q: string; a: string; links?: FaqLink[] };

/** Homepage FAQ, answer-first (seo/handoff-to-website.md). Q1 has two final
 *  states: with Jamie's confirmed "from" price, or the honest fallback. */
export const FAQS: HomeFaq[] = [
  {
    q: "How much is a boiler service?",
    a:
      SITE.prices.servicingFrom != null
        ? `A boiler service starts from £${SITE.prices.servicingFrom}. The exact price depends on your boiler, and you'll know it before you book. If anything needs repairing, you get a clear quote before any extra work.`
        : "It depends on your boiler. Call or WhatsApp us and we'll give you a price before you book. If anything needs fixing, you'll get a quote before we do any extra work.",
  },
  {
    q: "Do I need my boiler serviced every year?",
    a: "Yes. A yearly service keeps your boiler safe and running well, and most boiler warranties need one. A boiler can seem fine while problems build up inside.",
  },
  {
    q: "What is a CP12?",
    a: "It's the landlord gas safety certificate. By law, landlords need the gas appliances and pipework in a rented home checked every year, give tenants a copy within 28 days and keep it for two years.",
  },
  {
    q: "How do I check you're Gas Safe registered?",
    a: `Our registration number is ${SITE.gasSafe}, and you can check it on the Gas Safe Register.`,
    links: [
      { text: "check it on the Gas Safe Register", href: SITE.registerUrl, track: "faq" },
    ],
  },
  {
    q: "Which areas do you cover?",
    a: "Burgess Hill and the rest of Mid Sussex, down to the coast at Hove and Portslade. Not sure? Check your postcode on our areas page.",
    links: [{ text: "areas page", href: "/areas" }],
  },
  {
    q: "How do I book?",
    a: `Book a boiler service online, or call ${SITE.phoneDisplay} or WhatsApp us for anything else. We work Monday to Friday.`,
    links: [
      { text: "Book a boiler service online", href: "/book" },
      { text: SITE.phoneDisplay, href: SITE.phoneHref },
    ],
  },
];
