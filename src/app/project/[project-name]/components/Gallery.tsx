import React from 'react'
import styles from "@/styles/css/project.module.css"
import GalleryItem from './GalleryItem'

interface GalleryItemData {
  type: 'text-bigimage' | 'bigimage-text' | 'text-smallimage' | 'smallimage-text' | 'image-only' | 'text-only' | 'smallimage-bigimage' | 'bigimage-smallimage'
  leftImageUrl?: string
  rightImageUrl?: string
  text?: string
  textBackgroundColor?: string
  textColor?: string
  caption?: string
}

interface GalleryProps {
  items: GalleryItemData[]
}

const Gallery = ({ items }: GalleryProps) => {
  return (
    <section className={styles["gallery-section"]}>
      <h2 className={styles["gallery-title"]}>PROJECT GALLERY</h2>
      <div className={styles["gallery-grid"]}>
        {items.map((item, index) => (
          <GalleryItem key={index} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Gallery
