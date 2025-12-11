'use client'
import React, { useState, useEffect } from 'react'
import styles from "@/styles/css/project.module.css"
import GalleryItem from './GalleryItem'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

interface GalleryItemData {
  image: string
  caption: string
}

interface GalleryProps {
  items: GalleryItemData[]
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
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }} gutterBreakPoints={{ 1: "0px" }}>
            <Masonry>
              {items.map((item, index) => (
                <GalleryItem key={index} image={item.image} caption={item.caption} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </section>
  )
}

export default Gallery
