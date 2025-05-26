import React from "react";
import styles from "./ProjectItem.module.scss";
import Link from "next/link";

type LinkHandlerProps = {
  goToExternalPage?: boolean;
  urlToProject?: string;
  projectId?: string;
  children: React.ReactNode;
};

const LinkHandler = ({
  goToExternalPage,
  urlToProject,
  children,
  projectId,
}: LinkHandlerProps) => {
  return goToExternalPage ? (
    <a href={urlToProject}>{children}</a>
  ) : (
    <Link href={`/project/${projectId}`}>{children}</Link>
  );
};
type IProjectItem = {
  title: string;
  index: number;
  description: string;
  projectId: string;
  goToExternalPage?: boolean;
  urlToProject?: string;
  updateModal: (index: number, modalIsActive: boolean) => void;
};

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

  return (
    <LinkHandler
      goToExternalPage={goToExternalPage}
      urlToProject={urlToProject}
      projectId={projectId}
    >
      <div
        className={styles["project-item-container"]}
        onMouseEnter={() => updateModal(index, true)}
        onMouseLeave={() => updateModal(index, false)}
      >
        <h2
          className={styles["project-title"]}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className={styles["project-description"]}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </LinkHandler>
  );
};

export default ProjectItem;
