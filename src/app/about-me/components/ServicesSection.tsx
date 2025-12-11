'use client'
import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import { useLanguage } from '@/contexts/LanguageContext'

const ServicesSection = () => {
  const { currentContent } = useLanguage();
  const { services } = currentContent;

  return (
    <section className={styles["services-section"]}>
      <div className={styles["section-layout"]}>
        <h2 className={styles["section-title"]}>{services.sectionTitle}</h2>
        <div className={styles["services-grid"]}>
          {services.items.map((service, index) => (
            <div key={index} className={styles["service-card"]}>
              <h3 className={styles["service-title"]}>{service.title}</h3>
              <p className={styles["service-subtitle"]}>{service.subtitle}</p>
              <p className={styles["service-description"]}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
