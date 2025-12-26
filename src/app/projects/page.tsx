import { getWorksContent, getAllProjects } from '@/sanity/lib/fetch';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  // Fetch data from Sanity
  const [works, projects] = await Promise.all([
    getWorksContent(),
    getAllProjects(),
  ]);

  return <ProjectsClient works={works} projects={projects} />;
}
