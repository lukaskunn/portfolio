import { OG_SIZE, OG_CONTENT_TYPE, pageOgCard } from "@/utils/og"

export const alt = "Lucas Oliveira"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return pageOgCard("Lucas Oliveira")
}
