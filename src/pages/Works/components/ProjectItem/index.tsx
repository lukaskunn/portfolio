import React from "react";
import styles from "./ProjectItem.module.scss";
import Link from "next/link";
interface IProjectItem {
  title: string;
  index: number;
  description: string;
  updateModal: (index: number, modalIsActive: boolean) => void;
  projectId: string;
  goToExternalPage?: boolean;
  urlToProject?: string;
}

const ProjectItem = (props: IProjectItem) => {
  const {
    title,
    index,
    updateModal,
    description,
    projectId,
    goToExternalPage,
    urlToProject,
  } = props;

  return goToExternalPage ? (
    <a href={urlToProject}>
      <div
        className={styles["project-item-container"]}
        onMouseEnter={() => updateModal(index, true)}
        onMouseLeave={() => updateModal(index, false)}
      >
        <h2 className={styles["project-title"]}>{title}</h2>
        <p className={styles["project-description"]}>{description}</p>
      </div>
    </a>
  ) : (
    <Link href={`/project/${projectId}`}>
      <div
        className={styles["project-item-container"]}
        onMouseEnter={() => updateModal(index, true)}
        onMouseLeave={() => updateModal(index, false)}
      >
        <h2 className={styles["project-title"]}>{title}</h2>
        <p className={styles["project-description"]}>{description}</p>
      </div>
    </Link>
  );
};

export default ProjectItem;

