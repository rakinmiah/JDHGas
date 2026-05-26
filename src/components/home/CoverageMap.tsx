"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type Town = {
  name: string;
  lat: number;
  lng: number;
  href?: string; // towns with a dedicated area page are clickable
};

const BASE = { name: "Burgess Hill", lat: 50.9577, lng: -0.1281 };

const TOWNS: Town[] = [
  { name: "Haywards Heath", lat: 51.004, lng: -0.1028 },
  { name: "Cuckfield", lat: 51.018, lng: -0.1496 },
  { name: "Hassocks", lat: 50.9237, lng: -0.1487 },
  { name: "Lindfield", lat: 51.0103, lng: -0.0786 },
  { name: "Wivelsfield", lat: 50.987, lng: -0.105 },
  { name: "Ditchling", lat: 50.92, lng: -0.113 },
  { name: "Keymer", lat: 50.922, lng: -0.138 },
  { name: "Hove", lat: 50.8279, lng: -0.1687 },
  { name: "Portslade", lat: 50.834, lng: -0.216 },
  { name: "Lancing", lat: 50.832, lng: -0.32 },
];

export function CoverageMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled) return;

      map = L.map(el, {
        scrollWheelZoom: false,
        attributionControl: true,
        zoomControl: false,
      });
      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      // town markers
      for (const t of TOWNS) {
        const linked = Boolean(t.href);
        const dot = `<span style="width:13px;height:13px;border-radius:9999px;background:#2563eb;box-shadow:0 0 0 2px #fff,0 1px 3px rgba(11,18,32,.4);${linked ? "" : "opacity:.65"}"></span>`;
        const text = `<span style="font-family:var(--font-display);font-size:12px;font-weight:${linked ? 700 : 600};color:${linked ? "#0b1220" : "#51607a"};background:rgba(255,255,255,.85);padding:1px 5px;border-radius:5px;white-space:nowrap;box-shadow:0 1px 2px rgba(11,18,32,.15)">${t.name}</span>`;
        const inner = `<span style="display:inline-flex;align-items:center;gap:5px">${dot}${text}</span>`;
        const html = linked
          ? `<a href="${t.href}" aria-label="JDH Gas in ${t.name}" style="text-decoration:none">${inner}</a>`
          : inner;

        L.marker([t.lat, t.lng], {
          icon: L.divIcon({ html, className: "jdh-marker", iconSize: [0, 0], iconAnchor: [6, 6] }),
          interactive: linked,
          keyboard: false,
        }).addTo(map);
      }

      // base marker (home)
      const home = `<span style="display:inline-flex;flex-direction:column;align-items:center">
        <span style="display:grid;place-items:center;width:30px;height:30px;border-radius:9999px;background:#0b1220;box-shadow:0 0 0 3px #fff,0 2px 6px rgba(11,18,32,.45)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
        </span>
        <span style="margin-top:3px;font-family:var(--font-display);font-size:12px;font-weight:800;color:#0b1220;background:rgba(255,255,255,.92);padding:1px 6px;border-radius:5px;white-space:nowrap;box-shadow:0 1px 2px rgba(11,18,32,.2)">Burgess Hill</span>
      </span>`;
      L.marker([BASE.lat, BASE.lng], {
        icon: L.divIcon({ html: home, className: "jdh-marker", iconSize: [0, 0], iconAnchor: [15, 15] }),
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map);

      const pts: [number, number][] = [
        [BASE.lat, BASE.lng],
        ...TOWNS.map((t) => [t.lat, t.lng] as [number, number]),
      ];
      map.fitBounds(L.latLngBounds(pts), { padding: [44, 44] });
      setTimeout(() => map?.invalidateSize(), 200);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="h-full w-full rounded-[calc(var(--radius-lg)-0.25rem)] [&_.leaflet-container]:rounded-[calc(var(--radius-lg)-0.25rem)] [&_.leaflet-tile-pane]:[filter:saturate(1.15)]"
      role="img"
      aria-label="Map of the service area centred on Burgess Hill, covering Haywards Heath, Hassocks, Cuckfield, Lindfield, Wivelsfield, Ditchling, Keymer, Hove, Portslade and Lancing"
    />
  );
}
