'use client'
import React, { useState, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import type { TransitionContextType } from '@/types';

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
  const [displayPageName, setDisplayPageName] = useState<string>('');


  React.useEffect(() => {
    if (isTransitioningOut && nextPath) {
      // Set page not ready when starting transition
      setIsPageReady(false);

      // Wait for transition out animation to complete (cover the page + text reveal)
      const timeout = setTimeout(() => {
        router.push(nextPath);
        setNextPath(null);
        setIsTransitioningOut(false);
        setIsTransitioningIn(true);
      }, 1200); // 600ms background cover + 600ms text reveal

      return () => clearTimeout(timeout);
    }
  }, [isTransitioningOut, nextPath, router]);

  React.useEffect(() => {
    if (isTransitioningIn) {
      // Wait for complete transition (delay + text exit + background exit) before setting page ready
      const readyTimeout = setTimeout(() => {
        setIsPageReady(true);
      }, 1900); // 500ms delay + 600ms text disappear + 800ms background slide out

      // Wait for transition in animation to complete (reveal the page)
      const completeTimeout = setTimeout(() => {
        setIsTransitioningIn(false);
      }, 1900); // Same timing as page ready

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
    displayPageName,
    setIsTransitioningIn,
    setIsTransitioningOut,
    setNextPath,
    setDisplayPageName,
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
