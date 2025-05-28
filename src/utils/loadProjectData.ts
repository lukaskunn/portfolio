import englishContent from "../content/en.json";
import portugueseContent from "../content/pt.json";

const loadProjectData = (projectId: string) => {
  const projectInPortuguese = portugueseContent.works.projects.find((project: any) => project.projectId === projectId);

  const projectInEnglish = englishContent.works.projects.find((project: any) => project.projectId === projectId);

  if (!projectInPortuguese || !projectInEnglish) {
    return { message: "Project not found" };
  }

  const projects = {
    pt: projectInPortuguese,
    en: projectInEnglish,
  };

  return projects;
};

export default loadProjectData;
