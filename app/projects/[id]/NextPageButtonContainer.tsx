import React from "react";
import NextPageButton from "../../../src/components/NextPageButton";
import { useLanguage } from "../../../src/contexts/LanguageContext";

const NextPageButtonContainer = () => {
  const { currentLanguage } = useLanguage();
  const { works } = currentLanguage;
  const { backToProjectsText } = works;

  return (
    <NextPageButton
      text={backToProjectsText}
      type="backward"
      link="/projects"
      showBackground={true}
    />
  );
};

export default NextPageButtonContainer;
