import { BOOK_HREF } from "@/lib/booking";

/**
 * The six services as the homepage shows them (27 Nov 2026 development
 * round; plain-English pass 28 Nov 2026). Every line restates what that
 * service's own page in services-content.ts says, in simpler words; nothing
 * is added. (The "written record" check is the booking promise: "leave a
 * record of the work".)
 */
export type HomeService = {
  slug: string;
  name: string;
  short: string;
  line: string;
  checks: string[];
  href: string;
  action: { label: string; href: string };
  img: { src: string; pos: string; alt: string } | null;
};

export const HOME_SERVICES: HomeService[] = [
  {
    slug: "boiler-servicing",
    name: "Boiler servicing",
    short: "Servicing",
    line: "A yearly check that keeps your boiler safe and catches problems early.",
    checks: ["Checked it's burning safely", "Gas pressure and controls tested", "A written record of the service"],
    href: "/services/boiler-servicing",
    action: { label: "Book a service online", href: BOOK_HREF },
    img: { src: "/images/work/boiler-inspection-torch.jpg", pos: "60% 45%", alt: "Inspecting an opened boiler by torchlight, with the JDH Gas Services mat below" },
  },
  {
    slug: "boiler-repairs",
    name: "Boiler repairs",
    short: "Repairs",
    line: "No heating or hot water? Send us a photo of the boiler and we'll get you booked in.",
    checks: ["No hot water or heating", "Losing pressure or leaking", "Fault codes and lock-outs"],
    href: "/services/boiler-repairs",
    action: { label: "Faults we fix", href: "/services/boiler-repairs" },
    img: { src: "/images/work/bosch-rafters-service.jpg", pos: "60% 40%", alt: "Working on an opened boiler in an airing cupboard" },
  },
  {
    slug: "boiler-heating-installation",
    name: "New boilers",
    short: "New boilers",
    line: "A straight swap or a full new system, with a fixed price before we start.",
    checks: ["Advice on the right boiler for your home", "Old boiler removed and disposed of", "Chemical flush, filter and new controls"],
    href: "/services/boiler-heating-installation",
    action: { label: "Get a fixed quote", href: "/services/boiler-heating-installation" },
    img: { src: "/images/home/vaillant-living-room.jpg", pos: "62% 45%", alt: "A wall-hung Vaillant boiler in a living room" },
  },
  {
    slug: "gas-safety-certificate",
    name: "Landlord certificates (CP12)",
    short: "Landlord CP12",
    line: "Your yearly gas safety check, with the certificate sent straight to you.",
    checks: ["Appliances, pipework and flues checked", "Certificate sent digitally", "A copy for your tenants"],
    href: "/services/gas-safety-certificate",
    action: { label: "For landlords", href: "/services/gas-safety-certificate" },
    img: null,
  },
  {
    slug: "boiler-strip-down-service",
    name: "Strip-down service",
    short: "Strip-down",
    line: "A deeper clean for older boilers every four to five years, with worn parts replaced.",
    checks: ["Burner and heat exchanger cleaned", "Seals and gaskets replaced", "New spark electrode and flame sensor"],
    href: "/services/boiler-strip-down-service",
    action: { label: "What's involved", href: "/services/boiler-strip-down-service" },
    img: { src: "/images/work/strip-down-service.jpg", pos: "50% 40%", alt: "A boiler opened up for a strip-down service" },
  },
  {
    slug: "gas-appliances",
    name: "Gas hobs and cookers",
    short: "Hobs and cookers",
    line: "New hobs and cookers fitted safely, and old ones removed. Already bought one? We'll fit it.",
    checks: ["New hobs and cookers fitted", "Old appliances safely removed", "Connection tightness-tested"],
    href: "/services/gas-appliances",
    action: { label: "Hob fitting", href: "/services/gas-appliances" },
    img: { src: "/images/home/hob-job.jpg", pos: "30% 45%", alt: "A gas hob fitted into a kitchen worktop" },
  },
];

export const SERVICES_INTRO = "Based in Burgess Hill, we service, repair and fit boilers across Mid Sussex, on every major make.";
