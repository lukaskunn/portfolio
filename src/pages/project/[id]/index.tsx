import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NextPageButton from "../../../components/NextPageButton";
import { useLanguage } from "../../../contexts/LanguageContext";
import AnimatePosOpacity from "../../../utils/AnimatePosOpacity";
import loadProjectData from "../../../utils/loadProjectData";
import ProjectPageGallery from "./components/ProjectPageGallery";
import styles from "./ProjectPage.module.css";

/**
 * Interface for window/viewport dimensions
 */
interface Dimensions {
  height: number;
  width: number;
}

/**
 * Interface for project data structure
 */
interface ProjectData {
  title: string;
  description: string;
  briefDescription: string;
  technologies: string[];
  galleryImages: any[];
}

/**
 * Supported language keys
 */
type LanguageKey = 'en' | 'pt';

/**
 * Project page component that displays detailed information about a project
 * Uses dynamic routing to load project data based on ID parameter
 */
const Project: React.FC = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [projectTranslations, setProjectTranslations] = useState<Record<LanguageKey, ProjectData>>();
  const [dimensions, setDimensions] = useState<Dimensions>({ height: 0, width: 0 });
  const [project, setProject] = useState<ProjectData>();

  // Load project data when router is ready with the project ID
  useEffect(() => {
    if (router.query.id !== undefined) {
      const projectId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
      const projectData = loadProjectData(projectId) as Record<LanguageKey, ProjectData>;
      setProjectTranslations(projectData);
      setProject(projectData[language]);
    }
  }, [router.query.id, language]);

  // Update project content when language changes
  useEffect(() => {
    if (projectTranslations) {
      setProject(projectTranslations[language]);
    }
  }, [language, projectTranslations]);

  // Track viewport dimensions for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Return null during data loading
  if (!project) return null;

  return (
    <div className={styles["project-page"]}>
      <div className={styles["project-page-container"]}>
        <ProjectHeader title={project.title} />
        <ProjectDescription description={project.description} />
        <ProjectBriefDescription briefDescription={project.briefDescription} />
        <ProjectTechnologies technologies={project.technologies} />
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
  );
};

/**
 * Project title component with animation
 */
const ProjectHeader: React.FC<{ title: string }> = ({ title }) => (
  <AnimatePosOpacity
    from={{ x: "-100%" }}
    to={{ y: 0, opacity: 1 }}
    durationIn={1}
    durationOut={0.6}
    delay={0.4}
    set={{ opacity: 0, y: 100, x: "0%" }}
  >
    <h1 className={styles["project-title"]} dangerouslySetInnerHTML={{ __html: title }} />
  </AnimatePosOpacity>
);

/**
 * Project description component with animation
 */
const ProjectDescription: React.FC<{ description: string }> = ({ description }) => (
  <AnimatePosOpacity
    from={{ x: "-100%" }}
    to={{ y: 0, opacity: 1 }}
    durationIn={1}
    durationOut={0.6}
    delay={0.6}
    set={{ opacity: 0, y: 100, x: "0%" }}
  >
    <p className={styles["project-description"]} dangerouslySetInnerHTML={{ __html: description }} />
  </AnimatePosOpacity>
);

/**
 * Project brief description component with animation
 * Splits content by "</>" tags and animates each section separately
 */
const ProjectBriefDescription: React.FC<{ briefDescription: string }> = ({ briefDescription }) => (
  <p className={styles["project-brief-description"]}>
    {briefDescription.split("</>").map((text, index) => (
      <AnimatePosOpacity
        from={{ x: "-110%", opacity: 0 }}
        to={{ y: 0, opacity: 1 }}
        durationIn={1}
        durationOut={0.6}
        delay={0.6 + index * 0.2}
        key={index}
        set={{ opacity: 0, y: 100, x: "0%" }}
      >
        <span key={index}>
          {text}
          <br />
          <br />
        </span>
      </AnimatePosOpacity>
    ))}
  </p>
);

/**
 * Project technologies list component with animation
 * Each technology gets a staggered animation entry
 */
const ProjectTechnologies: React.FC<{ technologies: string[] }> = ({ technologies }) => (
  <div className={styles["technologies-container"]}>
    <AnimatePosOpacity
      from={{ x: "-100%" }}
      to={{ y: 0, opacity: 1 }}
      durationIn={1}
      durationOut={0.6}
      delay={0.6}
      set={{ opacity: 0, y: 100, x: "0%" }}
    >
      <p className={styles["technologies-title"]}>{`[technologies]`}</p>
    </AnimatePosOpacity>
    <div className={styles["project-technologies"]}>
      {technologies.map((technology, index) => (
        <AnimatePosOpacity
          from={{ y: 100, opacity: 0 }}
          to={{ y: 0, opacity: 1 }}
          durationIn={1}
          durationOut={0.6}
          delay={0.6 + index * 0.2}
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
);

export default Project;
