export const LOCALES = ["pt", "en"] as const

export type Lang = (typeof LOCALES)[number]

// Portuguese is primary: `/` redirects here and it is the coalesce fallback.
export const DEFAULT_LANG: Lang = "pt"

// hreflang codes differ from the route segment on purpose (`/pt` → `pt-BR`).
export const HREFLANG: Record<Lang, string> = { pt: "pt-BR", en: "en" }

export const isLang = (value: string | undefined): value is Lang =>
  LOCALES.includes(value as Lang)

/** Prefixes an app-absolute href with the active locale: `/about` → `/pt/about`. */
export const withLang = (href: string, lang: Lang) => `/${lang}${href === "/" ? "" : href}`

/** `/pt/about` → `pt`, falling back to the primary locale. */
export const langFromPathname = (pathname: string): Lang => {
  const segment = pathname.split("/")[1]
  return isLang(segment) ? segment : DEFAULT_LANG
}

/** `/pt/about` → `/about` (leading slash kept, empty for the locale root). */
export const stripLang = (pathname: string) => {
  const rest = pathname.replace(/^\/(pt|en)(?=\/|$)/, "")
  return rest || "/"
}
