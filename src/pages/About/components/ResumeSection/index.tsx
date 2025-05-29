import React, { useEffect } from "react";
import { useHover } from "usehooks-ts";
import ResumeCard from "../ResumeCard";
import { useCursor } from "../../../../contexts/CursorContext";
import styles from "../../About.module.css";
import AnimatePosOpacity from "../../../../utils/AnimatePosOpacity";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { TransitionContext } from "../../../../Layouts/TransitionProvider";
import { TransitionContextType } from "../../../../Layouts/TransitionProvider";
import gsap from "gsap";
import { PageContext } from "../../../../contexts/PageContext";


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
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType;

  const { isLoaded } = React.useContext(PageContext) as any;
  const resumeRef = React.useRef(null);
  const leftSideRef = React.useRef<HTMLDivElement>(null);
  const rightSideRef = React.useRef<HTMLDivElement>(null);
  const resumeContainerRef = React.useRef<HTMLDivElement>(null);
  const imageref = React.useRef<HTMLImageElement>(null);  
  const resumeIsHover = useHover(resumeRef);

  useEffect(() => {
    setHoverImportantText(resumeIsHover);
  }, [resumeIsHover]);

  useIsomorphicLayoutEffect(() => {
    timeline.add(() => {
      gsap.to(leftSideRef.current, {
        x: "-130%",
        duration: 1,
        ease: "power3.inOut",

      })
    }, 0)

    timeline.add(() => {
      gsap.to(rightSideRef.current, {
        x: "130%",
        duration: 1,
        ease: "power3.inOut",
      });
    }, 0);
  }, [])

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!isLoaded) return;

      gsap.fromTo(imageref.current, 
        { 
          clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
          opacity: 0
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.8
        }
      );

      gsap.from(imageref.current, {
        scale: 1.1,
        duration: 1.6,
        ease: "power2.out",
        delay: 0.8
      });
    }, resumeContainerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section className={styles["resume-container"]} ref={resumeContainerRef}>
      <div className={styles.resume} id="resume">
        <div className={styles.resume__left} ref={leftSideRef}>
          <AnimatePosOpacity
            from={{ y: 0, opacity: 1 }}
            to={{ y: 0, opacity: 1 }}
            durationIn={0.8}
            durationOut={0.6}
            delay={1.5}
            set={{ y: "200px", opacity: 0 }}
          >
            <h2
              className={styles["section-title"]}
              dangerouslySetInnerHTML={{ __html: sectionTitleResume }}
            />
          </AnimatePosOpacity>
          <div className={styles.collections} ref={resumeRef}>
            {cards.map((card: any, index: any) => {
              const { jobTitle, description, startDate, endDate, company } =
                card;
              return (
                <AnimatePosOpacity
                  from={{ y: 0, opacity: 1 }}
                  to={{ y: 0, opacity: 1 }}
                  durationIn={0.8}
                  durationOut={0.6}
                  delay={1.5 + index * 0.1}
                  set={{ y: "200px", opacity: 0 }}
                >
                  <ResumeCard
                    key={index}
                    title={jobTitle}
                    description={description}
                    startDate={startDate}
                    endDate={endDate}
                    company={company}
                  />
                </AnimatePosOpacity>
              );
            })}
          </div>
        </div>
        <div className={styles.resume__right} ref={rightSideRef}>
          <img
            src="https://i.pinimg.com/originals/ab/e5/57/abe557b5780fc93e83447ac60987d000.gif"
            alt=""
            className="anime_computer_gif"
            ref={imageref}
          />
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
