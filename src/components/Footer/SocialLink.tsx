'use client'
import React from 'react'
import styles from "@/styles/css/footer.module.css";
import { TextScrollHover } from '@/components/animations';

interface SocialLinkProps {
  name: string;
  url: string;
  className?: string;
}

const SocialLink = ({
  name,
  url,
  className,
}: SocialLinkProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles["social-link"]} ${className || ''}`}
    >
      <span className={`${styles["separator"]} ${styles["front-separator"]}`}>[</span>
      <TextScrollHover text={name} containerHeight={24} />
      <span className={`${styles["separator"]} ${styles["front-separator"]}`}>]</span>
    </a>
  )
}

export default SocialLink
