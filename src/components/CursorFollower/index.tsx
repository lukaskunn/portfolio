// @ts-nocheck
'use client'
import React from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin";

import { motion } from "framer-motion";
import { useCursor } from "../../contexts/CursorContext";
import styles from "@/styles/css/components/CursorFollower.module.css";

gsap.registerPlugin(ScrambleTextPlugin);

const ANIMATION_DURATION = 0.35;

const scaleAnimation = {
  initial: {
    x: "-50%",
    y: "-50%",
  },
  open: {
    x: "-50%",
    y: "-50%",
    transition: {
      duration: ANIMATION_DURATION,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  close: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: ANIMATION_DURATION,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

function CursorFollower() {
  const { hoverImportantText, hoverSize } = useCursor();
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = React.useState({
    x: 0,
    y: 0,
    scrollY: 0,
    scrollX: 0,
  });

  const moveCursorX = React.useRef<ReturnType<typeof gsap.quickTo>>();
  const moveCursorY = React.useRef<ReturnType<typeof gsap.quickTo>>();

  React.useEffect(() => {
    if (cursorRef.current) {
      moveCursorX.current = gsap.quickTo(cursorRef.current, "left", {
        duration: ANIMATION_DURATION,
        ease: "power4",
      });
      moveCursorY.current = gsap.quickTo(cursorRef.current, "top", {
        duration: ANIMATION_DURATION,
        ease: "power4",
      });
    }
  }, []);

  React.useEffect(() => {
    moveCursorX.current?.(cursorPosition.x + cursorPosition.scrollX);
    moveCursorY.current?.(cursorPosition.y + cursorPosition.scrollY);
  }, [cursorPosition]);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      setCursorPosition((prev) => ({
        ...prev,
        x: clientX,
        y: clientY,
      }));
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      setCursorPosition((prev) => ({
        ...prev,
        scrollY,
        scrollX,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        initial="initial"
        variants={scaleAnimation}
        animate="open"
        className={`${styles["white-circle"]}`}
      />
    </>
  );
}

export default CursorFollower;
