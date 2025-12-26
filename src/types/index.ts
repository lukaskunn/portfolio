/**
 * Centralized TypeScript Types for Portfolio Project
 *
 * This file contains all types used throughout the application,
 * consolidated from Sanity CMS types and project-specific types.
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
  type?: string
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
  [key: string]: unknown
}

export type PortableTextContent = PortableTextBlock[]

// ===== LANDING PAGE =====

export interface Landing {
  _id: string
  _type: 'landing'
  sectionTitle: string
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
  mobileQuickMessage: string
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
  subjects: string[]
  source: string
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

// ===== CONTACT =====

export interface ContactFormConfig {
  nameLabel: string
  phoneLabel: string
  emailLabel: string
  messageLabel: string
  submitLabel: string
  submitButton: string
  submittingButton: string
  successMessage: string
  errorMessage: string
  requiredMark: string
  validation: {
    nameRequired: string
    emailRequired: string
    emailInvalid: string
    messageRequired: string
  }
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
  overview: ProjectOverview
  gallery?: GalleryItem[]
  footer?: ProjectFooter
  seo: SEO
}

export interface ProjectCard {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  subtitle?: string
  slug: SanitySlug
  link: SanitySlug
  image?: SanityImage
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

// ===== CONTEXT TYPES =====

export interface DeviceContextType {
  device: string
  isMobile: boolean
  isDesktop: boolean
  isTablet: boolean
  isSmallTablet: boolean
  isSmallDesktop: boolean
  isUltraWide: boolean
}

export type CursorSize = 'big' | 'medium' | 'small' | 'keep'

export interface SetIsHoveringProps {
  value: boolean
  size?: CursorSize
}

export interface ModalProps {
  isOpen: boolean
  content: string
  scramble?: boolean
}

export interface CursorContextType {
  hoverImportantText: boolean
  setHoverImportantText: (value: boolean) => void
  position: { x: number; y: number; scrollX: number; scrollY: number }
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number; scrollX: number; scrollY: number }>>
  hoverSize: string
  setIsHovering: (props: SetIsHoveringProps) => void
  modalProps: ModalProps
  setModalProps: (value: ModalProps) => void
  handleModalPropsEnter: (content: string, scramble: boolean) => void
  handleModalPropsLeave: (content: string) => void
}

export interface PageContextType {
  isLoaded: boolean
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

export interface TransitionContextType {
  isTransitioningIn: boolean
  isTransitioningOut: boolean
  isPageReady: boolean
  nextPath?: string | null
  displayPageName?: string
  setIsTransitioningIn: React.Dispatch<React.SetStateAction<boolean>>
  setIsTransitioningOut: React.Dispatch<React.SetStateAction<boolean>>
  setNextPath?: React.Dispatch<React.SetStateAction<string | null>>
  setDisplayPageName?: React.Dispatch<React.SetStateAction<string>>
}

export interface ProjectModal {
  isActive: boolean
  index: number
}

export interface ProjectModalContextType {
  modal: ProjectModal
  updateModal: (index: number, modalIsActive: boolean) => void
}

// ===== COMPONENT PROPS =====

export interface HeaderProps {
  data: HeaderContent
}

export interface FooterProps {
  data: Footer
}

export interface ContactFormProps {
  data: {
    form: ContactFormConfig
    formConfig: ContactFormConfig
  }
}

export interface ContactInfoProps {
  data: Contact
}

export interface PageHeaderProps {
  data: {
    pageHeader: {
      title: string
      subtitle: string
      titleAccent: string
      titleEnd: string
      description: PortableTextContent
    }
  }
}

export interface ProjectsClientProps {
  works: Works
  projects: ProjectCard[]
}

export interface ProjectModalProps {
  projects: ProjectCard[]
}

export interface ServicesSectionProps {
  data: {
    sectionTitle: string
    items: Service[]
  }
}

export interface CertificationsSectionProps {
  data: {
    sectionTitle: string
    title: string
    tableHeaders: string[]
    items: Array<{
      subjects: string[]
      source: string
      institution: string
      course: string
      year: string
      link?: Link
    }>
  }
}

export interface BackgroundSectionProps {
  data: {
    background: {
      sectionTitle: string
      title: string
      paragraphs: PortableTextContent
    }
  }
}

export interface IntroSectionProps {
  data: AboutMe
}

export interface HeroSectionProps {
  data: {
    sectionTitle: string
    pageTitle: string
  }
}

export interface SocialLinksProps {
  data: Footer
}

export interface WorkMessageProps {
  data: Footer
}

export interface DownloadResumeButtonProps {
  data: Link
}

export interface ContactMeButtonProps {
  data: Link
}

export interface HeaderDesktopProps {
  data: HeaderContent
}

export interface HeaderMobileProps {
  data: HeaderContent
}

// ===== FORM TYPES =====

export interface ContactFormData {
  name: string
  phone: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export interface ContactFormState {
  formData: ContactFormData
  errors: ContactFormErrors
  isSubmitting: boolean
  submitStatus: 'idle' | 'success' | 'error'
}

// ===== ANIMATION TYPES =====

export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
}

export interface ScrollAnimationConfig extends AnimationConfig {
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
}

// ===== UTILITY TYPES =====

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityReference<T = SanityDocument> {
  _type: 'reference'
  _ref: string
  _weak?: boolean
  _strengthenOnPublish?: {
    type: string
    weak?: boolean
  }
}

export type AsyncData<T> = {
  data: T | null
  error: Error | null
  loading: boolean
}

export type FetchResult<T> = Promise<T | null>

// ===== TYPE GUARDS =====

export function isProject(doc: unknown): doc is Project {
  return typeof doc === 'object' && doc !== null && (doc as SanityDocument)._type === 'project'
}

export function isPublishedProject(project: Project): boolean {
  return project.status === 'published'
}

export function isFeaturedProject(project: Project): boolean {
  return project.featured === true
}

// ===== SITEMAP TYPES =====

export interface SitemapEntry {
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}
