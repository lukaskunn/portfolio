'use client'
import React, { createContext, useContext } from "react";
import { ANIMATION_DELAYS } from "@/utils/animationVars";
// Animation configuration types
export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

// Global animation presets for awwwards-style animations
export const ANIMATION_PRESETS = {
  // Smooth entrance animations
  smoothEntrance: {
    duration: 0.8,
    ease: "power3.out",
  },
  // Fast snap animations
  snap: {
    duration: 0.4,
    ease: "power4.out",
  },
  // Elegant slow reveals
  elegantReveal: {
    duration: 1.2,
    ease: "power2.inOut",
  },
  // Letter by letter animations
  letterByLetter: {
    duration: 0.05,
    ease: "power2.out",
    stagger: 0.03,
  },
  // Fast letter animation
  fastLetterByLetter: {
    duration: 0.04,
    ease: "power2.out",
    stagger: 0.02,
  },
  // Clip path reveals
  clipPathReveal: {
    duration: 1.4,
    ease: "power4.inOut",
  },
  // Slide animations
  slideIn: {
    duration: 0.6,
    ease: "power3.out",
  },
  // Stagger animations for lists
  staggerList: {
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.1,
  },
  // Hover animations
  hoverIn: {
    duration: 0.3,
    ease: "power2.out",
  },
  hoverOut: {
    duration: 0.4,
    ease: "power2.inOut",
  },
} as const;

interface AnimationContextType {
  presets: typeof ANIMATION_PRESETS;
  delays: typeof ANIMATION_DELAYS;
  isAnimationEnabled: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const value: AnimationContextType = {
    presets: ANIMATION_PRESETS,
    delays: ANIMATION_DELAYS,
    isAnimationEnabled: true,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);

  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }

  return context;
};

export default AnimationContext;
