import React from 'react'
import {
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaXTwitter,
} from "react-icons/fa6";
import styles from "./header.module.css"

const SocialIcons = () => (
  <div className={styles["social-media-icons"]}>
    <a
      href="https://www.linkedin.com/in/lucas-oliveira-0b1a1b1b8/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
    >
      <FaLinkedin />
    </a>
    <a
      href="https://www.instagram.com/lucas_oliveira.dev/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram profile"
    >
      <FaInstagram />
    </a>
    <a
      href="https://twitter.com/lucas_oliveira_"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter profile"
    >
      <FaXTwitter />
    </a>
    <a
      href="https://medium.com/@lucas_oliveira"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Medium profile"
    >
      <FaMedium />
    </a>
  </div>
);
export default SocialIcons