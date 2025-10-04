"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import React, { useEffect, useRef } from "react";
import { useHover, useIsomorphicLayoutEffect } from "usehooks-ts";
import ContentSection from "./ContentSection";
import { useCursor } from "../../../../src/contexts/CursorContext";
import { usePageContext } from "../../../../src/contexts/PageContext";
import { useTransition } from "../../../../src/contexts/TransitionContext";
import { useLanguage } from "../../../../src/contexts/LanguageContext";
import styles from "../../About.module.css";
gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const { isLoaded } = usePageContext();
  const { setHoverImportantText } = useCursor();
  const { timeline } = useTransition();
  const { currentLanguage } = useLanguage();
  const {aboutMe} = currentLanguage;
  const { content, sectionSubTitle } = aboutMe;

  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const aboutMeTextRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLElement>(null);
  const aboutBackgroundRef = useRef<HTMLElement>(null);
  const aboutContainerRef = useRef<HTMLDivElement>(null);

  const aboutTitleIsHover = useHover(aboutTitleRef);
  const aboutMeIsHover = useHover(aboutMeRef);
  const aboutBackgroundIsHover = useHover(aboutBackgroundRef);

  // Handle hover state for cursor
  useEffect(() => {
    const isHovering =
      aboutBackgroundIsHover || aboutMeIsHover || aboutTitleIsHover;
    setHoverImportantText(isHovering);
  }, [
    aboutTitleIsHover,
    aboutMeIsHover,
    aboutBackgroundIsHover,
    setHoverImportantText,
  ]);

  // Animation setup after page load
  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Split text animation
      if (aboutTitleRef.current) {
        const splitText = new SplitText(aboutTitleRef.current, {
          type: "lines",
          linesClass: "split-child",
        });

        splitText.lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            { opacity: 0, rotateX: 90, y: 100 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              delay: index * 0.1 + 0.5,
              ease: "power3.out",
            },
          );
        });
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 0%)",
            opacity: 0,
            scale: 0.9,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: 0.3,
            ease: "power3.inOut",
          },
        );
      }

      // Text content animation
      if (aboutMeTextRef.current) {
        gsap.fromTo(
          aboutMeTextRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, delay: 2, ease: "power3.out" },
        );
      }
    }, aboutContainerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Page transition animation
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
      aboutContainerRef.current,
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

  return (
    <section className={styles.container}>
      <div className={styles.about} id="about">
        <div className={styles.about__left} ref={leftSideRef}>
          <img
            src="https://64.media.tumblr.com/723de3a38fae9be2c3840107091e6f3d/tumblr_pg37vjbDgu1v1hotuo2_500.gifv"
            alt="Animated computer graphic"
            className={styles.animeComputerGif}
            ref={imageRef}
          />
        </div>
        <div
          className={`${styles.about__right} ${styles.aboutContainer}`}
          ref={aboutContainerRef}
        >
          <div className={styles["title-container"]}>
            <h1
              ref={aboutTitleRef}
              dangerouslySetInnerHTML={{ __html: sectionSubTitle }}
              className={styles["about-title"]}
            />
          </div>

          {content[0] && (
            <ContentSection
              contentItem={content[0]}
              sectionRef={aboutMeRef}
              baseDelay={1.5}
              sectionClass="about__right__aboutMe"
            />
          )}
          {content[1] && (
            <ContentSection
              contentItem={content[1]}
              sectionRef={aboutBackgroundRef}
              baseDelay={2.5}
              sectionClass="about__right__background"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
