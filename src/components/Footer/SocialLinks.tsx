import React from 'react'
import styles from "@/styles/css/footer.module.css";
import { useLanguage } from '@/contexts/LanguageContext';
import SocialLink from './SocialLink';


const SocialLinks = () => {
  const { currentContent } = useLanguage();
  const links = currentContent.header.socialLinks

  return (
    <div className={styles["social-links-container"]}>
      {links.map((link) => (
        <SocialLink
          key={link.label}
          name={link.label}
          url={link.href}
        />
      ))}
    </div>
  )
}

export default SocialLinks