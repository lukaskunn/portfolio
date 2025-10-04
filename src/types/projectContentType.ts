export interface LanguageContentType {
  landing: Landing
  transitionsText: TransitionsText
  header: Header
  works: Works
  aboutMe: AboutMe
  resume: Resume
  services: Services
  contact: Contact
}

export interface Landing {
  sectionTitle: string
  nextPageText: string
  menuItems: MenuItem[]
}

export interface MenuItem {
  text: string
  href: string
}

export interface TransitionsText {
  routesTexts: RoutesTexts
  projectsTexts: string[]
  quotes: string[]
}

export interface RoutesTexts {
  "/": string
  "/Works": string
  "/About": string
  "/Contact": string
}

export interface Header {
  headerTitle: string
  menuItems: MenuItem2[]
}

export interface MenuItem2 {
  text: string
  href: string
}

export interface Works {
  sectionTitle: string
  nextPageText: string
  seeMoreText: string
  backToProjectsText: string
  projects: Project[]
}

export interface Project {
  projectId: string
  title: string
  imageAlt?: string
  description: string
  urlToProject: string
  galleryBackground: string
  galleryBackgroundColor: string
  goToExternalPage?: boolean
  briefDescription?: string
  technologies?: string[]
  galleryImages?: GalleryImage[][]
}

export interface GalleryImage {
  front: string
  back: string
  photoText: string
}

export interface AboutMe {
  sectionTitle: string
  nextPageText: string
  sectionSubTitle: string
  content: Content[]
}

export interface Content {
  title: string
  text: string[]
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
  skills: Skills
}

export interface Skills {
  soft: string[]
  hard: string[]
}

export interface Contact {
  title: string
  contacts: ContactItem[]
}

export interface ContactItem {
  type: string
  linkText: string
  urlLink: string
}
