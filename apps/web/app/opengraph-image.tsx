import { ImageResponse } from "next/og";

export const alt =
  "Reeckon — Build, preview, and share AI Skills across your team and every coding tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const plexMono = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3vAO8lc.ttf"
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0a0a0b",
        padding: "60px 80px",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#3416ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: "white",
          }}
        >
          R
        </div>
        <span
          style={{
            fontSize: "32px",
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          reeckon
        </span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: "#81f5de",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        {"// AI Skills Platform"}
      </div>
      <div
        style={{
          fontSize: "48px",
          color: "white",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          maxWidth: "900px",
          borderBottom: "3px solid #81f5de",
          paddingBottom: "12px",
        }}
      >
        Build, preview, and share AI Skills across your team and every coding
        tool
      </div>
      <div
        style={{
          fontSize: "20px",
          color: "rgba(255, 255, 255, 0.6)",
          textAlign: "center",
          marginTop: "28px",
        }}
      >
        reeckon.io
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: plexMono,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
