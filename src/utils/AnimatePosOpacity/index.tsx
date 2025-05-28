import React, { useRef, useContext } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { TransitionContext } from "../../Layouts/TransitionProvider";
import type { TransitionContextType } from "../../Layouts/TransitionProvider";
import { PageContext } from "../../contexts/PageContext";

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
  const { timeline } = useContext(TransitionContext) as TransitionContextType;
  const el = useRef<HTMLDivElement>(null);
  const { isLoaded } = useContext(PageContext) as any;

  useIsomorphicLayoutEffect(() => {
    // outro animation
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
    // intro animation
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
