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

  // Close modal on ESC key press
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
        <img
          src={image}
          alt={caption}
          onClick={handleImageClick}
          className={styles["gallery-image"]}
        />
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
