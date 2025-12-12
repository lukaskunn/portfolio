import React from 'react'
import styles from "@/styles/css/project.module.css"
import Image from 'next/image'
import type { ProjectOverview } from '@/utils/types'

const Overview = ({ title, type, service, industry, year, descriptionLeft, descriptionRight, mainImageUrl, subtitle }: ProjectOverview) => {
  return (
    <section className={styles["overview-section"]}>
      <div className={styles["main-image-wrapper"]}>
        <Image
          src={mainImageUrl}
          alt={title}
          width={1360}
          height={600}
          className={styles["main-image"]}
        />
      </div>
      <div className={styles["overview-header"]}>
        <h1 className={styles["project-title"]}>{title}</h1>
        <h2 className={styles["project-subtitle"]}>{subtitle}</h2>
        <div className={styles["project-meta"]}>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>[type]</span>
            <span className={styles["meta-value"]}>{type}</span>
          </div>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>[service]</span>
            <span className={styles["meta-value"]}>{service}</span>
          </div>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>[industry]</span>
            <span className={styles["meta-value"]}>{industry}</span>
          </div>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>[year]</span>
            <span className={styles["meta-value"]}>{year}</span>
          </div>
        </div>
      </div>

      <div className={styles["overview-content"]}>
        <div className={styles["description-wrapper"]}>
          <p className={styles["description-text"]} dangerouslySetInnerHTML={{ __html: descriptionLeft }} />
          <p className={styles["description-text"]} dangerouslySetInnerHTML={{ __html: descriptionRight }} />
        </div>
      </div>

    </section>
  )
}

export default Overview
