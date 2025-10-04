'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../../../contexts/LanguageContext";
import MenuItemsList from "../../MenuItemsList";
import DownloadResumeButton from "../../DownloadResumeButton";
import ContactMeButton from "../../ContactMeButton";

import styles from "../../header.module.css";

const HeaderDesktop = () => {
  const pathName = usePathname();
  const { currentLanguage } = useLanguage();
  const { menuItems } = currentLanguage.header;

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <div
      className={styles["header-container"]}
      style={{ background: pathName === "/" ? "none" : "#0a0a0a" }}
    >
      <div className={styles["navigation-container"]}>
        <MenuItemsList menuItems={menuItems} />
      </div>
      <div className={styles["buttons-container"]}>
        <DownloadResumeButton />
        <ContactMeButton />
      </div>
    </div>
  );
};

export default HeaderDesktop;
