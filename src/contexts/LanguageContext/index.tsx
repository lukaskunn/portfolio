"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { LanguageContentType } from "@/utils/types";

import content from "@/content/en.json";

type LanguageContextType = {
  currentContent: LanguageContentType;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentContent, setCurrentContent] = useState<LanguageContentType>(content);

    return (
    <LanguageContext.Provider
      value={{ currentContent }}
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
