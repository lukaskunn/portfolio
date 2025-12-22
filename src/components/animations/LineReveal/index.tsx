'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { usePageContext } from '@/contexts/PageContext'
import { useTransitionContext } from '@/contexts/TransitionContext'

type LineRevealContainerProps = {
  direction?: 'up' | 'down';
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  runAfterLoad?: boolean;
  trigger?: boolean;
}

const LineRevealContainer = ({ children, direction = "up", duration = 1, delay = 0, runAfterLoad = true, trigger }: LineRevealContainerProps) => {
  const el = useRef<HTMLDivElement>(null);
  const { isLoaded } = usePageContext();
  const { isPageReady } = useTransitionContext();
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!el.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(el.current, { yPercent: direction === 'down' ? -100 : 100 });
      return; // Don't proceed with animation if not ready
    }

    // Once animated, keep content visible regardless of isPageReady state
    if (hasAnimatedRef.current) {
      return;
    }

    // If trigger is provided, use it to control animation
    if (trigger !== undefined) {
      if (!trigger) {
        // Reset to hidden position when trigger is false
        gsap.set(el.current, { yPercent: direction === 'down' ? -100 : 100 });
        return;
      }
      // Trigger is true, run the animation
      hasAnimatedRef.current = true;
      gsap.fromTo(el.current,
        { yPercent: direction === 'down' ? -100 : 100 },
        {
          yPercent: 0,
          duration: duration,
          delay: delay,
          ease: 'power4.out',
        }
      );
    } else {
      // Otherwise use the original runAfterLoad + isLoaded logic
      if (runAfterLoad && !isLoaded) return;
      if (!isPageReady) return;

      hasAnimatedRef.current = true;
      gsap.fromTo(el.current,
        { yPercent: direction === 'down' ? -100 : 100 },
        {
          yPercent: 0,
          duration: duration,
          delay: delay,
          ease: 'power4.out',
        }
      );
    }
  }, [isLoaded, isPageReady, runAfterLoad, trigger, direction, duration, delay]);

  return (
    <div style={{ overflow: 'hidden', height: 'fit-content' }}>
      <div ref={el}>{children}</div>
    </div>
  )
}

export default LineRevealContainer
