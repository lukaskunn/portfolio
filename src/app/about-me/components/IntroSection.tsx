import React from 'react'
import styles from "@/styles/css/about-me.module.css"

const IntroSection = () => {
  return (
    <section className={styles["intro-section"]}>
      <div className={styles["intro-box"]}>
        <p className={styles["intro-text"]}>
          I'm a creative developer and software engineer from São Paulo
          with over 5 years of experience creating unique web experiences
          around the world. I love crafting visual striking and awesome
          websites that not only look grate but also feel intuitive
        </p>
      </div>
    </section>
  )
}

export default IntroSection
