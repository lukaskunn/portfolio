import React, { useRef } from "react";
import styles from "../../../../ProjectPage.module.css";
import { useHover } from "usehooks-ts";

interface IProjectPageGalleryImage {
  images: { front: string; back: string; photoText: string };
  width: number;
  height: number;
  textSize: number;
}

const ProjectPageGalleryImage = (props: IProjectPageGalleryImage) => {
  const { images, width, height, textSize } = props;
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const photoTextStyles = {
    fontSize: `${textSize}px`,
    opacity: !isHover ? "1" : "0",
  };

  return (
    <div
      className={styles["gallery-image"]}
      ref={hoverRef}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img
        src={images.front}
        alt="front"
        className={styles["front-image"]}
        style={{ opacity: !isHover ? "1" : "0" }}
      />
      <img
        src={images.back}
        alt="front"
        className={styles["back-image"]}
        style={{ opacity: isHover ? "1" : "0" }}
      />
      <p
        className={styles["photo-text"]}
        style={photoTextStyles}
        dangerouslySetInnerHTML={{ __html: images.photoText }}
      />
    </div>
  );
};

export default ProjectPageGalleryImage;
