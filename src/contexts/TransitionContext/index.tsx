'use client'
import React, { useState, useContext, createContext, useMemo, useCallback } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [displayPageName, setDisplayPageName] = useState<string>('');

  const onTransitionOutComplete = useCallback(() => {
    if (!nextPath) return;
    router.push(nextPath);
    setNextPath(null);
    setIsTransitioningOut(false);
    setIsTransitioningIn(true);
  }, [nextPath, router]);

  const onTransitionInComplete = useCallback(() => {
    setIsPageReady(true);
    setIsTransitioningIn(false);
  }, []);

  React.useEffect(() => {
    if (isTransitioningOut && nextPath) {
      setIsPageReady(false);
    }
  }, [isTransitioningOut, nextPath]);

  const value = useMemo<TransitionContextType>(() => ({
    isTransitioningIn,
    isTransitioningOut,
    isPageReady,
    isLoaded,
    nextPath,
    displayPageName,
    setIsTransitioningIn,
    setIsTransitioningOut,
    setIsLoaded,
    setNextPath,
    setDisplayPageName,
    onTransitionOutComplete,
    onTransitionInComplete,
  }), [isTransitioningIn, isTransitioningOut, isPageReady, isLoaded, nextPath, displayPageName, onTransitionOutComplete, onTransitionInComplete]);

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
};

export const useTransitionContext = (): TransitionContextType => {
  const context = useContext(TransitionContext);

  if (context === undefined) {
    throw new Error("useTransitionContext must be used within a TransitionContextProvider");
  }

  return context;
};
