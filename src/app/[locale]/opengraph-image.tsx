import { ImageResponse } from "next/og";

// Brand OG for the home / locale root (REFACTOR §6). Sober: white,
// black, the six-layer bands as a brand mark. Typography refinement
// (serif embed) is Sprint 6 polish.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TheTreeWay";

const TINTS = [
  "rgba(115,115,115,0.18)",
  "rgba(45,125,110,0.20)",
  "rgba(45,125,110,0.20)",
  "rgba(70,110,160,0.20)",
  "rgba(70,110,160,0.20)",
  "rgba(120,90,160,0.20)",
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {TINTS.map((c, i) => (
            <div
              key={i}
              style={{ height: 14, width: 360 - i * 8, background: c }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ fontSize: 64, fontWeight: 600, color: "#171717" }}
          >
            TheTreeWay
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#525252",
              marginTop: 12,
              maxWidth: 820,
            }}
          >
            Arquitectura digital para empresas que no caben en un
            template.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
