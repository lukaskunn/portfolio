'use client'
import gsap from "gsap";
import { useState, useEffect, useCallback } from "react";
import { useDeviceContext } from "../../contexts/DeviceContext";
import { usePageContext } from "../../contexts/PageContext";

import styles from "./Loading.module.css";

const LOADING_TEXTS = ["LOADING", "LOADING.", "LOADING..", "LOADING..."];
const ANIMATION_DURATION = 6; // seconds
const TEXT_CHANGE_INTERVAL = 1000; // ms

function Loading() {
  const { setIsLoaded } = usePageContext();
  const { isMobile, isSmallTablet } = useDeviceContext();

  const [textIndex, setTextIndex] = useState(0);
  const [showLoadingComponent, setShowLoadingComponent] = useState(true);

  // Get progress bar width based on device size
  const getProgressBarWidth = useCallback(() =>
    isMobile || isSmallTablet ? "200px" : "400px",
    [isMobile, isSmallTablet]
  );

  // Control loading text animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % LOADING_TEXTS.length;
        return nextIndex;
      });
    }, TEXT_CHANGE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  // Handle loading animations
  useEffect(() => {
    const progressBarWidth = getProgressBarWidth();

    const ctx = gsap.context(() => {
      // Initial animations setup
      const progressBarAnimation = gsap.to(`.${styles.progressBar}`, {
        width: progressBarWidth,
        duration: ANIMATION_DURATION,
        ease: "power2.inOut",
        paused: true,
      });

      const textAnimation = gsap.to(`.${styles["loading-text"]}`, {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        paused: true,
      });

      // Start animations
      setTimeout(() => {
        progressBarAnimation.play();
        textAnimation.play();
      }, 1);

      // Hide elements animation
      const hideElementsTimeout = setTimeout(() => {
        gsap.to(`.${styles["loading-text"]}`, {
          y: -10,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });

        gsap.to(`.${styles.progressBar}`, {
          y: "10px",
          height: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }, ANIMATION_DURATION * 1000);

      // Final fade out animation
      const fadeBackgroundTimeout = setTimeout(() => {
        gsap.to(`.${styles.loadingContainer}`, {
          background: "rgba(0, 0, 0, 0)",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setIsLoaded(true);
            setShowLoadingComponent(false);
          },
        });
      }, (ANIMATION_DURATION + 0.5) * 1000);

      return () => {
        clearTimeout(hideElementsTimeout);
        clearTimeout(fadeBackgroundTimeout);
      };
    }, `.${styles.loadingContainer}`);

    return () => ctx.revert();
  }, [getProgressBarWidth, setIsLoaded]);

  if (!showLoadingComponent) {
    return null;
  }

  return (
    <div
      className={styles.loadingContainer}
      // style={{ top: pageRoute !== "/" ? "-2000px" : "0" }}
      role="progressbar"
      aria-valuetext={LOADING_TEXTS[textIndex]}
    >
      <div className={styles.loadingTextContainer}>
        <p className={styles["loading-text"]}>{LOADING_TEXTS[textIndex]}</p>
        <div className={styles.progressBar} />
      </div>
    </div>
  );
}

export default Loading;
