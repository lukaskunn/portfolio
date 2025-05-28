import React, { useEffect } from "react";
import { useRouter } from "next/router";
// import { useHover } from "usehooks-ts";
import ProjectPageGallery from "./components/ProjectPageGallery";
import NextPageButton from "../../../components/NextPageButton";
import { useLanguage } from "../../../contexts/LanguageContext";
// import { useCursor } from "../../../contexts/CursorContext";
import loadProjectData from "../../../utils/loadProjectData";
import styles from "./ProjectPage.module.css";
import AnimatePosOpacity from "../../../utils/AnimatePosOpacity";

const dimensionsInitialState = {
  height: 0,
  width: 0,
};

const Project = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [dimensions, setDimensions] = React.useState(dimensionsInitialState);
  const [project, setProject] = React.useState<any>();
  const [projectTranslations, setProjectTranslations] = React.useState<any>();

  useEffect(() => {
    if (router.query.id !== undefined) {
      const projectId = Array.isArray(router.query.id)
        ? router.query.id[0]
        : router.query.id;
      const projectData: { [key: string]: any } = loadProjectData(projectId);
      setProjectTranslations(projectData);
      setProject(projectData[language]);
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

  return !!project ? (
    <div className={styles["project-page"]}>
      <div className={styles["project-page-container"]}>
        <AnimatePosOpacity
          from={{ x: "-100%" }}
          to={{ y: 0, opacity: 1 }}
          durationIn={1}
          durationOut={0.6}
          delay={0.4}
          set={{ opacity: 0, y: 100 }}
        >
          <h1
            className={styles["project-title"]}
            dangerouslySetInnerHTML={{ __html: project.title }}
          />
        </AnimatePosOpacity>
        <AnimatePosOpacity
          from={{ x: "-100%" }}
          to={{ y: 0, opacity: 1 }}
          durationIn={1}
          durationOut={0.6}
          delay={0.6}
          set={{ opacity: 0, y: 100 }}
        >
          <p
            className={styles["project-description"]}
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </AnimatePosOpacity>
        <p className={styles["project-brief-description"]}>
          {project.briefDescription
            .split("</>")
            .map((text: any, index: any) => (
              <AnimatePosOpacity
                from={{ x: "-110%", opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
                durationIn={1}
                durationOut={0.6}
                delay={0.6 + index * 0.2} // stagger effect based on index
                key={index}
                set={{ opacity: 0, y: 100 }}
              >
                <span key={index}>
                  {text}
                  <br />
                  <br />
                </span>
              </AnimatePosOpacity>
            ))}
        </p>
        <div className={styles["technologies-container"]}>
          <AnimatePosOpacity
            from={{ x: "-100%" }}
            to={{ y: 0, opacity: 1 }}
            durationIn={1}
            durationOut={0.6}
            delay={0.6}
            set={{ opacity: 0, y: 100 }}
          >
            <p className={styles["technologies-title"]}>{`[technologies]`}</p>
          </AnimatePosOpacity>
          <div className={styles["project-technologies"]}>
            {project.technologies.map((technology: any, index: any) => (
              <AnimatePosOpacity
                from={{ y: 100, opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
                durationIn={1}
                durationOut={0.6}
                delay={0.6 + index * 0.2} // stagger effect based on index
                key={index}
                set={{ opacity: 0, y: 100 }}
              >
                <span
                  key={index}
                  className={styles["technology"]}
                  dangerouslySetInnerHTML={{ __html: `/ ${technology}` }}
                />
              </AnimatePosOpacity>
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
    </div>
  ) : null;
};

export default Project;
