import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "../../styles/Works.module.scss";
import Curve from "../../Layouts/Curve";
import NextPageButton from "../../components/NextPageButton";
import ProjectItem from "../../components/ProjectItem";
import ProjectModal from "../../components/ProjectModal";

function Works() {
    const { currentLanguage } = useLanguage();
    const { works } = currentLanguage;
    const { sectionTitle, nextPageText, personalProjects, backgroundProjects } =
        works;
    const [modal, setModal] = useState({
        isActive: false,
        index: 0,
        projects: backgroundProjects.projects.map((project) => {
            const { galleryBackground, galleryBackgroundColor, title } = project;
            return {
                imageAlt: title,
                galleryBackground,
                galleryBackgroundColor,
            }
        }),
    });

    const changeModalList = (index: number) => {
        const modalList =
            index === 0 ? personalProjects.projects.map((project) => {
                const { galleryBackground, galleryBackgroundColor, title } = project;
                return {
                    imageAlt: title,
                    galleryBackground,
                    galleryBackgroundColor,
                }
            }) : backgroundProjects.projects.map((project) => {
                const { galleryBackground, galleryBackgroundColor, title } = project;
                return {
                    imageAlt: title,
                    galleryBackground,
                    galleryBackgroundColor,
                }
            });

        setModal({ isActive: false, index: 0, projects: modalList });
    };

    const updateModal = (index: number, modalIsActive: boolean) => {
        setModal({ isActive: modalIsActive, index, projects: modal.projects });
    };

    React.useEffect(() => {
        setTimeout(() => {
            console.log("1");
            setModal({
                isActive: false, index: 0, projects: backgroundProjects.projects.map((project) => {
                    const { galleryBackground, galleryBackgroundColor, title } = project;
                    return {
                        imageAlt: title,
                        galleryBackground,
                        galleryBackgroundColor,
                    }
                })
            });
        }, 100)
        console.log(2)
    }, []);


    return (
        <Curve>
            <section className={styles.container} id="works">
                <div className={styles.works} id="works">
                    <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
                    <Tabs
                        selectedTabClassName={styles.selecionada}
                        id={styles.controlledTabs}
                        defaultIndex={1}
                        focusTabOnClick={false}
                        onSelect={(index) => changeModalList(index)}
                    >
                        <TabList>
                            <Tab>{personalProjects.title}</Tab>
                            <Tab>{backgroundProjects.title}</Tab>
                        </TabList>
                        <TabPanel>
                            <div className={styles.projectGrid}>
                                {personalProjects.projects &&
                                    personalProjects.projects.length < 1 ? (
                                    <h2>nothing to show yet!</h2>
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
                            <div className={styles.projectGrid}>
                                {backgroundProjects.projects &&
                                    backgroundProjects.projects.length < 1 ? (
                                    <h2>nothing to show yet!</h2>
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
                                        }
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

