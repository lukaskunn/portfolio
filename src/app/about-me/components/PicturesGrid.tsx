'use client'
import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import Image from 'next/image'
import AnimateOpacityContainer from '@/components/AnimateOpacityContainer'
import { useTransitionContext } from '@/contexts/TransitionContext'

const images = [
  '/assets/images/about-me/IMG_5114.jpg',
  '/assets/images/about-me/IMG_4915.jpg',
  '/assets/images/about-me/IMG_5092.jpg',
  '/assets/images/about-me/IMG_4999.jpg',
]

const PicturesGrid = () => {
  const { isLoaded, isPageReady } = useTransitionContext()
  return (
    <AnimateOpacityContainer className={styles["pictures-grid-container"]} canAnimate={isLoaded && isPageReady} target={1} animationConfig={{ duration: 1.2, ease: 'power4.out', delay: 1 }}>
      <div className={`${styles["pictures-grid"]} ${styles["grid-desktop"]}`}>
        {images.map((src, index) => (
          <div key={src} className={styles["picture-item"]}>
            <Image src={src} alt={`Picture ${index + 1}`} className={styles["picture"]} width={450} height={600} />
          </div>
        ))}
      </div>
      <div className={`${styles["pictures-grid"]} ${styles["grid-mobile"]}`}>
        {images.map((src, index) => (
          <div key={src} className={styles["picture-item"]}>
            <Image src={src} alt={`Picture ${index + 1}`} className={styles["picture"]} width={300} height={400} />
          </div>
        ))}
      </div>
    </AnimateOpacityContainer>
  )
}

export default PicturesGrid