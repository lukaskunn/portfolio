import React from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin";

import { motion } from "framer-motion";
import { useCursor } from "../../contexts/CursorContext";
import styles from "./CursorFollower.module.css";

gsap.registerPlugin(ScrambleTextPlugin);

const scaleAnimation = {
  initial: {
    x: "-50%",
    y: "-50%",
  },
  open: {
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  close: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

function CursorFollower() {
  const { hoverImportantText, hoverSize, modalProps } = useCursor();
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = React.useState({
    x: 0,
    y: 0,
    scrollY: 0,
    scrollX: 0,
  });
  const [modalPosition, setModalPosition] = React.useState({
    x: 0,
    y: 0,
    scrollY: 0,
    scrollX: 0,
    modalSide: "left",
    position: "top",
  });
  const { content, isOpen } = modalProps;

  const createQuickTo =
    (ref: React.RefObject<HTMLDivElement>, prop: string) => () =>
      ref.current
        ? gsap.quickTo(ref.current, prop, { duration: 0.2, ease: "power4" })
        : () => {};

  const moveCursorX = React.useRef<ReturnType<typeof gsap.quickTo>>();
  const moveCursorY = React.useRef<ReturnType<typeof gsap.quickTo>>();
  const moveModalX = React.useRef<ReturnType<typeof gsap.quickTo>>();
  const moveModalY = React.useRef<ReturnType<typeof gsap.quickTo>>();

  React.useEffect(() => {
    if (cursorRef.current) {
      moveCursorX.current = gsap.quickTo(cursorRef.current, "left", {
        duration: 0.3,
        ease: "power4",
      });
      moveCursorY.current = gsap.quickTo(cursorRef.current, "top", {
        duration: 0.3,
        ease: "power4",
      });
    }
    if (modalRef.current) {
      moveModalX.current = gsap.quickTo(modalRef.current, "left", {
        duration: 0.2,
        ease: "power4",
      });
      moveModalY.current = gsap.quickTo(modalRef.current, "top", {
        duration: 0.2,
        ease: "power4",
      });
    }
  }, []);

  React.useEffect(() => {
    moveCursorX.current?.(cursorPosition.x + cursorPosition.scrollX);
    moveCursorY.current?.(cursorPosition.y + cursorPosition.scrollY);
  }, [cursorPosition]);

  React.useEffect(() => {
    moveModalX.current?.(modalPosition.x + modalPosition.scrollX);
    moveModalY.current?.(modalPosition.y + modalPosition.scrollY);
  }, [modalPosition]);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const modalWidth = modalRef.current?.offsetWidth || 0;
      const modalHeight = modalRef.current?.offsetHeight || 0;

      let modalSide = "left";
      let position = "top";

      if (clientX + modalWidth > windowWidth * 0.5) {
        modalSide = "left";
      } else {
        modalSide = "right";
      }

      if (clientY + modalHeight > windowHeight * 0.5) {
        position = "top";
      } else {
        position = "bottom";
      }

      setModalPosition((prev) => ({
        ...prev,
        x: clientX - 10,
        y: clientY,
        modalSide,
        position,
      }));
      setCursorPosition((prev) => ({
        ...prev,
        x: clientX,
        y: clientY,
      }));
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      setModalPosition((prev) => ({
        ...prev,
        scrollY,
        scrollX,
      }));
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
        className={`${styles["white-circle"]} ${hoverImportantText ? styles["hover-important-text"] : ""}`}
        style={{
          width: hoverImportantText ? hoverSize : "20px",
          height: hoverImportantText ? hoverSize : "20px",
        }}
      ></motion.div>
      <motion.div
        ref={modalRef}
        initial="initial"
        variants={scaleAnimation}
        animate="open"
        className={`${styles["modal-container"]} ${hoverImportantText ? styles["hover-important-text"] : ""}`}
        style={{
          width: isOpen ? "fit-content" : "0px",
          height: isOpen ? "fit-content" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          className={`${styles["modal-content"]} ${styles[modalPosition.modalSide]} ${styles[modalPosition.position]}`}
        >
          {content}
        </p>
      </motion.div>
    </>
  );
}

export default CursorFollower;
