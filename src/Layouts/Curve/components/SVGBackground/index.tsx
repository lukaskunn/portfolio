import { motion } from "framer-motion";
import getAnimationProps from "../../../../utils/getAnimationProps";
import styles from "../../Curve.module.scss";
import React from "react";
interface ISVG {
  width: number;
  height: number;
  isMobile: boolean
}

const SVG = ({ width, height, isMobile }: ISVG) => {
  const initialPath = `
          M0 300
          Q${width / 2} 200 ${width} 300
          L${width} ${height + 300}
          Q${width / 2} ${isMobile ? height + 400 : height + 600} 0 ${height + 300}
          L0 300
      `;
  const targetPath = `
          M0 300
          Q${width / 2} ${isMobile ? 200 : 0} ${width} 300
          L${width} ${height}
          Q${width / 2} ${height} 0 ${height}
          L0 300
      `;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.75, 0, 0.24, 1],
      },
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 0.75,
        ease: [0.75, 0, 0.24, 1],
      },
    },
  };

  const slide = {
    initial: {
      top: "-300px",
    },
    enter: {
      top: "-100vh",
      transition: {
        duration: 0.75,
        ease: [0.75, 0, 0.24, 1],
      },
      transitionEnd: {
        top: "200vh",
      },
    },
    exit: {
      top: "-300px",
      transition: {
        duration: 0.75,
        ease: [0.75, 0, 0.24, 1],
      },
    },
  };
  return (
    <motion.svg
      {...getAnimationProps(slide)}
      className={styles["transition-svg"]}
    >
      <motion.path {...getAnimationProps(curve)}></motion.path>
    </motion.svg>
  );
};

export default SVG;
