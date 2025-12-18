'use client'
import React, { useRef } from 'react'
import styles from "@/styles/css/footer.module.css";
import { usePathname } from 'next/navigation';
import SocialLinks from './SocialLinks';
import WorkMessage from './WorkMessage';

const Footer = () => {
  const pathName = usePathname();
  const footerRef = useRef<HTMLElement>(null);

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <footer
      ref={footerRef}
      className={styles["footer-container"]}
    >
      <SocialLinks />
      <WorkMessage />
    </footer>
  )
}

export default Footer
