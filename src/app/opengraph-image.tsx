import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ReleveFacile - Convertissez vos releves bancaires PDF en Excel & CSV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, marginBottom: 16 }}>ReleveFacile</div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.9,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Convertissez vos releves bancaires PDF en Excel et CSV en quelques secondes
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 24,
            fontSize: 22,
            opacity: 0.75,
          }}
        >
          <span>PDF</span>
          <span>→</span>
          <span>Excel</span>
          <span>|</span>
          <span>CSV</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
