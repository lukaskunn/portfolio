'use client';
import React from 'react'
import styles from '@/styles/css/projects.module.css';
import ProjectModal from '@/components/ProjectModal';
import ProjectItem from './ProjectItem';
import { useProjectModalContext } from '@/contexts/ProjectsModalContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectsPage = () => {
  const { updateModal } = useProjectModalContext();
  const { currentContent } = useLanguage();
  const { works } = currentContent;

  const { projects } = works

  return (
    <main className={styles["container"]}>
      <h1 className={styles["title"]}>{works.sectionTitle} <span className={styles["project-counter"]}>({works.projects.length})</span></h1>
      <div className={styles["project-list-container"]}>
        {projects.map((project, index) => {
          const { overview } = project;
          const { subtitle, projectId, technologies, cardTitle, goToExternalPage } = overview
          return (
            <ProjectItem key={index} project={{ link: projectId, tech: technologies, title: cardTitle, subtitle }} index={index} updateModal={updateModal} openOnExternalPage={goToExternalPage} />
          )
        })}
      </div>
      <ProjectModal />
    </main>
  )
}

export default ProjectsPage