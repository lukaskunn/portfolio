'use client'
import React from "react";
import { LuArrowUpRight } from "react-icons/lu";
// import { useLanguage } from "@/contexts/LanguageContext";

import styles from "../../../../styles/css/header.module.css";

const HeaderDesktop = () => {
  
  // const { currentLanguage } = useLanguage();
  // const { menuItems } = currentLanguage.header;

  return (
    <div className={styles["header-desktop"]}>
      <span className={styles["name-logo"]}>LUCAS OLIVEIRA</span>
      <div className={styles["header-desktop__header-menu"]}>
        <span className={styles["menu-item"]}>[ Home ]</span>
        <span className={styles["menu-item"]}>[ Projects ]</span>
        <span className={styles["menu-item"]}>[ About Me ]</span>
        <span className={styles["menu-item"]}>[ Blog ]</span>
        <span className={styles["menu-item"]}>[ My Resume ]</span>
        <span className={`${styles["menu-item"]} ${styles["contact-me-button"]}`}>Contact Me <LuArrowUpRight className={styles["button-arrow"]} size={"1.4em"}/></span>
      </div>
    </div>
  );
};

export default HeaderDesktop;
