import { ImageResponse } from "next/og";

export const alt =
  "Nordic Entrepreneur Forum — the working bridge between Norwegian industry and Eastern Europe & China.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0b1722 0%, #102234 45%, #16304a 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "56px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* top metadata strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.55)",
            fontSize: 17,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span>Oslo · 59°55′N · 010°45′E</span>
          <span>nefrod.no</span>
        </div>

        {/* wordmark imprint */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: 40,
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 152,
              fontWeight: 900,
              letterSpacing: "-0.055em",
              lineHeight: 0.9,
              display: "flex",
            }}
          >
            NEF
          </div>
          <div
            style={{
              marginTop: 14,
              width: 280,
              height: 10,
              background: "#ba0c2f",
            }}
          />
        </div>

        {/* tagline */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 44,
            fontWeight: 600,
            letterSpacing: "-0.022em",
            lineHeight: 1.12,
            marginTop: 36,
            maxWidth: 980,
            display: "flex",
          }}
        >
          A working bridge between Norwegian industry and the high-growth
          economies of Eastern Europe & China.
        </div>

        {/* bottom rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            color: "rgba(255,255,255,0.7)",
            fontSize: 19,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>Nordic Entrepreneur Forum</span>
          <span
            style={{
              color: "#ba0c2f",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                background: "#ba0c2f",
                borderRadius: 999,
                display: "flex",
              }}
            />
            The Business Bridge
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
