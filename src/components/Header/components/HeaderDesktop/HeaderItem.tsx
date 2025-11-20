import React from 'react'
import styles from "../../../../styles/css/header.module.css";
import LinkHandler from '@/components/LinkHandler';

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
        {title}
        <span className={`${styles["separator"]} ${styles["front-separator"]}`}>]</span></span>
    </LinkHandler>
  )
}

export default HeaderItem