#!/usr/bin/env node
/**
 * JDH Gas weekly growth report — pulls Search Console + GA4 via the local
 * gcloud Application Default Credentials (read-only scopes, no keys on disk).
 *
 * Usage: node scripts/growth-report.mjs
 * Needs: gcloud ADC login done once on this machine (analytics.readonly +
 * webmasters.readonly scopes). Prints a markdown report to stdout AND saves a
 * dated copy to ~/Desktop/JDH Gas Reports/ so there's a persistent archive.
 */
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";

// Tee everything printed into a buffer so we can also save it to a file.
const _buf = [];
const _log = console.log.bind(console);
console.log = (...a) => {
  _buf.push(a.map(String).join(" "));
  _log(...a);
};

const GSC_SITE = "sc-domain:jdhgas.co.uk";
const GA4_PROPERTY = "543081820";
const GCLOUD = "/opt/homebrew/share/google-cloud-sdk/bin/gcloud";

const TOKEN = execSync(`${GCLOUD} auth application-default print-access-token`, {
  encoding: "utf8",
}).trim();

async function api(url, body) {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}: ${await res.text()}`);
  return res.json();
}

// GSC data lags ~2 days; report on the last 7 complete days vs the 7 before.
const day = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
};
const CUR = { startDate: day(9), endDate: day(3) };
const PREV = { startDate: day(16), endDate: day(10) };

async function gsc(range, dimensions, extra = {}) {
  const data = await api(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
    { ...range, dimensions, rowLimit: 25, ...extra },
  );
  return data.rows ?? [];
}

async function ga4(range, dimensions, metrics, extra = {}) {
  const data = await api(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`,
    {
      dateRanges: [range],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit: 25,
      ...extra,
    },
  );
  return data.rows ?? [];
}

const num = (v) => Number(v ?? 0);
const pct = (cur, prev) =>
  prev === 0 ? (cur > 0 ? "new" : "—") : `${cur >= prev ? "+" : ""}${Math.round(((cur - prev) / prev) * 100)}%`;

const [curTotal, prevTotal, topQueries, topPages, prevPages] = await Promise.all([
  gsc(CUR, []),
  gsc(PREV, []),
  gsc(CUR, ["query"]),
  gsc(CUR, ["page"]),
  gsc(PREV, ["page"]),
]);

const KEY_EVENTS = ["phone_click", "whatsapp_click", "enquiry_submit"];
const [curEvents, prevEvents, curSessions, prevSessions] = await Promise.all([
  ga4({ startDate: day(9), endDate: day(3) }, ["eventName"], ["eventCount"]),
  ga4({ startDate: day(16), endDate: day(10) }, ["eventName"], ["eventCount"]),
  ga4({ startDate: day(9), endDate: day(3) }, [], ["sessions", "totalUsers"]),
  ga4({ startDate: day(16), endDate: day(10) }, [], ["sessions", "totalUsers"]),
]);

const evCount = (rows, name) =>
  num(rows.find((r) => r.dimensionValues?.[0]?.value === name)?.metricValues?.[0]?.value);

const ct = curTotal[0] ?? {};
const pt = prevTotal[0] ?? {};

console.log(`# JDH Gas growth report — ${CUR.startDate} → ${CUR.endDate}`);
console.log(`(vs previous week ${PREV.startDate} → ${PREV.endDate}; GSC lags ~2 days, so ranges end ${day(3)})\n`);

console.log(`## Search (Google Search Console)`);
console.log(`- Clicks: ${num(ct.clicks)} (${pct(num(ct.clicks), num(pt.clicks))})`);
console.log(`- Impressions: ${num(ct.impressions)} (${pct(num(ct.impressions), num(pt.impressions))})`);
console.log(`\n### Top queries`);
for (const r of topQueries.slice(0, 15)) {
  console.log(
    `- "${r.keys[0]}" — ${r.clicks} clicks / ${r.impressions} impr / avg pos ${r.position.toFixed(1)}`,
  );
}
console.log(`\n### Pages earning impressions`);
const prevByPage = Object.fromEntries(prevPages.map((r) => [r.keys[0], r]));
for (const r of topPages.slice(0, 15)) {
  const prev = prevByPage[r.keys[0]];
  console.log(
    `- ${r.keys[0].replace("https://www.jdhgas.co.uk", "") || "/"} — ${r.clicks} clicks / ${r.impressions} impr (impr ${pct(r.impressions, num(prev?.impressions))})`,
  );
}

console.log(`\n## Leads & traffic (GA4)`);
console.log(
  `- Sessions: ${num(curSessions[0]?.metricValues?.[0]?.value)} (${pct(num(curSessions[0]?.metricValues?.[0]?.value), num(prevSessions[0]?.metricValues?.[0]?.value))}) · Users: ${num(curSessions[0]?.metricValues?.[1]?.value)}`,
);
for (const name of KEY_EVENTS) {
  console.log(`- ${name}: ${evCount(curEvents, name)} (${pct(evCount(curEvents, name), evCount(prevEvents, name))})`);
}

// Persist a dated copy to the Reports folder for the archive.
const REPORTS_DIR = `${homedir()}/Desktop/JDH Gas Reports`;
mkdirSync(REPORTS_DIR, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const REPORT_FILE = `${REPORTS_DIR}/Growth Report ${stamp}.md`;
writeFileSync(REPORT_FILE, _buf.join("\n") + "\n");
_log(`\n[saved: ${REPORT_FILE}]`);
