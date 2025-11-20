import React from 'react'
import styles from "@/styles/css/footer.module.css";

interface SocialLinkProps {
  name: string;
  url: string;
}

const SocialLink = ({
  name,
  url
}: SocialLinkProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles["social-link"]}
    >
      <span className={`${styles["separator"]} ${styles["front-separator"]}`}>[</span>
      {name}
      <span className={`${styles["separator"]} ${styles["front-separator"]}`}>]</span>
    </a>
  )
}

export default SocialLink