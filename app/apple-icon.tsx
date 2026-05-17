import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#102234",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 86,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          NEF
        </div>
        <div
          style={{
            marginTop: 14,
            width: 110,
            height: 10,
            background: "#ba0c2f",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
