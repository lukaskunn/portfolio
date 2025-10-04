"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { usePageContext } from "../../src/contexts/PageContext";
import { useTransition } from "../../src/contexts/TransitionContext";

import styles from "./Works.module.css";
const AnimationContainer = ({ children }: { children: React.ReactNode }) => {
  const el = useRef<HTMLDivElement>(null);
  const { timeline } = useTransition();
  const { isLoaded } = usePageContext();
  // Handle initial animations
  useIsomorphicLayoutEffect(() => {
    const fadeInTimer = setTimeout(() => {
      gsap.to(el.current, {
        opacity: 1,
        duration: 1,
      });
    }, 8000);

    // Add to timeline for page transitions
    timeline.add(
      gsap.to(el.current, {
        y: "100px",
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
      }),
      0,
    );

    timeline.add(
      gsap.to(el.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
      }),
      0,
    );

    return () => clearTimeout(fadeInTimer);
  }, [timeline]);

  // Handle content animations when page is loaded
  useIsomorphicLayoutEffect(() => {
    // if (!isLoaded) return;

    const animateContent = () => {
      const elements = [
        {
          selector: `.${styles["section-title"]}`,
          props: { opacity: 1, y: 0, duration: 0.5 },
        },
        {
          selector: `.${styles["project-counter"]}`,
          props: { opacity: 0.6, y: 0, duration: 0.5, delay: 0.2 },
        },
        {
          selector: `.${styles["border-top"]}`,
          props: { width: "100%", duration: 1.1, ease: "power4.inOut" },
        },
        {
          selector: `.${styles["project-grid"]}`,
          props: { y: 0, opacity: 1, duration: 1.3, delay: 0.5 },
        },
      ];

      return elements.map(({ selector, props }) =>
        gsap.to(selector, { ...props, ease: props.ease || "power3.out" }),
      );
    };

    const animateContentTimer = setTimeout(animateContent, 1000);

    return () => clearTimeout(animateContentTimer);
  }, [isLoaded]);

  return (
    <section className={styles.container} id="works" ref={el}>
      {children}{" "}
    </section>
  );
};

export default AnimationContainer;
