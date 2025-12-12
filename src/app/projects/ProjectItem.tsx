import React from 'react'
import styles from '@/styles/css/projects.module.css'
import { FiArrowUpRight } from "react-icons/fi";
import Link from 'next/link';
import LinkHandler from '@/components/LinkHandler';

type ProjectItemProps = {
  project: {
    title: string;
    link: string;
    tech: string;
    subtitle: string;
    urlToProject?: string;
  };
  index: number;
  openOnExternalPage: boolean;
  updateModal: (index: number, modalIsActive: boolean) => void;
}

const ProjectItem = ({ project, index, updateModal, openOnExternalPage }: ProjectItemProps) => {
  const { title, link, tech, subtitle, urlToProject } = project;

  return (
    <div key={link} className={styles["project-list-item"]}
      onMouseEnter={() => updateModal(index, true)}
      onMouseLeave={() => updateModal(index, false)}>
      {index === 0 ? <div className={`${styles["border"]} ${styles["top"]}`} /> : null}
      <LinkHandler href={openOnExternalPage && urlToProject ? urlToProject : `/project/${link}`} className={styles["project-item"]} goToExternalPage={openOnExternalPage}>
        <p className={styles["project-index"]}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
        <div className={styles["project-title-subtitle"]}>
          <h2 className={styles["project-title"]}>{title}</h2>
          <p className={styles["project-subtitle"]}>{subtitle}</p>
        </div>
        <p className={styles["project-tech"]}>{tech}</p>
        <div className={styles["project-link-icon"]}>
          <FiArrowUpRight size={32} />
        </div>
      </LinkHandler>
      <div className={`${styles["border"]} ${styles["bottom"]}`} />
    </div>
  )
}

export default ProjectItem