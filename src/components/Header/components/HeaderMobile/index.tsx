'use client'
import React from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/css/header.module.css";
import LinkHandler from "@/components/LinkHandler";

const NAVIGATION_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT ME", href: "/about-me" },
  { label: "BLOG", href: "/blog" },
];

const SOCIAL_LINKS = [
  { label: "Contact Me", href: "/contact", type: "contact" },
  { label: "My Resume", href: "https://example.com/resume", type: "resume" },
  { label: "Linkedin", href: "https://linkedin.com/in/username", type: "social" },
  { label: "Instagram", href: "https://instagram.com/username", type: "social" },
  { label: "X / Twitter", href: "https://twitter.com/username", type: "social" },
  { label: "Medium", href: "https://medium.com/@username", type: "social" },
];


const HeaderMobile = () => {
  const pathName = usePathname();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <>
      <div className={styles["header-mobile"]}>
        <div className={styles["name-logo"]}>Lucas Oliveira</div>
        <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(true) }}>[ Menu ]</button>
      </div>

      <div className={`${styles["mobile-menu-overlay"]} ${menuIsOpen ? styles["open"] : styles["closed"]}`}>
        <div className={styles["mobile-menu-overlay__top-items"]}>
          <div className={styles["name-logo"]}>Lucas Oliveira</div>
          <button className={styles["open-menu-button"]} onClick={() => { setMenuIsOpen(false) }}>[ Menu ]</button>
        </div>
        <div className={styles["mobile-menu-overlay__navigation-items"]}>
          {NAVIGATION_ITEMS.map((item) => (
            <LinkHandler key={item.href} className={styles["navigation-item"]} href={item.href}>{item.label}</LinkHandler>
          ))}
        </div>
        <div className={styles["mobile-menu-overlay__menu-footer"]}>
          <div className={styles["mobile-menu-overlay__menu-footer__social-links"]}>
            {SOCIAL_LINKS.map((link) => (
              <LinkHandler key={link.href} className={`${styles["social-link"]} ${link.type === "contact" ? styles["contact-link"] : ""}`} href={link.href}>{link.label}</LinkHandler>
            ))}
          </div>
          <div className={styles["mobile-menu-overlay__menu-footer__quickly-message"]}>
            <span className={styles["message"]}>I DESIGN MEMORABLE WEB EXPERIENCES FOR BRANDS OF ALL SIZES</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
