'use client'
import React from "react";
import NextButtonContainer from "../NextButtonContainer";
import ProjectDescription from "./ProjectDescription";
import ProjectHeader from "./ProjectHeader";
import ProjectBriefDescription from "./ProjectBriefDescription";
import ProjectTechnologies from "./ProjectTechnologies";
import ProjectPageGallery from "./components/ProjectPageGallery";

import styles from "./ProjectPage.module.css";
import type { Project } from "../../../src/types/projectContentType";

const Project: React.FC = () => {
  return (
    <div className={styles["project-page"]}>
      <div className={styles["project-page-container"]}>
        <ProjectHeader />
        <ProjectDescription  />
        <ProjectBriefDescription />
        <ProjectTechnologies />
        <ProjectPageGallery />
      </div>
      <NextButtonContainer />
    </div>
  );
};

export default Project;
