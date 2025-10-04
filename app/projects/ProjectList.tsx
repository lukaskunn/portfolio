'use client'
import React from "react";
import ProjectItem from "./components/ProjectItem";
import { useProjectModalContext } from "./Contexts/ProjectsModalContext";
import { useLanguage } from "../../src/contexts/LanguageContext";

const ProjectsList = () => {
  const { updateModal } = useProjectModalContext();
  const { currentLanguage } = useLanguage();
  const { projects } = currentLanguage.works;

  if (projects.length < 1) {
    return <h2 dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }} />;
  }

  return projects.map((project, index) => (
    <ProjectItem
      key={project.projectId || index}
      projectId={project.projectId}
      index={index}
      title={project.title}
      updateModal={updateModal}
      description={project.description}
      goToExternalPage={project.goToExternalPage}
      urlToProject={project.urlToProject}
    />
  ));
};

export default ProjectsList;
