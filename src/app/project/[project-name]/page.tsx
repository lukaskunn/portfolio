'use client'
import React from 'react'
import styles from "@/styles/css/project.module.css"
import Overview from './components/Overview'
import Gallery from './components/Gallery'
import ProjectFooter from './components/ProjectFooter'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Project } from '@/utils/types'

// This would be fetched based on the project-name param
// For now, using mock data matching the JSON structure
const getProjectData = (projectName: string, projects: Project[]) => {
  const projectNameDecoded = decodeURIComponent(projectName);
  return projects.find(project => project.overview.projectId === projectNameDecoded)!
}

interface PageProps {
  params: {
    'project-name': string
  }
}

const ProjectPage = ({ params }: PageProps) => {
  const { currentContent } = useLanguage();
  const { projects } = currentContent.works;

  const projectData = getProjectData(params['project-name'], projects)

  return (
    <div className={styles.container}>
      <Overview {...projectData.overview} />
      <Gallery items={projectData.gallery} />
      <ProjectFooter {...projectData.footer} />
    </div>
  )
}

export default ProjectPage
