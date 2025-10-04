import React from "react";
import { useCursor } from "../../contexts/CursorContext";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./header.module.css"

const LanguageSwitcher = () => {
  const { changeLanguage, language } = useLanguage();
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();

  return (
    <div className={styles["switch-language-container"]}>
      <span className={styles["switch-language-text"]}>
        switch language
      </span>
      <div className={styles["language-selector-container"]}>
        <button
          className={`${styles["language-selector"]} ${language === "en" ? styles.selected : ""}`}
          onClick={() => changeLanguage("en")}
          onMouseEnter={() => handleModalPropsEnter("Switch language to English", false)}
          onMouseLeave={() => handleModalPropsLeave("Switch language to English")}
          aria-label="Switch language to English"
        >
          EN
        </button>
        /
        <button
          className={`${styles["language-selector"]} ${language === "pt" ? styles.selected : ""}`}
          onClick={() => changeLanguage("pt")}
          onMouseEnter={() => handleModalPropsEnter("Switch language to Portuguese", false)}
          onMouseLeave={() => handleModalPropsLeave("Switch language to Portuguese")}
          aria-label="Switch language to Portuguese"
        >
          PT
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;