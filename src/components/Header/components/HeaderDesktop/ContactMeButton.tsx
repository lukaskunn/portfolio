'use client'
import React from 'react'
import { LuArrowUpRight } from "react-icons/lu";
import LinkHandler from '@/components/LinkHandler';
import { TextScrollHover } from '@/components/animations';

import styles from "../../../../styles/css/header.module.css";

import type { ContactMeButtonProps } from '@/types';

const ContactMeButton = ({ data }: ContactMeButtonProps) => {
  return (
    <LinkHandler href={data.url} className={`${styles["menu-item"]} ${styles["contact-me-button"]}`}>
      <TextScrollHover text={data.text} />
      <LuArrowUpRight className={styles["button-arrow"]} size={"1.4em"} />
    </LinkHandler>
  )
}

export default React.memo(ContactMeButton)
