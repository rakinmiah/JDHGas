"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

type Town = {
  name: string;
  lat: number;
  lng: number;
  href?: string; // towns with a dedicated area page are clickable
};

const BASE = { name: "Burgess Hill", lat: 50.9577, lng: -0.1281 };

// Background map tiles. Since autumn 2026 CARTO's basemaps need a free API key:
// without one, every tile comes back as an "API KEY REQUIRED" watermark (still
// HTTP 200, so Leaflet can't tell it failed). Business use is free up to 1M tile
// requests a month, far beyond this site's traffic. The key is public by design
// (it travels in every tile URL); restrict it to jdhgas.co.uk in CARTO's
// dashboard. Until it's set (local dev, or before it's added in Vercel), fall
// back to OpenStreetMap's own tiles: no key, but meant for light use only.
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_BASEMAPS_KEY;
const OSM_CREDIT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TILES = CARTO_KEY
  ? {
      url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(CARTO_KEY)}`,
      attribution: `${OSM_CREDIT}, &copy; <a href="https://carto.com/attributions">CARTO</a>`,
    }
  : {
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: OSM_CREDIT,
    };

// The towns with live area pages. Markers link through to each page.
// Keep in sync with LOCAL_TOWNS in src/lib/local-pages.ts as more towns launch.
const TOWNS: Town[] = [
  { name: "Haywards Heath", lat: 51.004, lng: -0.1028, href: "/haywards-heath" },
  { name: "Hassocks", lat: 50.9237, lng: -0.1487, href: "/hassocks" },
  { name: "Hurstpierpoint", lat: 50.9347, lng: -0.1797, href: "/hurstpierpoint" },
  { name: "Henfield", lat: 50.9293, lng: -0.2725, href: "/henfield" },
  { name: "Lewes", lat: 50.8743, lng: -0.0086, href: "/lewes" },
  { name: "Hove", lat: 50.8279, lng: -0.1687, href: "/hove" },
  { name: "Portslade", lat: 50.834, lng: -0.216, href: "/portslade" },
  { name: "Horsham", lat: 51.063, lng: -0.327, href: "/horsham" },
  { name: "Cuckfield", lat: 51.0117, lng: -0.143, href: "/cuckfield" },
  { name: "Ditchling", lat: 50.921, lng: -0.115, href: "/ditchling" },
  { name: "Lindfield", lat: 51.0132, lng: -0.0846, href: "/lindfield" },
  { name: "Wivelsfield", lat: 50.9705, lng: -0.1178, href: "/wivelsfield" },
  { name: "Keymer", lat: 50.9226, lng: -0.1354, href: "/keymer" },
];

/** Fit the towns into the part of the map not covered by a left panel. */
function fitTight(map: import("leaflet").Map, bounds: import("leaflet").LatLngBounds, insetLeft: number) {
  map.setMaxBounds(undefined as unknown as import("leaflet").LatLngBounds);
  map.setMinZoom(0);
  // Phones: no panel beside the map, so just a small margin (the zoom
  // buttons sit top right, clear of the towns).
  const phone = map.getSize().x < 640;
  map.fitBounds(bounds, {
    paddingTopLeft: phone ? [24, 56] : [insetLeft + 56, 40],
    paddingBottomRight: phone ? [24, 28] : [72, 40],
    animate: false,
  });
  // Hold panning and zooming out to the area now in view, plus a margin, so
  // nobody drifts off to places JDH doesn't work.
  map.setMaxBounds(map.getBounds().pad(0.25));
  map.setMinZoom(map.getZoom() - 0.5);
}

function townHtml(t: Town, active: boolean) {
  const linked = Boolean(t.href);
  const size = active ? 17 : 13;
  const dot = `<span style="width:${size}px;height:${size}px;border-radius:9999px;background:${active ? "#ff6b1a" : "var(--color-primary)"};box-shadow:0 0 0 ${active ? 3 : 2}px #fff,0 1px 3px rgba(6,23,58,.4);${linked || active ? "" : "opacity:.65"}"></span>`;
  const text = `<span class="${active ? "jdh-label jdh-label-on" : "jdh-label"}" style="font-family:var(--font-display);font-size:${active ? 13 : 12}px;font-weight:${linked || active ? 800 : 600};color:${linked || active ? "var(--color-ink)" : "var(--color-muted)"};background:#fff;padding:${active ? "2px 7px" : "1px 5px"};border-radius:5px;white-space:nowrap;box-shadow:${active ? "0 0 0 2px #ff6b1a" : "0 1px 2px rgba(6,23,58,.15)"}">${t.name}</span>`;
  const inner = `<span style="display:inline-flex;align-items:center;gap:5px">${dot}${text}</span>`;
  return linked ? `<a href="${t.href}" aria-label="JDH Gas in ${t.name}" style="text-decoration:none">${inner}</a>` : inner;
}

/**
 * `highlight`: hrefs of towns to light up (orange pin, label on top), e.g.
 * from the postcode checker. `homeActive` rings the Burgess Hill base.
 */
