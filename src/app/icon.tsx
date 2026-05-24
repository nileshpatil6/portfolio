import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: 46,
          fontWeight: 700,
          fontStyle: "italic",
          color: "#fafaf9",
          letterSpacing: -1,
          position: "relative",
        }}
      >
        N
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: 4,
            background: "#10a37f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
