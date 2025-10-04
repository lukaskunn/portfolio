'use client'
import React from "react";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { useTransition } from "../../src/contexts/TransitionContext";
import styles from "./Home.module.css"

const AnimationContainer = ({ children }: { children: React.ReactNode }) => {
  const { timeline } = useTransition()

  // Setup exit animations
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animateOut = (selector: string) => {
        return gsap.timeline().to(`.${styles[selector]}`, {
          opacity: 0,
          y: selector.includes("social") ? 50 : -50,
          duration: 0.5,
          ease: "power2.inOut",
        });
      };

      // Add all animations to main timeline
      [
        "language-selector-container",
        "social-media-icons",
        "welcome-message",
        "title-container",
        "current-position-text",
        "location",
      ].forEach((selector) => {
        timeline.add(animateOut(selector), 0);
      });
    });

    return () => ctx.revert();
  }, [timeline]);

  return <>{children}</>
};

export default AnimationContainer;
