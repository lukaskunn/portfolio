/**
 * TypeScript types for Sanity CMS content
 * 
 * These types match the schema definitions and can be used in your Next.js project
 * for type-safe content fetching and rendering.
 * 
 * Usage:
 * import type { Project, Landing, AboutMe } from '@/types/sanity'
 */

// ===== COMMON TYPES =====

export interface SanityImage {
  _type: 'image'
  asset: {
    _id: string
    url: string
    metadata?: {
      dimensions: {
        width: number
        height: number
        aspectRatio: number
      }
      lqip?: string
      palette?: {
        dominant?: {
          background?: string
          foreground?: string
        }
      }
    }
  }
  alt: string
  caption?: string
}

export interface SanityColor {
  _type: 'color'
  hex: string
  rgb?: {
    r: number
    g: number
    b: number
    a?: number
  }
  alpha?: number
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface Link {
  text: string
  url: string
  isExternal: boolean
}

export interface SEO {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogImage?: SanityImage
}

// ===== PORTABLE TEXT TYPES =====

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
  children: PortableTextSpan[]
  markDefs: PortableTextMarkDef[]
  listItem?: 'bullet' | 'number'
  level?: number
}

export interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks?: string[]
}

export interface PortableTextMarkDef {
  _type: string
  _key: string
  href?: string
  [key: string]: any
}

export type PortableTextContent = PortableTextBlock[]

// ===== LANDING PAGE =====

export interface Landing {
  _id: string
  _type: 'landing'
  sectionTitle: string
  greeting: string
  title: string
  subtitle: {
    currentPosition: string
    positionTitle: string
    companyPrefix: string
    companyName: string
    companyUrl: string
    location: string
  }
  mobileSubtitles: string[]
  nextPageText: string
  seo: SEO
}

// ===== HEADER CONTENT =====

export interface MobileNavItem {
  label: string
  href: string
  type?: 'resume' | 'contact'
}

export interface HeaderContent {
  _id: string
  _type: 'headerContent'
  headerTitle: string
  logo?: SanityImage
  menuItems: Link[]
  resumeButton: Link
  contactButton: Link
  mobileNavigation: MobileNavItem[]
  socialLinks: Link[]
}

// ===== FOOTER =====

export interface Footer {
  _id: string
  _type: 'footer'
  copyrightText: string
  quickMessage: string
  socialLinks: Link[]
}

// ===== ABOUT ME =====

export interface Certification {
  institution: string
  course: string
  year: string
  link?: Link
}

export interface AboutMe {
  _id: string
  _type: 'aboutMe'
  pageTitle: string
  intro: PortableTextContent
  background: {
    sectionTitle: string
    paragraphs: PortableTextContent
  }
  certifications: {
    sectionTitle: string
    items: Certification[]
  }
  seo: SEO
}

// ===== SERVICES =====

export interface Service {
  title: string
  subtitle: string
  description: PortableTextContent
  order: number
}

export interface Services {
  _id: string
  _type: 'services'
  sectionTitle: string
  items: Service[]
  seo: SEO
}

// ===== RESUME =====

export interface Experience {
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string | null
  description: PortableTextContent
  technologies: string[]
}

export interface Resume {
  _id: string
  _type: 'resume'
  pageTitle: string
  experience: Experience[]
  seo: SEO
}

// ===== CONTACT =====

