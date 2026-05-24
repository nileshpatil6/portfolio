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
          background: "#fafaf9",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: 160,
          fontWeight: 700,
          fontStyle: "italic",
          color: "#0a0a0a",
          letterSpacing: -4,
          position: "relative",
          paddingBottom: 4,
        }}
      >
        n
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 32,
            width: 22,
            height: 22,
            borderRadius: 12,
            background: "#10a37f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
