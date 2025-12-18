import React from 'react'
import { gsap } from 'gsap';

interface AnimateOpacityContainerProps {
  canAnimate: boolean;
  children: React.ReactNode;
  className: string;
  animationConfig?: gsap.TweenVars;
  target: 1 | 0;
}

const AnimateOpacityContainer = ({
  canAnimate,
  children,
  className,
  animationConfig = {
    duration: 1,
    ease: "power2.out",
  },
  target
}: AnimateOpacityContainerProps) => {
  const loadingContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canAnimate && loadingContainerRef.current) {
      gsap.to(loadingContainerRef.current, {
        opacity: target,
        ...animationConfig
      });
    }
  }, [canAnimate, animationConfig, target]);

  return (
    <div ref={loadingContainerRef} className={className}>{children}</div>
  )
}

export default AnimateOpacityContainer