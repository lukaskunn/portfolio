import React from "react";
import styles from "./Home.module.css"

const CurrentPosition = () => {
  return (
    <div className={styles["current-position-container"]}>
      <p className={styles["current-position-text"]}>
        Currently <span>PL/SSR II Front End Developer</span> @{" "}
        <a href="https://www.corebiz.ag/en/">Corebiz</a>
      </p>
    </div>
  );
};

export default CurrentPosition;
