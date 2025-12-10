'use client'
import React from "react";
import HeaderItem from "./HeaderItem";
import DownloadResumeButton from "./DownloadResumeButton";
import ContactMeButton from "./ContactMeButton";
import Link from "next/link";

import styles from "../../../../styles/css/header.module.css";

const LINK_ITEMS = [
  { title: "Home", link: "/home" },
  { title: "Projects", link: "/projects" },
  { title: "About Me", link: "/about-me" },
  // { title: "Blog", link: "/blog" }
];

const HeaderDesktop = () => {
  
  // const { currentLanguage } = useLanguage();
  // const { menuItems } = currentLanguage.header;

  return (
    <div className={styles["header-desktop"]}>
      <Link href="/home" className={styles["name-logo"]}>Lucas Oliveira</Link>
      <div className={styles["header-desktop__header-menu"]}>
        {LINK_ITEMS.map((item) => (
          <HeaderItem key={item.title} title={item.title} link={item.link} />
        ))}
        <DownloadResumeButton />
        <ContactMeButton />
      </div>
    </div>
  );
};

export default HeaderDesktop;
