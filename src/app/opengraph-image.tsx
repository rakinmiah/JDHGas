import { ImageResponse } from "next/og";

export const alt = "JDH Gas Services — Gas Safe registered engineer in Burgess Hill & Mid Sussex";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1220",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "#f2731b",
            }}
          />
          <div style={{ display: "flex", fontSize: "40px", fontWeight: 800, letterSpacing: "-1px" }}>
            JDH Gas
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", fontSize: "66px", fontWeight: 800, lineHeight: 1.05, maxWidth: "920px" }}>
            Your local gas engineer in Burgess Hill
          </div>
          <div style={{ display: "flex", fontSize: "34px", color: "#cbd5e1" }}>
            Boiler servicing · Repairs · Gas safety certificates
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: "28px", fontWeight: 700, color: "#f2731b" }}>
          Gas Safe registered · 977838
        </div>
      </div>
    ),
    { ...size },
  );
}
