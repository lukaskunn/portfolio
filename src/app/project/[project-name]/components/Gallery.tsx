'use client'
import React, { useState, useEffect } from 'react'
import styles from "@/styles/css/project.module.css"
import GalleryItem from './GalleryItem'
import MasonryContainer from './Masonry'
import type { GalleryItem as GalleryItemType } from '@/sanity/sanity-types'

interface GalleryProps {
  items: GalleryItemType[]
}

const Gallery = ({ items }: GalleryProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const updateIsMounted = () => {
      setIsMounted(true)
    }

    updateIsMounted()
  }, [])

  return (
    <section className={styles["gallery-section"]}>
      <h2 className={styles["gallery-title"]}>Project Gallery</h2>
      <div className={styles["mansory-container"]}>
        {isMounted && (
          <MasonryContainer>
            {items.map((item, index) => (
              <GalleryItem key={index} image={item.image} caption={item.caption} />
            ))}
          </MasonryContainer>
        )}
      </div>
    </section>
  )
}

export default Gallery
