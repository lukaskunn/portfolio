import React from 'react'
import styles from "@/styles/css/about-me.module.css"

const CertificationsSection = () => {
  return (
    <section className={styles["certifications-section"]}>
      <div className={styles["section-layout"]}>
        <h2 className={styles["section-title"]}>Certifications</h2>
        <div className={styles["certifications-table"]}>
          <div className={styles["table-header"]}>
            <span className={styles["header-cell"]}>Subject</span>
            <span className={styles["header-cell"]}>Source</span>
          </div>

          <div className={styles["table-row"]}>
            <ul className={styles["row-content"]}>
              <li className={styles["cell-text"]}>Computer Science Degree</li>
            </ul>
            <span className={styles["cell-text"]}>FEI College</span>
          </div>

          <div className={styles["table-row"]}>
            <ul className={styles["row-content"]}>
              <li className={styles["cell-text"]}>React + Next.js</li>
              <li className={styles["cell-text"]}>Testes automatizados</li>
              <li className={styles["cell-text"]}>segurança</li>
            </ul>
            <span className={styles["cell-text"]}>Alura</span>
          </div>

          <div className={styles["table-row"]}>
            <ul className={styles["row-content"]}>
              <li className={styles["cell-text"]}>Three.js journey</li>
            </ul>
            <span className={styles["cell-text"]}>Three.js journey</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection
