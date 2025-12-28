'use client'
import React from 'react'
import styles from "@/styles/css/components/Loading.module.css"
import { useTransitionContext } from '@/contexts/TransitionContext'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimateOpacityContainer from '../AnimateOpacityContainer';
import Image from 'next/image';

const animationConfig: gsap.TweenVars = {
  duration: 0.5,
  ease: "power2.out",
}

const images = [
  '/assets/images/loading/alexandre-daoust-5rIRjoGSy_c-unsplash.jpg',
  '/assets/images/loading/hector-o-connor-bEo8dH_m1pA-unsplash.jpg',
  '/assets/images/loading/hector-o-connor-UVfNbmUKSAc-unsplash.jpg',
  '/assets/images/loading/patrick-langwallner-kVlDPxcLmNQ-unsplash.jpg',
  '/assets/images/loading/hector-o-connor-aYlt6aomt60-unsplash.jpg',
  '/assets/images/loading/hector-o-connor-Co2PunJrPcY-unsplash.jpg',
  '/assets/images/loading/patrick-langwallner-AtehLBTC9P8-unsplash.jpg',
  '/assets/images/loading/patrick-langwallner-UsOnas92hFA-unsplash.jpg',
  '/assets/images/loading/patrick-langwallner-eWy6Yvcsppc-unsplash.jpg',
  '/assets/images/loading/sophia-rotsch-z8_mpIdT81A-unsplash.jpg',
]

const LOADING_DURATION = 4; // seconds for stats counter
const IMAGE_REVEAL_DURATION = 1; // seconds for image clip-path
const TEXT_ANIMATION_DURATION = 1; // seconds for text appear/hide

const Loading = () => {
  const { isLoaded, setIsLoaded } = useTransitionContext();
  const [stats, setStats] = React.useState<number>(0);
  const [imageIndex, setImageIndex] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageContainerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLSpanElement>(null);
  const statsRef = React.useRef<HTMLSpanElement>(null);
  const statsValueRef = React.useRef<{ value: number }>({ value: 0 });
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, (LOADING_DURATION * 3 * 1000) / images.length);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Step 1: Image container clip-path from bottom to top (reveal)
    tl.to(imageContainerRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: IMAGE_REVEAL_DURATION,
      ease: "power4.inOut",
      delay: 1,
    });

    // Step 2: Text "Loading" and stats appear from bottom
    tl.fromTo(headerRef.current, {
      y: "100%",
    }, {
      y: "0%",
      duration: TEXT_ANIMATION_DURATION,
      ease: "power4.out",
      delay: 0.1
    })

    // Step 3: Stats counter from 0 to 100%
    tl.to(statsValueRef.current, {
      value: 100,
      duration: LOADING_DURATION,
      ease: "power3.inOut",
      onUpdate: () => {
        setStats(Math.round(statsValueRef.current.value));
      },
    });

    // Step 4: Reverse - Text hides to bottom
    tl.to(headerRef.current, {
      y: "100%",
      duration: TEXT_ANIMATION_DURATION - 0.2,
      ease: "power4.in",
    }) // Wait 0.5s before starting this animation

    // Step 5: Reverse - Image clip-path from top to bottom (hide)
    tl.to(imageContainerRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: IMAGE_REVEAL_DURATION,
      ease: "power4.in",
      onComplete: () => {
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      },
    }, "<"); // Start with previous animation (text hide)
    //

  }, { scope: containerRef });

  return (
    <AnimateOpacityContainer className={styles["container"]} canAnimate={isLoaded} target={0} animationConfig={animationConfig} >
      <div className={styles["loading-content"]} ref={containerRef}>
        <div className={styles["loading-header"]}>
          <div style={{ overflow: 'hidden', height: 'fit-content', width: '100%' }}>
            <div ref={headerRef} style={{ transform: "translateY(100%)", display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "baseline" }} >
              <span className={styles["loading-header__title"]} ref={titleRef}>Loading</span>
              <span className={styles["loading-header__stats"]} ref={statsRef}>{stats}%</span>
            </div>
          </div>
        </div>
        <div className={styles["image-container"]} ref={imageContainerRef}>
          {images.map((src, index) => (
            <div
              key={index}
              className={styles["image-container__image-wrapper"]}
              style={{ opacity: index === imageIndex ? 1 : 0 }}
            >
              <Image
                fetchPriority={index === 0 ? 'high' : 'auto'}
                src={src}
                alt="Loading image"
                className={styles["image-container__image"]}
                width={400}
                height={600}
              />
            </div>
          ))}
        </div>
      </div>
    </AnimateOpacityContainer >
  )
}

export default Loading
