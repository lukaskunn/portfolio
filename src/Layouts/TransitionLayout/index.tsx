import { gsap } from "gsap";
import React from "react";
import { TransitionContext } from "../TransitionProvider";
import { useState, useContext, useRef } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import type { TransitionContextType } from "../TransitionProvider";
type TransitionLayoutProps = {
  children: React.ReactNode;
};
import { useCursor } from "../../contexts/CursorContext";
import { useRouter } from "next/router";

export default function TransitionLayout({ children }: TransitionLayoutProps) {
  const { setHoverImportantText } = useCursor();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState({
    route: router.asPath,
    children,
  });

  const { timeline } = useContext(TransitionContext) as TransitionContextType;
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (currentPage.route !== router.asPath) {
      if (timeline.duration() === 0) {
        /* There are no outro animations, so immediately transition */
        setCurrentPage({
          route: router.asPath,
          children,
        });
      } else {
        timeline.play().then(() => {
          /* outro complete so reset to an empty paused timeline */
          timeline.pause().clear();
          setCurrentPage({
            route: router.asPath,
            children,
          });
        });
      }
    }
  }, [router.asPath]);

  React.useEffect(() => {
    scrollTo({ top: 0, left: 0, behavior: "instant" });
    setHoverImportantText(false);
  }, [currentPage.route]);

  return <div ref={el}>{currentPage.children}</div>;
}
