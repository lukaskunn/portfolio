"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { FaXmark } from "react-icons/fa6"
import type { ProjectImage } from "@/types/content"
import style from "@/styles/components/ProjectLightbox.module.scss"

const ProjectLightboxContext = createContext<((image: ProjectImage) => void) | null>(null)

export interface ProjectLightboxProviderProps {
  children: ReactNode
  closeImageLabel?: string
}

export const ProjectLightboxProvider = ({ children, closeImageLabel }: ProjectLightboxProviderProps) => {
  const [image, setImage] = useState<ProjectImage | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openLightbox = useCallback((next: ProjectImage) => setImage(next), [])
  const closeLightbox = useCallback(() => setImage(null), [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (image && !dialog.open) {
      dialog.showModal()
    } else if (!image && dialog.open) {
      dialog.close()
    }
  }, [image])

  return (
    <ProjectLightboxContext.Provider value={openLightbox}>
      {children}
      <dialog
        ref={dialogRef}
        className={style.dialog}
        onClose={closeLightbox}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeLightbox()
        }}
      >
        <button type="button" className={style.close} aria-label={closeImageLabel} autoFocus onClick={closeLightbox}>
          <FaXmark size={16} aria-hidden="true" focusable="false" />
        </button>
        {image && (
          <Image
            src={image.fullUrl}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={style.image}
          />
        )}
      </dialog>
    </ProjectLightboxContext.Provider>
  )
}

export const useProjectLightbox = () => {
  const openLightbox = useContext(ProjectLightboxContext)
  if (!openLightbox) {
    throw new Error("useProjectLightbox must be used within a ProjectLightboxProvider")
  }
  return openLightbox
}
