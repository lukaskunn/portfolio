'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import styles from "@/styles/css/about-me.module.css"
import { useLanguage } from '@/contexts/LanguageContext'
import { usePageContext } from '@/contexts/PageContext'
import { useTransitionContext } from '@/contexts/TransitionContext'

gsap.registerPlugin(SplitText);

const IntroSection = () => {
  const { currentContent } = useLanguage();
  const { aboutMe } = currentContent;
  const textRef = useRef<HTMLParagraphElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const { isLoaded } = usePageContext();
  const { isPageReady } = useTransitionContext();

  useGSAP(() => {
    if (!textRef.current || !borderRef.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(borderRef.current, { scaleX: 0 });
      return;
    }

    if (!isLoaded || !isPageReady) return;

    // Split text into lines
    const split = new SplitText(textRef.current, {
      type: 'lines',
      linesClass: 'split-line',
    });

    // Set container visible
    gsap.set(textRef.current, { opacity: 1 });

    // Mark as animated
    hasAnimatedRef.current = true;

    // Animate border from left to right
    gsap.fromTo(
      borderRef.current,
      {
        scaleX: 0
      },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power4.out',
        transformOrigin: 'left center'
      }
    );

    // Animate lines from top to bottom with delay
    gsap.fromTo(
      split.lines,
      {
        y: '100%',
        opacity: 0
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.4
      }
    );

    // Cleanup function to revert split
    return () => {
      split.revert();
    };

  }, { dependencies: [isLoaded, isPageReady] });

  return (
    <section className={styles["intro-section"]}>
      <div ref={borderRef} className={styles["border-top"]} />
      <div className={styles["intro-box"]}>
        <p
          ref={textRef}
          className={styles["intro-text"]}
          style={{ overflow: 'hidden' }}
        >
          {aboutMe.intro}
        </p>
      </div>
    </section>
  )
}

export default IntroSection
