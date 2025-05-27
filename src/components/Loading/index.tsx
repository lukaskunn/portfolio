import React, { useState, useEffect } from "react";
import { PageContext } from "../../contexts/PageContext";
import loading from "./Loading.module.css";
import gsap from "gsap";

const texts = ["LOADING", "LOADING.", "LOADING..", "LOADING..."];

function Loading(pageRoute: any) {
  const { setIsLoaded } = React.useContext(PageContext) as any;
  const [showLoading, setShowLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(texts[0]);
  const [textIndex, setTextIndex] = useState(0);
  const [showLoadingComponent, setShowLoadingComponent] = useState(true);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % texts.length;
        setLoadingText(texts[nextIndex]);
        return nextIndex;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      let intervalId: NodeJS.Timeout;
      let timeoutId: NodeJS.Timeout;
      let progressBarTimeout: NodeJS.Timeout;
      let backgroundTimeout: NodeJS.Timeout;

      progressBarTimeout = setTimeout(() => {
        gsap.to(`.${loading.progressBar}`, {
          width: "400px",
          // height: 0,
          duration: 6,
          ease: "power2.inOut",
        });

        gsap.to(`.${loading["loading-text"]}`, {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }, 1);

      timeoutId = setTimeout(() => {
        gsap.to(`.${loading["loading-text"]}`, {
          y: -10,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });

        gsap.to(`.${loading.progressBar}`, {
          y: "10px",
          height: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }, 6000);

      backgroundTimeout = setTimeout(() => {
        gsap.to(`.${loading.loadingContainer}`, {
          background: "rgba(0, 0, 0, 0)",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setIsLoaded(true);
          },
        });
      }, 6500);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(progressBarTimeout);
        clearTimeout(backgroundTimeout);
      };
    }, loading.loadingContainer);

    return () => {
      ctx.revert();
    };
  }, []);

  const loadingStyles: React.CSSProperties = {
    top: showLoading && pageRoute !== "/" ? "-2000px" : "0",
  };

  if (!showLoadingComponent) {
    return null;
  }

  return (
    <div className={loading.loadingContainer} style={loadingStyles}>
      <div className={loading.loadingTextContainer}>
        <p className={loading["loading-text"]}>{loadingText}</p>
        <div className={loading.progressBar} />
      </div>
    </div>
  );
}

export default Loading;
