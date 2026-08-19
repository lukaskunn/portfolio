import type { PortableTextBlock } from "@portabletext/react"
import type { SEO } from "@/utils/metadata"
import type { Lang } from "@/utils/locale"

// Hand-written against the projections in src/sanity/queries.ts — sanity.types.ts
// types every localised field as `Array<localeString> | string | null` since
// typegen can't narrow `coalesce(f[$lang], f.pt)`, so it's documentation only.

export type SanityImage = {
  asset?: { _ref?: string; url?: string }
  hotspot?: unknown
  crop?: unknown
  alt?: string
}

export type ContactInfo = {
  email?: string
  phone?: string
  copyEmailLabel?: string
  emailCopiedLabel?: string
  copyPhoneLabel?: string
  phoneCopiedLabel?: string
}

export type NavItem = {
  label: string
  action: "link" | "contact"
  href?: string
  showInHeader?: boolean
  showInFooter?: boolean
}

export type SocialLink = {
  label: string
  href: string
  popupLabel?: string
}

export type FieldLabels = {
  projectName?: string
  client?: string
  type?: string
  role?: string
  year?: string
  industry?: string
  technologies?: string
  description?: string
}

export type Settings = {
  defaultTitle: string
  defaultDescription: string
  ogImage?: SanityImage
  loaderImages?: SanityImage[]
  pages?: NavItem[]
  sitemapLabel?: string
  logoName?: string
  contactLabel?: string
  sendMessageLabel?: string
  fieldLabels?: FieldLabels
  viewProjectLabel?: string
  viewLiveProjectLabel?: string
  scrollToExploreLabel?: string
  roleLabel?: string
  available?: boolean
  availableLabel?: string
  unavailableLabel?: string
  email?: string
  copyEmailLabel?: string
  emailCopiedLabel?: string
  phone?: string
  copyPhoneLabel?: string
  phoneCopiedLabel?: string
  social?: SocialLink[]
  socialLabel?: string
  menuLabel?: string
  closeMenuLabel?: string
  contactModalLabel?: string
  closeContactFormLabel?: string
  switchLanguageLabel?: Partial<Record<Lang, string>>
  ctaTitle?: string
  ctaPopupLabel?: string
  latitude?: number
  longitude?: number
  remoteFromLabel?: string
  timeZone?: string
}

export type HeroChip = {
  image?: SanityImage
}

export type HomePage = {
  seo?: SEO
  heroTitle: string
  heroChips?: HeroChip[]
  heroSectionLabel?: string
  heroLocationLabel?: string
  heroCurrentRole?: string
  heroRoles?: string[]
  worksTitle?: string
  worksSectionLabel?: string
}

export type ServiceCard = {
  title: string
  body: string
}

export type ServiceGroup = {
  title: string
  items?: string[]
  image?: SanityImage
  size: "small" | "medium" | "big"
}

export type ProcessStep = {
  title: string
  body: string
}

export type ServicesPage = {
  seo?: SEO
  heroTitle: string
  heroSectionLabel?: string
  scrollCueLabel?: string
  helpTitle?: string
  helpSectionLabel?: string
  servicesTitle?: string
  servicesSectionLabel?: string
  services?: ServiceCard[]
  serviceGroups?: ServiceGroup[]
  processTitle?: string
  processSectionLabel?: string
  process?: ProcessStep[]
  contactSectionLabel?: string
}

export type AboutPage = {
  seo?: SEO
  heroTitle: string
  bio: PortableTextBlock[]
  clients?: string[]
  clientsLabel?: string
  profileImage?: SanityImage
}

export type ProjectPageLabels = {
  backLabel?: string
  nextLabel?: string
}

export type ProjectListItem = {
  slug: string
  name: string
  client: string
  year: string
  technologies?: string[]
  type: string
  industry: string
  role: string
  description: PortableTextBlock[]
  images?: SanityImage[]
  seo?: SEO
}

export type ProjectDetail = ProjectListItem & {
  showLiveLink?: boolean
  liveUrl?: string
}
