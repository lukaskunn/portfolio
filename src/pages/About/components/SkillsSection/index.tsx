import React, { useEffect } from "react";
import { useHover } from "usehooks-ts";
import { useCursor } from "../../../../contexts/CursorContext";
import styles from "../../About.module.scss";

type SkillsSectionType = {
  sectionTitleServices: string;
  soft: string[];
  hard: string[];
};

const SkillsSection = ({
  sectionTitleServices,
  hard,
  soft,
}: SkillsSectionType) => {
  const skillsRef = React.useRef(null);
  const skillsIsHover = useHover(skillsRef);
  const { setHoverImportantText } = useCursor();

  useEffect(() => {
    setHoverImportantText(skillsIsHover);
  }, [skillsIsHover]);

  return (
    <section className={styles["skills-container"]}>
      <h2 dangerouslySetInnerHTML={{ __html: sectionTitleServices }} />
      <div className={styles["skills-sub-container"]} ref={skillsRef}>
        <div className={styles["soft-skills"]}>
          <h3
            className={styles["group-title"]}
            dangerouslySetInnerHTML={{ __html: "[Soft Skills]" }}
          />
          {soft.map((skill: any, index: any) => {
            return (
              <p
                className={skill["skill-list"]}
                key={`${skill}_${index}`}
                dangerouslySetInnerHTML={{ __html: `/ ${skill}` }}
              />
            );
          })}
        </div>
        <div className={styles["hard-skills"]}>
          <h3
            className={styles["group-title"]}
            dangerouslySetInnerHTML={{ __html: "[Hard Skills]" }}
          />
          {hard.map((skill: any, index: any) => {
            return (
              <p
                className={skill["skill-list"]}
                key={`${skill}_${index}`}
                dangerouslySetInnerHTML={{ __html: `/ ${skill}` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
