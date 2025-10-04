import React from "react";
import AnimatePosOpacity from "../../../src/utils/AnimatePosOpacity";
import { useProjectContext } from "../Contexts/ProjectContext";
import styles from "./ProjectPage.module.css";

const ProjectBriefDescription: React.FC = () => {
  const { project } = useProjectContext();

  if (!project) return null;

  const { briefDescription } = project;

  if (!briefDescription) return null;

  return (
    <div className={styles["project-brief-description"]}>
      {briefDescription.split("</>").map((text, index) => (
        <AnimatePosOpacity
          from={{ x: "-110%", opacity: 0 }}
          to={{ x: "0%", opacity: 1 }}
          durationIn={1}
          durationOut={0.6}
          delay={0.6 + index * 0.2}
          key={index}
          set={{ opacity: 0, y: 100, x: "0%" }}
        >
          <span key={index}>
            {text}
            <br />
            <br />
          </span>
        </AnimatePosOpacity>
      ))}
    </div>
  );
};

export default ProjectBriefDescription;
