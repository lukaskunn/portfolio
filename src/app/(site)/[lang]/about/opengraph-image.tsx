import { OG_SIZE, OG_CONTENT_TYPE, pageOgCard } from "@/utils/og"

export const alt = "Lucas Oliveira — About"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return pageOgCard(lang === "pt" ? "Sobre" : "About")
}
