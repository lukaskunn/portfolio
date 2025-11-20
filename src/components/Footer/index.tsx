import React from 'react'
import styles from "@/styles/css/footer.module.css";

import SocialLinks from './SocialLinks';
import WorkMessage from './WorkMessage';

const Footer = () => {
  return (
    <footer className={styles["footer-container"]}>
      <SocialLinks />
      <WorkMessage />
    </footer>
  )
}

export default Footer