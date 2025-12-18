'use client'
import React, { useRef } from 'react'
import styles from "@/styles/css/footer.module.css";
import { useLanguage } from '@/contexts/LanguageContext';
import SocialLink from './SocialLink';
import { usePageContext } from '@/contexts/PageContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ANIMATION_DELAYS, ANIMATION_TIME } from '@/utils/animationVars';
import LineRevealContainer from '../animations/LineReveal';

const SocialLinks = () => {
  const { currentContent } = useLanguage();
  const links = currentContent.header.socialLinks;
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = usePageContext();

  return (
    <div ref={containerRef} className={styles["social-links-container"]}>
      {links.map((link, index) => (
        <LineRevealContainer key={link.label} direction="up" duration={ANIMATION_TIME.footer} delay={ANIMATION_DELAYS.footer + index * 0.1}>
          <SocialLink
            name={link.label}
            url={link.href}
            className="social-link-item"
          />
        </LineRevealContainer>
      ))}
    </div>
  )
}

export default SocialLinks
