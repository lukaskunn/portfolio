import React from "react";
import styles from "./ImageBackground.module.css";
import { useCursor } from "../../contexts/CursorContext";
import Image from "next/image";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { TransitionContext } from "../../Layouts/TransitionProvider";
import type { TransitionContextType } from "../../Layouts/TransitionProvider";
import { DeviceContext } from "../../contexts/DeviceContext";

function ImageBackground() {
  const { isMobile } = React.useContext(DeviceContext);
  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const imageBackgroundRef = React.useRef<HTMLDivElement>(null);
  const { timeline } = React.useContext(
    TransitionContext,
  ) as TransitionContextType;

  const images = [
    "/images/general/20210803_031452-scaled.jpg",
    "/images/general/27159639._SX540_.jpg",
    "/images/general/4c7ff6256079957c2770ea922741815e.jpg",
    "/images/general/7108634.png",
    "/images/general/Ghost-in-the-shell_ButWhyTho.png",
    "/images/general/alita-.png",
    "/images/general/images.jpg",
  ];
  const { position } = useCursor();
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  React.useEffect(() => {
    if (
      !imageBackgroundRef.current ||
      dimensions.width === 0 ||
      dimensions.height === 0
    )
      return;

    const left = -(position.x / dimensions.width - 0.5) * 60 - 40;
    const top = -(position.y / dimensions.height - 0.5) * 60 + (isMobile ? 100 : 170);
    const rotateX = (position.y / dimensions.height - 0.5) * -10;
    const rotateY = (position.x / dimensions.width - 0.5) * 7;

    gsap.to(imageBackgroundRef.current, {
      left,
      top,
      rotateX,
      rotateY,
      perspective: 800,
      ease: "power2",
      duration: 1,
    });
  }, [position, dimensions]);

  useIsomorphicLayoutEffect(() => {
    timeline.add(
      gsap.to(`.${styles["img-bg-container"]}`, {
        delay: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }),
      0,
    );
  }, []);

  return (
    <div
      className={styles["img-bg-container"]}
      ref={imageBackgroundRef}
      style={{ position: "absolute" }}
    >
      {images.map((image: any, index: any) => (
        <Image
          alt={`image_${index + 1}`}
          src={image}
          className={`${styles[`image_${index + 1}`]} ${styles["single-image"]}`}
          width={200}
          height={200}
          key={index}
          onLoad={() => setImagesLoaded(imagesLoaded + 1)}
        />
      ))}
    </div>
  );
}

export default ImageBackground;
