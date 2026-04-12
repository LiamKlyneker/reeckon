import { ImageResponse } from "next/og";

export const alt =
  "Reeckon — Build, preview, and share AI Skills across your team and every coding tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const geistSemiBold = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/geist/v4/gyBhhwUxId8gMGYQMKR3pzfaWI_RQuQ4nQ.ttf"
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
        background:
          "linear-gradient(135deg, #1a0533 0%, #4318D1 50%, #1a0533 100%)",
        padding: "60px 80px",
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
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: "white",
            fontFamily: "Geist",
          }}
        >
          R
        </div>
        <span
          style={{
            fontSize: "32px",
            color: "white",
            fontFamily: "Geist",
            letterSpacing: "-0.02em",
          }}
        >
          reeckon
        </span>
      </div>
      <div
        style={{
          fontSize: "48px",
          color: "white",
          fontFamily: "Geist",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          maxWidth: "900px",
        }}
      >
        Build, preview, and share AI Skills across your team and every coding
        tool
      </div>
      <div
        style={{
          fontSize: "20px",
          color: "rgba(255, 255, 255, 0.7)",
          fontFamily: "Geist",
          textAlign: "center",
          marginTop: "24px",
        }}
      >
        reeckon.io
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
