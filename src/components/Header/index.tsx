import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaInstagram, FaLinkedin, FaMedium, FaXTwitter } from "react-icons/fa6";
import { useHover, useIsomorphicLayoutEffect } from "usehooks-ts";
import { useCursor } from "../../contexts/CursorContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { PageContext } from "../../contexts/PageContext";
import type { TransitionContextType } from "../../Layouts/TransitionProvider";
import { TransitionContext } from "../../Layouts/TransitionProvider";
import AnimatePosOpacity from "../../utils/AnimatePosOpacity";
import MenuItem from "./components/MenuItem";
import styles from "./header.module.css";
import useDevice from "../../hooks/useDevice";
declare const window: any;
import useScroll from "../../hooks/useScroll";

function Header() {
  const router = useRouter();
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType;
  const { isLoaded } = React.useContext(PageContext) as any;
  const { isMobile, isSmallTablet } = useDevice();
  const [headerBackground, setHeaderBackground] = useState("none");
  const [currentRoute, setCurrentRoute] = useState(router.asPath);
  const [currentPath, setCurrentPath] = useState(router.asPath);
  const [menuHamburgerIsOpen, setMenuHamburgerIsOpen] = useState(false);
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();
  const { changeLanguage, currentLanguage, language } = useLanguage();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { hasScrolled } = useScroll(100);

  const { header } = currentLanguage;
  const { headerTitle, menuItems } = header;
  const pathName = usePathname();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const isHoveringHeader = useHover(headerRef);
  const languageSelectorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (hasScrolled) {
      gsap.to(`.${styles.header}`, {
        top: 30,
        ease: "power3.out",
        duration: 0.5,
      });
    } else {
      gsap.to(`.${styles.header}`, {
        top: isMobile || isSmallTablet ? 30 : 70,
        ease: "power3.out",
        duration: 0.5,
      });
    }
  }, [hasScrolled]);

  const listenScrollEvent = () => {
    if (window.scrollY < 150 || window.innerWidth < 768) {
      return setHeaderBackground("none");
    } else {
      return setHeaderBackground("black");
    }
  };

  useIsomorphicLayoutEffect(() => {
    timeline.add(
      gsap.to(`.${styles.header}`, {
        top: -100,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );

    timeline.add(
      gsap.to(`.${styles["header-mobile-background"]}`, {
        left: "-100%",
        duration: 0.4,
        ease: "power3.in",
      }),
      0,
    );
    timeline.add(
      gsap.to(`.${styles["header-mobile"]}`, {
        left: "-100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setMenuIsOpen(false);
        },
      }),
      0,
    );
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    setTimeout(
      () => {
        gsap.to(`.${styles.header}`, {
          top: isMobile || isSmallTablet ? 30 : 70,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      },
      router.asPath !== currentRoute ? 1200 : 1000,
    );

    setCurrentRoute(router.asPath);
  }, [router.asPath, isLoaded]);

  useEffect(() => {
    if (menuIsOpen) {
      gsap.to(`.${styles["header-mobile-background"]}`, {
        left: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(`.${styles["header-mobile"]}`, {
        left: 0,
        duration: 0.9,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(`.${styles["header-mobile-background"]}`, {
        left: "-100%",
        duration: 0.7,
        ease: "power3.in",
      });
      gsap.to(`.${styles["header-mobile"]}`, {
        left: "-100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [menuIsOpen]);

  const renderHeader = pathName !== "/all-my-links";

  return (
    renderHeader && (
      <header className={styles.header}>
        <div
          className={styles["header-container"]}
          ref={headerRef}
          style={{ background: pathName === "/" ? "none" : "#0a0a0a" }}
        >
          <div className={styles["navigation-container"]}>
            {menuItems.map((item: any, index: any) => {
              const { text, href } = item;
              return (
                <Link
                  scroll={false}
                  href={href}
                  className={styles["menu-item"]}
                  key={index}
                >
                  <MenuItem
                    text={text}
                    key={`${text}_${index}`}
                    cursorSize="medium"
                  />
                </Link>
              );
            })}
          </div>
          <div className={styles["buttons-container"]}>
            <a
              href="/resume"
              className={styles["menu-item__bold"]}
              onMouseEnter={() => {
                handleModalPropsEnter("download my resume", true);
              }}
              onMouseLeave={() => {
                handleModalPropsLeave("download my resume");
              }}
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
        >
          <FaBars size={28} />
        </button>
        <div className={styles["header-mobile-container"]}>
          <div
            className={styles["header-mobile-background"]}
            onClick={() => setMenuIsOpen(false)}
          />
          <div className={styles["header-mobile"]}>
            <div className={styles["switch-language-container"]}>
              <span className={styles["switch-language-text"]}>
                switch language
              </span>
              <div className={styles["language-selector-container"]}>
                <button
                  className={`${styles["language-selector"]} ${language === "en" ? styles.selected : ""}`}
                  onClick={() => {
                    changeLanguage("en");
                  }}
                  onMouseEnter={() => {
                    handleModalPropsEnter("Switch language to English", false);
                  }}
                  onMouseLeave={() => {
                    handleModalPropsLeave("Switch language to English");
                  }}
                >
                  EN
                </button>
                /
                <button
                  className={`${styles["language-selector"]} ${language === "pt" ? styles.selected : ""}`}
                  onClick={() => {
                    changeLanguage("pt");
                  }}
                  onMouseEnter={() => {
                    handleModalPropsEnter(
                      "Switch language to Portuguese",
                      false,
                    );
                  }}
                  onMouseLeave={() => {
                    handleModalPropsLeave("Switch language to Portuguese");
                  }}
                >
                  PT
                </button>
              </div>
            </div>
            <div className={styles["navigation-container"]}>
              {menuItems.map((item: any, index: any) => {
                const { text, href } = item;
                return (
                  <Link
                    scroll={false}
                    href={href}
                    className={styles["menu-item"]}
                    key={index}
                  >
                    {text}
                  </Link>
                );
              })}
            </div>
            <div className={styles["menu-footer"]}>
              <a
                href="/resume"
                className={styles["menu-item__bold"]}
                onMouseEnter={() => {
                  handleModalPropsEnter("download my resume", true);
                }}
                onMouseLeave={() => {
                  handleModalPropsLeave("download my resume");
                }}
              >
                My Resume
              </a>
              <a href="/contact" className={styles["header-button"]}>
                /Contact Me
              </a>
              <div className={styles["social-media-icons"]}>
                <a
                  href="https://www.linkedin.com/in/lucas-oliveira-0b1a1b1b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.instagram.com/lucas_oliveira.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://twitter.com/lucas_oliveira_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://medium.com/@lucas_oliveira"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaMedium />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
