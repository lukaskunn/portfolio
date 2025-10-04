'use client'
import React from "react";
import { useLanguage } from "../../src/contexts/LanguageContext";
import AnimatePosOpacity from "../../src/utils/AnimatePosOpacity";

const PageTitle = () => {
  const { currentLanguage } = useLanguage();
  const { contact } = currentLanguage;
  const { title } = contact;

  return (
    <AnimatePosOpacity
      from={{ y: "200px", opacity: 0 }}
      to={{ y: 0, opacity: 1 }}
      durationIn={0.8}
      durationOut={0.6}
      delay={1}
      set={{ y: "200px", opacity: 0 }}
    >
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
    </AnimatePosOpacity>
  );
};

export default PageTitle;
