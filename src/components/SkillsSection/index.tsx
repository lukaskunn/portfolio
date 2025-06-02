'use client';
import React, { useEffect } from "react";
import { useHover } from "usehooks-ts";
import { useCursor } from "../../contexts/CursorContext";
import AnimatePosOpacity from "../../utils/AnimatePosOpacity";
import styles from "../../pages/About/About.module.css";

type SkillCategory = {
  title: string;
  skills: string[];
};

type SkillsSectionProps = {
  sectionTitleServices: string;
  soft: string[];
  hard: string[];
};

type AnimatedHeadingProps = {
  text: string;
  isSubHeading?: boolean;
};

type AnimatedSkillProps = {
  skill: string;
  index: number;
};

const SkillsSection = ({
  sectionTitleServices,
  hard,
  soft,
}: SkillsSectionProps) => {
  const skillsRef = React.useRef<HTMLDivElement>(null);
  const skillsIsHover = useHover(skillsRef);
  const { setHoverImportantText } = useCursor();

  useEffect(() => {
    setHoverImportantText(skillsIsHover);
  }, [skillsIsHover, setHoverImportantText]);

  const skillCategories: SkillCategory[] = [
    { title: "[Soft Skills]", skills: soft },
    { title: "[Hard Skills]", skills: hard },
  ];

  return (
    <section className={styles["skills-container"]}>
      <div className={styles["skills"]}>
        <AnimatedHeading text={sectionTitleServices} />

        <div className={styles["skills-sub-container"]} ref={skillsRef}>
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={`category-${categoryIndex}`}
              className={
                categoryIndex === 0
                  ? styles["soft-skills"]
                  : styles["hard-skills"]
              }
            >
              <AnimatedHeading text={category.title} isSubHeading />

              {category.skills.map((skill, index) => (
                <AnimatedSkill
                  key={`${skill}_${index}`}
                  skill={skill}
                  index={index}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedHeading = ({
  text,
  isSubHeading = false,
}: AnimatedHeadingProps) => (
  <AnimatePosOpacity
    from={{ y: 20, opacity: 0 }}
    to={{ y: 0, opacity: 1 }}
    durationIn={0.8}
    durationOut={0.6}
    delay={1}
    set={{ y: "200px", opacity: 0 }}
  >
    {isSubHeading ? (
      <h3
        className={styles["group-title"]}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    ) : (
      <h2 dangerouslySetInnerHTML={{ __html: text }} />
    )}
  </AnimatePosOpacity>
);

const AnimatedSkill = ({ skill, index }: AnimatedSkillProps) => (
  <AnimatePosOpacity
    from={{ y: 20, opacity: 0 }}
    to={{ y: 0, opacity: 1 }}
    durationIn={0.8}
    durationOut={0.6}
    delay={1 + index * 0.1}
    set={{ y: "200px", opacity: 0 }}
  >
    <p
      className={styles["skill-list"]}
      dangerouslySetInnerHTML={{ __html: `/ ${skill}` }}
    />
  </AnimatePosOpacity>
);

export default SkillsSection;
