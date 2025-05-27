import React, { useState, createContext, useCallback } from "react";
import gsap from "gsap";

export type TransitionContextType = {
  timeline: gsap.core.Timeline;
  setTimeline: (timeline: gsap.core.Timeline) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

type TransitionProviderProps = {
  children: React.ReactNode;
};

/**
 * TransitionProvider is a context provider that manages GSAP timelines for transitions.
 * It initializes a paused timeline and provides it to the context.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The TransitionContext provider with the timeline state.
 */

const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const [timeline, setTimeline] = useState(() =>
    gsap.timeline({ paused: true }),
  );

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
