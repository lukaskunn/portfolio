import React from 'react'
import styles from "@/styles/css/project.module.css"
import Overview from './components/Overview'
import Gallery from './components/Gallery'
import ProjectFooter from './components/ProjectFooter'
import { getProjectBySlug, getAllProjects } from '@/sanity/lib/fetch'
import { notFound } from 'next/navigation'
import generateMetadataUtil from '@/utils/generateMetadata'

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

  return (
    <div className={styles.container}>
      <Overview {...projectData.overview} />
      <Gallery items={projectData.gallery} />
      <ProjectFooter linkToNextProject={projectData.overview.urlToProject} />
    </div>
  )
}
