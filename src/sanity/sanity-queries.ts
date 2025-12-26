/**
 * Sanity GROQ Queries for Next.js Project
 *
 * Import these queries in your Next.js app to fetch content from Sanity.
 *
 * Example usage:
 * import { client } from '@/sanity/client'
 * import { LANDING_QUERY } from '@/sanity/queries'
 *
 * const landing = await client.fetch(LANDING_QUERY)
 */

// ===== LANDING PAGE =====
export const LANDING_QUERY = `*[_type == "landing"][0]{
  _id,
  sectionTitle,
  greeting,
  title,
  subtitle,
  mobileSubtitles,
  nextPageText,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
}`

// ===== HEADER CONTENT =====
export const HEADER_QUERY = `*[_type == "headerContent"][0]{
  _id,
  headerTitle,
  mobileQuickMessage,
  logo {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  menuItems[] {
    text,
    url,
    isExternal
  },
  resumeButton {
    text,
    url,
    isExternal
  },
  contactButton {
    text,
    url,
    isExternal
  },
  mobileNavigation[] {
    label,
    href,
    type
  },
  socialLinks[] {
    text,
    url,
    isExternal
  }
}`

// ===== FOOTER =====
export const FOOTER_QUERY = `*[_type == "footer"][0]{
  _id,
  copyrightText,
  quickMessage,
  socialLinks[] {
    text,
    url,
    isExternal
  }
}`

// ===== ABOUT ME =====
export const ABOUT_ME_QUERY = `*[_type == "aboutMe"][0]{
  _id,
  sectionTitle,
  intro,
  background {
    title,
    paragraphs
  },
  certifications {
    title,
    tableHeaders[],
    items[] {
      subjects[],
      source,
      date,
      credentialUrl
    }
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// ===== SERVICES =====
export const SERVICES_QUERY = `*[_type == "services"][0]{
  _id,
  sectionTitle,
  items[] {
    title,
    subtitle,
    description,
    order
  } | order(order asc),
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// ===== RESUME =====
export const RESUME_QUERY = `*[_type == "resume"][0]{
  _id,
  pageTitle,
  experience[] {
    company,
    position,
    location,
    startDate,
    endDate,
    description,
    technologies[]
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// ===== CONTACT =====
export const CONTACT_QUERY = `*[_type == "contact"][0]{
  _id,
  pageHeader {
    title,
    subtitle,
    titleAccent,
    titleEnd
  },
  form {
    nameLabel,
    phoneLabel,
    emailLabel,
    messageLabel,
    requiredMark,
    submitButton,
    submittingButton,
    successMessage,
    errorMessage,
    validation {
      nameRequired,
      emailRequired,
      emailInvalid,
      messageRequired
    }
  },
  contactInfo {
    email,
    phone
  },
  socialLinks[] {
    text,
    url,
    isExternal
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// ===== WORKS (Portfolio Section) =====
export const WORKS_QUERY = `*[_type == "works"][0]{
  _id,
  sectionTitle,
  filterLabels {
    allLabel,
    featuredLabel
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// ===== ALL PROJECTS =====
export const ALL_PROJECTS_QUERY = `*[_type == "project" && status == "published"] | order(order asc){
  _id,
  title,
  subtitle,
  slug,
  status,
  featured,
  order,
  year,
  technologies,
  overview {
    projectId,
    title,
    cardTitle,
    subtitle,
    technologies,
    type,
    service,
    industry,
    year,
    mainImageUrl {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip,
          palette
        }
      },
      alt
    },
    galleryBackground {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    galleryBackgroundColor {
      hex,
      rgb,
      alpha
    },
    urlToProject,
    goToExternalPage
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// ===== FEATURED PROJECTS ONLY =====
export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && status == "published" && featured == true] | order(order asc){
  _id,
  title,
  subtitle,
  slug,
  featured,
  order,
  overview {
    projectId,
    title,
    cardTitle,
    subtitle,
    technologies,
    mainImageUrl {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    urlToProject,
    goToExternalPage
  }
}`

// ===== SINGLE PROJECT BY SLUG =====
export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && overview.projectId == $slug][0]`

// ===== PROJECT SLUGS (for static generation) =====
export const PROJECT_SLUGS_QUERY = `*[_type == "project" && status == "published" && defined(slug.current)]{
  "slug": slug.current
}`

// ===== SITE SETTINGS (if you create a settings document) =====
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  _id,
  siteName,
  siteUrl,
  siteDescription,
  defaultSeo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset->{
        _id,
        url
      }
    }
  },
  socialMedia {
    linkedin,
    github,
    twitter,
    instagram
  }
}`

// ===== UTILITY: Get all document types count =====
export const DOCUMENT_COUNTS_QUERY = `{
  "landing": count(*[_type == "landing"]),
  "headerContent": count(*[_type == "headerContent"]),
  "footer": count(*[_type == "footer"]),
  "aboutMe": count(*[_type == "aboutMe"]),
  "services": count(*[_type == "services"]),
  "resume": count(*[_type == "resume"]),
  "contact": count(*[_type == "contact"]),
  "works": count(*[_type == "works"]),
  "projects": count(*[_type == "project"]),
  "publishedProjects": count(*[_type == "project" && status == "published"]),
  "featuredProjects": count(*[_type == "project" && featured == true])
}`
