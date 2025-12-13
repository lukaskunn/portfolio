export interface LanguageContentType {
  landing: Landing
  header: Header
  footer: Footer
  works: Works
  aboutMe: AboutMe
  resume: Resume
  services: Services
  contact: Contact
}

export interface Footer {
  quickMessage: string
}

export interface Landing {
  sectionTitle: string
  title: string
  subtitle: LandingSubtitle
  mobileSubtitles: string[]
  nextPageText: string
}

export interface LandingSubtitle {
  currentPosition: string
  positionTitle: string
  companyPrefix: string
  companyName: string
  companyUrl: string
  location: string
}

export interface Header {
  headerTitle: string
  menuItems: HeaderMenuItem[]
  resumeButton: HeaderButton
  contactButton: HeaderButton
  mobileNavigation: MobileNavItem[]
  socialLinks: SocialLinkItem[]
  mobileQuickMessage: string
}

export interface HeaderMenuItem {
  title: string
  link: string
}

export interface HeaderButton {
  title: string
  link: string
}

export interface MobileNavItem {
  label: string
  href: string
  type?: string
}

export interface SocialLinkItem {
  label: string
  href: string
  type: string
}

export interface Works {
  sectionTitle: string
  nextPageText: string
  seeMoreText: string
  backToProjectsText: string
  projects: Project[]
}

export interface ProjectOverview {
  projectId: string
  cardTitle: string
  title: string
  subtitle: string
  galleryBackground: string
  imageAlt: string
  galleryBackgroundColor: string
  type: string
  service: string
  industry: string
  year: string
  descriptionLeft: string
  descriptionRight: string
  mainImageUrl: string
  goToExternalPage: boolean
  urlToProject?: string
  technologies: string
}

export interface ProjectGalleryItem {
  image: string
  caption: string
}

export interface ProjectFooter {
  linkToNextProject: string
}

export interface Project {
  overview: ProjectOverview
  gallery: ProjectGalleryItem[]
  footer: ProjectFooter
}

export interface AboutMe {
  sectionTitle: string
  nextPageText: string
  intro: string
  background: AboutMeBackground
  certifications: AboutMeCertifications
}

export interface AboutMeBackground {
  title: string
  paragraphs: string[]
}

export interface AboutMeCertifications {
  title: string
  tableHeaders: string[]
  items: CertificationItem[]
}

export interface CertificationItem {
  subjects: string[]
  source: string
}

export interface Resume {
  sectionTitle: string
  cards: Card[]
}

export interface Card {
  jobTitle: string
  company: string
  startDate: string
  endDate: string
  description: string
}

export interface Services {
  sectionTitle: string
  items: ServiceItem[]
}

export interface ServiceItem {
  title: string
  subtitle: string
  description: string
}

export interface Contact {
  pageHeader: ContactPageHeader
  form: ContactForm
  contactInfo: ContactInfo
  socialLinks: ContactSocialLink[]
}

export interface ContactPageHeader {
  subtitle: string
  title: string
  titleAccent: string
  titleEnd: string
}

export interface ContactForm {
  nameLabel: string
  phoneLabel: string
  emailLabel: string
  messageLabel: string
  requiredMark: string
  submitButton: string
  submittingButton: string
  successMessage: string
  errorMessage: string
  validation: ContactFormValidation
}

export interface ContactFormValidation {
  nameRequired: string
  emailRequired: string
  emailInvalid: string
  messageRequired: string
}

export interface ContactInfo {
  phone: string
  email: string
}

export interface ContactSocialLink {
  name: string
  url: string
}
