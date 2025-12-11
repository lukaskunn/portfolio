'use client'
import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import { useLanguage } from '@/contexts/LanguageContext'

const IntroSection = () => {
  const { currentContent } = useLanguage();
  const { aboutMe } = currentContent;

  return (
    <section className={styles["intro-section"]}>
      <div className={styles["intro-box"]}>
        <p className={styles["intro-text"]}>
          {aboutMe.intro}
        </p>
      </div>
    </section>
  )
}

export default IntroSection
