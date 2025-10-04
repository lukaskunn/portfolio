import React from "react";
import AnimatePosOpacity from "../../../src/utils/AnimatePosOpacity";
import { useProjectContext } from "../Contexts/ProjectContext";
import styles from "./ProjectPage.module.css";

const ProjectHeader: React.FC = () => {
  const { project } = useProjectContext();

  if (!project) return null;

  const { title } = project;
  
  return (
    <AnimatePosOpacity
      from={{ x: "-100%", opacity: 0}}
      to={{ x: "0%", opacity: 1 }}
      durationIn={1}
      durationOut={0.6}
      delay={0.4}
      set={{ opacity: 0, y: 100, x: "0%" }}
    >
      <h1
        className={styles["project-title"]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </AnimatePosOpacity>
  );
};

export default ProjectHeader;
