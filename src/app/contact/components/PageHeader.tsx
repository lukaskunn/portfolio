'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/css/contact.module.css';
import { usePageContext } from '@/contexts/PageContext';
import { useTransitionContext } from '@/contexts/TransitionContext';

gsap.registerPlugin(SplitText);

import type { PageHeaderProps } from '@/types';

const PageHeader: React.FC<PageHeaderProps> = ({ data }) => {
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hasAnimatedRef = useRef(false);
  const { isLoaded } = usePageContext();
  const { isPageReady } = useTransitionContext();

  useGSAP(() => {
    if (!subtitleRef.current || !titleRef.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set([subtitleRef.current, titleRef.current], { opacity: 0 });
      return;
    }

    if (!isLoaded || !isPageReady) return;

    const tl = gsap.timeline();

    // Split subtitle into characters
    const subtitleSplit = new SplitText(subtitleRef.current, {
      type: 'chars',
      charsClass: 'split-char',
    });

    // Split title into words and chars
    const titleSplit = new SplitText(titleRef.current, {
      type: 'words, chars',
      wordsClass: 'split-word',
      charsClass: 'split-char',
    });

    // Set containers visible
    gsap.set([subtitleRef.current, titleRef.current], { opacity: 1 });

    // Mark as animated
    hasAnimatedRef.current = true;

    // Animate subtitle - fade in and slide up
    tl.fromTo(
      subtitleSplit.chars,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.02,
        delay: 0.3
      }
    );

    // Animate title - dramatic scale and fade reveal
    tl.fromTo(
      titleSplit.chars,
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.015
      },
      '<0.2'
    );

    // Cleanup function to revert split
    return () => {
      subtitleSplit.revert();
      titleSplit.revert();
    };

  }, { dependencies: [isLoaded, isPageReady] });

  return (
    <header className={styles.pageHeader}>
      <span
        ref={subtitleRef}
        className={styles.subtitle}
        style={{ overflow: 'hidden' }}
      >
        {data.pageHeader.subtitle}
      </span>
      <h1
        ref={titleRef}
        className={styles.title}
        style={{ overflow: 'hidden' }}
      >
        <span>{data.pageHeader.title}</span>
        <span className={styles.titleAccent}>{data.pageHeader.titleAccent}</span>
        <span>{data.pageHeader.titleEnd}</span>
      </h1>
    </header>
  );
};

export default PageHeader;
