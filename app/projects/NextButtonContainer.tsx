"use client";
import React from "react";
import NextPageButton from "../../src/components/NextPageButton";
import { useLanguage } from "../../src/contexts/LanguageContext";
const NextButtonContainer = () => {
  const { currentLanguage } = useLanguage();
  const { nextPageText } = currentLanguage.works;

  return (
    <NextPageButton
      link="/about"
      text={nextPageText}
      type="forward"
      showBackground={true}
    />
  );
};

export default NextButtonContainer;
