'use client'
import React, { useRef, useMemo } from 'react'
import styles from "@/styles/css/footer.module.css";
import { useTransitionContext } from '@/contexts/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ANIMATION_DELAYS, ANIMATION_TIME } from '@/utils/animationVars';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

import type { WorkMessageProps } from '@/types';

const WorkMessage = ({ data }: WorkMessageProps) => {
  const message = data.quickMessage;
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useTransitionContext();

  useGSAP(() => {
    if (!isLoaded || !textRef.current) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(textRef.current, {
        type: 'lines',
        linesClass: 'work-message-line line++',
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.lines, {
            yPercent: 100,
            ease: 'power4.out',
            duration: ANIMATION_TIME.footerWorkMessage,
            delay: ANIMATION_DELAYS.footer,
            stagger: 0.15,
            onComplete: () => self.revert(),
          })
        },
      })

      return () => {
        split.revert();
      }
    }, containerRef);

    return () => ctx.revert();

  }, { scope: containerRef, dependencies: [isLoaded] });



  return (
    <div className={styles["work-message-container"]} ref={containerRef}>
      <span
        ref={textRef}
        className={`${styles["work-message-text"]} .title-message`}
      >
        {message}
      </span>
    </div>
  )
}

export default WorkMessage
