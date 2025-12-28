'use client'
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTransitionContext } from '@/contexts/TransitionContext';
import { ANIMATION_PRESETS } from '@/utils/animationVars';

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  onComplete?: () => void;
}

const StaggerReveal = forwardRef<HTMLDivElement, StaggerRevealProps>(({
  children,
  className,
  childClassName,
  delay = 0,
  stagger = ANIMATION_PRESETS.staggerList.stagger,
  duration = ANIMATION_PRESETS.staggerList.duration,
  ease = ANIMATION_PRESETS.staggerList.ease,
  direction = 'bottom',
  onComplete,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useTransitionContext();

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return { x: -30, y: 0 };
      case 'right':
        return { x: 30, y: 0 };
      case 'top':
        return { x: 0, y: -30 };
      case 'bottom':
        return { x: 0, y: 30 };
      default:
        return { x: 0, y: 30 };
    }
  };

  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.stagger-item');
    const initialTransform = getInitialTransform();

    gsap.fromTo(
      items,
      {
        ...initialTransform,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        delay,
        onComplete,
      }
    );
  }, { dependencies: [isLoaded, delay], scope: containerRef });

  // Clone children and add stagger-item class
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const existingClassName = child.props.className || '';
      return React.cloneElement(child, {
        ...child.props,
        className: `${existingClassName} stagger-item ${childClassName || ''}`.trim(),
        style: {
          ...child.props.style,
          opacity: 0,
          transform: direction === 'left' ? 'translateX(-30px)' :
            direction === 'right' ? 'translateX(30px)' :
              direction === 'top' ? 'translateY(-30px)' : 'translateY(30px)',
        },
      });
    }
    return child;
  });

  // Forward the ref properly
  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  return (
    <div ref={containerRef} className={className}>
      {clonedChildren}
    </div>
  );
});

StaggerReveal.displayName = 'StaggerReveal';

export default StaggerReveal;
