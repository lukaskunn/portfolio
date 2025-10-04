"use client";
import React, { useState, useContext, createContext } from "react";
import type { Project } from "../../../../src/types/projectContentType";
import { useLanguage } from "../../../../src/contexts/LanguageContext";
import { usePathname } from "next/navigation";

interface ProjectContextType {
  project: Project | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectContextProviderProps {
  children: React.ReactNode;
}

export const ProjectContextProvider: React.FC<ProjectContextProviderProps> = ({
  children,
}) => {
  const { currentLanguage } = useLanguage();
  const { works } = currentLanguage;
  const { projects } = works;
  const pathname = usePathname();

  const [project, setProject] = useState<Project | null>(null);

  const value: ProjectContextType = {
    project,
  };

  React.useEffect(() => {
    const projectId = pathname?.split("/").pop();
    const foundProject =
      projects.find((p) => p.projectId === projectId) || null;
    setProject(foundProject);
  }, [pathname, projects]);

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext);

  if (context === undefined) {
    throw new Error(
      "useProjectContext must be used within a ProjectContextProvider",
    );
  }

  return context;
};
