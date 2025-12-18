import React from "react";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { useCursor } from "@/contexts/CursorContext";

gsap.registerPlugin(SplitText);

import styles from "@/styles/css/components/TextScrollHover.module.css";

type MenuItemProps = {
  text: string;
  containerHeight?: number;
};

const MenuItem = ({ text, containerHeight=17 }: MenuItemProps) => {
  const { setIsHovering } = useCursor();
  const menuItemContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const initial = new SplitText(".initial", {
        type: "chars",
        charsClass: "initial",
      });

      const hovered = new SplitText(".hovered", {
        type: "chars",
        charsClass: "hovered",
      });

      const tlInitial = gsap.timeline({ paused: true }).to(initial.chars, {
        y: "-100%",
        stagger: 0.015,
        duration: 0.5,
        ease: "power3.out",
      });

      const tlHovered = gsap.timeline({ paused: true }).to(hovered.chars, {
        y: "-100%",
        stagger: 0.015,
        duration: 0.5,
        ease: "power3.out",
      });

      menuItemContainerRef.current?.addEventListener("mouseenter", () => {
        setIsHovering({ value: true });
        tlInitial.play();
        tlHovered.play();
      });

      menuItemContainerRef.current?.addEventListener("mouseleave", () => {
        setIsHovering({ value: false });
        tlInitial.reverse();
        tlHovered.reverse();
      });

      return () => {
        initial.revert();
        hovered.revert();
        tlInitial.revert();
        tlHovered.revert();
      };
    }, menuItemContainerRef);

    return () => {
      ctx.revert();
    };
  }, [menuItemContainerRef]);

  return (
    <div className={styles["menu-item-container"]} style={{ height: containerHeight }} ref={menuItemContainerRef}>
      <p className={`initial ${styles["item-text"]}`}>{text}</p>
      <p className={`hovered ${styles["item-text"]}`}>{text}</p>
    </div>
  );
};

export default MenuItem;
