"use client";
import React, { useState, useContext, createContext } from "react";
import { useLanguage } from "../../../../src/contexts/LanguageContext";
import type {Project} from "../../../../src/types/projectContentType";

interface ProjectModalContextType {
  modal: {
    isActive: boolean;
    index: number;
    projects: Project[];
  };
  updateModal: (index: number, modalIsActive: boolean) => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(
  undefined,
);

interface ProjectModalContextProviderProps {
  children: React.ReactNode;
}

export const ProjectModalContextProvider: React.FC<
  ProjectModalContextProviderProps
> = ({ children }) => {
  const { currentLanguage } = useLanguage();
  const { projects } = currentLanguage.works;
  const [modal, setModal] = useState({
    isActive: false,
    index: 0,
    projects,
  });

  const updateModal = (index: number, modalIsActive: boolean) => {
    setModal((prev) => ({ ...prev, isActive: modalIsActive, index }));
  };

  const value: ProjectModalContextType = {
    modal,
    updateModal,
  };

  return (
    <ProjectModalContext.Provider value={value}>
      {children}
    </ProjectModalContext.Provider>
  );
};

export const useProjectModalContext = (): ProjectModalContextType => {
  const context = useContext(ProjectModalContext);

  if (context === undefined) {
    throw new Error(
      "useProjectModalContext must be used within a ProjectModalContextProvider",
    );
  }

  return context;
};
