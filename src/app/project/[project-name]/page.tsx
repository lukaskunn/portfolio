import React from 'react'
import styles from "@/styles/css/project.module.css"
import Overview from './components/Overview'
import Gallery from './components/Gallery'
import ProjectFooter from './components/ProjectFooter'
import { getProjectBySlug, getAllProjects } from '@/sanity/lib/fetch'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    'project-name': string
  }
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
