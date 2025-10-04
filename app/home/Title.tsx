import React from "react";
import styles from "./Home.module.css"

const Title = () => {
  return (
    <div className={styles["welcome-message-container"]}>
      <h1 className={styles["welcome-message"]}>
        Hi, i'm <span>Lucas Oliveira</span>
      </h1>
    </div>
  );
};

export default Title;
