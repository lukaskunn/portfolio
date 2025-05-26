import React, { useState, useEffect } from "react";
import { PageContext } from "../../contexts/PageContext";
import loading from "./Loading.module.scss";

function Loading(pageRoute: any) {
  const { isLoaded } = React.useContext(PageContext) as any;
  const [showLoading, setShowLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [showLoadingComponent, setShowLoadingComponent] = useState(true);

  useEffect(() => {
    const handleText = () => {
      const texts = ["LOADING", "LOADING.", "LOADING..", "LOADING..."];
      setLoadingText(texts[textIndex % texts.length]);

      setTimeout(() => {
        setTextIndex(textIndex + 1);
      }, 800);
    };

    handleText();
  }, [textIndex]);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(true);

      setTimeout(() => {
        setShowLoadingComponent(false);
      }, 2000);
    }, 4000);
  }, [isLoaded]);

  const loadingStyles = {
    top: showLoading && pageRoute !== "/" ? "-2000px" : "0",
  };

  const loadingTextStyles = {
    top: showLoading && pageRoute !== "/" ? "-2000px" : "0",
  };

  if (!showLoadingComponent) {
    return null;
  }

  return (
    <div className={loading.loadingContainer} style={loadingStyles}>
      <div className={loading.loadingTextContainer} style={loadingTextStyles}>
        <h2>{loadingText}</h2>
        <div className={loading.progressBar} />
      </div>
    </div>
  );
}

export default Loading;