export interface ContactFormConfig {
  nameLabel: string
  emailLabel: string
  messageLabel: string
  submitLabel: string
  successMessage: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface Contact {
  _id: string
  _type: 'contact'
  pageHeader: {
    title: string
    description: PortableTextContent
  }
  formConfig: ContactFormConfig
  contactInfo: ContactInfo
  socialLinks: Link[]
  seo: SEO
}

// ===== WORKS (Portfolio Section) =====

export interface Works {
  _id: string
  _type: 'works'
  sectionTitle: string
  filterLabels: {
    allLabel: string
    featuredLabel: string
  }
  seo: SEO
}

// ===== CLIENT =====

export interface Client {
  _id: string
  _type: 'client'
  name: string
  logo?: SanityImage
  website?: string
  industry?: string
  description?: string
}

// ===== PROJECT =====

export interface ProjectOverview {
  projectId: SanitySlug
  title: string
  cardTitle?: string
  subtitle?: string
  technologies?: string[]
  client?: Client
  galleryBackground?: SanityImage
  galleryBackgroundColor?: SanityColor
  type?: 'e-commerce' | 'institutional' | 'web-app' | 'landing-page' | 'mobile-app' | 'personal' | 'other'
  service?: 'web-development' | 'ui-ux-design' | 'full-stack' | 'frontend' | 'backend' | 'consulting' | 'other'
  industry?: 'e-commerce' | 'house-design' | 'technology' | 'fashion' | 'finance' | 'healthcare' | 'education' | 'entertainment' | 'other'
  year?: string
  descriptionLeft?: PortableTextContent
  descriptionRight?: PortableTextContent
  mainImageUrl: SanityImage
  urlToProject?: string
  goToExternalPage?: boolean
}

export interface GalleryItem {
  _key: string
  _type: 'object'
  image: SanityImage
  caption?: string
}

export interface ProjectFooter {
  nextProject?: {
    _id: string
    title: string
    slug: SanitySlug
    overview: {
      cardTitle?: string
      mainImageUrl: SanityImage
    }
  }
  linkToNextProject?: string
}

export interface Project {
  _id: string
  _type: 'project'
  title: string
  subtitle?: string
  slug: SanitySlug
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  order: number
  year?: string
  completionDate?: string
  liveUrl?: string
  technologies?: string[]
  description?: PortableTextContent
  challenges?: PortableTextContent
  responsibilities?: PortableTextContent
  results?: PortableTextContent
  overview: ProjectOverview
  gallery?: GalleryItem[]
  footer?: ProjectFooter
  seo: SEO
}

// ===== SIMPLIFIED TYPES FOR LISTINGS =====

export interface ProjectCard {
  _id: string
  title: string
  subtitle?: string
  slug: SanitySlug
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  order: number
  year?: string
  technologies?: string[]
  overview: {
    projectId: SanitySlug
    title: string
    cardTitle?: string
    subtitle?: string
    technologies?: string[]
    type?: string
    service?: string
    industry?: string
    year?: string
    mainImageUrl: SanityImage
    galleryBackground?: SanityImage
    galleryBackgroundColor?: SanityColor
    urlToProject?: string
    goToExternalPage?: boolean
  }
  seo: SEO
}

// ===== QUERY RESPONSE TYPES =====

export interface LandingPageData {
  landing: Landing
  projects: ProjectCard[]
}

export interface ProjectPageData {
  project: Project
}

export interface AboutPageData {
  aboutMe: AboutMe
}

export interface ServicesPageData {
  services: Services
}

export interface ResumePageData {
  resume: Resume
}

export interface ContactPageData {
  contact: Contact
}

export interface WorksPageData {
  works: Works
  projects: ProjectCard[]
}

// ===== UTILITY TYPES =====

export interface ProjectSlug {
  slug: string
}

export interface DocumentCounts {
  landing: number
  headerContent: number
  footer: number
  aboutMe: number
  services: number
  resume: number
  contact: number
  works: number
  projects: number
  publishedProjects: number
  featuredProjects: number
}

// ===== SITE SETTINGS (Optional) =====

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  siteName: string
  siteUrl: string
  siteDescription: string
  defaultSeo: SEO
  socialMedia?: {
    linkedin?: string
    github?: string
    twitter?: string
    instagram?: string
  }
}

// ===== TYPE GUARDS =====

export function isProject(doc: any): doc is Project {
  return doc._type === 'project'
}

export function isPublishedProject(project: Project): boolean {
  return project.status === 'published'
}

export function isFeaturedProject(project: Project): boolean {
  return project.featured === true
}

// ===== SANITY DOCUMENT REFERENCE =====

export interface SanityReference<T = any> {
  _type: 'reference'
  _ref: string
  _weak?: boolean
  _strengthenOnPublish?: {
    type: string
    weak?: boolean
  }
}

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// ===== HELPER TYPES FOR ASYNC DATA =====

export type AsyncData<T> = {
  data: T | null
  error: Error | null
  loading: boolean
}

export type FetchResult<T> = Promise<T | null>
