'use client';

import React from 'react';
import styles from '@/styles/css/contact.module.css';
import { FiArrowUpRight } from "react-icons/fi";

interface SocialLink {
  name: string;
  url: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'INSTAGRAM',
    url: 'https://instagram.com/lukaskunn',
  },
  {
    name: 'TELEGRAM',
    url: 'https://t.me/lukaskunn',
  },
  {
    name: 'LINKEDIN',
    url: 'https://linkedin.com/in/lucas-oliveira-997810198/',
  },
];

const ContactInfo: React.FC = () => {
  return (
    <div className={styles.contactInfo}>
      <div className={styles.contactDetails}>
        <a href="tel:+5511999999999" className={styles.contactPhone}>
          +55 11 9 5442-5212
        </a>
        <a href="mailto:lucassioliveira098@gmail.com" className={styles.contactEmail}>
          lucassioliveira098@gmail.com
        </a>
      </div>

      <div className={styles.socialLinks}>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            {link.name} <FiArrowUpRight className={styles.linkArrow} size={14}/>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
