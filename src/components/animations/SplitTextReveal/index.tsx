'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { usePageContext } from '@/contexts/PageContext'
import { useTransitionContext } from '@/contexts/TransitionContext'

gsap.registerPlugin(SplitText);

type SplitTextRevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  direction?: 'left' | 'right' | 'up' | 'down';
  splitType?: 'chars' | 'words' | 'lines' | 'chars, words' | 'chars, lines' | 'words, lines' | 'chars, words, lines';
}

const SplitTextReveal = ({
  children,
  className = '',
  style = {},
  duration = 0.8,
  delay = 0,
  stagger = 0,
  as: Component = 'div',
  direction = 'right',
  splitType = 'chars, words, lines'
}: SplitTextRevealProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);
  const { isLoaded } = usePageContext();
  const { isPageReady } = useTransitionContext();

  useGSAP(() => {
    if (!elementRef.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(elementRef.current, { opacity: 0 });
      return;
    }

    if (!isLoaded || !isPageReady) return;

    const tl = gsap.timeline();

    // Split text into parts using GSAP SplitText
    const split = new SplitText(elementRef.current, {
      type: splitType,
      charsClass: 'split-char',
      wordsClass: 'split-word',
      linesClass: 'split-line',
      mask: 'chars',
      autoSplit: true,
    });

    // Set container visible
    gsap.set(elementRef.current, { opacity: 1 });

    // Mark as animated
    hasAnimatedRef.current = true;

    // Determine animation direction
    const getInitialPosition = () => {
      switch (direction) {
        case 'left':
          return { x: '-110%', opacity: 1 };
        case 'right':
          return { x: '110%', opacity: 1 };
        case 'up':
          return { y: '-110%', opacity: 1 };
        case 'down':
          return { y: '110%', opacity: 1 };
        default:
          return { x: '110%', opacity: 1 };
      }
    };

    const getFinalPosition = () => {
      switch (direction) {
        case 'left':
        case 'right':
          return { x: '0%' };
        case 'up':
        case 'down':
          return { y: '0%' };
        default:
          return { x: '0%' };
      }
    };

    // Animate characters/words/lines
    const elements = splitType.includes('chars') ? split.chars :
      splitType.includes('words') ? split.words :
        split.lines;

    tl.fromTo(
      elements,
      getInitialPosition(),
      {
        ...getFinalPosition(),
        duration: duration,
        ease: 'power4.out',
        stagger: stagger,
        delay: delay,
      }
    );

    // Cleanup function to revert split
    return () => {
      split.revert();
    };

  }, { dependencies: [isLoaded, isPageReady] });

  return (
    <Component
      ref={elementRef as any}
      className={className}
      style={{ overflow: 'hidden', perspective: '1000px', ...style }}
    >
      {children}
    </Component>
  );
};

export default SplitTextReveal;
