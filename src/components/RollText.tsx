"use client"

// Single-line text only: per-char inline-block + `white-space: pre` means it
// cannot wrap. `children` must be a plain string.

import { useRef } from "react"
import gsap from "gsap"
import { useHoverAnimation } from "@/hooks/useHoverAnimation"
import style from "@/styles/components/RollText.module.scss"

export interface RollTextProps {
  children: string
  className?: string
  duration?: number
  stagger?: number
  ease?: string
  direction?: "up" | "down"
}

const RollText = ({
  children,
  className,
  duration = 0.4,
  stagger = 0.025,
  ease = "power3.inOut",
  direction = "up",
}: RollTextProps) => {
  const root = useRef<HTMLSpanElement>(null)
  const chars = [...children].map((char, index) => (
    <span className={style.char} key={index}>
      {char}
    </span>
  ))

  useHoverAnimation(
    root,
    `.${style.track}`,
    (track) => {
      const layers = gsap.utils.toArray<HTMLElement>(`.${style.layer}`, track)
      const [topLayer, bottomLayer] = layers
      if (!topLayer || !bottomLayer) return null

      const yPercent = direction === "up" ? -100 : 100

      return gsap
        .timeline({ paused: true })
        .to(topLayer.querySelectorAll(`.${style.char}`), { yPercent, duration, ease, stagger }, 0)
        .to(bottomLayer.querySelectorAll(`.${style.char}`), { yPercent, duration, ease, stagger }, 0)
    },
    { resetOnLeave: true }
  )

  return (
    <span ref={root} className={className ? `${style.clip} ${className}` : style.clip}>
      <span className={style.track}>
        <span className={style.layer}>{chars}</span>
        <span
          className={`${style.layer} ${style.copy}`}
          style={{ transform: `translateY(${direction === "up" ? 100 : -100}%)` }}
          aria-hidden="true"
        >
          {chars}
        </span>
      </span>
    </span>
  )
}

export default RollText
