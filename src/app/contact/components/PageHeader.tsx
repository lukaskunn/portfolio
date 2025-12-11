'use client';

import React from 'react';
import styles from '@/styles/css/contact.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

const PageHeader: React.FC = () => {
  const { currentContent } = useLanguage();
  const { contact } = currentContent;

  return (
    <header className={styles.pageHeader}>
      <span className={styles.subtitle}>{contact.pageHeader.subtitle}</span>
      <h1 className={styles.title}>
        {contact.pageHeader.title}
        <span className={styles.titleAccent}>{contact.pageHeader.titleAccent}</span>
        {contact.pageHeader.titleEnd}
      </h1>
    </header>
  );
};

export default PageHeader;
