'use client';
import React from "react";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import type { NextPage } from "next";
import { FaMedium } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { useTransition } from "../Layouts/TransitionProvider";
import ImageBackground from "../components/ImageBackground";
import NextPageButton from "../components/NextPageButton";
import NoiseFilter from "../components/NoiseFilter";
import { useCursor } from "../contexts/CursorContext";
import { useLanguage } from "../contexts/LanguageContext";
import { usePageContext } from "../contexts/PageContext";
import useDevice from "../hooks/useDevice";
import Inner from "../components/Inner";

import styles from "./Home.module.css";

gsap.registerPlugin(SplitText);
const TEXTS_LIST = ["Web Developer", "Art Enthusiast", "Creative Thinker"];

const SocialMediaLinks = () => {
  const socialMediaLinksArr = [
    {
      url: "https://www.linkedin.com/in/lucas-oliveira-0b1a1b1b8/",
      icon: <FaLinkedin />,
    },
    {
      url: "https://www.instagram.com/lucas_oliveira.dev/",
      icon: <FaInstagram />,
    },
    { url: "https://twitter.com/lucas_oliveira_", icon: <FaXTwitter /> },
    { url: "https://medium.com/@lucas_oliveira", icon: <FaMedium /> },
  ];

  return (
    <div className={styles["social-media-icons"]}>
      {socialMediaLinksArr.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

type LanguageCode = "en" | "pt";

type LanguageSelectorProps = {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  handleModalPropsEnter: (text: string, scramble: boolean) => void;
  handleModalPropsLeave: (text: string) => void;
};

const LanguageSelector = ({
  changeLanguage,
  handleModalPropsEnter,
  handleModalPropsLeave,
  language,
}: LanguageSelectorProps) => (
  <div className={styles["language-selector-container"]}>
    {[
      { code: "en", label: "EN", tooltip: "Switch language to English" },
      { code: "pt", label: "PT", tooltip: "Switch language to Portuguese" },
    ].map((lang, index, arr) => (
      <React.Fragment key={lang.code}>
        <button
          className={`${styles["language-selector"]} ${language === lang.code ? styles.selected : ""}`}
          onClick={() => changeLanguage(lang.code as "en" | "pt")}
          onMouseEnter={() => handleModalPropsEnter(lang.tooltip, false)}
          onMouseLeave={() => handleModalPropsLeave(lang.tooltip)}
        >
          {lang.label}
        </button>
        {index < arr.length - 1 && "/"}
      </React.Fragment>
    ))}
  </div>
);

const Home: NextPage = () => {
  const { isMobile, isSmallTablet } = useDevice();
  const { timeline } = useTransition()
  const { isLoaded } = usePageContext()
  const { language, changeLanguage } = useLanguage();
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();
  const [titleIsReadyToAnimate, setTitleIsReadyToAnimate] =
    React.useState<boolean>(false);
  const [currentLocalTime, setCurrentLocalTime] = React.useState<string>("");

  const titleContainerRef = React.useRef<HTMLHeadingElement>(null);

  // Setup exit animations
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animateOut = (selector: string) => {
        return gsap.timeline().to(`.${styles[selector]}`, {
          opacity: 0,
          y: selector.includes("social") ? 50 : -50,
          duration: 0.5,
          ease: "power2.inOut",
        });
      };

      // Add all animations to main timeline
      [
        "language-selector-container",
        "social-media-icons",
        "welcome-message",
        "title-container",
        "current-position-text",
        "location",
      ].forEach((selector) => {
        timeline.add(animateOut(selector), 0);
      });
    });

    return () => ctx.revert();
  }, [timeline]);

  // Handle entrance animations when page is loaded
  React.useEffect(() => {
    if (!isLoaded) return;

    setTitleIsReadyToAnimate(true);

    setTimeout(() => {
      const animateIn = (selector: string) => {
        gsap.to(`.${styles[selector]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      };

      [
        "language-selector-container",
        "social-media-icons",
        "welcome-message",
        "title-container",
        "current-position-text",
        "location",
      ].forEach(animateIn);
    }, 1000);
  }, [isLoaded]);

  // Update local time
  React.useEffect(() => {
    const updateLocalTime = () => {
      const localTime = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setCurrentLocalTime(localTime);
    };

    updateLocalTime(); // Initialize immediately
    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle title text animation
  React.useEffect(() => {
    if (!titleIsReadyToAnimate || !titleContainerRef.current) return;

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>(
        `.${styles["title-text"]}`,
      );
      const tl = gsap.timeline({ repeat: -1, delay: 1 });

      titles.forEach((title) => {
        const splitText = new SplitText(title, {
          type: "chars",
          charsClass: "char",
        });

        tl.from(
          splitText.chars,
          {
            opacity: 0,
            duration: 0.5,
            y: 100,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<",
        ).to(
          splitText.chars,
          {
            opacity: 0,
            y: -100,
            delay: 2,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<1",
        );
      });
    }, titleContainerRef);

    return () => ctx.revert();
  }, [titleIsReadyToAnimate]);

  return (
    <Inner backgroundColor="#000">
    <section className={styles.container}>
      <div className={styles["content-container"]}>
        <div className={styles["location-container"]}>
          <p className={styles["location"]}>
            Based in São Paulo, <span>{currentLocalTime}</span>
          </p>
        </div>

        <div className={styles["welcome-message-container"]}>
          <h1 className={styles["welcome-message"]}>
            Hi, i'm <span>Lucas Oliveira</span>
          </h1>
        </div>

        <div className={styles["title-container"]} ref={titleContainerRef}>
          {TEXTS_LIST.map((text, index) => (
            <h2
              key={text}
              className={`${styles["title-text"]} ${
                index === 0 ? "initial" : index === 1 ? "next" : "previous"
              }`}
            >
              <span>{text}</span>
            </h2>
          ))}
        </div>

        <div className={styles["current-position-container"]}>
          <p className={styles["current-position-text"]}>
            Currently <span>PL/SSR II Front End Developer</span> @{" "}
            <a href="https://www.corebiz.ag/en/">Corebiz</a>
          </p>
        </div>
      </div>

      <div className={styles["footer-row-container"]}>
        <div className={styles["footer-content"]}>
          <SocialMediaLinks />
          <LanguageSelector
            language={language}
            changeLanguage={changeLanguage}
            handleModalPropsEnter={handleModalPropsEnter}
            handleModalPropsLeave={handleModalPropsLeave}
          />
        </div>
      </div>

      {(isMobile || isSmallTablet) && (
        <NextPageButton
          link="/works"
          text="See my projects"
          showBackground={false}
          type="forward"
        />
      )}

      <ImageBackground />
      <NoiseFilter />
    </section>
    </Inner>
  );
};

export default Home;
