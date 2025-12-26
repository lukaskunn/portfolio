/**
 * Sanity Data Fetching Utilities
 *
 * Provides cached fetch functions for common Sanity queries.
 * Use these in Server Components for automatic caching and revalidation.
 */

import { client } from '@/sanity/client'
import {
  LANDING_QUERY,
  HEADER_QUERY,
  FOOTER_QUERY,
  ABOUT_ME_QUERY,
  CONTACT_QUERY,
  WORKS_QUERY,
  ALL_PROJECTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/sanity-queries'

// Cache configuration
const REVALIDATE_TIME = 3600 // 1 hour

/**
 * Fetch landing page content
 */
export async function getLandingContent() {
  return client.fetch(LANDING_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch header content
 */
export async function getHeaderContent() {
  return client.fetch(HEADER_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch footer content
 */
export async function getFooterContent() {
  return client.fetch(FOOTER_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch about me content
 */
export async function getAboutMeContent() {
  return client.fetch(ABOUT_ME_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch contact page content
 */
export async function getContactContent() {
  return client.fetch(CONTACT_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch works section content
 */
export async function getWorksContent() {
  return client.fetch(WORKS_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch all published projects
 */
export async function getAllProjects() {
  return client.fetch(ALL_PROJECTS_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch featured projects only
 */
export async function getFeaturedProjects() {
  return client.fetch(FEATURED_PROJECTS_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string) {
  console.log("Fetching project with slug:", slug);
  return client.fetch(PROJECT_BY_SLUG_QUERY, { slug }, {
    next: { revalidate: REVALIDATE_TIME }
  })
}

/**
 * Fetch common layout content (header + footer)
 * Useful for layout.tsx to fetch both at once
 */
export async function getLayoutContent() {
  const [header, footer] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
  ])

  return { header, footer }
}

/** * Fetch services content
 */
export async function getServicesContent() {
  const [services] = await Promise.all([
    client.fetch(SERVICES_QUERY, {}, {
      next: { revalidate: REVALIDATE_TIME }
    }),
  ])

  return { services }
}

/** * Fetch site settings
 */
export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY, {}, {
    next: { revalidate: REVALIDATE_TIME }
  })
}