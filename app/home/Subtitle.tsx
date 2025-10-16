"use client";
import React from "react";
import gsap from "gsap";

import { usePageContext } from "../../src/contexts/PageContext";
import styles from "./Home.module.css";

const Subtitle = () => {
  const titleContainerRef = React.useRef<HTMLHeadingElement>(null);
  const { isLoaded } = usePageContext();

  // Handle entrance animations when page is loaded
  React.useEffect(() => {
    if (!isLoaded) return;

    setTimeout(() => {
      const animateIn = (selector: string, index: number) => {
        gsap.to(`.${styles[selector]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1 + 0.8,
          ease: "power2.out",
        });
      };

      [
        "welcome-message",
        "job-title",
        "title-container",
        "current-position-text",
        "location",
        "social-media-icons",
        "language-selector-container",
      ].forEach(animateIn);
    }, 1000);
  }, [isLoaded]);

  return (
    <div className={styles["title-container"]} ref={titleContainerRef}>
      <h2 className={styles["title-text"]}>
        <span>CREATIVE DEVELOPER</span>
      </h2>
    </div>
  );
};

export default Subtitle;
