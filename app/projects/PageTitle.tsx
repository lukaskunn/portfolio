"use client";
import React from "react";
import { useLanguage } from "../../src/contexts/LanguageContext";

import styles from "./Works.module.css";

const PageTitle = () => {
  const { currentLanguage } = useLanguage();
  const { sectionTitle, projects } = currentLanguage.works;

  return (
    <div className={styles["title-container"]}>
      <h2
        className={styles["section-title"]}
        dangerouslySetInnerHTML={{ __html: sectionTitle }}
      />
      <p
        className={styles["project-counter"]}
        dangerouslySetInnerHTML={{ __html: `(${projects.length})` }}
      />
    </div>
  );
};

export default PageTitle;
