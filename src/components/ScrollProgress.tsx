"use client"

import { useEffect, useRef, useState } from "react"
import style from "@/styles/components/ScrollProgress.module.scss"

type Section = { el: HTMLElement; id: string; label: string; top: number; height: number }

const IDLE_MS = 2000

export const progressAt = (
  playhead: number,
  sections: Pick<Section, "top" | "height">[]
): number => {
  const clamp = (value: number) => Math.min(1, Math.max(0, value))
  const progresses = sections.map(({ top, height }) =>
    height > 0 ? clamp((playhead - top) / height) : 0
  )
  const activeIndex = progresses.findIndex((p) => p < 1)
  return activeIndex === -1 ? progresses.length - 1 : activeIndex
}

type ScrollProgressProps = {
  alwaysShowLabel?: boolean
}

const ScrollProgress = ({ alwaysShowLabel = true }: ScrollProgressProps) => {
  const [sections, setSections] = useState<Section[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const measure = () => {
      const els = document.querySelectorAll<HTMLElement>("#main-content [data-section]")
      setSections(
        Array.from(els).map((el) => ({
          el,
          id: el.id,
          label: el.dataset.section ?? "",
          top: el.offsetTop,
          height: el.offsetHeight,
        }))
      )
    }

    measure()

    const main = document.getElementById("main-content")
    const observer = main ? new ResizeObserver(measure) : null
    if (main && observer) observer.observe(main)

    return () => observer?.disconnect()
  }, [])

  useEffect(() => {
    if (sections.length === 0) return

    let idle: ReturnType<typeof setTimeout>

    const onScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const playhead = maxScroll > 0 ? scrollY + window.innerHeight * (scrollY / maxScroll) : 0

      sections.forEach((section, index) => {
        const p =
          section.height > 0
            ? Math.min(1, Math.max(0, (playhead - section.top) / section.height))
            : 0
        const link = linkRefs.current[index]
        if (link) link.style.setProperty("--p", String(p))
      })

      setActiveIndex(progressAt(playhead, sections))

      if (scrollY > 200) {
        setVisible(true)
        clearTimeout(idle)
        idle = setTimeout(() => setVisible(false), IDLE_MS)
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(idle)
    }
  }, [sections])

  if (sections.length === 0) return null

  return (
    <nav
      aria-label="Page sections"
      className={`${style.rail} ${visible ? style.visible : ""} ${
        alwaysShowLabel ? style.persistentLabel : ""
      }`}
    >
      <ul className={style.list}>
        {sections.map((section, index) => (
          <li key={section.id} className={style.item} style={{ flexGrow: section.height }}>
            <a
              href={`#${section.id}`}
              className={style.link}
              aria-current={activeIndex === index ? "true" : undefined}
              ref={(el) => {
                linkRefs.current[index] = el
              }}
            >
              <span className={style.label}>{section.label}</span>
              <span className={style.bar} aria-hidden="true">
                <span className={style.fill} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ScrollProgress
