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

export const CLIENTS = ["dexco", "Motorola", "KitchenAid"] as const

// Placeholder copy — swap for the real text.
export const SERVICES = [
  {
    title: "Design",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "Development",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "The full package",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
] as const

export const PROCESS = [
  {
    title: "Research",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "Art direction",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "Design",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "Interaction",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "Development",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
] as const

export const SERVICE_GROUPS = [
  {
    title: "UI/UX Design",
    items: ["Design", "Development", "Content", "Design", "Development", "Content", "Design", "Development", "Content"],
    image: "/assets/images/services/ui-ux-design.jpg",
    size: "big",
  },
  {
    title: "Strategy",
    items: ["Design", "Development", "Content"],
    image: "/assets/images/services/strategy.jpg",
    size: "small",
  },
  {
    title: "Development",
    items: ["Design", "Development", "Content", "Design", "Development", "Content"],
    image: "/assets/images/services/development.jpg",
    size: "medium",
  },
] as const
