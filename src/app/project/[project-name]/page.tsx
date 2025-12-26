import React from 'react'
import styles from "@/styles/css/project.module.css"
import Overview from './components/Overview'
import Gallery from './components/Gallery'
import ProjectFooter from './components/ProjectFooter'
import { getProjectBySlug, getAllProjects } from '@/sanity/lib/fetch'
import { notFound } from 'next/navigation'
import generateMetadataUtil from '@/utils/generateMetadata'
import { generateProjectJsonLd, generateBreadcrumbJsonLd } from '@/utils/generateJsonLd'

interface PageProps {
  params: {
    'project-name': string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const projectSlug = decodeURIComponent(params['project-name']);
  const projectData = await getProjectBySlug(projectSlug);

  if (!projectData) {
    return generateMetadataUtil(null, "Project Not Found", "The requested project could not be found.");
  }

  return generateMetadataUtil(
    projectData.seo,
    projectData.title,
    projectData.subtitle,
    undefined,
    `/project/${params['project-name']}`
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const projectSlug = decodeURIComponent(params['project-name']);
  const projectData = await getProjectBySlug(projectSlug);

  if (!projectData) {
    notFound();
  }

  // Generate JSON-LD for individual project
  const projectJsonLd = generateProjectJsonLd({
    name: projectData.title,
    description: projectData.subtitle,
    url: `https://lucasoliveira.io/project/${projectSlug}`,
    image: projectData.overview?.image?.asset?.url,
    keywords: projectData.overview?.tags || [],
    author: {
      name: "Lucas Oliveira",
      jobTitle: "Frontend Developer & Creative Web Designer",
      url: "https://lucasoliveira.io",
    }
  });

  // Generate breadcrumb JSON-LD
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    {
      name: "Home",
      url: "https://lucasoliveira.io"
    },
    {
      name: "Projects",
      url: "https://lucasoliveira.io/projects"
    },
    {
      name: projectData.title,
      url: `https://lucasoliveira.io/project/${projectSlug}`
    }
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* JSON-LD Structured Data for Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className={styles.container}>
        <Overview {...projectData.overview} />
        <Gallery items={projectData.gallery} />
        <ProjectFooter linkToNextProject={projectData.overview.urlToProject} />
      </div>
    </>
  )
}
