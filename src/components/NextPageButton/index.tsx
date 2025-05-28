import React, { useState } from "react";
import styles from "./NextPageButton.module.css";
import Link from "next/link";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import AnimatePosOpacity from "../../utils/AnimatePosOpacity";
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
    color: showBackground
      ? hover
        ? "#0c0c0c"
        : "#bebebe"
      : hover
        ? "white"
        : "#bebebe",
    background: showBackground ? (hover ? "#ffffff" : "#414141") : "none",
  };

  return (
    <div className={styles["next-page-button"]}>
      <AnimatePosOpacity
        from={{ y: "200px" }}
        to={{ y: 0 }}
        durationIn={0.8}
        durationOut={0.6}
        delay={2}
        set={{ y: "200px" }}
      >
        <Link
          href={link}
          className={styles["button-container"]}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={buttonContainerStyle}
          scroll={false}
        >
          {type === "backward" && (
            <GoArrowLeft
              size={30}
              color={
                showBackground
                  ? hover
                    ? "#0c0c0c"
                    : "#bebebe"
                  : hover
                    ? "white"
                    : "#bebebe"
              }
              className={styles["left-arrow"]}
              style={{
                marginRight: !hover ? "20px" : "40px",
              }}
            />
          )}
          <p dangerouslySetInnerHTML={{ __html: text }} />
          {type === "forward" && (
            <GoArrowRight
              size={30}
              color={
                showBackground
                  ? hover
                    ? "#0c0c0c"
                    : "#bebebe"
                  : hover
                    ? "white"
                    : "#bebebe"
              }
              className={styles["right-arrow"]}
              style={{
                marginLeft: !hover ? "20px" : "40px",
              }}
            />
          )}
        </Link>
      </AnimatePosOpacity>
    </div>
  );
};

export default NextPageButton;
