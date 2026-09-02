import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

const BG = "#fafafa"
const TEXT = "#111111"
const TEXT_MUTED = "#11111199"

export function pageOgCard(title: string) {
  return new ImageResponse(
    (
      // ponytail: no custom fonts — every font in public/assets/fonts is
      // .woff2, but Satori only accepts ttf/otf/woff. Drop a .ttf in and
      // pass `fonts: [...]` below to brand this properly.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
          padding: 64,
          background: BG,
          color: TEXT,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 32 }}>Lucas Oliveira</div>
        <div style={{ display: "flex", fontSize: 24, color: TEXT_MUTED }}>Creative Web Developer & Software Engineer</div>
      </div>
    ),
    { ...OG_SIZE }
  )
}
