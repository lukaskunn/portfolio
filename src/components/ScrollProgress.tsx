"use client"

import { useEffect, useRef, useState } from "react"
import { docTop, progressAt } from "@/utils/scrollProgress"
import style from "@/styles/components/ScrollProgress.module.scss"

type Section = { el: HTMLElement; id: string; label: string; top: number; height: number; weight: number }

const IDLE_MS = 2000

export interface ScrollProgressProps {
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
          top: docTop(el),
          height: el.offsetHeight,
          weight: el.offsetHeight * (Number(el.dataset.progressWeight) || 1),
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
      const LOOKAHEAD = 0.4 // ponytail: timing knob — 1 = old behaviour, 0 = strict viewport top
      const playhead =
        maxScroll > 0 ? scrollY + window.innerHeight * LOOKAHEAD * (scrollY / maxScroll) : scrollY

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
          <li key={section.id} className={style.item} style={{ flexGrow: section.weight }}>
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
