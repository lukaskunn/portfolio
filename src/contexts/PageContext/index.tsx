import React, { useState } from "react";

export const PageContext = React.createContext({});

interface PageContextProviderProps {
  children: React.ReactNode;
}

export const PageContextProvider = (props: PageContextProviderProps) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const values = {
    isLoaded,
    setIsLoaded,
  };

  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
};
