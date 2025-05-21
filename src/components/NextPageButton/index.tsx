import React, { useState } from "react";
import styles from "./NextPageButton.module.scss";
import Link from "next/link";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
interface INextPageButton {
  link: string;
  text: string;
  type?: "forward" | "backward";
  showBackground?: boolean;
}

const NextPageButton = ({
  link,
  text,
  type,
  showBackground,
}: INextPageButton) => {
  const [hover, setHover] = useState(false);

  const buttonContainerStyle = {
    color: showBackground ? hover ? "#0c0c0c" : "#bebebe" : hover ? "white" : "#bebebe" ,
    background: showBackground ? hover ? "#ffffff" : "#414141" : "none",
  };

  return (
    <div className={styles.scrollPageIconContainer}>
      <Link
        href={link}
        className={styles.scrollPage}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={buttonContainerStyle}
        scroll={false}
      >
        {type === "backward" && (
          <GoArrowLeft
            size={30}
            color={showBackground ? hover ? "#0c0c0c" : "#bebebe" : hover ? "white" : "#bebebe"}
            className={styles["left-arrow"]}
            style={{
              marginRight: !hover ? "20px" : "40px",
            }}
          />
        )}
        <p>{text} </p>
        {type === "forward" && (
          <GoArrowRight
            size={30}
            color={showBackground ? hover ? "#0c0c0c" : "#bebebe" : hover ? "white" : "#bebebe"}
            className={styles["right-arrow"]}
            style={{
              marginLeft: !hover ? "20px" : "40px",
            }}
          />
        )}
      </Link>
    </div>
  );
};

export default NextPageButton;
