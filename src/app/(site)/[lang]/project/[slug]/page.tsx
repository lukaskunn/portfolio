import type { Metadata } from "next"
import { notFound } from "next/navigation"
import style from "@/styles/project/project.module.scss"
import { LOCALES, langFromPathname } from "@/utils/locale"
import { buildMetadata } from "@/utils/metadata"
import { sanityFetch } from "@/sanity/client"
import { imageUrl } from "@/sanity/image"
import { projectBySlugQuery, projectSlugsQuery, projectNavItemsQuery, projectPageQuery, settingsQuery } from "@/sanity/queries"
import type { ProjectDetail, ProjectNavItem, ProjectPageLabels, Settings } from "@/types/content"
import ProjectDescription from "@/components/ProjectDescription"
import ProjectDetails from "@/components/ProjectDetails"
import ProjectGallery from "@/components/ProjectGallery"
import ProjectMobileImage from "@/components/ProjectMobileImage"
import ProjectNav from "@/components/ProjectNav"

export async function generateStaticParams() {
  const slugs = (await sanityFetch<string[]>(projectSlugsQuery)) ?? []
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: PageProps<"/[lang]/project/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  const project = await sanityFetch<ProjectDetail | null>(projectBySlugQuery, { lang, slug })

  if (!project) return buildMetadata({ title: "Project", path: `/${lang}/project/${slug}` })

  return buildMetadata({
    seo: project.seo,
    title: project.name,
    path: `/${lang}/project/${slug}`,
    type: "article",
  })
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/project/[slug]">) {
  const { lang, slug } = await params

  const [project, navItems, projectPage, settings] = await Promise.all([
    sanityFetch<ProjectDetail | null>(projectBySlugQuery, { lang, slug }),
    sanityFetch<ProjectNavItem[]>(projectNavItemsQuery),
    sanityFetch<ProjectPageLabels | null>(projectPageQuery, { lang }),
    sanityFetch<Settings | null>(settingsQuery, { lang }),
  ])

  if (!project) notFound()

  const index = navItems.findIndex((item) => item.slug === slug)
  const nextItem = index === -1 ? undefined : navItems[(index + 1) % navItems.length]
  const nextSlug = nextItem?.slug ?? slug

  const images = (project.images ?? []).map((image) => ({
    url: imageUrl(image, 700),
    alt: image.alt ?? "",
  }))
  const galleryImages = images.filter((image): image is { url: string; alt: string } => !!image.url)
  const [leadImage, ...restImages] = galleryImages

  return (
    <>
      <main id="main-content" className={`${style.page} projectPage`}>
        <div className={style.headerSpace} aria-hidden="true" />
        <div className={style.split}>
          <ProjectGallery images={galleryImages} />

          <div className={style.content}>
            <div className={style.projectInformation}>
              <h1 className={style.title} data-reveal="lines" data-reveal-now>{project.name}</h1>

              <ProjectDetails project={project} labels={settings?.fieldLabels ?? {}} />

              {leadImage && <ProjectMobileImage url={leadImage.url} alt={leadImage.alt} loading="eager" />}

              <ProjectDescription value={project.description} label={settings?.fieldLabels?.description ?? ""} />

              {restImages.map((image, index) => (
                <ProjectMobileImage key={index} url={image.url} alt={image.alt} />
              ))}
            </div>

            <ProjectNav
              nextSlug={nextSlug}
              nextName={nextItem?.name}
              lang={langFromPathname(`/${lang}`)}
              backLabel={projectPage?.backLabel}
              nextLabel={projectPage?.nextLabel}
            />
          </div>
        </div>
      </main>
    </>
  )
}
