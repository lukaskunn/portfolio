import React, { useEffect } from "react";
import { useRouter } from "next/router";
// import { useHover } from "usehooks-ts";
import Curve from "../../../Layouts/Curve";
import ProjectPageGallery from "./components/ProjectPageGallery";
import NextPageButton from "../../../components/NextPageButton";
import { useLanguage } from "../../../contexts/LanguageContext";
// import { useCursor } from "../../../contexts/CursorContext";
import loadProjectData from "../../../utils/loadProjectData";
import styles from "./ProjectPage.module.scss";

const dimensionsInitialState = {
  height: 0,
  width: 0,
};

const Project = () => {
  const router = useRouter();
  const { language } = useLanguage();
  // const { setHoverImportantText } = useCursor();
  const [dimensions, setDimensions] = React.useState(dimensionsInitialState);
  const [project, setProject] = React.useState<any>();
  const [projectTranslations, setProjectTranslations] = React.useState<any>();
  // const projectTitleRef = React.useRef(null);
  // const projectDescriptionRef = React.useRef(null);
  // const projectBriefDescriptionRef = React.useRef(null);
  // const projectTitleIsHover = useHover(projectTitleRef);
  // const projectDescriptionIsHover = useHover(projectDescriptionRef);
  // const projectBriefDescriptionIsHover = useHover(projectBriefDescriptionRef);

  // useEffect(() => {
  //   if (
  //     projectTitleIsHover ||
  //     projectDescriptionIsHover ||
  //     projectBriefDescriptionIsHover
  //   ) {
  //     setHoverImportantText(true);
  //   } else {
  //     setHoverImportantText(false);
  //   }
  // }, [
  //   projectTitleIsHover,
  //   projectDescriptionIsHover,
  //   projectBriefDescriptionIsHover,
  // ]);

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
      {!!project ? (
        <>
          <div className={styles["project-page-container"]}>
            <h1
              className={styles["project-title"]}
              dangerouslySetInnerHTML={{ __html: project.title }}
              // ref={projectTitleRef}
            />
            <p
              className={styles["project-description"]}
              dangerouslySetInnerHTML={{ __html: project.description }}
              // ref={projectDescriptionRef}
            />
            <p
              className={styles["project-brief-description"]}
              // ref={projectBriefDescriptionRef}
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
                  <span
                    key={index}
                    className={styles["technology"]}
                    dangerouslySetInnerHTML={{ __html: `/ ${technology}` }}
                  />
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
