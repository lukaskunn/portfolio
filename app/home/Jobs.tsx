import React from 'react'
import styles from "./Home.module.css"

const Jobs = () => {
  return (
    <div className={styles['jobs-container']}>
      <h3 className={styles["job-title"]}>/ Web Developer</h3>
      <h3 className={styles["job-title"]}>/ Web Designer (ux/ui)</h3>
    </div>
  )
}

export default Jobs