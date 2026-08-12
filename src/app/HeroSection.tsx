"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import LocalTime from "@/components/LocalTime"
import style from "@/styles/homepage/hero.module.scss"



// Chip slots, in visual order: red (line 2) / pink (line 3) / yellow (line 5).
// Swap or reorder these three URLs to change which photo lands in which slot.
const CHIP_IMAGES = [
  "https://res.cloudinary.com/dpk0cuwnf/image/upload/v1783909595/IMG_5521_nultho.jpg",
  "https://res.cloudinary.com/dpk0cuwnf/image/upload/v1783909609/IMG_5534_wrstqs.jpg",
  "https://res.cloudinary.com/dpk0cuwnf/image/upload/v1783909609/IMG_5550_eovgrg.jpg",
] as const

const RED = { src: CHIP_IMAGES[0], color: "#d90d0d" }
const PINK = { src: CHIP_IMAGES[1], color: "#f5b8c2" }
const YELLOW = { src: CHIP_IMAGES[2], color: "#fad40d" }

const BR = "BR" as const

type Chip = { src: string; color: string }
type Token = string | Chip | typeof BR

const isChip = (token: Token): token is Chip => typeof token === "object"

const LINES: Token[][] = [
  ["WEB DEVELOPER"],
  ["BASED IN", RED, "SÃO", BR, "PAULO"],
  ["MIXING", PINK, BR, "CREATIVITY"],
  ["AND", BR, "ENGINEERING", BR, "INTO"],
  ["AWESOME", YELLOW, BR, "EXPERIENCES"],
]

const HeroSection = () => {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>(`.${style.line}`, root.current)
          .flatMap((line) => {
            const chip = line.querySelector<HTMLElement>(`.${style.chip}`)
            if (!chip) return []

            const tween = gsap.fromTo(
              chip,
              {
                width: 0,
                marginLeft: gsap.getProperty(chip, "marginLeft"),
                marginRight: gsap.getProperty(chip, "marginRight"),
              },
              {
                width: "auto",
                marginLeft: 0,
                marginRight: 0,
                duration: 0.45,
                ease: "power3.out",
                paused: true,
              }
            )

            const enter = () => {
              tween.invalidate()
              tween.play()
            }
            const leave = () => tween.reverse()
            line.addEventListener("mouseenter", enter)
            line.addEventListener("mouseleave", leave)

            return [
              () => {
                line.removeEventListener("mouseenter", enter)
                line.removeEventListener("mouseleave", leave)
              },
            ]
          })

        return () => cleanups.forEach((fn) => fn())
      }
    )
  }, { scope: root })

  return (
    <section className={style.hero} id="intro" data-section="Intro" ref={root}>
      <div className={style.headerHeight} />
      <h1
        className={style.title}
        aria-label="Web developer based in São Paulo mixing creativity and engineering into awesome experiences"
      >
        {LINES.map((line, lineIndex) => (
          <span className={style.line} key={lineIndex}>
            {line.map((token, tokenIndex) => {
              if (token === BR) {
                return <span className={style.break} key={tokenIndex} aria-hidden="true" />
              }

              if (isChip(token)) {
                return (
                  <span
                    className={style.chip}
                    style={{ background: token.color }}
                    aria-hidden="true"
                    key={tokenIndex}
                  >
                    <span className={style.chipMedia}>
                      <Image
                        src={token.src}
                        alt=""
                        fill
                        sizes="(max-width: 767.98px) 54px, (max-width: 1023.98px) 82px, 107px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </span>
                  </span>
                )
              }

              return <span key={tokenIndex}>{token}</span>
            })}
          </span>
        ))}
      </h1>
      <div className={style.meta}>
        <div className={style.metaCol}>
          <span>/ São Paulo /  <LocalTime /></span>
          <span>/ Currently Front end developer @ WPPCommerce</span>
        </div>
        <div className={style.metaCol}>
          <span>UI/UX DESIGNER /</span>
          <span>WEB DEVELOPER /</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
