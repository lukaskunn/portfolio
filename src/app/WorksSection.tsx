"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import style from "@/styles/homepage/works.module.scss"

// Shared placeholder art — one project's real photos, alternating across the
// four strip slots. Slot geometry (size/position) lives in CSS, not here.
const IMAGE_A = "https://res.cloudinary.com/dpk0cuwnf/image/upload/v1783909595/IMG_5521_nultho.jpg"
const IMAGE_B = "https://res.cloudinary.com/dpk0cuwnf/image/upload/v1783909609/IMG_5534_wrstqs.jpg"

type Project = {
  slug: string
  name: string
  type: string
  client: string
  role: string
  year: string
  images: readonly string[]
}

const PROJECTS: readonly Project[] = [
  {
    slug: "casa-dexco",
    name: "Casa dexco",
    type: "Institutional",
    client: "DEXCO",
    role: "DEVELOPMENT",
    year: "2025",
    images: [IMAGE_A, IMAGE_B, IMAGE_A, IMAGE_B],
  },
  {
    slug: "dexco-store",
    name: "Dexco Store",
    type: "E-commerce",
    client: "DEXCO",
    role: "DEVELOPMENT",
    year: "2025",
    images: [IMAGE_A, IMAGE_B, IMAGE_A, IMAGE_B],
  },
  {
    slug: "motoverse",
    name: "Motoverse",
    type: "Institutional",
    client: "Motorola",
    role: "DEVELOPMENT",
    year: "2024",
    images: [IMAGE_A, IMAGE_B, IMAGE_A, IMAGE_B],
  },
  {
    slug: "motorola-store",
    name: "Motorola Store",
    type: "E-commerce",
    client: "Motorola",
    role: "DEVELOPMENT",
    year: "2024",
    images: [IMAGE_A, IMAGE_B, IMAGE_A, IMAGE_B],
  },
  {
    slug: "my-stuff",
    name: "My Stuff",
    type: "Playground",
    client: "Personal",
    role: "DEVELOPMENT / DESIGN",
    year: "2026",
    images: [IMAGE_A, IMAGE_B, IMAGE_A, IMAGE_B],
  },
] as const

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
    <section className={style.section} id="works" aria-labelledby="works-title" ref={root}>
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
          {PROJECTS.map((project) => (
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
                  {project.images.map((src, index) => (
                    <span className={style.slot} key={index}>
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
