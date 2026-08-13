"use client"

import { useState, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"

import style from "@/styles/homepage/works.module.scss"
import { WORKS } from "@/utils/contants"

// Strip has 4 fixed slots (CSS geometry), WORKS carries 3 images per project —
// cycle them with index % length instead of storing a 4th duplicate.
const STRIP_SLOTS = 4

const WorksSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleDesktopRowClick = (index: number) => () => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={style.section} id="works" data-section="Works" aria-labelledby="works-title">
      <h2 id="works-title" className={style.title}>Curated works</h2>

      <div className={style.worksTable}>
        <div className={style.head} aria-hidden="true">
          <span className={style.name}>Project name</span>
          <span className={style.type}>Type</span>
          <span className={style.client}>Client</span>
          <span className={style.role}>Role</span>
          <span className={style.year}>Year</span>
        </div>

        <ul className={style.list}>
          {WORKS.map((project, index) => (
            <li
              key={project.slug}
              style={{ "--i": index } as CSSProperties}
              className={openIndex === index ? style.rowOpen : ""}
            >
              <button
                type="button"
                className={`${style.row} ${style.desktopRow}`}
                aria-expanded={openIndex === index}
                aria-controls={`strip-${project.slug}`}
                onClick={handleDesktopRowClick(index)}
              >
                <span className={style.name}>{project.name}</span>
                <span className={style.type}>{project.type}</span>
                <span className={style.client}>{project.client}</span>
                <span className={style.role}>{project.role}</span>
                <span className={style.year}>{project.year}</span>
              </button>

              {/* ponytail: eager-loaded — inside a height:0 box, lazy loading would
                never fire until hover. Revisit when real per-project images land:
                switch to lazy + a mouseenter preload. */}
              <span className={style.strip} id={`strip-${project.slug}`}>
                <Link href={`/project/${project.slug}`} className={style.goToProjectButton}>View project</Link>
                {Array.from({ length: STRIP_SLOTS }, (_, index) => (
                  <span className={style.slot} key={index}>
                    <Image
                      src={project.images[index % project.images.length]}
                      alt=""
                      fill
                      sizes="320px"
                      draggable={false}
                      loading="eager"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                ))}
              </span>
              <Link href={`/project/${project.slug}`} className={`${style.row} ${style.mobileRow}`}>
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
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WorksSection
