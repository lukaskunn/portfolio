'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/css/Homepage.module.css';
import { usePageContext } from '@/contexts/PageContext';
import { useTransitionContext } from '@/contexts/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ANIMATION_DELAYS, ANIMATION_TIME } from '@/utils/animationVars';

interface HomeImageProps {
  imageSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  lines?: string[];
}

const DEFAULT_LINES = [
  '/ WEB DESIGN (UI/UX)',
  '/ WEB DEVELOPER',
  '/ SOFTWARE ENGINEER',
];

const HomeImage: React.FC<HomeImageProps> = ({
  imageSrc = '/assets/images/homepage/profile_image.jpg',
  alt = 'Profile portrait',
  width = 480,
  height = 480,
  lines = DEFAULT_LINES
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRefMobile = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);
  const blackBoxRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = usePageContext();
  const { isPageReady } = useTransitionContext();
  const hasAnimatedRef = useRef(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(containerRef.current, { opacity: 0 });
      if (mobileImageRef.current && blackBoxRef.current) {
        gsap.set([mobileImageRef.current, blackBoxRef.current], { opacity: 0 });
      }
    }

    if (!isLoaded || !isPageReady) return;

    // Set visible and mark as animated
    gsap.set(containerRef.current, { opacity: 1 });
    if (mobileImageRef.current && blackBoxRef.current) {
      gsap.set([mobileImageRef.current, blackBoxRef.current], { opacity: 1 });
    }
    hasAnimatedRef.current = true;

    // Clip-path reveal from top-left to bottom-right
    gsap.fromTo(
      containerRef.current,
      {
        clipPath: 'circle(0% at 0% 0%)',
        scale: 1.1,
      },
      {
        clipPath: 'circle(50% at 50% 50%)',
        scale: 1,
        transform: 'translate(-50%, -50%)',
        ease: 'power4.out',
        duration: ANIMATION_TIME.image,
        delay: ANIMATION_DELAYS.image,
      }
    );

    if (!mobileImageRef.current || !blackBoxRef.current) return;

    gsap.fromTo(
      blackBoxRef.current,
      {
        clipPath:
          'inset(0% 100% 100% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power4.out',
        duration: ANIMATION_TIME.image - 0.3,
        delay: ANIMATION_DELAYS.image,
      }
    );

    gsap.fromTo(
      mobileImageRef.current,
      {
        clipPath:
          'inset(0% 100% 100% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power4.out',
        duration: ANIMATION_TIME.image - 0.5,
        delay: ANIMATION_DELAYS.image + 0.15,
      }
    );
  }, { dependencies: [isLoaded, isPageReady] });

  return (
    <>
      <div
        ref={containerRef}
        className={`${styles['home-image-container']} ${styles['desktop-image-container']}`}
        style={{
          clipPath: 'inset(0% 100% 100% 0%)',
          transform: 'scale(1.1) translate(-50%, -50%)',
        }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={styles['home-image']}
          priority
        />
      </div>
      <div
        ref={containerRefMobile}
        className={`${styles['home-image-container']} ${styles['mobile-image-container']}`}
      >
        <Image
          ref={mobileImageRef}
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`${styles['home-image']} .mobile-home-image`}
          priority
        />
        <div className={`${styles['block-box']} .black-box`} ref={blackBoxRef} />
      </div>
    </>
  );
};

export default HomeImage;
