'use client'
import React, { Fragment } from "react";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { useCursor } from "../../src/contexts/CursorContext";

import styles from "./Home.module.css";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();

  return (
    <div className={styles["language-selector-container"]}>
      {[
        { code: "en", label: "EN", tooltip: "Switch language to English" },
        { code: "pt", label: "PT", tooltip: "Switch language to Portuguese" },
      ].map((lang, index, arr) => (
        <Fragment key={lang.code}>
          <button
            className={`${styles["language-selector"]} ${language === lang.code ? styles.selected : ""}`}
            onClick={() => changeLanguage(lang.code as "en" | "pt")}
            onMouseEnter={() => handleModalPropsEnter(lang.tooltip, false)}
            onMouseLeave={() => handleModalPropsLeave(lang.tooltip)}
          >
            {lang.label}
          </button>
          {index < arr.length - 1 && "/"}
        </Fragment>
      ))}
    </div>
  );
};

export default LanguageSelector;
