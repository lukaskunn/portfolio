'use client'
import React, { useRef } from 'react'
import styles from "@/styles/css/footer.module.css";
import { usePathname } from 'next/navigation';
import SocialLinks from './SocialLinks';
import WorkMessage from './WorkMessage';

interface FooterProps {
  data: any; // Sanity footer content
}

const Footer = ({ data }: FooterProps) => {
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
      <SocialLinks data={data} />
      <WorkMessage data={data} />
    </footer>
  )
}

export default Footer
