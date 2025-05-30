import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaXTwitter,
} from "react-icons/fa6";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { useCursor } from "../../contexts/CursorContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePageContext } from "../../contexts/PageContext";
import useDevice from "../../hooks/useDevice";
import useScroll from "../../hooks/useScroll";
import { useTransition } from "../../Layouts/TransitionProvider";
import MenuItem from "./components/MenuItem";
import styles from "./header.module.css";

// Types
interface MenuItemType {
  text: string;
  href: string;
}

interface MenuItemsListProps {
  isMobile: boolean;
  menuItems: MenuItemType[];
}

// Constants
const ANIMATION_TIMING = {
  HEADER_SLIDE_IN: 0.8,
  MENU_OPEN: 0.6,
  MENU_CLOSE: 0.7,
  ROUTE_CHANGE_DELAY: 1200,
  DEFAULT_DELAY: 1000,
};

const SocialIcons = () => (
  <div className={styles["social-media-icons"]}>
    <a
      href="https://www.linkedin.com/in/lucas-oliveira-0b1a1b1b8/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
    >
      <FaLinkedin />
    </a>
    <a
      href="https://www.instagram.com/lucas_oliveira.dev/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram profile"
    >
      <FaInstagram />
    </a>
    <a
      href="https://twitter.com/lucas_oliveira_"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter profile"
    >
      <FaXTwitter />
    </a>
    <a
      href="https://medium.com/@lucas_oliveira"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Medium profile"
    >
      <FaMedium />
    </a>
  </div>
);

const MenuItemsList = ({ menuItems, isMobile = false }: MenuItemsListProps) => (
  <>
    {menuItems.map((item: MenuItemType, index: number) => (
      <Link
        scroll={false}
        href={item.href}
        className={styles["menu-item"]}
        key={`menu-item-${index}-${isMobile ? "mobile" : "desktop"}`}
      >
        {isMobile ? item.text : <MenuItem text={item.text} cursorSize="medium" />}
      </Link>
    ))}
  </>
);

const LanguageSwitcher = () => {
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();
  const { changeLanguage, language } = useLanguage();

  return (
    <div className={styles["switch-language-container"]}>
      <span className={styles["switch-language-text"]}>
        switch language
      </span>
      <div className={styles["language-selector-container"]}>
        <button
          className={`${styles["language-selector"]} ${language === "en" ? styles.selected : ""}`}
          onClick={() => changeLanguage("en")}
          onMouseEnter={() => handleModalPropsEnter("Switch language to English", false)}
          onMouseLeave={() => handleModalPropsLeave("Switch language to English")}
          aria-label="Switch language to English"
        >
          EN
        </button>
        /
        <button
          className={`${styles["language-selector"]} ${language === "pt" ? styles.selected : ""}`}
          onClick={() => changeLanguage("pt")}
          onMouseEnter={() => handleModalPropsEnter("Switch language to Portuguese", false)}
          onMouseLeave={() => handleModalPropsLeave("Switch language to Portuguese")}
          aria-label="Switch language to Portuguese"
        >
          PT
        </button>
      </div>
    </div>
  );
};

function Header() {
  const router = useRouter();
  const { timeline } = useTransition();
  const { isLoaded } = usePageContext();
  const { isMobile, isSmallTablet } = useDevice();
  const [currentRoute, setCurrentRoute] = useState(router.asPath);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();
  const { currentLanguage } = useLanguage();
  const { hasScrolled } = useScroll(100);
  const pathName = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  const { menuItems } = currentLanguage.header;
  const isMobileView = isMobile || isSmallTablet;

  // Setup animations
  useEffect(() => {
    if (!headerRef.current) return;

    gsap.to(headerRef.current, {
      top: hasScrolled ? 30 : isMobileView ? 30 : 70,
      ease: "power3.out",
      duration: 0.5,
    });
  }, [hasScrolled, isMobileView]);

  useIsomorphicLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.to(`.${styles.header}`, {
      top: -100,
      duration: 0.5,
      ease: "power2.inOut",
    }, 0);

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
  }, [timeline, router.asPath]);

  useEffect(() => {
    if (!isLoaded) return;

    const delay = router.asPath !== currentRoute
      ? ANIMATION_TIMING.ROUTE_CHANGE_DELAY
      : ANIMATION_TIMING.DEFAULT_DELAY;

    setTimeout(() => {
      gsap.to(`.${styles.header}`, {
        top: isMobileView ? 30 : 70,
        opacity: 1,
        duration: ANIMATION_TIMING.HEADER_SLIDE_IN,
        ease: "power3.out",
      });
    }, delay);

    setCurrentRoute(router.asPath);
  }, [router.asPath, isLoaded, isMobileView, currentRoute]);

  useEffect(() => {
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
    <header className={styles.header} ref={headerRef}>
      <div
        className={styles["header-container"]}
        style={{ background: pathName === "/" ? "none" : "#0a0a0a" }}
      >
        <div className={styles["navigation-container"]}>
          <MenuItemsList menuItems={menuItems} isMobile={isMobileView} />
        </div>
        <div className={styles["buttons-container"]}>
          <a
            href="/resume"
            className={`${styles["menu-item"]} ${styles["menu-item-bold"]}`}
            onMouseEnter={() => handleModalPropsEnter("download my resume", true)}
            onMouseLeave={() => handleModalPropsLeave("download my resume")}
          >
            <MenuItem text="/My resume" />
          </a>
          <a href="/contact" className={styles["header-button"]}>
            /Contact Me
          </a>
        </div>
      </div>

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
            <MenuItemsList isMobile={isMobileView} menuItems={menuItems} />
          </div>
          <div className={styles["menu-footer"]}>
            <a
              href="/resume"
              className={styles["menu-item__bold"]}
              onMouseEnter={() => handleModalPropsEnter("download my resume", true)}
              onMouseLeave={() => handleModalPropsLeave("download my resume")}
            >
              My Resume
            </a>
            <a href="/contact" className={styles["header-button"]}>
              /Contact Me
            </a>
            <SocialIcons />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
