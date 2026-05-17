import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          padding: "4px 0",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 16,
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
            marginTop: 3,
            width: 20,
            height: 2,
            background: "#ba0c2f",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
