'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import styles from "@/styles/css/about-me.module.css"
import { useTransitionContext } from '@/contexts/TransitionContext'

gsap.registerPlugin(SplitText);

import type { HeroSectionProps } from '@/types';

const HeroSection = ({ data }: HeroSectionProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hasAnimatedRef = useRef(false);
  const { isLoaded, isPageReady } = useTransitionContext();

  useGSAP(() => {
    if (!titleRef.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(titleRef.current, { opacity: 0 });
      return;
    }

    if (!isLoaded || !isPageReady) return;

    // Split text into characters
    const split = new SplitText(titleRef.current, {
      type: 'chars',
      charsClass: 'split-char',
    });

    // Set container visible
    gsap.set(titleRef.current, { opacity: 1 });

    // Mark as animated
    hasAnimatedRef.current = true;

    // Animate characters from top to bottom
    gsap.fromTo(
      split.chars,
      {
        y: '-100%',
        opacity: 0
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.03,
        delay: 0.2
      }
    );

    // Cleanup function to revert split
    return () => {
      split.revert();
    };

  }, { dependencies: [isLoaded, isPageReady] });

  return (
    <section className={styles["hero-section"]}>
      <h1
        ref={titleRef}
        className={styles["page-title"]}
        style={{ overflow: 'hidden' }}
      >
        {data.sectionTitle}
      </h1>
    </section>
  )
}

export default HeroSection
