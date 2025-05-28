import React from "react";
import styles from "./NoiseFilter.module.css";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { TransitionContext } from "../../Layouts/TransitionProvider";
import type { TransitionContextType } from "../../Layouts/TransitionProvider";

const NoiseFilter = () => {
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType; // TransitionContextType
  
  useIsomorphicLayoutEffect(() => {
    timeline.add(
      gsap.to(`.${styles["noise-filter"]}`, {
        delay: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );
  }, []);
  return <div className={styles["noise-filter"]} />;
};

export default NoiseFilter;
