'use client';

import React from 'react';
import styles from '@/styles/css/contact.module.css';

const PageHeader: React.FC = () => {
  return (
    <header className={styles.pageHeader}>
      <span className={styles.subtitle}>LET&apos;S START THE CONVERSATION</span>
      <h1 className={styles.title}>
        GREAT DESIGN
        <span className={styles.titleAccent}>S T A R T S &nbsp; W I T H</span>
        GREAT COLLABORATION
      </h1>
    </header>
  );
};

export default PageHeader;
