'use client'
import React from 'react'
import NextPageButton from "../../src/components/NextPageButton";
import { useLanguage } from "../../src/contexts/LanguageContext";

const NextPageButtonContainer = () => {
  const { currentLanguage } = useLanguage();
  const { aboutMe } = currentLanguage;
  const { nextPageText } = aboutMe;

  return (
    <NextPageButton
        link="/Contact"
        text={nextPageText}
        type="forward"
        showBackground={true}
      />
  )
}

export default NextPageButtonContainer