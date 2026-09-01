import { ImageResponse } from "next/og"
import { sanityFetch } from "@/sanity/client"
import { imageUrl } from "@/sanity/image"
import { projectBySlugQuery } from "@/sanity/queries"
import type { ProjectDetail } from "@/types/content"

export const alt = "Lucas Oliveira — Project"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BG = "#fafafa"
const TEXT = "#111111"
const TEXT_MUTED = "#11111199"

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params

  try {
    const project = await sanityFetch<ProjectDetail | null>(projectBySlugQuery, { lang, slug })
    if (!project) throw new Error("Project not found")

    const image = imageUrl(project.images?.[0], 640)

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
            background: BG,
            color: TEXT,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 16,
              padding: 64,
              flex: 1,
            }}
          >
            <div style={{ display: "flex", fontSize: 28, color: TEXT_MUTED }}>
              {[project.client, project.year].filter(Boolean).join(" · ")}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {project.name}
            </div>
            {project.technologies?.length ? (
              <div style={{ display: "flex", fontSize: 24, color: TEXT_MUTED }}>
                {project.technologies.join(" / ")}
              </div>
            ) : null}
            <div style={{ display: "flex", fontSize: 24, marginTop: 32 }}>Lucas Oliveira</div>
          </div>

          {image && (
            <div style={{ display: "flex", alignItems: "center", padding: 32 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} width={480} height={480} style={{ objectFit: "cover", borderRadius: 16 }} alt="" />
            </div>
          )}
        </div>
      ),
      { ...size }
    )
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: BG,
            color: TEXT,
            fontSize: 56,
            fontWeight: 700,
          }}
        >
          Lucas Oliveira
        </div>
      ),
      { ...size }
    )
  }
}
