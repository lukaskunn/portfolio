import type { Metadata } from "next"
import { DEFAULT_DESCRIPTION, OG_IMAGE, SITE_NAME } from "./contants"

export type SEO = {
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    alt?: string
    asset?: {
      url?: string
      metadata?: { dimensions?: { width: number; height: number } }
    }
  }
}

export function truncate(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text
  const sliced = text.slice(0, maxLength)
  const lastSpace = sliced.lastIndexOf(" ")
  return `${sliced.slice(0, lastSpace === -1 ? maxLength : lastSpace)}…`
}

type BuildMetadataParams = {
  seo?: SEO
  title?: string
  description?: string
  path: string
  type?: "website" | "article"
}

// seo is accepted but not read yet — it's the Sanity seam for a future pass.
export function buildMetadata(params: BuildMetadataParams): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path,
    type = "website",
  } = params
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      images: [{ url: OG_IMAGE, width: 1810, height: 956 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@http_lucaso",
      images: [OG_IMAGE],
    },
  }
}
