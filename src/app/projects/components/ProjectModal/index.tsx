// @ts-nocheck
"use client";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "./components/Image";
import styles from "@/styles/css/components/ProjectModal.module.css";
import { useProjectModalContext } from "@/contexts/ProjectsModalContext";
import { useCursor } from "@/contexts/CursorContext";
import { urlFor } from "@/sanity/client";

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

import type { ProjectModalProps } from '@/types';

const ProjectModal = ({ projects }: ProjectModalProps) => {
  const { modal } = useProjectModalContext();
  const { position } = useCursor();
  const { isActive, index } = modal;
  const containerRef = useRef<HTMLDivElement>(null);

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
        {projects.map((project, i) => {
          const { overview } = project
          const { galleryBackground, galleryBackgroundColor } = overview;

          return (
            <div
              className={styles["project-modal"]}
              key={i}
              style={{ backgroundColor: galleryBackgroundColor.hex }}
            >
              <Image
                src={urlFor(galleryBackground?.asset.url).url()}
                color={galleryBackgroundColor}
                height={290}
                width={300}
                alt={project.imageAlt || "Project background"}
              />
            </div>
          )
        })}
      </div>
    </motion.div>
  );
};

export default ProjectModal;
