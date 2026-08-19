// Marker syntax for homePage.heroTitle: one visual line per newline,
// "[1]"/"[2]"/"[3]" insert heroChips[n-1], "|" marks a mobile-only break
// (rendered as the .break span in HeroSection.module.scss).

export type Token =
  | { type: "text"; value: string }
  | { type: "chip"; index: number }
  | { type: "break" }

const MARKER = /(\[\d+\]|\|)/

export const parseHeroTitle = (text: string): Token[][] =>
  text.split("\n").map((line) =>
    line
      .split(MARKER)
      .map((part): Token | null => {
        if (part === "") return null
        if (part === "|") return { type: "break" }
        const chipMatch = /^\[(\d+)\]$/.exec(part)
        if (chipMatch) return { type: "chip", index: Number(chipMatch[1]) }
        return { type: "text", value: part }
      })
      .filter((token): token is Token => token !== null)
  )

export const heroAriaLabel = (text: string): string =>
  text
    .replace(/\[\d+\]|\|/g, " ")
    .replace(/\s+/g, " ")
    .trim()
