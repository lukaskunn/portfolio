'use client'
import React, { useState, createContext, useContext, useCallback, useMemo } from "react";
import gsap from "gsap";

// Type definitions
export type TransitionContextType = {
  timeline: gsap.core.Timeline;
  setTimeline: (timeline: gsap.core.Timeline) => void;
};

// Create context with a more descriptive default value
const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

type TransitionProviderProps = {
  children: React.ReactNode;
};

/**
 * Custom hook to access the transition context
 * @returns The transition context value
 * @throws Error if used outside of TransitionProvider
 */
export const useTransition = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  
  return context;
};

/**
 * TransitionProvider is a context provider that manages GSAP timelines for transitions.
 * It initializes a paused timeline and provides it to the context.
 */
export const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
  // Initialize timeline only once
  const [timeline, setTimelineState] = useState(() => gsap.timeline({ paused: true }));

  // Memoize the setTimeline function
  const setTimeline = useCallback((newTimeline: gsap.core.Timeline) => {
    setTimelineState(newTimeline);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    timeline,
    setTimeline
  }), [timeline, setTimeline]);

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext };
