'use client'
import React from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/css/header.module.css";
import LinkHandler from "@/components/LinkHandler";
import gsap from "gsap";
import LineRevealContainer from "@/components/animations/LineReveal";
import { ANIMATION_DELAYS } from "@/utils/animationVars";

import type { HeaderMobileProps, MobileNavItem, Link } from '@/types';

const HeaderMobile = ({ data }: HeaderMobileProps) => {
  const pathName = usePathname();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [showMenuItems, setShowMenuItems] = React.useState(false);
  const menuOverlayRef = React.useRef<HTMLDivElement>(null);
  const menuOverlayBackground = React.useRef<HTMLDivElement>(null);
  const menuItemsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (menuIsOpen) {
      gsap.to(menuOverlayBackground.current, {
        left: 0,
        duration: 1,
        ease: "power4.out",
      });
      gsap.to(menuOverlayRef.current, {
        left: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.15,
        onComplete: () => {
          setShowMenuItems(true);
        }
      });
    } else {
      gsap.to(menuOverlayBackground.current, {
        left: "-104%",
        duration: 0.7,
        ease: "power4.in",
        delay: 0.2,
      });
      gsap.to(menuOverlayRef.current, {
        left: "-104%",
        duration: 0.7,
        ease: "power4.in",
        onComplete: () => {
          setShowMenuItems(false);
        }
      });
    }
  }, [menuIsOpen]);

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <>
      <div className={styles["header-mobile"]}>
        <LineRevealContainer direction="down" delay={ANIMATION_DELAYS.header}>
          <div className={styles["name-logo"]}>{data.headerTitle}</div>
        </LineRevealContainer>
        <LineRevealContainer direction="down" delay={0.1 + ANIMATION_DELAYS.header}>
          <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(true) }}>[ Menu ]</button>
        </LineRevealContainer>
      </div>

      <div className={styles["mobile-menu-overlay-background"]} ref={menuOverlayBackground} />
      <div className={`${styles["mobile-menu-overlay"]} ${menuIsOpen ? styles["open"] : styles["closed"]}`} ref={menuOverlayRef}>
        <div className={styles["mobile-menu-overlay__top-items"]}>
          <LineRevealContainer
            direction="down"
            duration={0.8}
            trigger={showMenuItems}
          >
            <div className={styles["name-logo"]}>{data.headerTitle}</div>
          </LineRevealContainer>
          <LineRevealContainer
            direction="down"
            duration={0.8}
            trigger={showMenuItems}
          >
            <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(false) }}>[ Menu ]</button>
          </LineRevealContainer>
        </div>
        <div className={styles["mobile-menu-overlay__container"]} ref={menuItemsRef}>
          <div className={styles["mobile-menu-overlay__container__navigation-items"]}>
            {data.mobileNavigation?.map((item: MobileNavItem, index: number) => (
              <LineRevealContainer
                key={item.href}
                direction="up"
                delay={index * 0.08}
                duration={0.8}
                trigger={showMenuItems}
              >
                <LinkHandler data-line-reveal className={styles["navigation-item"]} href={item.href} onClick={() => {
                  setMenuIsOpen(false)
                }}>{item.label}</LinkHandler>
              </LineRevealContainer>
            ))}
          </div>
          <div className={styles["mobile-menu-overlay__container__menu-footer"]}>
            <LineRevealContainer
              direction="up"
              delay={(data.mobileNavigation?.length || 0) * 0.08}
              duration={0.8}
              trigger={showMenuItems}
            >
              <div className={styles["mobile-menu-overlay__container__menu-footer__social-links"]}>
                {data.socialLinks?.map((link: Link) => (
                  <LinkHandler key={link.url} className={`${styles["social-link"]} ${link.type === "contact" ? styles["contact-link"] : ""}`} href={link.url}>{link.text}</LinkHandler>
                ))}
              </div>
            </LineRevealContainer>
            <LineRevealContainer
              direction="up"
              delay={(data.mobileNavigation?.length || 0) * 0.08 + 0.1}
              duration={0.8}
              trigger={showMenuItems}
            >
              <div className={styles["mobile-menu-overlay__container__menu-footer__quickly-message"]}>
                <span className={styles["message"]}>{data.mobileQuickMessage}</span>
              </div>
            </LineRevealContainer>
          </div>
        </div>

      </div>
    </>
  );
};

export default HeaderMobile;
