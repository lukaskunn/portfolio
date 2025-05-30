import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { useHover, useIsomorphicLayoutEffect } from "usehooks-ts";
import { useCursor } from "../../../../contexts/CursorContext";
import { usePageContext } from "../../../../contexts/PageContext";
import { useTransition } from "../../../../Layouts/TransitionProvider";
import AnimatePosOpacity from "../../../../utils/AnimatePosOpacity";
import styles from "../../About.module.css";
import ResumeCard from "../ResumeCard";

type CardType = {
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  company: string;
};

interface ResumeSectionProps {
  sectionTitleResume: string;
  cards: CardType[];
}

type ResumeCardProps = {
  cards: CardType[];
};

const ResumeCardsList = ({ cards }: ResumeCardProps) =>
  cards.map((card, index) => (
    <AnimatePosOpacity
      key={`resume-card-${index}`}
      from={{ y: 0, opacity: 1 }}
      to={{ y: 0, opacity: 1 }}
      durationIn={0.8}
      durationOut={0.6}
      delay={1.5 + index * 0.1}
      set={{ y: "200px", opacity: 0 }}
    >
      <ResumeCard
        title={card.jobTitle}
        description={card.description}
        startDate={card.startDate}
        endDate={card.endDate}
        company={card.company}
      />
    </AnimatePosOpacity>
  ));

const ResumeSection: React.FC<ResumeSectionProps> = ({
  sectionTitleResume,
  cards,
}) => {
  const { setHoverImportantText } = useCursor();
  const { timeline } = useTransition();
  const { isLoaded } = usePageContext();

  // Use destructuring to define refs
  const resumeRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const resumeContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const resumeIsHover = useHover(resumeRef);

  // Handle cursor hover effect
  useEffect(() => {
    setHoverImportantText(resumeIsHover);
  }, [resumeIsHover, setHoverImportantText]);

  // Handle transition animations
  useIsomorphicLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.to(
      leftSideRef.current,
      {
        x: "-130%",
        duration: 1,
        ease: "power3.inOut",
      },
      0,
    );

    tl.to(
      rightSideRef.current,
      {
        x: "130%",
        duration: 1,
        ease: "power3.inOut",
      },
      0,
    );

    timeline.add(tl, 0);

    return () => {
      tl.kill();
    };
  }, [timeline]);

  // Handle image reveal animation
  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const imageTl = gsap.timeline();

      imageTl.fromTo(
        imageRef.current,
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.8,
        },
      );

      imageTl.from(
        imageRef.current,
        {
          scale: 1.1,
          duration: 1.6,
          ease: "power2.out",
        },
        "<",
      );


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
            <ResumeCardsList cards={cards} />
          </div>
        </div>
        <div className={styles.resume__right} ref={rightSideRef}>
          <img
            src="https://i.pinimg.com/originals/ab/e5/57/abe557b5780fc93e83447ac60987d000.gif"
            alt="Animated computer graphic"
            className={styles.anime_computer_gif}
            ref={imageRef}
          />
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
