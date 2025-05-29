import React from "react";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa";
import type { NextPage } from "next";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { PageContext } from "../contexts/PageContext";

gsap.registerPlugin(SplitText);

import { useLanguage } from "../contexts/LanguageContext";
import ImageBackground from "../components/ImageBackground";
import NoiseFilter from "../components/NoiseFilter";
import { useCursor } from "../contexts/CursorContext";
import styles from "./Home.module.css";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { TransitionContext } from "../Layouts/TransitionProvider";
import type { TransitionContextType } from "../Layouts/TransitionProvider";
import AnimateInOut from "../utils/AnimateInOut";
const textsList = ["Web Developer", "Art Enthusiast", "Creative Thinker"];
import NextPageButton from "../components/NextPageButton";

const Home: NextPage = () => {
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType; // TransitionContextType
  const { isLoaded } = React.useContext(PageContext) as any;
  // const [showElements, setShowElements] = React.useState<boolean>(false);
  const { language, changeLanguage } = useLanguage();
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();
  const [titleIsReadyToAnimate, setTitleIsReadyToAnimate] =
    React.useState<boolean>(false);
  // const [currentTitleText, setCurrentTitleText] = React.useState<number>(0);
  // const [nextTitleText, setNextTitleText] = React.useState<number>(1);
  const [currentLocalTime, setCurrentLocalTime] = React.useState<string>("");

  const titleContainerRef = React.useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    timeline.add(
      gsap.to(`.${styles["language-selector-container"]}`, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );

    timeline.add(
      gsap.to(`.${styles["social-media-icons"]}`, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );
    timeline.add(
      gsap.to(`.${styles["welcome-message"]}`, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );
    timeline.add(
      gsap.to(`.${styles["title-container"]}`, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );
    timeline.add(
      gsap.to(`.${styles["current-position-text"]}`, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );
    timeline.add(
      gsap.to(`.${styles["location"]}`, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      setTitleIsReadyToAnimate(true);
      setTimeout(() => {
        gsap.to(`.${styles["language-selector-container"]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }, 1000);

      setTimeout(() => {
        gsap.to(`.${styles["social-media-icons"]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }, 1000);

      setTimeout(() => {
        gsap.to(`.${styles["welcome-message"]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }, 1000);

      setTimeout(() => {
        gsap.to(`.${styles["title-container"]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }, 1000);

      setTimeout(() => {
        gsap.to(`.${styles["current-position-text"]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }, 1000);

      setTimeout(() => {
        gsap.to(`.${styles["location"]}`, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }, 1000);
    }
  }, [isLoaded]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const localTime = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentLocalTime(localTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (!titleIsReadyToAnimate || !titleContainerRef.current) return;

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>(
        `.${styles["title-text"]}`,
      );

      const tl = gsap.timeline({
        repeat: -1,
        delay: 1,
      });

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
        );
        tl.to(
          splitText.chars,
          {
            opacity: 0,
            // duration: 0.5,
            y: -100,
            delay: 2,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<1",
        );
      });
    }, titleContainerRef);

    return () => {
      ctx.revert();
    };
  }, [titleIsReadyToAnimate]);

  return (
    <section className={styles.container}>
      <div className={styles["content-container"]}>
        <div className={styles["location-container"]}>
          <p className={styles["location"]}>
            Based in São Paulo,{" "}
            <span dangerouslySetInnerHTML={{ __html: currentLocalTime }} />
          </p>
        </div>
        <div className={styles["welcome-message-container"]}>
          <h1 className={styles["welcome-message"]}>
            Hi, i'm <span>Lucas Oliveira</span>
          </h1>
        </div>
        <div className={styles["title-container"]} ref={titleContainerRef}>
          <h2 className={`${styles["title-text"]} initial`}>
            <span>{textsList[0]}</span>
          </h2>
          <h2 className={`${styles["title-text"]} next`}>
            <span>{textsList[1]}</span>
          </h2>
          <h2 className={`${styles["title-text"]} previous`}>
            <span>{textsList[2]}</span>
          </h2>
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
                handleModalPropsEnter("Switch language to Portuguese", false);
              }}
              onMouseLeave={() => {
                handleModalPropsLeave("Switch language to Portuguese");
              }}
            >
              PT
            </button>
          </div>
        </div>
      </div>
      <NextPageButton
        link="/works"
        text="See my projects"
        showBackground={false}
        type="forward"
      />
      <ImageBackground />
      <NoiseFilter />
    </section>
  );
};

export default Home;