export function CoverageMap({
  highlight = [],
  homeActive = false,
  insetLeft,
}: {
  highlight?: string[];
  homeActive?: boolean;
  /** Full-bleed use (homepage band): px covered by a panel on the map's left.
   *  The towns are fitted into the visible part beside it, zoomed in on the
   *  working area (quarter-step zoom), and panning is held to that area. */
  insetLeft?: number;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  // Latest inset, read when the map finishes loading (Leaflet loads async, so
  // the panel is usually measured before the map exists).
  const insetRef = useRef(insetLeft);
  insetRef.current = insetLeft;
  const [ready, setReady] = useState(false);
  const markers = useRef<Record<string, import("leaflet").Marker>>({});
  const homeMarker = useRef<import("leaflet").Marker | null>(null);
  const leaflet = useRef<typeof import("leaflet") | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled) return;
      leaflet.current = L;

      const tight = insetLeft !== undefined;
      map = L.map(el, {
        scrollWheelZoom: false,
        // Touch screens: one finger scrolls the page, not the map (pinch still
        // zooms). Otherwise the map traps the scroll on phones.
        dragging: !L.Browser.mobile,
        zoomSnap: tight ? 0.05 : 1,
        attributionControl: true,
        zoomControl: false,
      });
      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer(TILES.url, { attribution: TILES.attribution, maxZoom: 19 }).addTo(map);

      // town markers
      for (const t of TOWNS) {
        const m = L.marker([t.lat, t.lng], {
          icon: L.divIcon({ html: townHtml(t, false), className: "jdh-marker", iconSize: [0, 0], iconAnchor: [6, 6] }),
          interactive: Boolean(t.href),
          keyboard: false,
        }).addTo(map);
        if (t.href) markers.current[t.href] = m;
      }

      // base marker (home)
      const home = `<span style="display:inline-flex;flex-direction:column;align-items:center">
        <span style="display:grid;place-items:center;width:30px;height:30px;border-radius:9999px;background:var(--color-ink);box-shadow:0 0 0 3px #fff,0 2px 6px rgba(6,23,58,.45)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
        </span>
        <span style="margin-top:3px;font-family:var(--font-display);font-size:12px;font-weight:800;color:var(--color-ink);background:rgba(255,255,255,.92);padding:1px 6px;border-radius:5px;white-space:nowrap;box-shadow:0 1px 2px rgba(6,23,58,.2)">Burgess Hill</span>
      </span>`;
      homeMarker.current = L.marker([BASE.lat, BASE.lng], {
        icon: L.divIcon({ html: home, className: "jdh-marker", iconSize: [0, 0], iconAnchor: [15, 15] }),
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map);

      const pts: [number, number][] = [
        [BASE.lat, BASE.lng],
        ...TOWNS.map((t) => [t.lat, t.lng] as [number, number]),
      ];
      const bounds = L.latLngBounds(pts);
      mapRef.current = map;
      if (tight) {
        fitTight(map, bounds, insetRef.current ?? 0);
      } else {
        map.fitBounds(bounds, { padding: [44, 44] });
      }
      setTimeout(() => map?.invalidateSize(), 200);
      setReady(true);
    })();

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
      markers.current = {};
      homeMarker.current = null;
    };
  }, []);

  // Re-fit when the panel's width is known or changes (resize).
  useEffect(() => {
    const map = mapRef.current;
    const L = leaflet.current;
    if (!map || !L || insetLeft === undefined) return;
    const pts: [number, number][] = [[BASE.lat, BASE.lng], ...TOWNS.map((t) => [t.lat, t.lng] as [number, number])];
    fitTight(map, L.latLngBounds(pts), insetLeft);
  }, [insetLeft, ready]);

  // Light up the towns the postcode checker matched (and the base for RH15).
  const key = highlight.join(",");
  useEffect(() => {
    const L = leaflet.current;
    if (!L) return;
    for (const t of TOWNS) {
      if (!t.href) continue;
      const m = markers.current[t.href];
      if (!m) continue;
      const on = highlight.includes(t.href);
      m.setIcon(L.divIcon({ html: townHtml(t, on), className: "jdh-marker", iconSize: [0, 0], iconAnchor: on ? [8, 8] : [6, 6] }));
      m.setZIndexOffset(on ? 1200 : 0);
    }
    const el = homeMarker.current?.getElement();
    const disc = el?.querySelector<HTMLElement>("span > span");
    if (disc) disc.style.boxShadow = homeActive ? "0 0 0 3px #fff,0 0 0 6px #ff6b1a" : "0 0 0 3px #fff,0 2px 6px rgba(6,23,58,.45)";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, homeActive]);

  return (
    <div
      ref={ref}
      // will-change on the tile container: the map often sits at a fractional
      // x position (fr grid columns), which left hairline seams between tiles on
      // 2x/3x screens. A composited layer is snapped to whole device pixels.
      className={`relative z-0 isolate h-full w-full rounded-[calc(var(--radius-lg)-0.25rem)] [&_.leaflet-container]:rounded-[calc(var(--radius-lg)-0.25rem)] [&_.leaflet-tile-container]:will-change-transform max-sm:[&_.jdh-label:not(.jdh-label-on)]:hidden ${
        // CARTO Voyager is pale, so it gets a little colour; OSM's tiles don't need it.
        CARTO_KEY ? "[&_.leaflet-tile-pane]:[filter:saturate(1.15)]" : ""
      }`}
      role="img"
      aria-label="Map of the service area centred on Burgess Hill, covering Haywards Heath, Hassocks, Hurstpierpoint, Henfield, Lewes, Hove and Portslade"
    />
  );
}
