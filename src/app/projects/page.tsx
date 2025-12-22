'use client';
import React from 'react'
import styles from '@/styles/css/projects.module.css';
import ProjectModal from '@/app/projects/components/ProjectModal';
import ProjectList from './ProjectList';
import { useProjectModalContext } from '@/contexts/ProjectsModalContext';
import { useLanguage } from '@/contexts/LanguageContext';
import SplitTextReveal from '@/components/animations/SplitTextReveal';

const ProjectsPage = () => {
  const { updateModal } = useProjectModalContext();
  const { currentContent } = useLanguage();
  const { works } = currentContent;

  const { projects } = works

  return (
    <main className={styles["container"]}>
      <h1 className={styles["title"]}>{works.sectionTitle} <span className={styles["project-counter"]}>({works.projects.length})</span></h1>
      <ProjectList projects={projects} updateModal={updateModal} />
      <ProjectModal />
    </main >
  )
}

export default ProjectsPage
