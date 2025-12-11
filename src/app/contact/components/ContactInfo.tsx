'use client';

import React from 'react';
import styles from '@/styles/css/contact.module.css';
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from '@/contexts/LanguageContext';

const ContactInfo: React.FC = () => {
  const { currentContent } = useLanguage();
  const { contact } = currentContent;

  return (
    <div className={styles.contactInfo}>
      <div className={styles.contactDetails}>
        <a href={`tel:${contact.contactInfo.phone.replace(/\s/g, '')}`} className={styles.contactPhone}>
          {contact.contactInfo.phone}
        </a>
        <a href={`mailto:${contact.contactInfo.email}`} className={styles.contactEmail}>
          {contact.contactInfo.email}
        </a>
      </div>

      <div className={styles.socialLinks}>
        {contact.socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            {link.name} <FiArrowUpRight className={styles.linkArrow} size={14} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
