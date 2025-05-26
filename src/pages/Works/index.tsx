import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import NextPageButton from "../../components/NextPageButton";
import ProjectItem from "./components/ProjectItem";
import ProjectModal from "./components/ProjectModal";
import Curve from "../../Layouts/Curve";

import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./Works.module.scss";
import "react-tabs/style/react-tabs.css";

function Works() {
  const { currentLanguage } = useLanguage();
  const { works } = currentLanguage;
  const { sectionTitle, nextPageText, personalProjects, backgroundProjects } =
    works;
  const projectsList = [
    personalProjects.projects.map((project) => {
      const { galleryBackground, galleryBackgroundColor, title } = project;
      return {
        imageAlt: title,
        galleryBackground,
        galleryBackgroundColor,
      };
    }),
    backgroundProjects.projects.map((project) => {
      const { galleryBackground, galleryBackgroundColor, title } = project;
      return {
        imageAlt: title,
        galleryBackground,
        galleryBackgroundColor,
      };
    }),
  ];

  const modalInitialState = {
    isActive: false,
    index: 0,
    projects: projectsList[1],
  };

  const [modal, setModal] = useState(modalInitialState);

  const changeModalList = (index: number) => {
    const modalList = projectsList[index];

    setModal({ isActive: false, index: 0, projects: modalList });
  };

  const updateModal = (index: number, modalIsActive: boolean) => {
    setModal({ isActive: modalIsActive, index, projects: modal.projects });
  };

  return (
    <Curve>
      <section className={styles.container} id="works">
        <div className={styles.works} id="works">
          <h2
            className={styles["section-title"]}
            dangerouslySetInnerHTML={{ __html: sectionTitle }}
          />
          <Tabs
            id={styles.controlledTabs}
            defaultIndex={1}
            focusTabOnClick={false}
            onSelect={(index) => changeModalList(index)}
          >
            <TabList>
              <Tab
                dangerouslySetInnerHTML={{ __html: personalProjects.title }}
              />
              <Tab
                dangerouslySetInnerHTML={{ __html: backgroundProjects.title }}
              />
            </TabList>
            <TabPanel>
              <div className={styles["project-grid"]}>
                {personalProjects.projects &&
                personalProjects.projects.length < 1 ? (
                  <h2
                    dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }}
                  />
                ) : (
                  personalProjects.projects.map((project: any, index: any) => {
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
            </TabPanel>
            <TabPanel>
              <div className={styles["project-grid"]}>
                {backgroundProjects.projects &&
                backgroundProjects.projects.length < 1 ? (
                  <h2
                    dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }}
                  />
                ) : (
                  backgroundProjects.projects.map(
                    (project: any, index: any) => {
                      return (
                        <ProjectItem
                          projectId={project.projectId}
                          key={index}
                          index={index}
                          title={project.title}
                          updateModal={updateModal}
                          description={project.description}
                        />
                      );
                    },
                  )
                )}
              </div>
            </TabPanel>
          </Tabs>
          <ProjectModal modal={modal} />
        </div>
      </section>
      <NextPageButton
        link="/About"
        text={nextPageText}
        type="forward"
        showBackground={true}
      />
    </Curve>
  );
}

export default Works;
