"use client";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "./components/Image";
import styles from "@/styles/css/components/ProjectModal.module.css";
import { useProjectModalContext } from "@/contexts/ProjectsModalContext";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  open: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  close: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
};

const ProjectModal = () => {
  const { modal } = useProjectModalContext();
  const { isActive, index, projects } = modal;
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    scrollY: 0,
    scrollX: 0,
  });

  const moveContainerX = useRef<gsap.QuickToFunc>();
  const moveContainerY = useRef<gsap.QuickToFunc>();

  useEffect(() => {
    if (containerRef.current) {
      moveContainerX.current = gsap.quickTo(containerRef.current, "left", {
        duration: 0.4,
        ease: "power3",
      });

      moveContainerY.current = gsap.quickTo(containerRef.current, "top", {
        duration: 0.4,
        ease: "power3",
      });
    }
  }, []);

  useEffect(() => {
    if (moveContainerX.current && moveContainerY.current) {
      moveContainerX.current(position.x + position.scrollX);
      moveContainerY.current(position.y + position.scrollY);
    }
  }, [position]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    setPosition((prev) => ({ ...prev, x: clientX, y: clientY }));
  }, []);

  const handleScroll = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <motion.div
      variants={scaleAnimation}
      initial="initial"
      animate={isActive ? "open" : "close"}
      className={styles["project-modal-container"]}
      ref={containerRef}
    >
      <div
        className={styles["modal-slider"]}
        style={{ top: `${index * -100}%` }}
      >
        {projects.map((project, i) => (
          <div
            className={styles["project-modal"]}
            key={i}
            style={{ backgroundColor: project.galleryBackgroundColor }}
          >
            <Image
              src={project.galleryBackground}
              color={project.galleryBackgroundColor}
              height={0}
              width={300}
              alt={project.imageAlt || "Project background"}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectModal;
