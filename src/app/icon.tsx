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
          background: "#fafaf9",
          border: "2px solid #0a0a0a",
          borderRadius: 14,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: 60,
          fontWeight: 700,
          fontStyle: "italic",
          color: "#0a0a0a",
          letterSpacing: -2,
          position: "relative",
          paddingBottom: 2,
        }}
      >
        n
        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 10,
            width: 9,
            height: 9,
            borderRadius: 5,
            background: "#10a37f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
