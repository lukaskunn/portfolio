'use client';
import gsap from "gsap";
import React, { useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import NextPageButton from "../../components/NextPageButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePageContext } from "../../contexts/PageContext";
import { useTransition } from "../../Layouts/TransitionProvider";
import ProjectItem from "../../components/ProjectItem";
import ProjectModal from "../../components/ProjectModal";
import styles from "./Works.module.css";

type ProjectType = {
  projectId: string;
  title: string;
  description: string;
  goToExternalPage?: boolean;
  urlToProject?: string;
};

type RenderProjectsProps = {
  projects: ProjectType[];
  updateModal: (index: number, modalIsActive: boolean) => void;
};

const ProjectsList = ({ projects, updateModal }: RenderProjectsProps) => {
  if (projects.length < 1) {
    return <h2 dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }} />;
  }

  return projects.map((project, index) => (
    <ProjectItem
      key={project.projectId || index}
      projectId={project.projectId}
      index={index}
      title={project.title}
      updateModal={updateModal}
      description={project.description}
      goToExternalPage={project.goToExternalPage}
      urlToProject={project.urlToProject}
    />
  ));
};

function Works() {
  const { timeline } = useTransition()
  const { isLoaded } = usePageContext();
  const el = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();
  const { sectionTitle, nextPageText, projects } = currentLanguage.works;

  // Add default imageAlt to each project to match ProjectModalProps requirements
  const projectsWithImageAlt = projects.map((project) => ({
    ...project,
    imageAlt: project.title || "Project image",
  }));

  const [modal, setModal] = useState({
    isActive: false,
    index: 0,
    projects: projectsWithImageAlt,
  });

  const updateModal = (index: number, modalIsActive: boolean) => {
    setModal((prev) => ({ ...prev, isActive: modalIsActive, index }));
  };

  // Handle initial animations
  useIsomorphicLayoutEffect(() => {
    const fadeInTimer = setTimeout(() => {
      gsap.to(el.current, {
        opacity: 1,
        duration: 1,
      });
    }, 8000);

    // Add to timeline for page transitions
    timeline.add(
      gsap.to(el.current, {
        y: "100px",
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
      }),
      0,
    );

    timeline.add(
      gsap.to(el.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
      }),
      0,
    );

    return () => clearTimeout(fadeInTimer);
  }, [timeline]);

  // Handle content animations when page is loaded
  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;

    const animateContent = () => {
      const elements = [
        {
          selector: `.${styles["section-title"]}`,
          props: { opacity: 1, y: 0, duration: 0.5 },
        },
        {
          selector: `.${styles["project-counter"]}`,
          props: { opacity: 0.6, y: 0, duration: 0.5, delay: 0.2 },
        },
        {
          selector: `.${styles["border-top"]}`,
          props: { width: "100%", duration: 1.1, ease: "power4.inOut" },
        },
        {
          selector: `.${styles["project-grid"]}`,
          props: { y: 0, opacity: 1, duration: 1.3, delay: 0.5 },
        },
      ];

      return elements.map(({ selector, props }) =>
        gsap.to(selector, { ...props, ease: props.ease || "power3.out" }),
      );
    };

    const animateContentTimer = setTimeout(animateContent, 1000);

    return () => clearTimeout(animateContentTimer);
  }, [isLoaded]);

  return (
    <>
      <section className={styles.container} id="works" ref={el}>
        <div className={styles.works}>
          <div className={styles["title-container"]}>
            <h2
              className={styles["section-title"]}
              dangerouslySetInnerHTML={{ __html: sectionTitle }}
            />
            <p
              className={styles["project-counter"]}
              dangerouslySetInnerHTML={{ __html: `(${projects.length})` }}
            />
          </div>
          <div className={styles["border-top"]} />
          <div className={styles["project-grid"]}>
            <ProjectsList projects={projects} updateModal={updateModal} />
          </div>
          <ProjectModal modal={modal} />
        </div>
      </section>
      <NextPageButton
        link="/About"
        text={nextPageText}
        type="forward"
        showBackground={true}
      />
    </>
  );
}

export default Works;
