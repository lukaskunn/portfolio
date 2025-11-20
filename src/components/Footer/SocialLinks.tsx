import React from 'react'
import styles from "@/styles/css/footer.module.css";

import SocialLink from './SocialLink';

interface SocialLink {
  name: string;
  url: string;
}

interface SocialLinksProps {
  links?: SocialLink[]
}

const DEFAULT_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Twitter', url: 'https://twitter.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
];

const SocialLinks = ({
  links = DEFAULT_LINKS
}: SocialLinksProps) => {
  return (
    <div className={styles["social-links-container"]}>
      {links.map((link) => (
        <SocialLink
          key={link.name}
          name={link.name}
          url={link.url}
        />
      ))}
    </div>
  )
}

export default SocialLinks