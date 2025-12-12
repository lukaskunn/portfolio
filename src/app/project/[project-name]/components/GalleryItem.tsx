'use client'

import React, { useState, useEffect } from 'react'
import styles from "@/styles/css/project.module.css"
import { IoMdClose } from "react-icons/io";


interface GalleryItemProps {
  image: string
  caption: string
}

const GalleryItem = ({ image, caption }: GalleryItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      <div className={styles["image-container"]}>
        <div className={styles["background-container"]}>
          <img
            src={image}
            alt={caption}
            onClick={handleImageClick}
            className={styles["gallery-image"]}
          />
          <div className={styles["description-overlay"]}>
            <span className={styles["description-overlay-text"]}>{caption}</span>
            <span className={styles["description-overlay-cta"]}>[ Click to see better ]</span>
          </div>
        </div>
      </div>
      <div
        className={styles["image-modal-overlay"]}
        onClick={handleCloseModal}
        style={{ display: isModalOpen ? 'flex' : 'none' }}
      >
        <div
          className={styles["image-modal-content"]}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={styles["image-modal-close"]}
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            <IoMdClose size={24} />
          </button>
          <img
            src={image}
            alt={caption}
            className={styles["image-modal-image"]}
          />
          {caption && (
            <p className={styles["image-modal-caption"]}>{caption}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default GalleryItem
