'use client'
import React from 'react'
import styles from "@/styles/css/Homepage.module.css";
import Clock from './Clock';
import { useLanguage } from '@/contexts/LanguageContext';

const TitleComponent = () => {
  const { currentContent } = useLanguage();
  const { landing } = currentContent;

  return (
    <div className={styles["title-container"]}>
      <h2 className={styles["title-text"]}>{landing.title}</h2>
      <div className={styles["subtitle-container"]}>
        <span className={`${styles["subtitle-text"]} ${styles["currently-position"]}`}>
          {landing.subtitle.currentPosition} <strong>{landing.subtitle.positionTitle}</strong> {landing.subtitle.companyPrefix} <a href={landing.subtitle.companyUrl}>{landing.subtitle.companyName}</a>
        </span>
        <span className={`${styles["subtitle-text"]} ${styles["current-location"]}`}>
          {landing.subtitle.location} <strong><Clock /></strong>
        </span>
      </div>
      <div className={styles["subtitle-container-mobile"]}>
        {landing.mobileSubtitles.map((subtitle, index) => (
          <span key={index} className={styles["subtitle-text"]}>
            {subtitle}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TitleComponent
