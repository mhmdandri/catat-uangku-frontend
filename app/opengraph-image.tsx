import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          backgroundColor: "#ecfdf5",
          backgroundImage:
            "linear-gradient(135deg, #ecfdf5 0%, #ffffff 55%, #f0fdf4 100%)",
          color: "#0f172a",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-90px",
            right: "-90px",
            width: "320px",
            height: "320px",
            borderRadius: "999px",
            backgroundColor: "#a7f3d0",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            backgroundColor: "#6ee7b7",
            opacity: 0.25,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "12px 24px",
              borderRadius: "999px",
              backgroundColor: "#059669",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.6px",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              marginTop: "20px",
              fontSize: "28px",
              lineHeight: 1.4,
              maxWidth: "900px",
              color: "#334155",
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    size
  );
}
