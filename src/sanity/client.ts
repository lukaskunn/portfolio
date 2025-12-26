import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: "lav2qk6b",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = createImageUrlBuilder(client)

import type { SanityImage } from '@/types'

export function urlFor(source: SanityImage | { asset: { _ref: string } }) {
  return builder.image(source)
}
