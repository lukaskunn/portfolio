import { getWorksContent, getAllProjects } from '@/sanity/lib/fetch';
import ProjectsClient from './ProjectsClient';
import generateMetadataUtil from '@/utils/generateMetadata';

export async function generateMetadata() {
  const works = await getWorksContent();
  return generateMetadataUtil(works.seo, undefined, undefined, undefined, "/projects");
}

export default async function ProjectsPage() {
  // Fetch data from Sanity
  const [works, projects] = await Promise.all([
    getWorksContent(),
    getAllProjects(),
  ]);

  return <ProjectsClient works={works} projects={projects} />;
}
