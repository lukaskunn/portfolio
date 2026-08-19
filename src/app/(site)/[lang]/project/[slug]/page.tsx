import type { Metadata } from "next"
import { notFound } from "next/navigation"
import style from "@/styles/project/project.module.scss"
import { WORKS } from "@/utils/contants"
import { LOCALES, langFromPathname } from "@/utils/locale"
import { buildMetadata, truncate } from "@/utils/metadata"
import ProjectDescription from "@/components/ProjectDescription"
import ProjectDetails from "@/components/ProjectDetails"
import ProjectGallery from "@/components/ProjectGallery"
import ProjectMobileImage from "@/components/ProjectMobileImage"
import ProjectNav from "@/components/ProjectNav"

export async function generateStaticParams() {
  return LOCALES.flatMap((lang) => WORKS.map(({ slug }) => ({ lang, slug })))
}

export async function generateMetadata({ params }: PageProps<"/[lang]/project/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  const project = WORKS.find((work) => work.slug === slug)

  if (!project) return buildMetadata({ title: "Project", path: `/${lang}/project/${slug}` })

  return buildMetadata({
    title: project.name,
    description: truncate(project.description[0]),
    path: `/${lang}/project/${slug}`,
    type: "article",
  })
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/project/[slug]">) {
  const { lang, slug } = await params
  const index = WORKS.findIndex((work) => work.slug === slug)

  if (index === -1) notFound()

  const project = WORKS[index]
  const next = WORKS[(index + 1) % WORKS.length]

  const [leadImage, ...restImages] = project.images

  return (
    <>
      <main id="main-content" className={`${style.page} projectPage`}>
        <div className={style.headerSpace} aria-hidden="true" />
        <div className={style.split}>
          <ProjectGallery images={project.images} alt={project.name} />

          <div className={style.content}>
            <div className={style.projectInformation}>
              <h1 className={style.title} data-reveal="lines" data-reveal-now>{project.name}</h1>

              <ProjectDetails project={project} />


              <ProjectMobileImage src={leadImage} loading="eager" />

              <ProjectDescription paragraphs={project.description} />

              {restImages.map((src, index) => (
                <ProjectMobileImage key={index} src={src} />
              ))}
            </div>

            <ProjectNav nextSlug={next.slug} lang={langFromPathname(`/${lang}`)} />
          </div>
        </div>
      </main>
    </>
  )
}
