'use client'
import React from "react";
import { FaBars } from "react-icons/fa6";
import { useLanguage } from "../../../../contexts/LanguageContext";
import MenuItemsList from "../../MenuItemsList";
import DownloadResumeButton from "../../DownloadResumeButton";
import ContactMeButton from "../../ContactMeButton";
import LanguageSwitcher from "../../LanguageSwitcher";
import SocialIcons from "../../SocialIcons";
import styles from "../../header.module.css";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { useTransition } from "../../../../contexts/TransitionContext";


const ANIMATION_TIMING = {
  HEADER_SLIDE_IN: 0.8,
  MENU_OPEN: 0.6,
  MENU_CLOSE: 0.7,
  ROUTE_CHANGE_DELAY: 1200,
  DEFAULT_DELAY: 1000,
};

const HeaderMobile = () => {
  const pathName = usePathname();
  const { currentLanguage } = useLanguage();
  const { menuItems } = currentLanguage.header;
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { timeline } = useTransition();

  useIsomorphicLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.to(`.${styles["header-mobile-background"]}`, {
      left: "-100%",
      duration: 0.4,
      ease: "power3.in",
    }, 0);

    tl.to(`.${styles["header-mobile"]}`, {
      left: "-100%",
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setMenuIsOpen(false),
    }, 0);

    timeline.add(tl, 0);
    return () => { tl.kill(); };
  }, [timeline, pathName]);
  // }, [timeline, router.asPath]);

  React.useEffect(() => {
    gsap.to(`.${styles["header-mobile-background"]}`, {
      left: menuIsOpen ? 0 : "-100%",
      duration: menuIsOpen ? ANIMATION_TIMING.MENU_OPEN : ANIMATION_TIMING.MENU_CLOSE,
      ease: menuIsOpen ? "power3.out" : "power3.in",
    });

    gsap.to(`.${styles["header-mobile"]}`, {
      left: menuIsOpen ? 0 : "-100%",
      duration: menuIsOpen ? 0.9 : 0.5,
      ease: menuIsOpen ? "power3.inOut" : "power3.in",
    });
  }, [menuIsOpen]);

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <>
      <button
        className={styles["open-close-menu"]}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        aria-label={menuIsOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuIsOpen}
      >
        <FaBars size={28} />
      </button>

      <div className={styles["header-mobile-container"]}>
        <div
          className={styles["header-mobile-background"]}
          onClick={() => setMenuIsOpen(false)}
        />
        <div className={styles["header-mobile"]}>
          <LanguageSwitcher />
          <div className={styles["navigation-container"]}>
            <MenuItemsList menuItems={menuItems} />
          </div>
          <div className={styles["menu-footer"]}>
            <DownloadResumeButton />
            <ContactMeButton />
            <SocialIcons />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
