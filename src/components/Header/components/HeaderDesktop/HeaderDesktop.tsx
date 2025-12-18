'use client'
import React from "react";
import HeaderItem from "./HeaderItem";
import DownloadResumeButton from "./DownloadResumeButton";
import ContactMeButton from "./ContactMeButton";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import LineRevealContainer from "@/components/animations/LineReveal";
import styles from "../../../../styles/css/header.module.css";
import { ANIMATION_DELAYS, ANIMATION_TIME } from "@/utils/animationVars"
const HeaderDesktop = () => {
  const { currentContent } = useLanguage();
  const { header } = currentContent;

  return (
    <div className={styles["header-desktop"]}>
      <LineRevealContainer direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header}>
        <Link href="/home" className={styles["name-logo"]}>{header.headerTitle}</Link>
      </LineRevealContainer>
      <div className={styles["header-desktop__header-menu"]}>
        {header.menuItems.map((item, index) => (
          <LineRevealContainer key={item.title} direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header + (index + 1) * 0.1}>
            <HeaderItem title={item.title} link={item.link} />
          </LineRevealContainer>
        ))}
        <LineRevealContainer direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header + (header.menuItems.length + 1) * 0.1}>
          <DownloadResumeButton />
        </LineRevealContainer>

        <LineRevealContainer direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header + (header.menuItems.length + 2) * 0.1}>
          <ContactMeButton />
        </LineRevealContainer>
      </div>
    </div>
  );
};

export default HeaderDesktop;
