"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import style from "@/styles/components/ProjectGallery.module.scss"

export interface ProjectGalleryImage {
  url: string
  alt: string
}

export interface ProjectGalleryProps {
  images: ProjectGalleryImage[]
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
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
        {[...images, ...images].map((image, index) => (
          <div key={index} className={style.trackImage} aria-hidden={index >= images.length}>
            <Image
              src={image.url}
              alt={index < images.length ? image.alt : ""}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1023.98px) 45vw, 668px"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectGallery
