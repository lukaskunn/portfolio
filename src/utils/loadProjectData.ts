import englishContent from "../content/en.json";
import portugueseContent from "../content/pt.json";

interface Project {
  projectId: string;
  [key: string]: any; // For other project properties
}

interface LocalizedProjects {
  pt: Project | undefined;
  en: Project | undefined;
}

type ContentType = {
  works: {
    projects: Project[];
  }
}

/**
 * Loads project data by ID in both English and Portuguese
 * @param projectId The unique identifier of the project
 * @returns Object containing the project in both languages or error message
 */
const loadProjectData = (projectId: string): LocalizedProjects | { message: string } => {
  const projectInPortuguese = (portugueseContent as ContentType).works.projects
    .find(project => project.projectId === projectId);

  const projectInEnglish = (englishContent as ContentType).works.projects
    .find(project => project.projectId === projectId);

  if (!projectInPortuguese || !projectInEnglish) {
    return { message: "Project not found" };
  }

  return {
    pt: projectInPortuguese,
    en: projectInEnglish,
  };
};

export default loadProjectData;
