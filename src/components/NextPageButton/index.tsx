'use client';
import React, { useState } from "react";
import styles from "./NextPageButton.module.css";
import Link from "next/link";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import AnimatePosOpacity from "../../utils/AnimatePosOpacity";

type ArrowIconProps = {
  type: "forward" | "backward";
  hover: boolean;
  getColor: () => string;
};

interface INextPageButton {
  link: string;
  text: string;
  type?: "forward" | "backward";
  showBackground?: boolean;
}

const ArrowIcon = ({ type, getColor, hover }: ArrowIconProps) => {
  const ArrowIcon = type === "backward" ? GoArrowLeft : GoArrowRight;
  const className =
    type === "backward" ? styles["left-arrow"] : styles["right-arrow"];

  const arrowStyle = {
    marginLeft: type === "forward" ? (!hover ? "20px" : "40px") : undefined,
    marginRight: type === "backward" ? (!hover ? "20px" : "40px") : undefined,
  };

  return (
    <ArrowIcon
      size={30}
      color={getColor()}
      className={className}
      style={arrowStyle}
    />
  );
};

const NextPageButton: React.FC<INextPageButton> = ({
  link,
  text,
  type = "forward",
  showBackground = false,
}) => {
  const [hover, setHover] = useState(false);

  const getColor = () => {
    if (showBackground) {
      return hover ? "#0c0c0c" : "#bebebe";
    }
    return hover ? "white" : "#bebebe";
  };

  const buttonContainerStyle = {
    color: getColor(),
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
            <ArrowIcon type="backward" getColor={getColor} hover={hover} />
          )}
          <p dangerouslySetInnerHTML={{ __html: text }} />
          {type === "forward" && (
            <ArrowIcon type="forward" getColor={getColor} hover={hover} />
          )}
        </Link>
      </AnimatePosOpacity>
    </div>
  );
};

export default NextPageButton;
