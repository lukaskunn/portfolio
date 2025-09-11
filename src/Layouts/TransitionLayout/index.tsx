// import { useRouter } from "next/router";
// import React, { useEffect, useRef, useState } from "react";
// import { useIsomorphicLayoutEffect } from "usehooks-ts";
// import { useCursor } from "../../contexts/CursorContext";
// import { useTransition } from "../TransitionProvider";
import { motion, AnimatePresence } from "framer-motion";

type TransitionLayoutProps = {
  children: React.ReactNode;
};

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function TransitionLayout({ children }: TransitionLayoutProps) {
  // const router = useRouter();
  // const { setHoverImportantText } = useCursor();
  // const { timeline } = useTransition();
  // // const containerRef = useRef<HTMLDivElement>(null);

  // const [currentPage, setCurrentPage] = useState({
  //   route: router.asPath,
  //   children,
  // });

  // useIsomorphicLayoutEffect(() => {
  //   if (currentPage.route !== router.asPath) {
  //     if (timeline.duration() === 0) {
  //       // There are no outro animations, so immediately transition
  //       setCurrentPage({
  //         route: router.asPath,
  //         children,
  //       });
  //     } else {
  //       timeline.play().then(() => {
  //         // Outro complete so reset to an empty paused timeline
  //         timeline.pause().clear();
  //         setCurrentPage({
  //           route: router.asPath,
  //           children,
  //         });
  //       });
  //     }
  //   }
  // }, [router.asPath, children, timeline, currentPage.route]);

  // useEffect(() => {
  //   scrollTo({ top: 0, left: 0, behavior: "instant" });
  //   setHoverImportantText(false);
  // }, [currentPage.route, setHoverImportantText]);

  // return <div ref={containerRef}>{currentPage.children}</div>;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"transition-layout"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        className="transition-layout"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
