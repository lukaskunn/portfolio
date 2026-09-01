"use client"

import type { CSSProperties } from "react"
import Image from "next/image"
import { useProjectLightbox } from "@/components/ProjectLightbox"
import type { ProjectImage } from "@/types/content"
import style from "@/styles/components/ProjectMobileImage.module.scss"

export interface ProjectMobileImageProps {
  image?: ProjectImage
  revealIndex?: number
  loading?: "eager" | "lazy"
  openImageLabel?: string
}

const ProjectMobileImage = ({ image, revealIndex, loading, openImageLabel }: ProjectMobileImageProps) => {
  const openLightbox = useProjectLightbox()

  if (!image) return null

  return (
    <button
      type="button"
      className={style.mobileImage}
      aria-label={openImageLabel}
      onClick={() => openLightbox(image)}
      data-reveal="wipe"
      data-reveal-now
      style={{ "--reveal-i": revealIndex ?? 0 } as CSSProperties}
    >
      <Image src={image.url} alt={image.alt} width={image.width} height={image.height} sizes="100vw" loading={loading} />
    </button>
  )
}

export default ProjectMobileImage
