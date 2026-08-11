// WORKS points at the homepage section — /work will never be a real route.
export const SITEMAP = [
  { href: "/#works", label: "Works" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const

// ponytail: placeholder URLs — swap for the real profiles.
export const SOCIAL = [
  { href: "https://x.com", label: "Twitter / X", popupLabel: "@http.lucaso" },
  { href: "https://linkedin.com", label: "LinkedIn", popupLabel: "Lucas Oliveira" },
  { href: "https://github.com", label: "GitHub", popupLabel: "@lukaskunn" },
] as const

export const EMAIL = "hello@lucasoliveira.io"
export const PHONE = "+55 11 9 5442-5212"
export const TIME_ZONE = "America/Sao_Paulo"
