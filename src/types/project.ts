export type Project = {
  slug: string
  name: string
  client: string
  type: string
  industry: string
  role: string
  year: string
  technologies: readonly string[]
  description: readonly string[]
  images: readonly string[]
}
