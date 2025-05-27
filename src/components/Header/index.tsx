import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./components/MenuItem";
import { useCursor } from "../../contexts/CursorContext";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./header.module.css";
import { PageContext } from "../../contexts/PageContext";
import gsap from "gsap";
import { TransitionContext } from "../../Layouts/TransitionProvider";
import type { TransitionContextType } from "../../Layouts/TransitionProvider";
declare const window: any;
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import AnimatePosOpacity from "../../utils/AnimatePosOpacity";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType;
  const { isLoaded } = React.useContext(PageContext) as any;
  const [headerBackground, setHeaderBackground] = useState("none");
  const [currentRoute, setCurrentRoute] = useState(router.asPath);
  const [menuHamburgerIsOpen, setMenuHamburgerIsOpen] = useState(false);
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();
  const { changeLanguage, currentLanguage, language } = useLanguage();

  const { header } = currentLanguage;
  const { headerTitle, menuItems } = header;
  const pathName = usePathname();

  const listenScrollEvent = () => {
    if (window.scrollY < 150 || window.innerWidth < 768) {
      return setHeaderBackground("none");
    } else {
      return setHeaderBackground("black");
    }
  };

  // const handleMenuHamburger = () => {
  //   setMenuHamburgerIsOpen(!menuHamburgerIsOpen);
  // };

  useIsomorphicLayoutEffect(() => {
    timeline.add(
      gsap.to(`.${styles.header}`, {
        top: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
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

    setTimeout(() => {
      gsap.to(`.${styles.header}`, {
        top: 70,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }, router.asPath !== currentRoute ? 1200 : 1000);

    setCurrentRoute(router.asPath);
  }, [router.asPath, isLoaded]);

  const renderHeader = pathName !== "/all-my-links";

  return (
    renderHeader && (
      <header
        className={styles.header}
        style={{
          background: headerBackground,
        }}
      >
        <div className={styles["header-container"]}>
          <div className={styles["navigation-container"]}>
            {/* {menuItems.map((item: any, index: any) => { */}
            {menuItems.map((item: any) => {
              const { text, href } = item;
              return pathName !== href ? (
                <Link href={href} className={styles["menu-item"]}>
                  <MenuItem
                    text={text}
                    // key={`${text}_${index}`}
                    cursorSize="medium"
                  />
                </Link>
              ) : null;
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
      </header>
    )
  );
}

export default Header;
