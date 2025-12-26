import React from "react";
import styles from "@/styles/css/components/ProjectModal.module.css";
import NextImage from "next/image";
import { urlFor } from "@/sanity/client";
interface IImage {
  src: string;
  color: string;
  alt: string;
  height: number;
  width: number;
}

const Image = (props: IImage) => {
  const { src, alt } = props;

  return <NextImage src={urlFor(src).url()} className={styles["project-modal-image"]} alt={alt} width={320} height={270}/>;
};

export default Image;
