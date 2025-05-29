import React, { useRef, useContext } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { TransitionContext } from "../../Layouts/TransitionProvider";
import type { TransitionContextType } from "../../Layouts/TransitionProvider";

type AnimateInOutProps = {
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

const AnimateInOut = ({
  children,
  from,
  to,
  durationIn,
  durationOut,
  delay,
  delayOut,
  set,
  skipOutro,
}: AnimateInOutProps) => {
  const { timeline } = useContext(TransitionContext) as TransitionContextType;
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (set) {
      gsap.set(el.current, { ...set });
    }
    gsap.to(el.current, {
      ...to,
      delay: delay || 0,
      duration: durationIn,
    });

    if (!skipOutro) {
      timeline.add(
        gsap.to(el.current, {
          ...from,
          delay: delayOut || 0,
          duration: durationOut,
        }),
        0,
      );
    }
  }, []);

  return (
    <div ref={el}>
      {children}
    </div>
  );
};

export default React.memo(AnimateInOut);
