'use client'
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { useCursor } from "../../contexts/CursorContext";
import { useTransition } from "../../contexts/TransitionContext";

type TransitionLayoutProps = {
  children: React.ReactNode;
};

export default function TransitionLayout({ children }: TransitionLayoutProps) {
  const pathname = usePathname();
  const { setHoverImportantText } = useCursor();
  const { timeline } = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState({
    route: pathname,
    children,
  });

  useIsomorphicLayoutEffect(() => {
    if (currentPage.route !== pathname) {
      if (timeline.duration() === 0) {
        // There are no outro animations, so immediately transition
        setCurrentPage({
          route: pathname,
          children,
        });
      } else {
        timeline.play().then(() => {
          // Outro complete so reset to an empty paused timeline
          timeline.pause().clear();
          setCurrentPage({
            route: pathname,
            children,
          });
        });
      }
    }
  }, [pathname, children, timeline, currentPage.route]);

  useEffect(() => {
    scrollTo({ top: 0, left: 0, behavior: "instant" });
    setHoverImportantText(false);
  }, [currentPage.route, setHoverImportantText]);

  return <div ref={containerRef}>{currentPage.children}</div>;
}
