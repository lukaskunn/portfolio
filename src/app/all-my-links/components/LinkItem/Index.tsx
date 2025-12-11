import React from "react";
import styles from "@/styles/css/all-my-links.module.css";

type LinkItemProps = {
  title: string;
  link: string;
  textHover: string;
  openInNewPage?: boolean;
};

const LinkItem = ({ link, title, openInNewPage, textHover }: LinkItemProps) => {
  return (
    <a
      href={link}
      className={styles["single-item"]}
      target={openInNewPage ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <span className={styles["item-hover"]}>{textHover}</span>
      <span className={styles["item-visible"]}>{title}</span>
    </a>
  );
};

export default LinkItem;
