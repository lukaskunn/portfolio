"use client"

import { useRef, type CSSProperties } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { useProjectLightbox } from "@/components/ProjectLightbox"
import type { ProjectImage } from "@/types/content"
import style from "@/styles/components/ProjectGallery.module.scss"

export interface ProjectGalleryProps {
  images: ProjectImage[]
  openImageLabel?: string
}

const ProjectGallery = ({ images, openImageLabel }: ProjectGalleryProps) => {
  const openLightbox = useProjectLightbox()
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (images.length === 0) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current?.querySelector<HTMLElement>(`.${style.track}`)
      if (!track) return

      const tween = gsap.to(track, {
        yPercent: -50,
        duration: images.length * 8,
        ease: "none",
        repeat: -1,
      })

      const onEnter = () => {
        gsap.to(tween, { timeScale: 0, duration: 0.4, overwrite: true })
      }

      const onLeave = () => {
        gsap.to(tween, { timeScale: 1, duration: 0.4, overwrite: true })
      }

      const canHover = window.matchMedia("(hover: hover)").matches

      if (canHover) {
        root.current?.addEventListener("pointerenter", onEnter)
        root.current?.addEventListener("pointerleave", onLeave)
      }

      return () => {
        if (canHover) {
          root.current?.removeEventListener("pointerenter", onEnter)
          root.current?.removeEventListener("pointerleave", onLeave)
        }
        tween.kill()
      }
    })
  }, { scope: root, dependencies: [images.length] })

  return (
    <div ref={root} className={style.gallery}>
      <div className={style.track}>
        {[...images, ...images].map((image, index) => {
          const isDuplicate = index >= images.length

          return (
            <button
              key={index}
              type="button"
              className={style.trackImage}
              aria-hidden={isDuplicate}
              tabIndex={isDuplicate ? -1 : undefined}
              aria-label={openImageLabel}
              onClick={() => openLightbox(image)}
              data-reveal="wipe"
              data-reveal-now
              style={{ "--reveal-i": index % images.length } as CSSProperties}
            >
              <Image
                src={image.url}
                alt={isDuplicate ? "" : image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 1023.98px) 45vw, 668px"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectGallery
