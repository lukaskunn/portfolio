import React from 'react'
import { LuArrowUpRight } from "react-icons/lu";
import LinkHandler from '@/components/LinkHandler';

import styles from "../../../../styles/css/header.module.css";

const ContactMeButton = () => {
  return (
    <LinkHandler href="/contact" className={`${styles["menu-item"]} ${styles["contact-me-button"]}`}>Contact Me <LuArrowUpRight className={styles["button-arrow"]} size={"1.4em"} /></LinkHandler>
  )
}

export default ContactMeButton