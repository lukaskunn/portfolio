import type { SchemaTypeDefinition } from "sanity"
import { localeBlock, localeString, localeText } from "./objects/locale"
import { seo } from "./objects/seo"
import { contactForm } from "./objects/contactForm"
import { project } from "./documents/project"
import { servicesPage } from "./documents/servicesPage"
import { aboutPage } from "./documents/aboutPage"
import { homePage } from "./documents/homePage"
import { projectPage } from "./documents/projectPage"
import { settings } from "./documents/settings"

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localeBlock,
  seo,
  contactForm,
  project,
  homePage,
  servicesPage,
  aboutPage,
  projectPage,
  settings,
]
