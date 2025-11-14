'use client'
import React, { useState, useContext, createContext } from "react";

interface PageContextType {
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

interface PageContextProviderProps {
  children: React.ReactNode;
}

export const PageContextProvider: React.FC<PageContextProviderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const value: PageContextType = {
    isLoaded,
    setIsLoaded,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = (): PageContextType => {
  const context = useContext(PageContext);
  
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  
  return context;
};
