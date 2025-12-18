'use client'
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePageContext } from '@/contexts/PageContext';
import { ANIMATION_PRESETS } from '@/contexts/AnimationContext';

type RevealDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';

interface ClipPathRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  ease?: string;
  onComplete?: () => void;
}

const getInitialClipPath = (direction: RevealDirection): string => {
  switch (direction) {
    case 'top-left':
      return 'inset(0% 100% 100% 0%)';
    case 'top-right':
      return 'inset(0% 0% 100% 100%)';
    case 'bottom-left':
      return 'inset(100% 100% 0% 0%)';
    case 'bottom-right':
      return 'inset(100% 0% 0% 100%)';
    case 'top':
      return 'inset(0% 0% 100% 0%)';
    case 'bottom':
      return 'inset(100% 0% 0% 0%)';
    case 'left':
      return 'inset(0% 100% 0% 0%)';
    case 'right':
      return 'inset(0% 0% 0% 100%)';
    default:
      return 'inset(0% 100% 100% 0%)';
  }
};

const ClipPathReveal: React.FC<ClipPathRevealProps> = ({
  children,
  className,
  direction = 'top-left',
  delay = 0,
  duration = ANIMATION_PRESETS.clipPathReveal.duration,
  ease = ANIMATION_PRESETS.clipPathReveal.ease,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = usePageContext();

  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        clipPath: getInitialClipPath(direction),
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration,
        ease,
        delay,
        onComplete,
      }
    );
  }, { dependencies: [isLoaded, delay], scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        clipPath: getInitialClipPath(direction),
      }}
    >
      {children}
    </div>
  );
};

export default ClipPathReveal;
