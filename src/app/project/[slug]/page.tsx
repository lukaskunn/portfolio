import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import style from "@/styles/project/project.module.scss"
import { WORKS } from "@/utils/contants"
import { buildMetadata, truncate } from "@/utils/metadata"
import ProjectGallery from "./ProjectGallery"

export async function generateStaticParams() {
  return WORKS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<"/project/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const project = WORKS.find((work) => work.slug === slug)

  if (!project) return buildMetadata({ title: "Project", path: `/project/${slug}` })

  return buildMetadata({
    title: project.name,
    description: truncate(project.description[0]),
    path: `/project/${slug}`,
    type: "article",
  })
}

export default async function ProjectPage({ params }: PageProps<"/project/[slug]">) {
  const { slug } = await params
  const index = WORKS.findIndex((work) => work.slug === slug)

  if (index === -1) notFound()

  const project = WORKS[index]
  const next = WORKS[(index + 1) % WORKS.length]

  const details = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Type", value: project.type },
    { label: "Industry", value: project.industry },
  ] as const

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

              <div className={style.detailsGroup} data-reveal-group data-reveal-now>
                {details.map(({ label, value }) => (
                  <div key={label} className={style.row}>
                    <span className={style.label}>{label}</span>
                    <span className={style.value}>{value}</span>
                  </div>
                ))}
                <div className={style.row}>
                  <span className={style.label}>Technologies</span>
                  <span className={`${style.value} ${style.technologies}`}>
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </span>
                </div>
              </div>


              <div className={style.mobileImage} data-reveal="curtain" data-reveal-now>
                <Image
                  src={leadImage}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="100vw"
                  loading="eager"
                />
              </div>

              <div className={`${style.row} ${style.rowDescription}`}>
                <span className={style.label} data-reveal="up" data-reveal-now>Description</span>
                <div className={`${style.value} ${style.description}`}>
                  {project.description.map((paragraph, index) => (
                    <p key={index} className={style.descriptionBody} data-reveal="lines" data-reveal-now>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {restImages.map((src, index) => (
                <div key={index} className={style.mobileImage} data-reveal="curtain" data-reveal-now>
                  <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="100vw" />
                </div>
              ))}
            </div>

            <div className={style.nav} data-reveal-group data-reveal-now>
              <Link href="/#works" transitionTypes={["nav-reveal"]} className={style.navLink}>← Return</Link>
              <Link href={`/project/${next.slug}`} className={style.navLink}>Next Project →</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
