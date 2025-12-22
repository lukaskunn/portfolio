'use client'
import React, { useState, useContext, createContext } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
  isTransitioningIn: boolean;
  isTransitioningOut: boolean;
  isPageReady: boolean;
  nextPath?: string | null;
  setIsTransitioningIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTransitioningOut: React.Dispatch<React.SetStateAction<boolean>>;
  setNextPath?: React.Dispatch<React.SetStateAction<string | null>>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

interface TransitionContextProviderProps {
  children: React.ReactNode;
}

export const TransitionContextProvider: React.FC<TransitionContextProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isTransitioningIn, setIsTransitioningIn] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const [isPageReady, setIsPageReady] = useState(true);
  const [nextPath, setNextPath] = useState<string | null>(null);

  React.useEffect(() => {
    if (isTransitioningOut && nextPath) {
      // Set page not ready when starting transition
      setIsPageReady(false);
      
      // Wait for transition out animation to complete (cover the page)
      const timeout = setTimeout(() => {
        router.push(nextPath);
        setNextPath(null);
        setIsTransitioningOut(false);
        setIsTransitioningIn(true);
      }, 600); // Duration until page is fully covered

      return () => clearTimeout(timeout);
    }
  }, [isTransitioningOut, nextPath, router]);

  React.useEffect(() => {
    if (isTransitioningIn) {
      // Wait for overlay to stay (1s) then set page ready as it starts revealing
      const readyTimeout = setTimeout(() => {
        setIsPageReady(true);
      }, 1500); // After 1 second stay, as overlay starts to slide out
      
      // Wait for transition in animation to complete (reveal the page)
      const completeTimeout = setTimeout(() => {
        setIsTransitioningIn(false);
      }, 1800); // Duration to stay + exit animation

      return () => {
        clearTimeout(readyTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [isTransitioningIn]);

  const value: TransitionContextType = {
    isTransitioningIn,
    isTransitioningOut,
    isPageReady,
    nextPath,
    setIsTransitioningIn,
    setIsTransitioningOut,
    setNextPath,
  };

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
};

export const useTransitionContext = (): TransitionContextType => {
  const context = useContext(TransitionContext);

  if (context === undefined) {
    throw new Error("useTransitionContext must be used within a TransitionContextProvider");
  }

  return context;
};
