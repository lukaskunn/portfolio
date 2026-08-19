import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { dataset, projectId } from "./env"

const builder = imageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => builder.image(source)
