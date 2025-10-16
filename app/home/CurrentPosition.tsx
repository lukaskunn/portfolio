"use client";
import React from "react";
import styles from "./Home.module.css";
import { useCursor } from "../../src/contexts/CursorContext";

const CurrentPosition = () => {
  const { setIsHovering } = useCursor();
  const companyNameRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    companyNameRef.current?.addEventListener("mouseenter", () => {
      setIsHovering({ value: true, size: "medium" });
    });

    companyNameRef.current?.addEventListener("mouseleave", () => {
      setIsHovering({ value: false });
    });
  }, []);

  return (
    <div className={styles["current-position-container"]}>
      <div className={styles["current-position-text"]}>
        / Currently <span>PL/SSR II Front End Developer</span> @{" "}
        <div className={styles["company-name-container"]}>
          <a ref={companyNameRef} href="https://www.corebiz.ag/en/">
            Corebiz
          </a>
          <div className={styles["border-bottom"]} />
        </div>
      </div>
    </div>
  );
};

export default CurrentPosition;
