'use client'
import React, { useRef } from 'react'
import styles from "@/styles/css/Homepage.module.css";
import Clock from './Clock';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageContext } from '@/contexts/PageContext';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { ANIMATION_DELAYS, ANIMATION_TIME } from '@/utils/animationVars';
import LineRevealContainer from '@/components/animations/LineReveal';

gsap.registerPlugin(SplitText);

const TitleComponent = () => {
  const { currentContent } = useLanguage();
  const { landing } = currentContent;
  const { isLoaded } = usePageContext();

  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!isLoaded || !titleRef.current) return;

    const tl = gsap.timeline();

    // Split title text into characters using GSAP SplitText
    const split = new SplitText(titleRef.current, {
      type: 'chars, words, lines',
      charsClass: 'title-letter',
      linesClass: 'title-line',
      mask: 'chars',
      autoSplit: true,
    });

    // Animate title letters one by one
    tl.fromTo(
      split.chars,
      {
        x: '110%',
        opacity: 1,
      },
      {
        x: '0%',
        duration: ANIMATION_TIME.title,
        ease: 'power4.out',
        // stagger: 0.05,
        delay: ANIMATION_DELAYS.title,
      }
    );

    // Cleanup function to revert split
    return () => {
      split.revert();
    };

  }, { dependencies: [isLoaded] });

  return (
    <div className={styles["title-container"]}>
      <h2
        ref={titleRef}
        className={styles["title-text"]}
        style={{ overflow: 'hidden', perspective: '1000px' }}
      >
        {landing.title}
      </h2>
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
