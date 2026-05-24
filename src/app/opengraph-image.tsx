import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nilesh Patil | Full Stack & Gen AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background:
            "linear-gradient(135deg, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "#57534e",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#0a0a0a" }} />
          NILESH.SH
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.02,
              color: "#0a0a0a",
              letterSpacing: "-0.03em",
            }}
          >
            Nilesh Patil
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#44403c",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            Full Stack & Gen AI Developer
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#78716c",
              lineHeight: 1.4,
              maxWidth: 980,
              marginTop: 14,
            }}
          >
            Production AI agents, RAG, LLM apps. 8x hackathon winner. PRs merged into OpenAI, Google, Hugging Face.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#57534e",
          }}
        >
          <div style={{ display: "flex", gap: 26, fontWeight: 500 }}>
            <span>nileshpatil6.com</span>
            <span style={{ color: "#a8a29e" }}>/</span>
            <span>Belgaum, India</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              padding: "12px 22px",
              background: "#0a0a0a",
              color: "#fafaf9",
              borderRadius: 999,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Available for hire
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
