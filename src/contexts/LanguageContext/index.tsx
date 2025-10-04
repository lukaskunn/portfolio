"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { LanguageContentType } from "../../types/projectContentType";

import langEN from "../../content/en.json";
import langPT from "../../content/pt.json";

const languages = {
  en: langEN,
  pt: langPT,
};

type Language = "en" | "pt";

type LanguageContextType = {
  language: Language;
  currentLanguage: LanguageContentType;
  changeLanguage: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "pt">("en");
  const [currentLanguage, setCurrentLanguage] = useState(
    languages[language as keyof typeof languages],
  );

  const changeLanguage = (lang: "en" | "pt") => {
    setLanguage(lang);
    setCurrentLanguage(languages[lang as keyof typeof languages]);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, currentLanguage, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
