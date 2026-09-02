import type { Metadata } from "next"
import { DEFAULT_DESCRIPTION, SITE_NAME } from "./contants"

export type SEO = {
  metaTitle?: string
  metaDescription?: string
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

export function buildMetadata(params: BuildMetadataParams): Metadata {
  const { seo, title, description = DEFAULT_DESCRIPTION, path, type = "website" } = params
  const resolvedTitle = seo?.metaTitle || title
  const resolvedDescription = seo?.metaDescription || description
  return {
    ...(resolvedTitle ? { title: resolvedTitle } : {}),
    description: resolvedDescription,
    alternates: { canonical: path },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      creator: "@http_lucaso",
    },
  }
}
