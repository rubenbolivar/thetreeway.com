import { ImageResponse } from "next/og";
import { getDoc } from "../../../../lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TheTreeWay — caso";

export default async function Image({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const doc = getDoc("cases", locale, slug);
  const title = doc?.meta.title ?? "TheTreeWay";
  const label = doc?.meta.label ?? "";

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
        <div
          style={{
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: "#171717",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 26, color: "#1f4d3a" }}>
          TheTreeWay · Casos
        </div>
      </div>
    ),
    size,
  );
}
