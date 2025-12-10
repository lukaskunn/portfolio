import React from "react";
import styles from "@/styles/css/components/ProjectModal.module.css";

interface IImage {
  src: string;
  color: string;
  alt: string;
  height: number;
  width: number;
}

const Image = (props: IImage) => {
  const { src, alt } = props;

  return <img src={src} className={styles["project-modal-image"]} alt={alt} />;
};

export default Image;
