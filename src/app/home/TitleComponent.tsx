import React from 'react'
import styles from "@/styles/css/Homepage.module.css";
import Clock from './Clock';
import { ANIMATION_DELAYS, ANIMATION_TIME } from '@/utils/animationVars';
import LineRevealContainer from '@/components/animations/LineReveal';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import { type SanityDocument } from "next-sanity";
import { client } from '@/sanity/client'
import { LANDING_QUERY, FEATURED_PROJECTS_QUERY } from '@/sanity/sanity-queries'

const TitleComponent = async () => {
  const [landing] = await Promise.all([
    client.fetch(LANDING_QUERY)
  ])

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
        {landing.mobileSubtitles.map((subtitle: string, index: number) => (
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
