"use client";
import React, { useEffect } from "react";
import { useHover } from "usehooks-ts";
import { useCursor } from "../../../../contexts/CursorContext";
import styles from "../../About.module.css";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ContentType = {
  title: string;
  text: string[];
};

type AboutSectionType = {
  sectionSubTitle: string;
  content: ContentType[];
};

const AboutSection = ({ content, sectionSubTitle }: AboutSectionType) => {
  const { setHoverImportantText } = useCursor();
  const aboutTitleRef = React.useRef(null);
  const aboutMeRef = React.useRef(null);
  const aboutBackgroundRef = React.useRef(null);
  const aboutContainerRef = React.useRef<HTMLDivElement>(null);

  const aboutTitleIsHover = useHover(aboutTitleRef);
  const aboutMeIsHover = useHover(aboutMeRef);
  const aboutBackgroundIsHover = useHover(aboutBackgroundRef);

  useEffect(() => {
    setHoverImportantText(
      aboutBackgroundIsHover || aboutMeIsHover || aboutTitleIsHover,
    );
  }, [aboutTitleIsHover, aboutMeIsHover, aboutBackgroundIsHover]);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const splitText = new SplitText("h1", {
        type: "chars",
        charsClass: "split-child",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".title-container",
          start: "top 250",
          end: "bottom top",
          scrub: 1.3,
          pin: true,
          markers: true,
        },
      });

      // Example animation: animate backgroundPositionX for each line
      tl.to(".split-child", {
        backgroundPositionX: "0%",
        stagger: 0.04,
        duration: 4,
        ease: "power3.out",
      });

      // tl.fromTo(
      //   ".split-child",
      //   { opacity: 0 },
      //   {
      //     opacity: 1,
      //     stagger: 0.04,
      //     duration: 0.8,
      //     ease: "power2.out"
      //   }
      // );
    }, aboutContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.about} id={"about"}>
        <div className={styles.about__left}>
          <img
            src="https://64.media.tumblr.com/723de3a38fae9be2c3840107091e6f3d/tumblr_pg37vjbDgu1v1hotuo2_500.gifv"
            alt=""
            className="anime_computer_gif"
          />
        </div>
        <div
          className={`${styles.about__right} about-container`}
          ref={aboutContainerRef}
        >
          <div className="title-container">
            <h1
              ref={aboutTitleRef}
              dangerouslySetInnerHTML={{ __html: sectionSubTitle }}
              className={`${styles["about-title"]} about-title`}
            />
          </div>
          <section className={styles.about__right__aboutMe} ref={aboutMeRef}>
            <h2 dangerouslySetInnerHTML={{ __html: content[0].title }} />
            {content[0].text.map((element: any, index: any) => {
              return <h4 key={index}>{element}</h4>;
            })}
          </section>
          <section
            className={styles.about__right__background}
            ref={aboutBackgroundRef}
          >
            <h2 dangerouslySetInnerHTML={{ __html: content[1].title }} />
            {content[1].text.map((element: any, index: any) => {
              return (
                <h4 key={index} dangerouslySetInnerHTML={{ __html: element }} />
              );
            })}
          </section>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
