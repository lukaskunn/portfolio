import React from 'react'
import { FaMedium } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

import styles from "./Home.module.css"

const SocialMediaLinks = () => {
  const socialMediaLinksArr = [
    {
      url: "https://www.linkedin.com/in/lucas-oliveira-0b1a1b1b8/",
      icon: <FaLinkedin />,
    },
    {
      url: "https://www.instagram.com/lucas_oliveira.dev/",
      icon: <FaInstagram />,
    },
    { url: "https://twitter.com/lucas_oliveira_", icon: <FaXTwitter /> },
    { url: "https://medium.com/@lucas_oliveira", icon: <FaMedium /> },
  ];

  return (
    <div className={styles["social-media-icons"]}>
      {socialMediaLinksArr.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks