import React, { useEffect } from "react";
import { useHover } from "usehooks-ts";
import { useCursor } from "../../../../contexts/CursorContext";
import styles from "../../About.module.css";
import AnimePosOpacity from "../../../../utils/AnimatePosOpacity";

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
      <AnimePosOpacity
        from={{ y: 20, opacity: 0 }}
        to={{ y: 0, opacity: 1 }}
        durationIn={0.8}
        durationOut={0.6}
        delay={1}
        set={{ y: "200px", opacity: 0 }}
      >
        <h2 dangerouslySetInnerHTML={{ __html: sectionTitleServices }} />
      </AnimePosOpacity>
      <div className={styles["skills-sub-container"]} ref={skillsRef}>
        <div className={styles["soft-skills"]}>
          <AnimePosOpacity
            from={{ y: 20, opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
            durationIn={0.8}
            durationOut={0.6}
            delay={1}
            set={{ y: "200px", opacity: 0 }}
          >
            <h3
              className={styles["group-title"]}
              dangerouslySetInnerHTML={{ __html: "[Soft Skills]" }}
            />
          </AnimePosOpacity>
          {soft.map((skill: any, index: any) => {
            return (
              <AnimePosOpacity
                from={{ y: 20, opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
                durationIn={0.8}
                durationOut={0.6}
                delay={1 + index * 0.1}
                set={{ y: "200px", opacity: 0 }}
              >
                <p
                  className={skill["skill-list"]}
                  key={`${skill}_${index}`}
                  dangerouslySetInnerHTML={{ __html: `/ ${skill}` }}
                />
              </AnimePosOpacity>
            );
          })}
        </div>
        <div className={styles["hard-skills"]}>
          <AnimePosOpacity
            from={{ y: 20, opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
            durationIn={0.8}
            durationOut={0.6}
            delay={1}
            set={{ y: "200px", opacity: 0 }}
          >
            <h3
              className={styles["group-title"]}
              dangerouslySetInnerHTML={{ __html: "[Hard Skills]" }}
            />
          </AnimePosOpacity>
          {hard.map((skill: any, index: any) => {
            return (
              <AnimePosOpacity
                from={{ y: 20, opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
                durationIn={0.8}
                durationOut={0.6}
                delay={1 + index * 0.1}
                set={{ y: "200px", opacity: 0 }}
              >
                <p
                  className={skill["skill-list"]}
                  key={`${skill}_${index}`}
                  dangerouslySetInnerHTML={{ __html: `/ ${skill}` }}
                />
              </AnimePosOpacity>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
