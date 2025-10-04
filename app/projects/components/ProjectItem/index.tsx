'use client'
import gsap from "gsap";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { useHover, useIsomorphicLayoutEffect } from "usehooks-ts";
import { usePageContext } from "../../../../src/contexts/PageContext";
import styles from "./ProjectItem.module.css";

type LinkHandlerProps = {
  goToExternalPage?: boolean;
  urlToProject?: string;
  projectId?: string;
  children: React.ReactNode;
};

const LinkHandler = ({
  goToExternalPage,
  urlToProject,
  projectId,
  children,
}: LinkHandlerProps) => (
  goToExternalPage ? (
    <a href={urlToProject}>{children}</a>
  ) : (
    <Link href={`/projects/${projectId}`} scroll={false}>
      {children}
    </Link>
  )
);

type ProjectItemProps = {
  title: string;
  index: number;
  description: string;
  projectId: string;
  goToExternalPage?: boolean;
  urlToProject?: string;
  updateModal: (index: number, modalIsActive: boolean) => void;
};

const ProjectItem = ({
  title,
  index,
  updateModal,
  description,
  projectId,
  goToExternalPage,
  urlToProject,
}: ProjectItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const seeProjectTextRef = useRef<HTMLSpanElement>(null);
  const isHovering = useHover(containerRef);
  const [canHover, setCanHover] = useState(false);
  const { isLoaded } = usePageContext();

  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        y: 0,
        padding: "36px 0",
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.2,
        onComplete: () => setCanHover(true),
      });
    }, 1400);

    return () => clearTimeout(timer);
  }, [isLoaded, index]);

  useEffect(() => {
    if (!canHover) return;

    const container = containerRef.current;
    const textElement = seeProjectTextRef.current;

    if (isHovering) {
      gsap.to(container, {
        padding: "72px 0",
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(textElement, {
        height: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      });
    } else {
      gsap.to(container, {
        padding: "36px 0",
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(textElement, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power3.out",
      });
    }
  }, [isHovering, canHover]);

  const formattedIndex = index < 10 ? `0${index + 1}` : `${index + 1}`;

  return (
    <LinkHandler
      goToExternalPage={goToExternalPage}
      urlToProject={urlToProject}
      projectId={projectId}
    >
      <div
        className={styles["project-item-container"]}
        ref={containerRef}
        onMouseEnter={() => updateModal(index, true)}
        onMouseLeave={() => updateModal(index, false)}
      >
        <p
          dangerouslySetInnerHTML={{ __html: formattedIndex }}
          className={styles["project-index"]}
        />
        <div className={styles["project-description-container"]}>
          <div className={styles["project-title-container"]}>
            <h2
              className={styles["project-title"]}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <span
              className={styles["see-project-text"]}
              ref={seeProjectTextRef}
            >
              Click to see project
            </span>
          </div>
          <p
            className={styles["project-description"]}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </LinkHandler>
  );
};

export default ProjectItem;
