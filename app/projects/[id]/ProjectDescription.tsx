import React from "react";
import AnimatePosOpacity from "../../../src/utils/AnimatePosOpacity";
import { useProjectContext } from "../Contexts/ProjectContext";
import styles from "./ProjectPage.module.css";

const ProjectDescription: React.FC = () => {
  const { project } = useProjectContext();
  if (!project) return null;
  const { description } = project;

  return (
    <AnimatePosOpacity
      from={{ x: "-100%", opacity: 0 }}
      to={{ x: "0%", opacity: 1 }}
      durationIn={1}
      durationOut={0.6}
      delay={0.6}
      set={{ opacity: 0, y: 100, x: "0%" }}
    >
      <p
        className={styles["project-description"]}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </AnimatePosOpacity>
  );
};

export default ProjectDescription;
