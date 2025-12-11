'use client'
import React from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/css/header.module.css";
import LinkHandler from "@/components/LinkHandler";
import { useLanguage } from "@/contexts/LanguageContext";

const HeaderMobile = () => {
  const pathName = usePathname();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { currentContent } = useLanguage();
  const { header } = currentContent;

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <>
      <div className={styles["header-mobile"]}>
        <div className={styles["name-logo"]}>{header.headerTitle}</div>
        <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(true) }}>[ Menu ]</button>
      </div>

      <div className={`${styles["mobile-menu-overlay"]} ${menuIsOpen ? styles["open"] : styles["closed"]}`}>
        <div className={styles["mobile-menu-overlay__top-items"]}>
          <div className={styles["name-logo"]}>{header.headerTitle}</div>
          <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(false) }}>[ Menu ]</button>
        </div>
        <div className={styles["mobile-menu-overlay__container"]}>
          <div className={styles["mobile-menu-overlay__container__navigation-items"]}>
            {header.mobileNavigation.map((item) => (
              <LinkHandler key={item.href} className={styles["navigation-item"]} href={item.href}>{item.label}</LinkHandler>
            ))}
          </div>
          <div className={styles["mobile-menu-overlay__container__menu-footer"]}>
            <div className={styles["mobile-menu-overlay__container__menu-footer__social-links"]}>
              {header.socialLinks.map((link) => (
                <LinkHandler key={link.href} className={`${styles["social-link"]} ${link.type === "contact" ? styles["contact-link"] : ""}`} href={link.href}>{link.label}</LinkHandler>
              ))}
            </div>
            <div className={styles["mobile-menu-overlay__container__menu-footer__quickly-message"]}>
              <span className={styles["message"]}>{header.mobileQuickMessage}</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default HeaderMobile;
