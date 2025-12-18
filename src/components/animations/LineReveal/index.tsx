'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { usePageContext } from '@/contexts/PageContext'

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

  useEffect(() => {
    if (!el.current) return;

    // If trigger is provided, use it to control animation
    if (trigger !== undefined) {
      if (!trigger) {
        // Reset to hidden position when trigger is false
        gsap.set(el.current, { yPercent: direction === 'down' ? -100 : 100 });
        return;
      }
      // Trigger is true, run the animation
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
  }, [isLoaded, runAfterLoad, trigger, direction, duration, delay]);

  return (
    <div style={{ overflow: 'hidden', height: 'fit-content' }}>
      <div ref={el}>{children}</div>
    </div>
  )
}

export default LineRevealContainer
