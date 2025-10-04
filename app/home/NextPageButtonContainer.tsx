'use client'
import React from "react";
import NextPageButton from "../../src/components/NextPageButton";
import { useLanguage } from "../../src/contexts/LanguageContext";
const NextPageButtonContainer = () => {
  const { currentLanguage } = useLanguage();
  const { landing } = currentLanguage;
  const { nextPageText } = landing;
  return (
    <NextPageButton
      link="/works"
      text={nextPageText}
      showBackground={false}
      type="forward"
    />
  );
};

export default NextPageButtonContainer;
