import React from "react";
import { useCursor } from "../../contexts/CursorContext";
import MenuItem from "./components/MenuItem";
import styles from "./header.module.css";

const DownloadResumeButton = () => {
  const { handleModalPropsEnter, handleModalPropsLeave } = useCursor();
  return (
    <a
      href="/resume"
      className={`${styles["menu-item"]} ${styles["menu-item__bold"]}`}
      onMouseEnter={() => handleModalPropsEnter("download my resume", true)}
      onMouseLeave={() => handleModalPropsLeave("download my resume")}
    >
      <span className={styles["content-desktop"]}>
        <MenuItem text="/My resume" />
      </span>
      <span className={styles["content-mobile"]}>/My resume</span>
    </a>
  );
};

export default DownloadResumeButton;
