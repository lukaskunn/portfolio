import { getWorksContent, getAllProjects } from '@/sanity/lib/fetch';
import ProjectsClient from './ProjectsClient';
import generateMetadataUtil from '@/utils/generateMetadata';
import { generateCollectionPageJsonLd } from '@/utils/generateJsonLd';

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

  // Generate JSON-LD for projects collection
  const collectionJsonLd = generateCollectionPageJsonLd(
    projects.map((project: any) => ({
      name: project.title,
      description: project.subtitle,
      url: `https://lucasoliveira.io/project/${project.overview.projectId}`,
      image: project.image?.asset?.url,
      author: {
        name: "Lucas Oliveira",
        jobTitle: "Frontend Developer & Creative Web Designer",
        url: "https://lucasoliveira.io",
      }
    }))
  );

  return (
    <>
      {/* JSON-LD Structured Data for Projects Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <ProjectsClient works={works} projects={projects} />
    </>
  );
}
