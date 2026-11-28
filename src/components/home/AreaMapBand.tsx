"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { PostcodeChecker } from "@/components/sections/PostcodeChecker";

/**
 * Homepage "Where we work" (direction B, developed 27 Nov 2026): the coverage
 * map fills the band and runs off the right edge; a flat white sheet anchored
 * to the left edge holds the heading, the postcode checker and the town list.
 * Brand treatment: map tiles toned to a quiet blue-grey, JDH's shield marks
 * the Burgess Hill base, towns are navy dots, and hovering a town in the list
 * lights its pin orange. Labels show only for the outlying towns so the
 * cluster round Burgess Hill never overlaps.
 *
 * Coordinates match components/home/CoverageMap.tsx; keep both in sync with
 * LOCAL_TOWNS.
 */

type Town = { name: string; slug: string; postcode: string };
type Pin = { slug: string; name: string; lat: number; lng: number; label: boolean };

const BASE = { lat: 50.9577, lng: -0.1281 };

const PINS: Pin[] = [
  { slug: "haywards-heath", name: "Haywards Heath", lat: 51.004, lng: -0.1028, label: true },
  { slug: "hassocks", name: "Hassocks", lat: 50.9237, lng: -0.1487, label: false },
  { slug: "hurstpierpoint", name: "Hurstpierpoint", lat: 50.9347, lng: -0.1797, label: false },
  { slug: "henfield", name: "Henfield", lat: 50.9293, lng: -0.2725, label: true },
  { slug: "lewes", name: "Lewes", lat: 50.8743, lng: -0.0086, label: true },
  { slug: "hove", name: "Hove", lat: 50.8279, lng: -0.1687, label: true },
  { slug: "portslade", name: "Portslade", lat: 50.834, lng: -0.216, label: false },
  { slug: "horsham", name: "Horsham", lat: 51.063, lng: -0.327, label: true },
  { slug: "cuckfield", name: "Cuckfield", lat: 51.0117, lng: -0.143, label: false },
  { slug: "ditchling", name: "Ditchling", lat: 50.921, lng: -0.115, label: false },
  { slug: "lindfield", name: "Lindfield", lat: 51.0132, lng: -0.0846, label: false },
  { slug: "wivelsfield", name: "Wivelsfield", lat: 50.9705, lng: -0.1178, label: false },
  { slug: "keymer", name: "Keymer", lat: 50.9226, lng: -0.1354, label: false },
];

const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_BASEMAPS_KEY;
const OSM_CREDIT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const TILES = CARTO_KEY
  ? {
      url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(CARTO_KEY)}`,
      attribution: `${OSM_CREDIT}, &copy; <a href="https://carto.com/attributions">CARTO</a>`,
    }
  : { url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: OSM_CREDIT };

function pinHtml(p: Pin, active: boolean) {
  const dot = `<span class="jdh-pin-dot" style="display:block;width:${active ? 14 : 10}px;height:${active ? 14 : 10}px;border-radius:9999px;background:${active ? "#ff6b1a" : "#0f1f4b"};box-shadow:0 0 0 2px #fff;transition:all .15s"></span>`;
  const showLabel = p.label || active;
  const label = showLabel
    ? `<span style="position:absolute;left:${active ? 20 : 16}px;top:50%;transform:translateY(-50%);font-family:var(--font-display);font-size:12px;font-weight:800;letter-spacing:-.01em;color:#0f1f4b;background:#fff;padding:2px 6px;border-radius:3px;white-space:nowrap;outline:1px solid ${active ? "#ff6b1a" : "#d6dae0"}">${p.name}</span>`
    : "";
  return `<a href="/${p.slug}" aria-label="JDH Gas in ${p.name}" style="position:relative;display:grid;place-items:center;width:${active ? 14 : 10}px;height:${active ? 14 : 10}px;text-decoration:none">${dot}${label}</a>`;
}

