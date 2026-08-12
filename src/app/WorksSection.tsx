"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import style from "@/styles/homepage/works.module.scss"
import { WORKS } from "@/utils/contants"

// Strip has 4 fixed slots (CSS geometry), WORKS carries 3 images per project —
// cycle them with index % length instead of storing a 4th duplicate.
const STRIP_SLOTS = 4

const WorksSection = () => {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (min-width: 1024px)",
      () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>(`.${style.row}`, root.current)
          .flatMap((row) => {
            const strip = row.querySelector<HTMLElement>(`.${style.strip}`)
            if (!strip) return []

            const tween = gsap.fromTo(
              strip,
              { height: 0 },
              { height: "auto", duration: 0.45, ease: "power2.out", paused: true }
            )

            const enter = () => {
              tween.invalidate()
              tween.play()
            }
            const leave = () => tween.reverse()
            row.addEventListener("mouseenter", enter)
            row.addEventListener("focus", enter)
            row.addEventListener("mouseleave", leave)
            row.addEventListener("blur", leave)

            return [
              () => {
                row.removeEventListener("mouseenter", enter)
                row.removeEventListener("focus", enter)
                row.removeEventListener("mouseleave", leave)
                row.removeEventListener("blur", leave)
              },
            ]
          })

        return () => cleanups.forEach((fn) => fn())
      }
    )
  }, { scope: root })

  return (
    <section className={style.section} id="works" data-section="Works" aria-labelledby="works-title" ref={root}>
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
          {WORKS.map((project) => (
            <li key={project.slug}>
              <Link href={`/project/${project.slug}`} className={`${style.row} ${style.desktopRow}`}>
                <span className={style.name}>{project.name}</span>
                <span className={style.type}>{project.type}</span>
                <span className={style.client}>{project.client}</span>
                <span className={style.role}>{project.role}</span>
                <span className={style.year}>{project.year}</span>

                {/* ponytail: eager-loaded — inside a height:0 box, lazy loading would
                  never fire until hover. Revisit when real per-project images land:
                  switch to lazy + a mouseenter preload. */}
                <span className={style.strip} aria-hidden="true">
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
              </Link>
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
