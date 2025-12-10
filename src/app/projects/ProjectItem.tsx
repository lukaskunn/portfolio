import React from 'react'
import styles from '@/styles/css/projects.module.css'
import { FiArrowUpRight } from "react-icons/fi";
import Link from 'next/link';

type ProjectItemProps = {
  project: {
    title: string;
    link: string;
    tech: string;
  };
  index: number;
  updateModal: (index: number, modalIsActive: boolean) => void;
}

const ProjectItem = ({ project, index, updateModal }: ProjectItemProps) => {
  const { title, link, tech } = project;

  return (
    <div key={link} className={styles["project-list-item"]}
      onMouseEnter={() => updateModal(index, true)}
      onMouseLeave={() => updateModal(index, false)}>
      {index === 0 ? <div className={`${styles["border"]} ${styles["top"]}`} /> : null}
      <Link href={link} className={styles["project-item"]}>
        <p className={styles["project-index"]}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
        <h2 className={styles["project-title"]}>{title}</h2>
        <p className={styles["project-tech"]}>{tech}</p>
        <div className={styles["project-link-icon"]}>
          <FiArrowUpRight size={32} />
        </div>
      </Link>
      <div className={`${styles["border"]} ${styles["bottom"]}`} />
    </div>
  )
}

export default ProjectItem