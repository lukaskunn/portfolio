'use client'
import React from 'react'
import { LuArrowUpRight } from "react-icons/lu";
import LinkHandler from '@/components/LinkHandler';
import { useLanguage } from '@/contexts/LanguageContext';

import styles from "../../../../styles/css/header.module.css";

const ContactMeButton = () => {
  const { currentContent } = useLanguage();
  const { header } = currentContent;

  return (
    <LinkHandler href={header.contactButton.link} className={`${styles["menu-item"]} ${styles["contact-me-button"]}`}>{header.contactButton.title} <LuArrowUpRight className={styles["button-arrow"]} size={"1.4em"} /></LinkHandler>
  )
}

export default ContactMeButton
