'use client'
import React from 'react'
import styles from "../../../../styles/css/header.module.css";
import LinkHandler from '@/components/LinkHandler';
import { TextScrollHover } from '@/components/animations';

interface HeaderItemProps {
  title: string;
  link: string;
}

const HeaderItem = ({
  title,
  link
}: HeaderItemProps) => {
  return (
    <LinkHandler href={link} className={styles["menu-item"]}>
      <span className={styles["text"]}>
        <span className={`${styles["separator"]} ${styles["front-separator"]}`}>[</span>
        <TextScrollHover text={title} />
        <span className={`${styles["separator"]} ${styles["front-separator"]}`}>]</span>
      </span>
    </LinkHandler>
  )
}

export default React.memo(HeaderItem)
