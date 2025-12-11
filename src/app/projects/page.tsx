'use client';
import React from 'react'
import styles from '@/styles/css/projects.module.css';
import { FiArrowUpRight } from "react-icons/fi";
import ProjectModal from '@/components/ProjectModal';
import ProjectItem from './ProjectItem';
import { useProjectModalContext } from '@/contexts/ProjectsModalContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Project } from '@/utils/types';

const ProjectsPage = () => {
  const { updateModal } = useProjectModalContext();
  const { currentContent } = useLanguage();
  const { works } = currentContent;

  const { projects: PROJECTS }: { projects: Project[] } = works;

  return (
    <main className={styles["container"]}>
      <h1 className={styles["title"]}>{works.sectionTitle} <span className={styles["project-counter"]}>({works.projects.length})</span></h1>
      <div className={styles["project-list-container"]}>
        {PROJECTS.map((project, index) => (
          <ProjectItem key={index} project={{ link: project.projectId, tech: project.description, title: project.title }} index={index} updateModal={updateModal} />
        ))}
      </div>
      <ProjectModal />
    </main>
  )
}

export default ProjectsPage