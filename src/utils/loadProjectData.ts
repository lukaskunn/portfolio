import englishContent from "../content/en.json";
import portugueseContent from "../content/pt.json";
import type {LocalizedProjects, Project} from "../pages/project/[id]/types"

export type ContentType = {
  works: {
    projects: Project[];
  }
}

/**
 * Loads project data by ID in both English and Portuguese
 * @param projectId The unique identifier of the project
 * @returns Object containing the project in both languages or error message
 */
const loadProjectData = (projectId: string): LocalizedProjects => {
  const projectInPortuguese = (portugueseContent as ContentType).works.projects
    .find(project => project.projectId === projectId);

  const projectInEnglish = (englishContent as ContentType).works.projects
    .find(project => project.projectId === projectId);

  return {
    pt: projectInPortuguese,
    en: projectInEnglish,
  };
};

export default loadProjectData;
