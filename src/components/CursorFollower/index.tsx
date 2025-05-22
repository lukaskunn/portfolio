import React from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useCursor } from "../../contexts/CursorContext"
import cursorFollowerStyles from "./CursorFollower.module.scss";


const scaleAnimation = {
  initial: {
    x: "-50%",
    y: "-50%",
  },
  open: {
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  close: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

function CursorFollower() {
  const { hoverImportantText } = useCursor();
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = React.useState({
    x: 0,
    y: 0,
    scrollY: 0,
    scrollX: 0,
  });

  const moveCursorX = gsap.quickTo(cursorRef.current, "left", {
    duration: 0.20,
    ease: "power4",
  });
  const moveCursorY = gsap.quickTo(cursorRef.current, "top", {
    duration: 0.20,
    ease: "power4",
  });

  React.useEffect(() => {
    moveCursorX(cursorPosition.x);
    moveCursorY(cursorPosition.y);
  }, [cursorPosition]);

  React.useEffect(() => {
    addEventListener("mousemove", (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setCursorPosition((prev) => ({
        ...prev,
        x: clientX,
        y: clientY,
      }));
    });

    addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      setCursorPosition((prev) => ({
        ...prev,
        scrollX,
        scrollY,
      }));
    })

    return () => {
      removeEventListener("mousemove", () => { });
      removeEventListener("scroll", () => { });
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      initial="initial"
      variants={scaleAnimation}
      animate="open"
      className={cursorFollowerStyles["white-circle"]}
      style={{
        width: hoverImportantText ? "120px" : "20px",
        height: hoverImportantText ? "120px" : "20px",
      }}
    />
  );
}

export default CursorFollower;
