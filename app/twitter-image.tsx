import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default function TwitterImage() {
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
          padding: "70px",
          backgroundColor: "#ecfdf5",
          backgroundImage:
            "linear-gradient(140deg, #ecfdf5 0%, #ffffff 60%, #f0fdf4 100%)",
          color: "#0f172a",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "999px",
            backgroundColor: "#99f6e4",
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-100px",
            width: "340px",
            height: "340px",
            borderRadius: "999px",
            backgroundColor: "#6ee7b7",
            opacity: 0.22,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: "999px",
              backgroundColor: "#059669",
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "0.6px",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "880px",
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              marginTop: "18px",
              fontSize: "26px",
              lineHeight: 1.4,
              maxWidth: "880px",
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
