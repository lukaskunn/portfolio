import React, { useRef } from "react";
import styles from "../../../../pages/project/[id]/ProjectPage.module.css";
import { useHover } from "usehooks-ts";
import { useTransition } from "../../../../Layouts/TransitionProvider"
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import gsap from "gsap";
import { usePageContext } from "../../../../contexts/PageContext";

interface IProjectPageGalleryImage {
  images: { front: string; back: string; photoText: string };
  width: number;
  height: number;
  textSize: number;
  imageIndex?: number;
}

const ProjectPageGalleryImage = (props: IProjectPageGalleryImage) => {
  const { images, width, height, textSize, imageIndex } = props;
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const { isLoaded } = usePageContext()
  const { timeline } = useTransition()

  useIsomorphicLayoutEffect(() => {
    timeline.add(
      gsap.to(hoverRef.current, {
        opacity: 0,
        duration: 0.8,
        scale: 0.8,
        ease: "power4.inOut",
        delay: parseInt(imageIndex + "") * 0.1,
        onStart: () => {
          gsap.set(hoverRef.current, { opacity: 0 });
        },
      }),
      0,
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isLoaded) {
      gsap.to(hoverRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: parseInt(imageIndex + "") * 0.1 + 1,
        ease: "power4.out",
      });
    }
  }, [isLoaded]);

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
