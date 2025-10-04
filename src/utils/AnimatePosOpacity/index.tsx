'use client'
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { useTransition } from "../../contexts/TransitionContext";
import { usePageContext } from "../../contexts/PageContext";

type AnimatePosOpacityProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  durationIn: number;
  durationOut: number;
  delay?: number;
  delayOut?: number;
  set?: gsap.TweenVars;
  skipOutro?: boolean;
};

const AnimatePosOpacity = ({
  children,
  from,
  to,
  durationIn,
  durationOut,
  delay,
  delayOut,
  set,
  skipOutro,
}: AnimatePosOpacityProps) => {
  const { timeline } = useTransition()
  const el = useRef<HTMLDivElement>(null);
  const { isLoaded } = usePageContext()

  useIsomorphicLayoutEffect(() => {
    if (!skipOutro) {
      timeline.add(
        gsap.to(el.current, {
          ...from,
          delay: delayOut || 0,
          duration: durationOut,
          ease: "power4.in",
        }),
        0,
      );
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;

    if (set) {
      gsap.set(el.current, set);
    }

    gsap.to(el.current, {
      ...to,
      delay: delay || 0,
      duration: durationIn,
      ease: "power4.out",
    });
  }, [isLoaded]);

  return <div ref={el}>{children}</div>;
};

export default React.memo(AnimatePosOpacity);
