import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Curve from "../../../Layouts/Curve";
import styles from "./ProjectPage.module.scss";
import ProjectPageGallery from "./components/ProjectPageGallery";
import NextPageButton from "../../../components/NextPageButton";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useCursor } from "../../../contexts/CursorContext";
import { useHover } from "usehooks-ts";
import loadProjectData from "../../../utils/loadProjectData";

const Project = () => {
    const router = useRouter();
    const { language } = useLanguage();
    const { setHoverImportantText } = useCursor();
    const [project, setProject] = React.useState<any>();
    const [projectTranslations, setProjectTranslations] = React.useState<any>();
    const projectTitleRef = React.useRef(null);
    const projectDescriptionRef = React.useRef(null);
    const projectBriefDescriptionRef = React.useRef(null);
    const projectTitleIsHover = useHover(projectTitleRef);
    const projectDescriptionIsHover = useHover(projectDescriptionRef);
    const projectBriefDescriptionIsHover = useHover(projectBriefDescriptionRef);

    useEffect(() => {
        if (
            projectTitleIsHover ||
            projectDescriptionIsHover ||
            projectBriefDescriptionIsHover
        ) {
            setHoverImportantText(true);
        } else {
            setHoverImportantText(false);
        }
    }, [
        projectTitleIsHover,
        projectDescriptionIsHover,
        projectBriefDescriptionIsHover,
    ]);

    useEffect(() => {
        if (router.query.id !== undefined) {
            const projectId = Array.isArray(router.query.id)
                ? router.query.id[0]
                : router.query.id;
            const projectData: { [key: string]: any } = loadProjectData(projectId);
            setProjectTranslations(projectData);
            setProject(projectData[language]);

            // setProject();
        }
    }, [router.query.id]);

    useEffect(() => {
        if (projectTranslations !== undefined) {
            setProject(projectTranslations[language]);
        }
    }, [language]);

    const [dimensions, setDimensions] = React.useState({
        height: 0,
        width: 0,
    });

    React.useEffect(() => {
        const resize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <Curve isProjectPage={true}>
            {project !== undefined ? (
                <>
                    <div className={styles["project-page-container"]}>
                        <h1 className={styles["project-title"]} ref={projectTitleRef}>
                            {project.title}
                        </h1>
                        <p
                            className={styles["project-description"]}
                            ref={projectDescriptionRef}
                        >
                            {project.description}
                        </p>
                        <p
                            className={styles["project-brief-description"]}
                            ref={projectBriefDescriptionRef}
                        >
                            {project.briefDescription
                                .split("</>")
                                .map((text: any, index: any) => (
                                    <span key={index}>
                                        {text}
                                        <br />
                                        <br />
                                    </span>
                                ))}
                        </p>
                        <div className={styles["technologies-container"]}>
                            <p className={styles["technologies-title"]}>{`[technologies]`}</p>
                            <div className={styles["project-technologies"]}>
                                {project.technologies.map((technology: any, index: any) => (
                                    <span key={index} className={styles["technology"]}>
                                        / {technology}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <ProjectPageGallery
                            galleryImages={project.galleryImages}
                            dimensions={dimensions}
                        />
                    </div>
                    <NextPageButton
                        text="Return to works"
                        type="backward"
                        link="/Works"
                        showBackground={true}
                    />
                </>
            ) : null}
        </Curve>
    );
};

export default Project;
