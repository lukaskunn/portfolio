import React, { useEffect } from "react";
import { useHover } from "usehooks-ts";
import ResumeCard from "../ResumeCard";
import { useCursor } from "../../../../contexts/CursorContext";
import styles from "../../About.module.scss";

type CardType = {
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  company: string;
};

type ResumeSectionType = {
  sectionTitleResume: string;
  cards: CardType[];
};

const ResumeSection = ({ sectionTitleResume, cards }: ResumeSectionType) => {
  const { setHoverImportantText } = useCursor();
  const resumeRef = React.useRef(null);
  const resumeIsHover = useHover(resumeRef);

  useEffect(() => {
    setHoverImportantText(resumeIsHover);
  }, [resumeIsHover]);

  return (
    <section className={styles["resume-container"]}>
      <div className={styles.resume} id="resume">
        <div className={styles.resume__left}>
          <h2
            className={styles["section-title"]}
            dangerouslySetInnerHTML={{ __html: sectionTitleResume }}
          />
          <div className={styles.colletions} ref={resumeRef}>
            {cards.map((card: any, index: any) => {
              const { jobTitle, description, startDate, endDate, company } =
                card;
              return (
                <ResumeCard
                  key={index}
                  title={jobTitle}
                  description={description}
                  startDate={startDate}
                  endDate={endDate}
                  company={company}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.resume__right}>
          <img
            src="https://i.pinimg.com/originals/ab/e5/57/abe557b5780fc93e83447ac60987d000.gif"
            alt=""
            className="anime_computer_gif"
          />
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
