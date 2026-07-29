import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Girl Can Foundation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #FFFCFA 0%, #FBE4E9 50%, #F5E8CC 100%)",
        }}
      >
        <div style={{ fontSize: 28, color: "#9C6E22", letterSpacing: 4, textTransform: "uppercase" }}>
          Empowering Girls & Young Women
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 800,
            color: "#241E1B",
            lineHeight: 1.1,
          }}
        >
          She Believes. She Leads. She Can.
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#C94A6D" }}>
          The Girl Can Foundation
        </div>
      </div>
    ),
    { ...size }
  );
}
