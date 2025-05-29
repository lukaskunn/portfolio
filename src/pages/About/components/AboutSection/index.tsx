"use client";
import React, { useEffect } from "react";
import { useHover } from "usehooks-ts";
import { useCursor } from "../../../../contexts/CursorContext";
import styles from "../../About.module.css";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
gsap.registerPlugin(ScrollTrigger);
import { PageContext } from "../../../../contexts/PageContext";
import AnimatePosOpacity from "../../../../utils/AnimatePosOpacity";
import { TransitionContext } from "../../../../Layouts/TransitionProvider";
import { TransitionContextType } from "../../../../Layouts/TransitionProvider";

type ContentType = {
  title: string;
  text: string[];
};

type AboutSectionType = {
  sectionSubTitle: string;
  content: ContentType[];
};

const AboutSection = ({ content, sectionSubTitle }: AboutSectionType) => {
  const { isLoaded } = React.useContext(PageContext) as any;
  const { setHoverImportantText } = useCursor();
  const aboutTitleRef = React.useRef(null);
  const imageref = React.useRef<HTMLImageElement>(null);
  const leftSideRef = React.useRef<HTMLDivElement>(null);
  const aboutMeTextRef = React.useRef<HTMLDivElement>(null);
  const aboutMeRef = React.useRef(null);
  const aboutBackgroundRef = React.useRef(null);
  const aboutContainerRef = React.useRef<HTMLDivElement>(null);
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType;

  const aboutTitleIsHover = useHover(aboutTitleRef);
  const aboutMeIsHover = useHover(aboutMeRef);
  const aboutBackgroundIsHover = useHover(aboutBackgroundRef);

  useEffect(() => {
    setHoverImportantText(
      aboutBackgroundIsHover || aboutMeIsHover || aboutTitleIsHover,
    );
  }, [aboutTitleIsHover, aboutMeIsHover, aboutBackgroundIsHover]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!isLoaded) return;

      const splitText = new SplitText(aboutTitleRef.current, {
        type: "lines",
        linesClass: "split-child",
      });
      const aboutMeSplitText = new SplitText(aboutMeTextRef.current, {
        type: "lines",
        linesClass: "split-child",
      });

      splitText.lines.forEach((line, index) => {
        gsap.fromTo(
          line,
          {
            opacity: 0,
            rotateX: 90,
            y: 100,
          },
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

      if (imageref.current) {
        gsap.fromTo(
          imageref.current,
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

      gsap.fromTo(
        aboutMeTextRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 2,
          ease: "power3.out",
        },
      );
    }, aboutContainerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  useIsomorphicLayoutEffect(() => {
    timeline.add(() => {
      gsap.to(leftSideRef.current, {
        x: "-130%",
        duration: 1,
        ease: "power3.inOut",
      });
    }, 0);

    timeline.add(() => {
      gsap.to(aboutContainerRef.current, {
        x: "130%",
        duration: 1,
        ease: "power3.inOut",
      });
    }, 0);

    timeline.add(() => {
      gsap.to(aboutContainerRef.current, {
        x: "130%",
        duration: 1,
        delay: 3,
        ease: "power3.inOut",
      });
    }, 1);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.about} id={"about"}>
        <div className={styles.about__left} ref={leftSideRef}>
          <img
            src="https://64.media.tumblr.com/723de3a38fae9be2c3840107091e6f3d/tumblr_pg37vjbDgu1v1hotuo2_500.gifv"
            alt=""
            className="anime_computer_gif"
            ref={imageref}
          />
        </div>
        <div
          className={`${styles.about__right} about-container`}
          ref={aboutContainerRef}
        >
          <div className={styles["title-container"]}>
            <h1
              ref={aboutTitleRef}
              dangerouslySetInnerHTML={{ __html: sectionSubTitle }}
              className={`${styles["about-title"]} about-title`}
            />
          </div>
          <section className={styles.about__right__aboutMe} ref={aboutMeRef}>
            <AnimatePosOpacity
              from={{ y: 0, opacity: 1 }}
              to={{ y: 0, opacity: 1 }}
              durationIn={0.8}
              durationOut={0.6}
              delay={1.5}
              set={{ y: "200px", opacity: 0 }}
            >
              <h2 dangerouslySetInnerHTML={{ __html: content[0].title }} />
            </AnimatePosOpacity>
            {content[0].text.map((element: any, index: any) => {
              return (
                <AnimatePosOpacity
                  from={{ y: "200px", opacity: 0 }}
                  to={{ y: 0, opacity: 1 }}
                  durationIn={0.8}
                  durationOut={0.6}
                  delay={1.5 + index * 0.1}
                  set={{ y: "200px", opacity: 0 }}
                >
                  <p key={index} className={styles["about-me-content"]}>
                    {element}
                  </p>
                </AnimatePosOpacity>
              );
            })}
          </section>
          <section
            className={styles.about__right__background}
            ref={aboutBackgroundRef}
          >
            <AnimatePosOpacity
              from={{ y: "200px", opacity: 0 }}
              to={{ y: 0, opacity: 1 }}
              durationIn={0.8}
              durationOut={0.6}
              delay={2.5}
              set={{ y: "200px", opacity: 0 }}
            >
              <h2 dangerouslySetInnerHTML={{ __html: content[1].title }} />
            </AnimatePosOpacity>
            {content[1].text.map((element: any, index: any) => {
              return (
                <AnimatePosOpacity
                  from={{ y: "200px", opacity: 0 }}
                  to={{ y: 0, opacity: 1 }}
                  durationIn={0.8}
                  durationOut={0.6}
                  delay={2.5 + index * 0.1}
                  set={{ y: "200px", opacity: 0 }}
                >
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: element }}
                  />
                </AnimatePosOpacity>
              );
            })}
          </section>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
