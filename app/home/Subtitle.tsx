"use client";
import React from "react";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";

import { usePageContext } from "../../src/contexts/PageContext";
import styles from "./Home.module.css";

const Subtitle = () => {
  const titleContainerRef = React.useRef<HTMLHeadingElement>(null);
  const [titleIsReadyToAnimate, setTitleIsReadyToAnimate] =
    React.useState<boolean>(false);
  const { isLoaded } = usePageContext();

  const TEXTS_LIST = ["Web Developer", "Art Enthusiast", "Creative Thinker"];

  // Handle title text animation
  React.useEffect(() => {
    if (!titleIsReadyToAnimate || !titleContainerRef.current) return;

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>(
        `.${styles["title-text"]}`,
      );
      const tl = gsap.timeline({ repeat: -1, delay: 1 });

      titles.forEach((title) => {
        const splitText = new SplitText(title, {
          type: "chars",
          charsClass: "char",
        });

        tl.from(
          splitText.chars,
          {
            opacity: 0,
            duration: 0.5,
            y: 100,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<",
        ).to(
          splitText.chars,
          {
            opacity: 0,
            y: -100,
            delay: 2,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<1",
        );
      });
    }, titleContainerRef);

    return () => ctx.revert();
  }, [titleIsReadyToAnimate]);

  // Handle entrance animations when page is loaded
  React.useEffect(() => {
    if (!isLoaded) return;

    setTitleIsReadyToAnimate(true);

    setTimeout(() => {
      const animateIn = (selector: string) => {
        gsap.to(`.${styles[selector]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      };

      [
        "language-selector-container",
        "social-media-icons",
        "welcome-message",
        "title-container",
        "current-position-text",
        "location",
      ].forEach(animateIn);
    }, 1000);
  }, [isLoaded]);

  return (
    <div className={styles["title-container"]} ref={titleContainerRef}>
      {TEXTS_LIST.map((text, index) => (
        <h2
          key={text}
          className={`${styles["title-text"]} ${
            index === 0 ? "initial" : index === 1 ? "next" : "previous"
          }`}
        >
          <span>{text}</span>
        </h2>
      ))}
    </div>
  );
};

export default Subtitle;
