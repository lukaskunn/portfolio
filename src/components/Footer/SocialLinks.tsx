'use client'
import React, { useRef } from 'react'
import styles from "@/styles/css/footer.module.css";
import SocialLink from './SocialLink';
import { usePageContext } from '@/contexts/PageContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ANIMATION_DELAYS, ANIMATION_TIME } from '@/utils/animationVars';
import LineRevealContainer from '../animations/LineReveal';

interface SocialLinksProps {
  data: any;
}

const SocialLinks = ({ data }: SocialLinksProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = usePageContext();

  return (
    <div ref={containerRef} className={styles["social-links-container"]}>
      {data.socialLinks?.map((link: any, index: number) => (
        <LineRevealContainer key={link.text} direction="up" duration={ANIMATION_TIME.footer} delay={ANIMATION_DELAYS.footer + index * 0.1}>
          <SocialLink
            name={link.text}
            url={link.url}
            className="social-link-item"
          />
        </LineRevealContainer>
      ))}
    </div>
  )
}

export default SocialLinks
