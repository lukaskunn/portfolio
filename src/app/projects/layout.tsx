import React from 'react'
import { ProjectModalContextProvider } from '@/contexts/ProjectsModalContext'

const ProjectPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProjectModalContextProvider>{children}</ProjectModalContextProvider>
  );
};

export default ProjectPageLayout;