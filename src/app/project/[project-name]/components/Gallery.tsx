'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from "@/styles/css/project.module.css"
import GalleryItem from './GalleryItem'
import type { GalleryItem as GalleryItemType } from '@/sanity/sanity-types'

// Code-split Masonry library (large external dependency)
const MasonryContainer = dynamic(() => import('./Masonry'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
  ssr: true
});

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
