import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: 128,
          fontWeight: 700,
          fontStyle: "italic",
          color: "#fafaf9",
          letterSpacing: -2,
          position: "relative",
        }}
      >
        N
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            width: 16,
            height: 16,
            borderRadius: 8,
            background: "#10a37f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
