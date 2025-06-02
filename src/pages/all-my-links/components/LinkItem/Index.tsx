'use client';
import React from "react";
import styles from "../../AllMyLinks.module.css";
import { useHover } from "usehooks-ts";

type LinkItemProps = {
  title: string;
  link: string;
  textHover: string;
  openInNewPage?: boolean;
};

const LinkItem = ({ link, title, openInNewPage, textHover }: LinkItemProps) => {
  const linkItemRef = React.useRef(null);
  const isHover = useHover(linkItemRef);
  return (
    <a
      href={link}
      className={styles["single-item"]}
      target={openInNewPage ? "_blank" : "_self"}
      rel="noopener noreferrer"
      ref={linkItemRef}
    >
      {isHover ? textHover : title}
    </a>
  );
};

export default LinkItem;
