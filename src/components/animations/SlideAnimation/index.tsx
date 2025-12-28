'use client'
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTransitionContext } from '@/contexts/TransitionContext';
import { ANIMATION_PRESETS } from '@/utils/animationVars';

type SlideDirection = 'top' | 'bottom' | 'left' | 'right';

interface SlideAnimationProps {
  children: React.ReactNode;
  className?: string;
  direction?: SlideDirection;
  delay?: number;
  duration?: number;
  ease?: string;
  distance?: string;
  onComplete?: () => void;
}

const getInitialTransform = (direction: SlideDirection, distance: string) => {
  switch (direction) {
    case 'top':
      return { y: `-${distance}`, x: 0 };
    case 'bottom':
      return { y: distance, x: 0 };
    case 'left':
      return { x: `-${distance}`, y: 0 };
    case 'right':
      return { x: distance, y: 0 };
    default:
      return { y: distance, x: 0 };
  }
};

const SlideAnimation: React.FC<SlideAnimationProps> = ({
  children,
  className,
  direction = 'bottom',
  delay = 0,
  duration = ANIMATION_PRESETS.slideIn.duration,
  ease = ANIMATION_PRESETS.slideIn.ease,
  distance = '100%',
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useTransitionContext();

  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return;

    const initialTransform = getInitialTransform(direction, distance);

    gsap.fromTo(
      containerRef.current,
      {
        ...initialTransform,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration,
        ease,
        delay,
        onComplete,
      }
    );
  }, { dependencies: [isLoaded, delay], scope: containerRef });

  const initialTransform = getInitialTransform(direction, distance);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform: `translate(${initialTransform.x}, ${initialTransform.y})`,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
};

export default SlideAnimation;
