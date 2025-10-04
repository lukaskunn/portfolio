import React from "react";
import AnimatePosOpacity from "../../../src/utils/AnimatePosOpacity";
import { useProjectContext } from "../Contexts/ProjectContext";
import styles from "./ProjectPage.module.css";

const ProjectTechnologies: React.FC = () => {
  const { project } = useProjectContext();

  if (!project) return null;

  const { technologies } = project;

  if (!technologies || technologies.length === 0) return null;

  return (
    <div className={styles["technologies-container"]}>
      <AnimatePosOpacity
        from={{ x: "-100%" }}
        to={{ y: 0, opacity: 1 }}
        durationIn={1}
        durationOut={0.6}
        delay={0.6}
        set={{ opacity: 0, y: 100, x: "0%" }}
      >
        <p className={styles["technologies-title"]}>{`[technologies]`}</p>
      </AnimatePosOpacity>
      <div className={styles["project-technologies"]}>
        {technologies.map((technology, index) => (
          <AnimatePosOpacity
            from={{ y: 100, opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
            durationIn={1}
            durationOut={0.6}
            delay={0.6 + index * 0.2}
            key={index}
            set={{ opacity: 0, y: 100 }}
          >
            <span
              key={index}
              className={styles["technology"]}
              dangerouslySetInnerHTML={{ __html: `/ ${technology}` }}
            />
          </AnimatePosOpacity>
        ))}
      </div>
    </div>
  );
};

export default ProjectTechnologies;
