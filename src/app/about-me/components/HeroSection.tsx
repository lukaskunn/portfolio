'use client'
import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import { useLanguage } from '@/contexts/LanguageContext'

const HeroSection = () => {
  const { currentContent } = useLanguage();
  const { aboutMe } = currentContent;

  return (
    <section className={styles["hero-section"]}>
      <h1 className={styles["page-title"]}>{aboutMe.sectionTitle}</h1>
    </section>
  )
}

export default HeroSection
