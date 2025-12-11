'use client'
import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import { useLanguage } from '@/contexts/LanguageContext'

const BackgroundSection = () => {
  const { currentContent } = useLanguage();
  const { aboutMe } = currentContent;

  return (
    <section className={styles["background-section"]}>
      <div className={styles["section-layout"]}>
        <h2 className={styles["section-title"]}>{aboutMe.background.title}</h2>
        <div className={styles["section-content"]}>
          {aboutMe.background.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles["content-paragraph"]}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BackgroundSection
