'use client'
import React from 'react'
import styles from "@/styles/css/Homepage.module.css";
import Clock from './Clock';
import { useLanguage } from '@/contexts/LanguageContext';
import { ANIMATION_DELAYS, ANIMATION_TIME } from '@/utils/animationVars';
import LineRevealContainer from '@/components/animations/LineReveal';
import SplitTextReveal from '@/components/animations/SplitTextReveal';

const TitleComponent = () => {
  const { currentContent } = useLanguage();
  const { landing } = currentContent;

  return (
    <div className={styles["title-container"]}>
      <SplitTextReveal
        as="h2"
        className={styles["title-text"]}
        duration={ANIMATION_TIME.title}
        delay={ANIMATION_DELAYS.title}
        direction="right"
      >
        {landing.title}
      </SplitTextReveal>
      <div className={styles["subtitle-container"]}>
        <LineRevealContainer direction="down" duration={ANIMATION_TIME.subtitle} delay={ANIMATION_DELAYS.subtitle}>
          <span
            className={`${styles["subtitle-text"]} ${styles["currently-position"]}`}
          >
            {landing.subtitle.currentPosition} <strong>{landing.subtitle.positionTitle}</strong> {landing.subtitle.companyPrefix} <a href={landing.subtitle.companyUrl}>{landing.subtitle.companyName}</a>
          </span>
        </LineRevealContainer>
        <LineRevealContainer direction="down" duration={ANIMATION_TIME.subtitle} delay={ANIMATION_DELAYS.subtitle + 0.1}>
          <span
            className={`${styles["subtitle-text"]} ${styles["current-location"]}`}
          >
            {landing.subtitle.location} <strong><Clock /></strong>
          </span>
        </LineRevealContainer>
      </div>
      <div className={styles["subtitle-container-mobile"]}>
        {landing.mobileSubtitles.map((subtitle, index) => (
          <LineRevealContainer key={index} direction="down" duration={ANIMATION_TIME.subtitle} delay={ANIMATION_DELAYS.subtitle + index * 0.1}>
            <span
              key={index}
              className={`${styles["subtitle-text"]} mobile-subtitle-item`}
            >
              {subtitle}
            </span>
          </LineRevealContainer>
        ))}
      </div>
    </div>
  )
}

export default TitleComponent
