import React from "react";
import NextButtonContainer from "./NextButtonContainer";
import ProjectModal from "./components/ProjectModal";
import AnimationContainer from "./AnimationContainer";
import ProjectsList from "./ProjectList";
import PageTitle from "./PageTitle";
import styles from "./Works.module.css";

const Projects: React.FC = () => {
  return (
    <>
      <AnimationContainer>
        <div className={styles.works}>
          <PageTitle />
          <div className={styles["border-top"]} />
          <div className={styles["project-grid"]}>
            <ProjectsList />
          </div>
          <ProjectModal />
        </div>
      </AnimationContainer>
      <NextButtonContainer />
    </>
  );
}

export default Projects;
