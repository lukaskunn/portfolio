"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { useMousePosition } from "@/hooks/useMousePosition"
import styles from "@/styles/components/ImageTrail.module.scss"

const DEFAULT_IMAGES = [
  "/assets/images/services/strategy.jpg",
  "/assets/images/services/ui-ux-design.jpg",
  "/assets/images/services/development.jpg",
  "/assets/images/about/profile_image.jpg",
]

const SPAWN_DISTANCE = 140 // ponytail: trail density knob
const IMAGE_WIDTH = 240
const FOLLOW_DURATION = 0.5

// Lifespan shape: hold at full opacity, then fade only in the last FADE_TAIL of
// it — the `fadeOut` keyframes (0% / 80% / 100%) from the original component.
const LIFESPAN = 1.2
const FADE_TAIL = 0.2
const ENTRANCE_DURATION = 0.05

// ponytail: pool must outlast LIFESPAN at speed — ~14 spawns/s at 2000px/s means
// ~17 alive at once. Raise it if fast cursors visibly recycle a live image.
const POOL_SIZE = 20

export interface ImageTrailProps {
  images?: string[]
}

// Mounting this starts the ticker, so mount it only while the trail should run.
const ImageTrail = ({ images = DEFAULT_IMAGES }: ImageTrailProps) => {
  const poolRef = useRef<(HTMLImageElement | null)[]>([])
  const mouse = useMousePosition()

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const pool = poolRef.current.filter((el): el is HTMLImageElement => Boolean(el))
      if (!pool.length) return

      gsap.set(pool, { xPercent: -50, yPercent: -50 })

      const follow = (el: HTMLImageElement, prop: "x" | "y") =>
        gsap.quickTo(el, prop, { duration: FOLLOW_DURATION, ease: "power2.out" })

      const qx = pool.map((el) => follow(el, "x"))
      const qy = pool.map((el) => follow(el, "y"))

      let index = 0
      // Pool DOM order is fixed, so a recycled element would paint under older
      // siblings. Monotonic z-index keeps the newest on top without reordering
      // nodes React owns.
      let depth = 0
      let lastSpawn: { x: number; y: number } | null = null

      const spawn = (mx: number, my: number) => {
        const el = pool[index]
        // Recycling is a delete-and-respawn, not a hand-off: kill the whole
        // previous life, quickTo tween included, or the rebuilt setter would
        // glide the element in from where it used to be.
        gsap.killTweensOf(el)
        gsap.set(el, { x: mx, y: my, scale: 0.9, autoAlpha: 1, zIndex: ++depth })
        qx[index] = follow(el, "x")
        qy[index] = follow(el, "y")
        gsap.to(el, { scale: 1, duration: ENTRANCE_DURATION, ease: "power2.out" })
        gsap.to(el, {
          autoAlpha: 0,
          duration: LIFESPAN * FADE_TAIL,
          delay: LIFESPAN * (1 - FADE_TAIL),
          ease: "none",
        })
        index = (index + 1) % pool.length
      }

      const tick = () => {
        if (!mouse.current) return
        const { x: mx, y: my } = mouse.current

        if (!lastSpawn || Math.hypot(mx - lastSpawn.x, my - lastSpawn.y) >= SPAWN_DISTANCE) {
          lastSpawn = { x: mx, y: my }
          spawn(mx, my)
        }

        const activeIndex = (index - 1 + pool.length) % pool.length
        qx[activeIndex](mx)
        qy[activeIndex](my)
      }

      gsap.ticker.add(tick)

      return () => gsap.ticker.remove(tick)
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      {Array.from({ length: POOL_SIZE }, (_, i) => images[i % images.length]).map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- fixed decorative pool, no layout participation, GSAP-transformed
        <img
          key={i}
          ref={(el) => {
            poolRef.current[i] = el
          }}
          src={src}
          alt=""
          loading="eager"
          width={IMAGE_WIDTH}
          className={styles.trail}
        />
      ))}
    </>
  )
}

export default ImageTrail
