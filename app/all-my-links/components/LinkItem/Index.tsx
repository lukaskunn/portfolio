import React from "react";
import styles from "../../AllMyLinks.module.css";

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
      <span
        className={styles["item-hover"]}
        dangerouslySetInnerHTML={{ __html: textHover }}
      />
      <span
        className={styles["item-visible"]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </a>
  );
};

export default LinkItem;
