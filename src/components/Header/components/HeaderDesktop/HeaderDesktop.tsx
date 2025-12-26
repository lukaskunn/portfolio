'use client'
import React from "react";
import HeaderItem from "./HeaderItem";
import DownloadResumeButton from "./DownloadResumeButton";
import ContactMeButton from "./ContactMeButton";
import LinkHandler from "@/components/LinkHandler";
import LineRevealContainer from "@/components/animations/LineReveal";
import styles from "../../../../styles/css/header.module.css";
import { ANIMATION_DELAYS, ANIMATION_TIME } from "@/utils/animationVars"

interface HeaderDesktopProps {
  data: any; // Sanity header content
}

const HeaderDesktop = ({ data }: HeaderDesktopProps) => {
  return (
    <div className={styles["header-desktop"]}>
      <LineRevealContainer direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header}>
        <LinkHandler href="/home" className={styles["name-logo"]}>{data.headerTitle}</LinkHandler>
      </LineRevealContainer>
      <div className={styles["header-desktop__header-menu"]}>
        {data.menuItems?.map((item: any, index: number) => (
          <LineRevealContainer key={item.text} direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header + (index + 1) * 0.1}>
            <HeaderItem title={item.text} link={item.url} />
          </LineRevealContainer>
        ))}
        <LineRevealContainer direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header + ((data.menuItems?.length || 0) + 1) * 0.1}>
          <DownloadResumeButton data={data.resumeButton} />
        </LineRevealContainer>

        <LineRevealContainer direction="down" duration={ANIMATION_TIME.header} delay={ANIMATION_DELAYS.header + ((data.menuItems?.length || 0) + 2) * 0.1}>
          <ContactMeButton data={data.contactButton} />
        </LineRevealContainer>
      </div>
    </div>
  );
};

export default HeaderDesktop;
