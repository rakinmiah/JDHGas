// Shared copy and photos for the services explorations. Short lines only:
// the current grid's problem is too much text per card.
export type Svc = {
  key: string;
  title: string;
  line: string;
  href: string;
  maker: { src: string; pos?: string; contain?: boolean } | null;
  job: { src: string; pos?: string } | null;
};

export const SVCS: Svc[] = [
  {
    key: "servicing",
    title: "Boiler servicing",
    line: "Annual safety and efficiency check, bookable online.",
    href: "/services/boiler-servicing",
    maker: { src: "/images/home/boiler-cupboard.jpg", pos: "60% 40%" },
    job: { src: "/images/work/worcester-service-complete.jpg", pos: "50% 35%" },
  },
  {
    key: "repairs",
    title: "Boiler repairs",
    line: "No heat, lost pressure, fault codes or odd noises.",
    href: "/services/boiler-repairs",
    maker: { src: "/images/home/boiler-inside.jpg", contain: true },
    job: { src: "/images/work/worcester-controls-check.jpg", pos: "50% 30%" },
  },
  {
    key: "new",
    title: "New boilers",
    line: "Like-for-like swaps or a full new system, fixed quote.",
    href: "/services/boiler-heating-installation",
    maker: { src: "/images/home/boiler-fitted.jpg", pos: "62% 58%" },
    job: { src: "/images/work/vaillant-install.jpg", pos: "50% 30%" },
  },
  {
    key: "cp12",
    title: "Landlord certificates (CP12)",
    line: "Annual gas safety checks, certificate sent digitally.",
    href: "/services/gas-safety-certificate",
    maker: null,
    job: null,
  },
  {
    key: "strip",
    title: "Strip-down service",
    line: "A deeper clean and new seals, for older boilers.",
    href: "/services/boiler-strip-down-service",
    maker: { src: "/images/work/strip-down-service.jpg", pos: "50% 40%" },
    job: { src: "/images/work/strip-down-service.jpg", pos: "50% 40%" },
  },
  {
    key: "hobs",
    title: "Gas hobs and cookers",
    line: "Fitted, connected and tightness-tested.",
    href: "/services/gas-appliances",
    maker: { src: "/images/home/hob-job.jpg", pos: "30% 45%" },
    job: { src: "/images/work/gas-hob.jpg", pos: "40% 50%" },
  },
];
