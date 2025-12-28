import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { ALL_PROJECTS_QUERY } from '@/sanity/sanity-queries'
import type { ProjectCard } from '@/types'

const baseUrl = 'https://lucasoliveira.io'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all projects from Sanity to generate dynamic URLs
  let projects = []
  try {
    projects = await client.fetch(ALL_PROJECTS_QUERY)
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  // Static pages with priority and change frequency
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-me`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/all-my-links`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project: ProjectCard) => ({
    url: `${baseUrl}/project/${project.overview.projectId}`,
    lastModified: new Date(project._updatedAt || project._createdAt || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...projectPages]
}
