'use client'
import React from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/css/header.module.css";


const HeaderMobile = () => {
  const pathName = usePathname();
  const [menuIsOpen, setMenuIsOpen] = React.useState(true);

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <>
      <div className={styles["header-mobile"]}>
        <div className={styles["name-logo"]}>Lucas Oliveira</div>
        <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(true) }}>[ Menu ]</button>
      </div>
      {menuIsOpen && (
        <div className={styles["mobile-menu-overlay"]}>
          <div className={styles["mobile-menu-overlay__top-items"]}>
            <div className={styles["name-logo"]}>Lucas Oliveira</div>
            <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(false) }}>[ Menu ]</button>
          </div>
          <div className={styles["mobile-menu-overlay__navigation-items"]}>
            <span className={styles["navigation-item"]}>HOME</span>
            <span className={styles["navigation-item"]}>PROJECTS</span>
            <span className={styles["navigation-item"]}>ABOUT ME</span>
            <span className={styles["navigation-item"]}>BLOG</span>
          </div>
          <div className={styles["mobile-menu-overlay__menu-footer"]}>
            <div className={styles["mobile-menu-overlay__menu-footer__social-links"]}>
              <span className={`${styles["social-link"]} ${styles["contact-me-button"]}`}>Contact Me</span>
              <span className={styles["social-link"]}>My Resume</span>
              <span className={styles["social-link"]}>Linkedin</span>
              <span className={styles["social-link"]}>Instagram</span>
              <span className={styles["social-link"]}>X / Twitter</span>
              <span className={styles["social-link"]}>Medium</span>
            </div>
            <div className={styles["mobile-menu-overlay__menu-footer__quickly-message"]}>
              <span className={styles["message"]}>I DESIGN MEMORABLE WEB EXPERIENCES FOR BRANDS OF ALL SIZES</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMobile;
