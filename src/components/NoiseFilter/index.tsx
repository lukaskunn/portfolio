'use client';
import React from "react";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { useTransition } from "../../Layouts/TransitionProvider";
import styles from "./NoiseFilter.module.css";

const NoiseFilter: React.FC = () => {
  const { timeline } = useTransition();
  
  useIsomorphicLayoutEffect(() => {
    const noiseFilterElement = `.${styles["noise-filter"]}`;
    
    timeline.add(
      gsap.to(noiseFilterElement, {
        delay: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0
    );
  }, [timeline]);

  return <div className={styles["noise-filter"]} />;
};

export default NoiseFilter;
