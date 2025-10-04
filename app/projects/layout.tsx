import { ProjectModalContextProvider } from "./Contexts/ProjectsModalContext";
import { ProjectContextProvider } from "./Contexts/ProjectContext";

import type { Metadata } from "next";
import generateMetadata from "../../src/utils/generateMetadata";
export const metadata: Metadata = generateMetadata("Lucas Oliveira | Projects");

const ProjectPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProjectContextProvider>
      <ProjectModalContextProvider>{children}</ProjectModalContextProvider>
    </ProjectContextProvider>
  );
};

export default ProjectPageLayout;
