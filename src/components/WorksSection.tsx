"use client"

import { useState, type CSSProperties, type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"

import style from "@/styles/components/WorksSection.module.scss"
import { useLocale } from "@/hooks/useLocale"
import { imageUrl } from "@/sanity/image"
import type { FieldLabels, ProjectListItem } from "@/types/content"

export interface WorksSectionProps {
  title: string
  sectionLabel: string
  labels: FieldLabels
  viewProjectLabel: string
  expandRowLabel: string
  collapseRowLabel: string
  projects: ProjectListItem[]
}

// Strip has 4 fixed slots (CSS geometry) — cycle project images with
// index % length instead of requiring exactly 4 per project.
const STRIP_SLOTS = 4

const WorksSection = ({
  title,
  sectionLabel,
  labels,
  viewProjectLabel,
  expandRowLabel,
  collapseRowLabel,
  projects,
}: WorksSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const lang = useLocale()

  const handleDesktopRowClick = (index: number) => () => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Origin = the row edge the pointer is nearest, so the plate always grows/retreats
  // toward the cursor. mouseenter fires at a row boundary, so the leave of one row
  // and the enter of the next read as one black band being handed over.
  const setWipeOrigin = (e: MouseEvent<HTMLButtonElement>) => {
    const { top, height } = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--wipe-origin", e.clientY - top < height / 2 ? "top" : "bottom")
  }

  return (
    <section className={style.section} id="works" data-section={sectionLabel} aria-labelledby="works-title">
      <h2 id="works-title" className={style.title} data-reveal="lines">{title}</h2>

      <div className={style.worksTable}>
        <div className={style.head} aria-hidden="true" data-reveal="up">
          <span className={style.name}>{labels.projectName}</span>
          <span className={style.type}>{labels.type}</span>
          <span className={style.client}>{labels.client}</span>
          <span className={style.role}>{labels.role}</span>
          <span className={style.year}>{labels.year}</span>
        </div>

        <ul className={style.list} data-reveal="spread">
          {projects.map((project, index) => {
            const images = project.images ?? []

            const rowPopupLabel = openIndex === index ? collapseRowLabel : expandRowLabel

            return (
              <li
                key={project.slug}
                style={{
                  "--i": index,
                  "--shift": openIndex !== null && index > openIndex ? 1 : 0,
                } as CSSProperties}
                className={openIndex === index ? style.rowOpen : ""}
              >
                <button
                  type="button"
                  className={`${style.row} ${style.desktopRow}`}
                  aria-expanded={openIndex === index}
                  aria-controls={`strip-${project.slug}`}
                  data-cursor-popup={rowPopupLabel}
                  onClick={handleDesktopRowClick(index)}
                  onMouseEnter={setWipeOrigin}
                  onMouseLeave={setWipeOrigin}
                >
                  <span className={style.name}>{project.name}</span>
                  <span className={style.type}>{project.type}</span>
                  <span className={style.client}>{project.client}</span>
                  <span className={style.role}>{project.role}</span>
                  <span className={style.year}>{project.year}</span>
                </button>

                <span className={style.strip} id={`strip-${project.slug}`}>
                  <Link href={`/${lang}/project/${project.slug}`} className={style.goToProjectButton}>{viewProjectLabel}</Link>
                  {images.length > 0 &&
                    Array.from({ length: STRIP_SLOTS }, (_, slotIndex) => {
                      const image = images[slotIndex % images.length]
                      const src = imageUrl(image, 320)
                      if (!src) return null

                      return (
                        <span className={style.slot} key={slotIndex}>
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="320px"
                            draggable={false}
                            loading="eager"
                            style={{ objectFit: "cover" }}
                          />
                        </span>
                      )
                    })}
                </span>
                <Link
                  href={`/${lang}/project/${project.slug}`}
                  className={`${style.row} ${style.mobileRow}`}
                  data-reveal-rule
                >
                  <div className={style.rowTop}>
                    <span className={style.name}>{project.name}</span>
                    <span className={style.year}>{project.year}</span>

                  </div>
                  <div className={style.rowBottom}>
                    <span className={style.type}>{project.type}</span>
                    <div className={style.separator} />
                    <span className={style.client}>{project.client}</span>
                    <div className={style.separator} />
                    <span className={style.role}>{project.role}</span>
                  </div>
                </Link>

              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default WorksSection
