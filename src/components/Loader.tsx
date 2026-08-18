"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import ImageTrail from "@/components/ImageTrail"
import styles from "@/styles/components/Loader.module.scss"

// ponytail: rhythm/length knob — leaps 2.07s + holds 3.66s = 5.73s, + 0.9s exit ≈ 6.6s
const STEPS = [
  { to: 14, leap: 0.3, hold: 0.62 },
  { to: 22, leap: 0.18, hold: 0.4 },
  { to: 41, leap: 0.35, hold: 0.75 },
  { to: 47, leap: 0.16, hold: 0.28 },
  { to: 68, leap: 0.4, hold: 0.66 },
  { to: 83, leap: 0.26, hold: 0.45 },
  { to: 91, leap: 0.2, hold: 0.3 },
  { to: 99, leap: 0.22, hold: 0.2 },
]

const EXIT_DURATION = 0.9
const EXIT_EASE = "power4.inOut" // GSAP approximation of $ease-slide (CSS-only token)
const BAR_EASE = "power2.inOut"

// Module scope so it survives StrictMode's synthetic remount in dev: only a run
// that actually finished may clear `data-intro`, otherwise the second mount
// finds the signal gone and skips the intro.
let completed = false

const Loader = () => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [playing, setPlaying] = useState(false)
  const [done, setDone] = useState(false)

  useGSAP(() => {
    const overlay = overlayRef.current
    const counter = counterRef.current
    if (!overlay || !counter) return
    if (document.documentElement.dataset.intro !== "playing") return

    setPlaying(true)

    // ponytail: two proxies, not one — a stepped tween can't also glide, so the
    // counter (stepped) and bar (smooth) each get their own, orientation stays
    // in CSS via --p.
    const proxy = { value: 0 }
    const bar = { value: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        completed = true
        delete document.documentElement.dataset.intro
        setDone(true)
      },
    })

    let from = 0
    STEPS.forEach(({ to, leap, hold }) => {
      tl.to(proxy, {
        value: to,
        duration: leap,
        ease: `steps(${to - from})`,
        onUpdate: () => {
          counter.textContent = String(Math.round(proxy.value)).padStart(2, "0")
        },
      })
      tl.to(
        bar,
        {
          value: to / 100,
          duration: leap,
          ease: BAR_EASE,
          onUpdate: () => overlay.style.setProperty("--p", bar.value.toFixed(4)),
        },
        "<",
      )
      tl.to({}, { duration: hold })
      from = to
    })

    tl.to(overlay, { yPercent: -100, duration: EXIT_DURATION, ease: EXIT_EASE })

    // useGSAP reverts the timeline itself, so a remount replays from 0.
    return () => {
      if (completed) delete document.documentElement.dataset.intro
    }
  }, [])

  // if (done) return null

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.fill} />
        <span className={styles.rider}>
          <span ref={counterRef} className={styles.counter}>
            00
          </span>
        </span>
      </div>
      {playing && <ImageTrail />}
    </div>
  )
}

export default Loader
