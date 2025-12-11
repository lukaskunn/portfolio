'use client'
import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import { useLanguage } from '@/contexts/LanguageContext'

const CertificationsSection = () => {
  const { currentContent } = useLanguage();
  const { aboutMe } = currentContent;

  return (
    <section className={styles["certifications-section"]}>
      <div className={styles["section-layout"]}>
        <h2 className={styles["section-title"]}>{aboutMe.certifications.title}</h2>
        <div className={styles["certifications-table"]}>
          <div className={styles["table-header"]}>
            {aboutMe.certifications.tableHeaders.map((header, index) => (
              <span key={index} className={styles["header-cell"]}>{header}</span>
            ))}
          </div>

          {aboutMe.certifications.items.map((item, index) => (
            <div key={index} className={styles["table-row"]}>
              <ul className={styles["row-content"]}>
                {item.subjects.map((subject, subIndex) => (
                  <li key={subIndex} className={styles["cell-text"]}>{subject}</li>
                ))}
              </ul>
              <span className={styles["cell-text"]}>{item.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection
