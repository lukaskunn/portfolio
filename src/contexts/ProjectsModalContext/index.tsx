"use client";
import React, { useState, useContext, createContext } from "react";
import type { ProjectModalContextType, ProjectModal } from '@/types';

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(
  undefined,
);

interface ProjectModalContextProviderProps {
  children: React.ReactNode;
}

export const ProjectModalContextProvider: React.FC<
  ProjectModalContextProviderProps
> = ({ children }) => {

  const [modal, setModal] = useState<ProjectModal>({
    isActive: false,
    index: 0,
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
