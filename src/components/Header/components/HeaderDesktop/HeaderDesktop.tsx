'use client'
import React from "react";
import HeaderItem from "./HeaderItem";
import DownloadResumeButton from "./DownloadResumeButton";
import ContactMeButton from "./ContactMeButton";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

import styles from "../../../../styles/css/header.module.css";

const HeaderDesktop = () => {
  const { currentContent } = useLanguage();
  const { header } = currentContent;

  return (
    <div className={styles["header-desktop"]}>
      <Link href="/home" className={styles["name-logo"]}>{header.headerTitle}</Link>
      <div className={styles["header-desktop__header-menu"]}>
        {header.menuItems.map((item) => (
          <HeaderItem key={item.title} title={item.title} link={item.link} />
        ))}
        <DownloadResumeButton />
        <ContactMeButton />
      </div>
    </div>
  );
};

export default HeaderDesktop;