export function AreaMapBand({ towns, locality, postcodeArea }: { towns: Town[]; locality: string; postcodeArea: string }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const markers = useRef<Record<string, import("leaflet").Marker>>({});
  const leaflet = useRef<typeof import("leaflet") | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = mapEl.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled) return;
      leaflet.current = L;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;

      map = L.map(el, {
        scrollWheelZoom: false,
        zoomControl: false,
        dragging: desktop,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: true,
      });
      map.attributionControl.setPrefix(false);
      L.tileLayer(TILES.url, { attribution: TILES.attribution, maxZoom: 19 }).addTo(map);

      for (const p of PINS) {
        markers.current[p.slug] = L.marker([p.lat, p.lng], {
          icon: L.divIcon({ html: pinHtml(p, false), className: "", iconSize: [10, 10], iconAnchor: [5, 5] }),
          keyboard: false,
          riseOnHover: true,
        })
          .on("mouseover", () => setActive(p.slug))
          .on("mouseout", () => setActive(null))
          .addTo(map);
      }

      // The base: JDH's shield on a white disc, the one strong mark on the map.
      L.marker([BASE.lat, BASE.lng], {
        icon: L.divIcon({
          html: `<span style="display:grid;place-items:center;width:46px;height:46px;border-radius:9999px;background:#fff;box-shadow:0 0 0 2px #0f1f4b"><img src="/shield-logo.png" alt="" style="width:30px;height:auto" /></span>`,
          className: "",
          iconSize: [46, 46],
          iconAnchor: [23, 23],
        }),
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map);

      const bounds = L.latLngBounds([[BASE.lat, BASE.lng], ...PINS.map((p) => [p.lat, p.lng] as [number, number])]);
      // Desktop: the white sheet covers the left of the band, so the pins are
      // fitted into the part of the map that's visible beside it.
      const sheet = desktop ? Math.min(560, el.clientWidth * 0.46) : 0;
      map.fitBounds(bounds, { paddingTopLeft: [sheet + 48, 56], paddingBottomRight: [64, 56] });
      setTimeout(() => map?.invalidateSize(), 200);
    })();

    return () => {
      cancelled = true;
      map?.remove();
      markers.current = {};
    };
  }, []);

  // Light the active town's pin (from the list or the map itself).
  useEffect(() => {
    const L = leaflet.current;
    if (!L) return;
    for (const p of PINS) {
      const m = markers.current[p.slug];
      if (!m) continue;
      const on = p.slug === active;
      m.setIcon(L.divIcon({ html: pinHtml(p, on), className: "", iconSize: on ? [14, 14] : [10, 10], iconAnchor: on ? [7, 7] : [5, 5] }));
      m.setZIndexOffset(on ? 900 : 0);
    }
  }, [active]);

  return (
    <section aria-labelledby="area-h" className="relative isolate flex flex-col overflow-hidden border-y border-rule bg-grey lg:block">
      {/* The map: toned to a quiet blue-grey so the navy pins and the shield
          carry the colour. */}
      <div
        ref={mapEl}
        role="img"
        aria-label={`Map of the towns JDH Gas covers around ${locality}`}
        className="relative z-0 order-2 h-[340px] w-full lg:order-none sm:h-[420px] lg:absolute lg:inset-0 lg:h-auto [&_.leaflet-container]:bg-[#e9ecf2] [&_.leaflet-control-attribution]:bg-white/80! [&_.leaflet-control-attribution]:text-[10px]! [&_.leaflet-control-attribution]:text-neutral! [&_.leaflet-tile-container]:will-change-transform [&_.leaflet-tile-pane]:[filter:grayscale(1)_contrast(0.92)_brightness(1.06)_sepia(0.28)_hue-rotate(185deg)_saturate(1.35)]"
      />

      <div className="relative z-[500] lg:pointer-events-none">
        <div className="container-page lg:py-0">
          {/* The sheet: flush to the band's top and bottom, running off the
              left edge of the screen on desktop. */}
          <div className="relative bg-white py-10 lg:pointer-events-auto lg:w-[46%] lg:max-w-[560px] lg:py-20 lg:pr-12 lg:before:absolute lg:before:inset-y-0 lg:before:right-full lg:before:w-[100vw] lg:before:bg-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action-text">Where we work</p>
            <h2
              id="area-h"
              className="mt-2 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy"
            >
              Based in {locality}, covering Mid Sussex
            </h2>

            <div className="mt-7">
              <p className="mb-2.5 text-sm font-semibold text-navy">Check your postcode</p>
              <PostcodeChecker towns={towns} />
            </div>

            <div className="mt-8 border-t border-rule pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral">
                Town pages <span className="normal-case tracking-normal text-neutral">· base {postcodeArea}</span>
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {towns.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/${t.slug}`}
                      onMouseEnter={() => setActive(t.slug)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(t.slug)}
                      onBlur={() => setActive(null)}
                      className={`group flex items-center gap-2 py-1.5 text-[14.5px] font-semibold transition-colors ${
                        active === t.slug ? "text-action-text" : "text-navy"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-2 w-2 shrink-0 rounded-full transition-colors ${active === t.slug ? "bg-action" : "bg-navy"}`}
                      />
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
