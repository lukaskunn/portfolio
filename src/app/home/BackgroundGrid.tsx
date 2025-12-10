import React from 'react'
import styles from "@/styles/css/Homepage.module.css"

const BackgroundGrid = () => {
  return (
    <div className={styles["grid-container"]}>
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className={`${styles["grid-item"]} ${styles[`grid-${index}`]}`}></div>
      ))}
    </div>
  )
}

export default BackgroundGrid