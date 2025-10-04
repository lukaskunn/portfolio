import React from 'react'
import AnimatePosOpacity from "../../../../src/utils/AnimatePosOpacity";
import styles from "../../About.module.css";

type ContentItem = {
  title: string;
  text: string[];
};

type ContentSectionProps = {
  contentItem: ContentItem;
  sectionRef: React.RefObject<HTMLElement>;
  baseDelay: number;
  sectionClass: string;
};

const ContentSection = ({
  contentItem,
  sectionRef,
  baseDelay,
  sectionClass,
}: ContentSectionProps) => {
  return (
    <section className={styles[sectionClass]} ref={sectionRef}>
      <AnimatePosOpacity
        from={{ y: "200px", opacity: 0 }}
        to={{ y: 0, opacity: 1 }}
        durationIn={0.8}
        durationOut={0.6}
        delay={baseDelay}
        set={{ y: "200px", opacity: 0 }}
      >
        <h2 dangerouslySetInnerHTML={{ __html: contentItem.title }} />
      </AnimatePosOpacity>

      {contentItem.text.map((paragraph, index) => (
        <AnimatePosOpacity
          key={`${sectionClass}-${index}`}
          from={{ y: "200px", opacity: 0 }}
          to={{ y: 0, opacity: 1 }}
          durationIn={0.8}
          durationOut={0.6}
          delay={baseDelay + index * 0.1}
          set={{ y: "200px", opacity: 0 }}
        >
          <p
            className={
              sectionClass === "about__right__aboutMe"
                ? styles["about-me-content"]
                : undefined
            }
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        </AnimatePosOpacity>
      ))}
    </section>
  );
};

export default ContentSection