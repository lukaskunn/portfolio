import React from 'react'
import styles from "@/styles/css/Homepage.module.css"

type BackgroundGridProps = {
  opacity?: number;
}

const BackgroundGrid = ({ opacity = 1 }: BackgroundGridProps) => {
  return (
    <div className={styles["grid-container"]} style={{ opacity }}>
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className={`${styles["grid-item"]} ${styles[`grid-${index}`]}`}></div>
      ))}
    </div>
  )
}

export default BackgroundGrid