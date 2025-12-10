import React from 'react'
import styles from "@/styles/css/project.module.css"
import Image from 'next/image'

interface GalleryItemProps {
  type: 'text-bigimage' | 'bigimage-text' | 'text-smallimage' | 'smallimage-text' | 'image-only' | 'text-only' | 'smallimage-bigimage' | 'bigimage-smallimage'
  leftImageUrl?: string
  rightImageUrl?: string
  text?: string
  caption?: string
  textBackgroundColor?: string
  textColor?: string
}

const GalleryItem = ({ type, leftImageUrl, rightImageUrl, text, caption, textBackgroundColor, textColor }: GalleryItemProps) => {
  const renderContent = () => {
    switch (type) {
      case 'text-bigimage':
        return (
          <>
            <div className={`${styles["gallery-item-content"]} ${styles["text-content"]}`} style={{ backgroundColor: textBackgroundColor || 'transparent', color: textColor || 'inherit' }}>
              {text && <p className={styles["content-text"]}>{text}</p>}
            </div>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["big-image"]}`}>
              {rightImageUrl && (
                <>
                  <Image src={rightImageUrl} alt={caption || ''} width={800} height={600} className={styles["content-image"]} />
                </>
              )}
            </div>
          </>
        )

      case 'bigimage-text':
        return (
          <>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["big-image"]}`}>
              {leftImageUrl && (
                <>
                  <Image src={leftImageUrl} alt={caption || ''} width={800} height={600} className={styles["content-image"]} />

                </>
              )}
            </div>
            <div className={`${styles["gallery-item-content"]} ${styles["text-content"]}`} style={{ backgroundColor: textBackgroundColor || 'transparent', color: textColor || 'inherit' }}>
              {text && <p className={styles["content-text"]}>{text}</p>}
            </div>
          </>
        )

      case 'text-smallimage':
        return (
          <>
            <div className={`${styles["gallery-item-content"]} ${styles["text-content"]}`} style={{ backgroundColor: textBackgroundColor || 'transparent', color: textColor || 'inherit' }}>
              {text && <p className={styles["content-text"]}>{text}</p>}
            </div>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["small-image"]}`}>
              {rightImageUrl && (
                <>
                  <Image src={rightImageUrl} alt={caption || ''} width={400} height={300} className={styles["content-image"]} />

                </>
              )}
            </div>
          </>
        )

      case 'smallimage-text':
        return (
          <>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["small-image"]}`}>
              {leftImageUrl && (
                <>
                  <Image src={leftImageUrl} alt={caption || ''} width={400} height={300} className={styles["content-image"]} />

                </>
              )}
            </div>
            <div className={`${styles["gallery-item-content"]} ${styles["text-content"]}`} style={{ backgroundColor: textBackgroundColor || 'transparent', color: textColor || 'inherit' }}>
              {text && <p className={styles["content-text"]}>{text}</p>}
            </div>
          </>
        )

      case 'image-only':
        return (
          <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["full-width"]}`}>
            {leftImageUrl && (
              <>
                <Image src={leftImageUrl} alt={caption || ''} width={1360} height={600} className={styles["content-image"]} />
              </>
            )}
          </div>
        )

      case 'text-only':
        return (
          <div className={`${styles["gallery-item-content"]} ${styles["text-content"]} ${styles["full-width"]}`} style={{ backgroundColor: textBackgroundColor || 'transparent', color: textColor || 'inherit' }}>
            {text && <p className={styles["content-text"]}>{text}</p>}
          </div>
        )

      case 'smallimage-bigimage':
        return (
          <>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["small-image"]}`}>
              {leftImageUrl && (
                <>
                  <Image src={leftImageUrl} alt={caption || ''} width={400} height={300} className={styles["content-image"]} />

                </>
              )}
            </div>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["big-image"]}`}>
              {rightImageUrl && (
                <>
                  <Image src={rightImageUrl} alt={caption || ''} width={800} height={600} className={styles["content-image"]} />

                </>
              )}
            </div>
          </>
        )

      case 'bigimage-smallimage':
        return (
          <>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["big-image"]}`}>
              {leftImageUrl && (
                <>
                  <Image src={leftImageUrl} alt={caption || ''} width={800} height={600} className={styles["content-image"]} />

                </>
              )}
            </div>
            <div className={`${styles["gallery-item-content"]} ${styles["image-content"]} ${styles["small-image"]}`}>
              {rightImageUrl && (
                <>
                  <Image src={rightImageUrl} alt={caption || ''} width={400} height={300} className={styles["content-image"]} />

                </>
              )}
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className={`${styles["gallery-item"]} ${styles[type]}`}>
      {renderContent()}
    </div>
  )
}

export default GalleryItem
