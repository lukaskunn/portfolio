'use client';
import React from 'react'
import styles from '@/styles/css/projects.module.css';
import { FiArrowUpRight } from "react-icons/fi";
import ProjectModal from '@/components/ProjectModal';
import ProjectItem from './ProjectItem';
import { useProjectModalContext } from '@/contexts/ProjectsModalContext';

type Project = {
  title: string;
  tech: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    title: "Project One",
    tech: "React, Node.js",
    link: "/project/project-one"
  },
  {
    title: "Project Two",
    tech: "Next.js, TypeScript",
    link: "/project/project-two"
  },
  {
    title: "Project Three",
    tech: "Vue.js, Firebase",
    link: "/project/project-three"
  },
  {
    title: "Project Four",
    tech: "Angular, RxJS",
    link: "/project/project-four"
  },
  {
    title: "Project Five",
    tech: "Svelte, Tailwind CSS",
    link: "/project/project-five"
  },
  {
    title: "Project Six",
    tech: "Next.js / Three.js / GSAP / Framer Motion",
    link: "/project/project-six"
  },
]

const ProjectsPage = () => {
  const {updateModal} = useProjectModalContext();

  return (
    <main className={styles["container"]}>
      <h1 className={styles["title"]}>WORKS <span className={styles["project-counter"]}>(5)</span></h1>
      <div className={styles["project-list-container"]}>
        {PROJECTS.map((project, index) => (
          <ProjectItem key={index} project={project} index={index} updateModal={updateModal}/>
        ))}
      </div>
      <ProjectModal />
    </main>
  )
}

export default ProjectsPage