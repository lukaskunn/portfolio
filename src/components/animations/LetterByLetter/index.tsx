'use client'
import React, { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePageContext } from '@/contexts/PageContext';
import { ANIMATION_PRESETS } from '@/contexts/AnimationContext';

interface LetterByLetterProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  preset?: 'letterByLetter' | 'fastLetterByLetter';
  onComplete?: () => void;
}

const LetterByLetter: React.FC<LetterByLetterProps> = ({
  children,
  className,
  as: Component = 'span',
  delay = 0,
  preset = 'letterByLetter',
  onComplete,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const { isLoaded } = usePageContext();
  const animationPreset = ANIMATION_PRESETS[preset];

  // Split text into letters, preserving spaces
  const letters = useMemo(() => {
    return children.split('').map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char, // Use non-breaking space
      key: `${char}-${index}`,
    }));
  }, [children]);

  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return;

    const letterElements = containerRef.current.querySelectorAll('.letter');

    gsap.fromTo(
      letterElements,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 1,
        duration: animationPreset.duration,
        ease: animationPreset.ease,
        stagger: animationPreset.stagger,
        delay,
        onComplete,
      }
    );
  }, { dependencies: [isLoaded, delay], scope: containerRef });

  const ComponentTag = Component as React.ElementType;

  return (
    <ComponentTag
      ref={containerRef}
      className={className}
      style={{ overflow: 'hidden', display: 'inline-block' }}
    >
      <span style={{ display: 'inline-flex', overflow: 'hidden' }}>
        {letters.map(({ char, key }) => (
          <span
            key={key}
            className="letter"
            style={{
              display: 'inline-block',
              transform: 'translateY(100%)',
              opacity: 0,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </ComponentTag>
  );
};

export default LetterByLetter;
