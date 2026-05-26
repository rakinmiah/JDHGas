export const SITE = {
  name: "JDH Gas Services",
  engineer: "Jamie Hannah",
  url: "https://jdhgas.co.uk",
  phoneDisplay: "07544 063330",
  phoneHref: "tel:+447544063330",
  whatsappHref: "https://wa.me/447544063330",
  email: "info@jdhgas.co.uk",
  gasSafe: "977838",
  instagram: "https://www.instagram.com/jdhgasservices/",
  locality: "Burgess Hill",
  region: "West Sussex",
  postcodeArea: "RH15",
  rating: { value: "5.0", count: 24 },
  hours: "Mon–Fri",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
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
    title: "Gas hob installs",
    blurb:
      "Fitting and testing gas hobs and cookers safely.",
    href: "/services/gas-appliances",
    icon: "CookingPot",
  },
] as const;

export const SERVICE_OPTIONS = [
  "Boiler servicing",
  "Landlord gas safety certificate (CP12)",
  "Heating system repair",
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

export const FAQS = [
  {
    q: "How much is a boiler service?",
    a: "A boiler service for new customers starts at £75. It's a full Gas Safe check. For repairs or a gas safety certificate, just call or WhatsApp and I'll give you a clear quote first.",
  },
  {
    q: "Do I really need my boiler serviced every year?",
    a: "Yes. An annual service is the best way to keep your boiler safe and within its warranty. A boiler can look fine while faults build up out of sight, so a yearly check catches them early. Prevention over cure.",
  },
  {
    q: "What is a CP12 / landlord gas safety certificate?",
    a: "A CP12 is the Landlord Gas Safety Certificate. By law, landlords must have every gas appliance, pipe and flue in a rented property checked every 12 months by a Gas Safe registered engineer. I provide CP12s across Mid Sussex, and homeowners can have a gas safety check too.",
  },
  {
    q: "Which areas do you cover?",
    a: "I'm based in Burgess Hill and cover Mid Sussex and down to the coast, including Haywards Heath, Hassocks, Cuckfield, Hove, Portslade and Lancing. Not sure if I reach you? Just ask.",
  },
  {
    q: "How do I book?",
    a: "Call 07544 063330, WhatsApp, or send a quick message and I'll get back to you. I work Monday to Friday and will always confirm a time that suits you.",
  },
] as const;
