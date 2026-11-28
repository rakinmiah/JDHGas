import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "JDH Gas Services: Gas Safe registered gas and heating engineer in Burgess Hill & Mid Sussex";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand colours (mirror globals.css: ink, flame, steel). Satori can't read CSS
// variables, so the values are repeated here.
const INK = "#06173a";
const FLAME = "#5cb4ff";
const STEEL = "#9db4cc";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/shield-logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          backgroundImage: "radial-gradient(70% 90% at 100% 0%, rgba(42,92,240,0.45), rgba(6,23,58,0))",
          color: "#ffffff",
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={logoSrc} width={96} height={96} />
          <div style={{ display: "flex", fontSize: "44px", fontWeight: 800, letterSpacing: "-1px" }}>
            JDH<span style={{ color: FLAME, marginLeft: "12px" }}>Gas Services</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", fontSize: "64px", fontWeight: 800, lineHeight: 1.05, maxWidth: "940px" }}>
            Gas &amp; heating engineer in Burgess Hill
          </div>
          <div style={{ display: "flex", fontSize: "32px", color: STEEL }}>
            Boiler servicing · Repairs · Installs · Gas safety certificates
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "28px", fontWeight: 700 }}>
          <div style={{ display: "flex", color: FLAME }}>Gas Safe registered · 977838</div>
          <div style={{ display: "flex", color: STEEL, fontWeight: 600 }}>jdhgas.co.uk</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
