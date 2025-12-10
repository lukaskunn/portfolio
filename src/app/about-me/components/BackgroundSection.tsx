import React from 'react'
import styles from "@/styles/css/about-me.module.css"

const BackgroundSection = () => {
  return (
    <section className={styles["background-section"]}>
      <div className={styles["section-layout"]}>
        <h2 className={styles["section-title"]}>My Background</h2>
        <div className={styles["section-content"]}>
          <p className={styles["content-paragraph"]}>
            I'm a 23-year-old guy, graduated in computer science and working as a full-stack developer.
          </p>

          <p className={styles["content-paragraph"]}>
            I received honors for presenting my final paper on Computer Vision and disease identification in tomato plants.
          </p>

          <p className={styles["content-paragraph"]}>
            Currently developing for Motorola Europe in my job, maintaining Motorola stores in over 30 countries in Europe.
          </p>

          <p className={styles["content-paragraph"]}>
            I have worked on developing for various e-commerces, creating their home pages and product pages, creating components and adjusting already implemented components.
          </p>

          <p className={styles["content-paragraph"]}>
            Currently studying Three.js and animations with GSAP / Framer Motion.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BackgroundSection
