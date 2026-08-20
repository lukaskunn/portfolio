"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import LocalTime from "@/components/LocalTime"
import RollText from "@/components/RollText"
import { useHoverAnimation } from "@/hooks/useHoverAnimation"
import { parseHeroTitle, heroAriaLabel } from "@/utils/heroTitle"
import style from "@/styles/components/HeroSection.module.scss"

export interface HeroChip {
  url?: string
  alt?: string
}

export interface HeroSectionProps {
  title: string
  chips: HeroChip[]
  sectionLabel: string
  locationLabel: string
  currentRole: string
  roles: string[]
  timeZone: string
}

const HeroSection = ({ title, chips, sectionLabel, locationLabel, currentRole, roles, timeZone }: HeroSectionProps) => {
  const root = useRef<HTMLElement>(null)
  const lines = parseHeroTitle(title)
  const ariaLabel = heroAriaLabel(title)

  useHoverAnimation(root, `.${style.line}`, (line) => {
    const chip = line.querySelector<HTMLElement>(`.${style.chip}`)
    if (!chip) return null

    return gsap.fromTo(
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
        duration: 0.4,
        ease: "power3.out",
        paused: true,
      }
    )
  })

  return (
    <section className={style.hero} id="intro" data-section={sectionLabel} data-progress-weight="0.5" ref={root}>
      <div className={style.headerHeight} />
      <h1
        className={style.title}
        data-reveal="lines-static"
        data-reveal-now
        aria-label={ariaLabel}
      >
        {lines.map((line, lineIndex) => (
          <span className={style.line} key={lineIndex}>
            <span className={style.lineInner}>
              {line.map((token, tokenIndex) => {
                if (token.type === "break") {
                  return <span className={style.break} key={tokenIndex} aria-hidden="true" />
                }

                if (token.type === "chip") {
                  const chip = chips[token.index - 1]
                  // No image means no flex item at all — an empty chip would
                  // sit between two gaps and double the space between words.
                  if (!chip?.url) return null

                  return (
                    <span
                      className={style.chip}
                      aria-hidden="true"
                      key={tokenIndex}
                    >
                      <span className={style.chipMedia}>
                        <Image
                          src={chip.url}
                          alt=""
                          fill
                          sizes="(max-width: 767.98px) 54px, (max-width: 1023.98px) 82px, 107px"
                          style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                      </span>
                    </span>
                  )
                }

                return <span key={tokenIndex}>{token.value}</span>
              })}
            </span>
          </span>
        ))}
      </h1>
      <div className={style.meta}>
        <div className={style.metaCol} data-reveal="rise" data-reveal-now>
          <span><span><RollText>{`/ ${locationLabel} / `}</RollText> <LocalTime timeZone={timeZone} /></span></span>
          <span><span><RollText duration={0.2} stagger={0.009}>{`/ ${currentRole}`}</RollText></span></span>
        </div>
        <div className={style.metaCol} data-reveal="rise" data-reveal-now>
          {roles.map((role, index) => (
            <span key={index}>
              <span className={style.role}>
                <RollText>{role}</RollText>
                <span className={style.slash} aria-hidden="true">/</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
