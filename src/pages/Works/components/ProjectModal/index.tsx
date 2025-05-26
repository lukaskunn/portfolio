"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "./components/Image";
import styles from "./ProjectModal.module.scss";

type ProjectModalProps = {
  imageAlt: string;
  galleryBackground: string;
  galleryBackgroundColor: string;
};

type IProjectModal = {
  modal: {
    isActive: boolean;
    index: number;
    projects: ProjectModalProps[];
  };
};

const scaleAnimation = {
  initial: {
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
  open: {
    scale: 1,
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

const ProjectModal = (props: IProjectModal) => {
  const { modal } = props;
  const { isActive, index, projects } = modal;
  const containerRef = useRef(null);
  const [modalPosition, setModalPosition] = React.useState({
    x: 0,
    y: 0,
    scrollY: 0,
    scrollX: 0,
  });

  const moveContainerX = gsap.quickTo(containerRef.current, "left", {
    duration: 0.4,
    ease: "power3",
  });
  const moveContainerY = gsap.quickTo(containerRef.current, "top", {
    duration: 0.4,
    ease: "power3",
  });

  useEffect(() => {
    moveContainerX(modalPosition.x + modalPosition.scrollX);
    moveContainerY(modalPosition.y + modalPosition.scrollY);
  }, [modalPosition]);

  useEffect(() => {
    addEventListener("mousemove", (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setModalPosition((prev) => ({
        ...prev,
        x: clientX,
        y: clientY,
      }));
    });

    addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      setModalPosition((prev) => ({
        ...prev,
        scrollX,
        scrollY,
      }));
    });

    return () => {
      removeEventListener("mousemove", () => {});
      removeEventListener("scroll", () => {});
    };
  }, []);

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
        {projects.map((project, index) => {
          const { galleryBackground, galleryBackgroundColor } = project;
          return (
            <div
              className={styles["project-modal"]}
              key={index}
              style={{ backgroundColor: galleryBackgroundColor }}
            >
              <Image
                src={galleryBackground}
                color={galleryBackgroundColor}
                height={0}
                width={300}
                alt={project.imageAlt}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectModal;
