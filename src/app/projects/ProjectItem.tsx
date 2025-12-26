import React from 'react'
import styles from '@/styles/css/projects.module.css'
import { FiArrowUpRight } from "react-icons/fi";
import Link from 'next/link';
import LinkHandler from '@/components/LinkHandler';

type ProjectItemProps = {
  project: {
    title: string;
    link: { current: string };
    tech: string;
    subtitle: string;
    urlToProject?: string;
  };
  index: number;
  openOnExternalPage?: boolean;
  updateModal: (index: number, modalIsActive: boolean) => void;
}

const ProjectItem = ({ project, index, updateModal, openOnExternalPage = false }: ProjectItemProps) => {
  const { title, link, tech, subtitle, urlToProject } = project;

  return (
    <article
      key={link.current}
      style={{ opacity: 0 }}
      className={styles["project-list-item"]}
      data-project-item
      onMouseEnter={() => updateModal(index, true)}
      onMouseLeave={() => updateModal(index, false)}
      aria-label={`Project: ${title}`}
      role="article">
      {index === 0 ? <div className={`${styles["border"]} ${styles["top"]}`} aria-hidden="true" /> : null}
      <LinkHandler
        href={openOnExternalPage && urlToProject ? urlToProject : `/project/${link}`}
        className={styles["project-item"]}
        goToExternalPage={openOnExternalPage}
        aria-label={`View ${title} project details`}
        onFocus={() => updateModal(index, true)}
        onBlur={() => updateModal(index, false)}>
        <p className={styles["project-index"]}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
        <div className={styles["project-title-subtitle"]}>
          <h2 className={styles["project-title"]}>{title}</h2>
          <p className={styles["project-subtitle"]}>{subtitle}</p>
        </div>
        <p className={styles["project-tech"]}>{tech}</p>
        <div className={styles["project-link-icon"]} aria-hidden="true">
          <FiArrowUpRight size={32} />
        </div>
      </LinkHandler>
      <div className={`${styles["border"]} ${styles["bottom"]}`} aria-hidden="true" />
    </article>
  )
}

export default React.memo(ProjectItem)
