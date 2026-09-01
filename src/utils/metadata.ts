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
  generatedOgImage?: boolean
}

export function buildMetadata(params: BuildMetadataParams): Metadata {
  const {
    seo,
    title,
    description = DEFAULT_DESCRIPTION,
    path,
    type = "website",
    generatedOgImage,
  } = params
  const resolvedTitle = seo?.metaTitle || title
  const resolvedDescription = seo?.metaDescription || description
  const ogImageUrl = seo?.ogImage?.asset?.url || OG_IMAGE
  const ogImageDimensions = seo?.ogImage?.asset?.metadata?.dimensions
  // Leaving an `opengraph-image.tsx` route generate the image requires the
  // segment's own metadata to NOT own an `images` key at all — Next only
  // merges file-convention images in when the key is absent.
  const useFileImage = generatedOgImage && !seo?.ogImage?.asset?.url
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
      ...(useFileImage
        ? {}
        : {
            images: [
              {
                url: ogImageUrl,
                width: ogImageDimensions?.width ?? 1810,
                height: ogImageDimensions?.height ?? 956,
              },
            ],
          }),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      creator: "@http_lucaso",
      ...(useFileImage ? {} : { images: [ogImageUrl] }),
    },
  }
}
