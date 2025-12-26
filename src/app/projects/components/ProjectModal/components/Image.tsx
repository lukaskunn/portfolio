import React from "react";
import styles from "@/styles/css/components/ProjectModal.module.css";
import NextImage from "next/image";

interface IImage {
  src: string;
  color: string;
  alt: string;
  height: number;
  width: number;
}

const Image = (props: IImage) => {
  const { src, alt } = props;

  // If src is already a URL string, use it directly
  return <NextImage src={src} className={styles["project-modal-image"]} alt={alt} width={320} height={270} loading="lazy" />;
};

export default React.memo(Image);
