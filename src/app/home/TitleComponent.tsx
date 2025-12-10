'use client'
import React from 'react'
import styles from "@/styles/css/Homepage.module.css";
import Clock from './Clock';

const TitleComponent = () => {
  return (
    <div className={styles["title-container"]}>
      <h2 className={styles["title-text"]}>CREATIVE DEVELOPER</h2>
      <div className={styles["subtitle-container"]}>
        <span className={`${styles["subtitle-text"]} ${styles["currently-position"]}`}>
          / Currently <strong>PL/SSR II Front End Developer</strong> @ <a href='https://www.corebiz.ag/en'>Corebiz</a>
        </span>
        <span className={`${styles["subtitle-text"]} ${styles["current-location"]}`}>
          / Based in São Paulo, Brazil. <strong><Clock /></strong>
        </span>
      </div>
      <div className={styles["subtitle-container-mobile"]}>
        <span className={styles["subtitle-text"]}>
          / WEB DESIGN (UI/UX)
        </span>
        <span className={styles["subtitle-text"]}>
          / WEB DEVELOPER
        </span>
        <span className={styles["subtitle-text"]}>
          / SOFTWARE ENGINEER
        </span>
      </div>
    </div>
  )
}

export default TitleComponent