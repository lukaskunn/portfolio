import type { Metadata } from "next"
import { notFound } from "next/navigation"
import style from "@/styles/project/project.module.scss"
import { LOCALES, HREFLANG, langFromPathname } from "@/utils/locale"
import { buildMetadata } from "@/utils/metadata"
import { sanityFetch } from "@/sanity/client"
import { imageUrl } from "@/sanity/image"
import { projectBySlugQuery, projectSlugsQuery, projectNavItemsQuery, projectPageQuery, settingsQuery } from "@/sanity/queries"
import type { ProjectDetail, ProjectImage, ProjectNavItem, ProjectPageLabels, Settings } from "@/types/content"
import ProjectDescription from "@/components/ProjectDescription"
import ProjectDetails from "@/components/ProjectDetails"
import ProjectGallery from "@/components/ProjectGallery"
import ProjectMobileImage from "@/components/ProjectMobileImage"
import ProjectNav from "@/components/ProjectNav"
import { ProjectLightboxProvider } from "@/components/ProjectLightbox"
import JsonLd from "@/components/JsonLd"
import { SITE_URL, PERSON_ID } from "@/utils/contants"

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

  const images = (project.images ?? []).flatMap((image) => {
    const url = imageUrl(image, 700)
    const fullUrl = imageUrl(image, 1920)
    const dimensions = image.asset?.metadata?.dimensions
    if (!url || !fullUrl || !dimensions) return []
    return [{ url, fullUrl, alt: image.alt ?? "", width: dimensions.width, height: dimensions.height }]
  }) satisfies ProjectImage[]
  const [leadImage, ...restImages] = images

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/${lang}/project/${slug}#work`,
        name: project.name,
        url: `${SITE_URL}/${lang}/project/${slug}`,
        inLanguage: HREFLANG[langFromPathname(`/${lang}`)],
        ...(project.seo?.metaDescription && { description: project.seo.metaDescription }),
        ...(images.length && { image: images.map((image) => image.fullUrl) }),
        ...(project.technologies?.length && { keywords: project.technologies.join(", ") }),
        genre: project.type,
        about: project.industry,
        creator: { "@id": PERSON_ID },
        ...(/^\d{4}$/.test(project.year) && { datePublished: project.year }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: project.name, item: `${SITE_URL}/${lang}/project/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <main id="main-content" className={`${style.page} projectPage`}>
        <div className={style.headerSpace} aria-hidden="true" />
        <ProjectLightboxProvider closeImageLabel={projectPage?.closeImageLabel}>
          <div className={style.split}>
            <ProjectGallery images={images} openImageLabel={projectPage?.openImageLabel} />

            <div className={style.content}>
              <div className={style.projectInformation}>
                <h1 className={style.title} data-reveal="lines" data-reveal-now>{project.name}</h1>

                <ProjectDetails project={project} labels={settings?.fieldLabels ?? {}} liveLinkLabel={settings?.viewLiveProjectLabel} />

                {leadImage && (
                  <ProjectMobileImage image={leadImage} revealIndex={0} loading="eager" openImageLabel={projectPage?.openImageLabel} />
                )}

                <ProjectDescription value={project.description} label={settings?.fieldLabels?.description ?? ""} />

                {restImages.map((image, index) => (
                  <ProjectMobileImage
                    key={index}
                    image={image}
                    revealIndex={index + 1}
                    openImageLabel={projectPage?.openImageLabel}
                  />
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
        </ProjectLightboxProvider>
      </main>
    </>
  )
}
