'use client'
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import useDevice from "../../hooks/useDevice";
import useScroll from "../../hooks/useScroll";
import { usePageContext } from "../../contexts/PageContext";
import { useTransition } from "../../contexts/TransitionContext";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import styles from "./header.module.css";

const ANIMATION_TIMING = {
  HEADER_SLIDE_IN: 0.8,
  MENU_OPEN: 0.6,
  MENU_CLOSE: 0.7,
  ROUTE_CHANGE_DELAY: 1200,
  DEFAULT_DELAY: 1000,
};

const AnimationContainer = ({ children }: { children: React.ReactNode }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { hasScrolled } = useScroll(100);
  const { isMobile, isSmallTablet } = useDevice();
  const isMobileView = isMobile || isSmallTablet;
  const { timeline } = useTransition();
  const { isLoaded } = usePageContext();
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.to(`.${styles.header}`, {
      top: -100,
      duration: 0.5,
      ease: "power2.inOut",
    }, 0);

    timeline.add(tl, 0);
    return () => { tl.kill(); };
  }, [timeline,pathname]);


  useEffect(() => {
    if (!headerRef.current) return;

    gsap.to(headerRef.current, {
      top: hasScrolled ? 30 : isMobileView ? 30 : 70,
      ease: "power3.out",
      duration: 0.5,
    });
  }, [hasScrolled, isMobileView]);

  useEffect(() => {
    if (!isLoaded) return;

    setTimeout(() => {
      gsap.to(`.${styles.header}`, {
        top: isMobileView ? 30 : 70,
        opacity: 1,
        duration: ANIMATION_TIMING.HEADER_SLIDE_IN,
        ease: "power3.out",
      });
    }, 100);
  }, [isLoaded, isMobileView]);

  return (
    <header className={styles.header} ref={headerRef}>
      {children}
    </header>
  );
};

export default AnimationContainer;
