import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import gsap from "gsap";
import NextPageButton from "../../components/NextPageButton";
import ProjectItem from "./components/ProjectItem";
import ProjectModal from "./components/ProjectModal";

import { useLanguage } from "../../contexts/LanguageContext";
import type { TransitionContextType } from "../../Layouts/TransitionProvider";
import { TransitionContext } from "../../Layouts/TransitionProvider";
import styles from "./Works.module.css";
import "react-tabs/style/react-tabs.css";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { PageContext } from "../../contexts/PageContext";

function Works() {
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType;
  const { isLoaded } = React.useContext(PageContext) as any;
  const el = React.useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();
  const { works } = currentLanguage;
  const { sectionTitle, nextPageText, projects } = works;

  const modalInitialState = {
    isActive: false,
    index: 0,
    projects: projects,
  };

  const [modal, setModal] = useState(modalInitialState);

  const updateModal = (index: number, modalIsActive: boolean) => {
    setModal({ ...modal, isActive: modalIsActive, index });
  };

  useIsomorphicLayoutEffect(() => {
    setTimeout(() => {
      gsap.to(el.current, {
        opacity: 1,
        duration: 1,
      }),
        8000;
    });

    timeline.add(
      gsap.to(el.current, {
        y: "100px",
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut"
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
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        gsap.to(`.${styles["section-title"]}`, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(`.${styles['project-counter']}`, {
          opacity: 0.6,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          ease: "power3.out",
        });
        gsap.to(`.${styles["border-top"]}`, {
          width: "100%",
          duration: 1.1,
          ease: "power4.inOut",
        });

        gsap.to(`.${styles["project-grid"]}`, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          delay: 0.5,
          ease: "power3.out",
        });
      }, 1000);
    }
  }, [isLoaded]);

  return (
    <>
      <section className={styles.container} id="works" ref={el}>
        <div className={styles.works} id="works">
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
            {projects && projects.length < 1 ? (
              <h2
                dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }}
              />
            ) : (
              projects.map((project: any, index: any) => {
                return (
                  <ProjectItem
                    projectId={project.projectId}
                    key={index}
                    index={index}
                    title={project.title}
                    updateModal={updateModal}
                    description={project.description}
                    goToExternalPage={project.goToExternalPage}
                    urlToProject={project.urlToProject}
                  />
                );
              })
            )}
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
