import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1220",
          color: "#f2731b",
          fontSize: "120px",
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        J
      </div>
    ),
    { ...size },
  );
}
