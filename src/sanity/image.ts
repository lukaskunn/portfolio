import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { dataset, projectId } from "./env"

const builder = imageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => builder.image(source)

// Guards empty image fields — Sanity leaves `asset` undefined when nothing
// was uploaded, and urlFor() throws on that.
export const imageUrl = (source: { asset?: unknown } | null | undefined, width: number): string | undefined => {
  if (!source?.asset) return undefined
  return urlFor(source as SanityImageSource).width(width).url()
}
