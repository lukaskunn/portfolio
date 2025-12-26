/**
 * Generate JSON-LD structured data for better SEO and rich snippets
 *
 * JSON-LD (JavaScript Object Notation for Linked Data) helps search engines
 * understand your content better and can result in rich snippets in search results.
 */

export interface PersonJsonLd {
  name: string
  jobTitle: string
  url: string
  image?: string
  sameAs?: string[]
  email?: string
  description?: string
}

export interface WebSiteJsonLd {
  name: string
  url: string
  description: string
  author: PersonJsonLd
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface ProjectJsonLd {
  name: string
  description: string
  url: string
  image?: string
  datePublished?: string
  author: PersonJsonLd
  keywords?: string[]
}

/**
 * Generate Person schema (for About page)
 */
export function generatePersonJsonLd(data: PersonJsonLd) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    url: data.url,
    ...(data.image && { image: data.image }),
    ...(data.email && { email: data.email }),
    ...(data.description && { description: data.description }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  }
}

/**
 * Generate WebSite schema (for homepage)
 */
export function generateWebSiteJsonLd(data: WebSiteJsonLd) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author.name,
      jobTitle: data.author.jobTitle,
      url: data.author.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.url}/projects?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate CreativeWork schema (for project pages)
 */
export function generateProjectJsonLd(data: ProjectJsonLd) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    ...(data.datePublished && { datePublished: data.datePublished }),
    ...(data.keywords && { keywords: data.keywords.join(', ') }),
    creator: {
      '@type': 'Person',
      name: data.author.name,
      jobTitle: data.author.jobTitle,
      url: data.author.url,
    },
    author: {
      '@type': 'Person',
      name: data.author.name,
      jobTitle: data.author.jobTitle,
      url: data.author.url,
    },
  }
}

/**
 * Generate BreadcrumbList schema (for navigation)
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate ProfilePage schema (for About Me page)
 */
export function generateProfilePageJsonLd(data: PersonJsonLd) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: data.name,
      jobTitle: data.jobTitle,
      url: data.url,
      ...(data.image && { image: data.image }),
      ...(data.email && { email: data.email }),
      ...(data.description && { description: data.description }),
      ...(data.sameAs && { sameAs: data.sameAs }),
    },
  }
}

/**
 * Generate CollectionPage schema (for Projects listing page)
 */
export function generateCollectionPageJsonLd(projects: ProjectJsonLd[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects - Lucas Oliveira',
    description: 'Portfolio of web development projects by Lucas Oliveira',
    hasPart: projects.map(project => ({
      '@type': 'CreativeWork',
      name: project.name,
      description: project.description,
      url: project.url,
      ...(project.image && { image: project.image }),
    })),
  }
}
