import React from "react";
import styles from "./ImageBackground.module.scss";
import { useCursor } from "../../contexts/CursorContext";
import Image from "next/image";
import gsap from "gsap";

function ImageBackground() {
  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const imageBackgroundRef = React.useRef<HTMLDivElement>(null);

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

    const left = -(position.x / dimensions.width - 0.5) * 30 - 40;
    const top = -(position.y / dimensions.height - 0.5) * 30 + 120;
    const rotateX = (position.y / dimensions.height - 0.5) * -10;
    const rotateY = (position.x / dimensions.width - 0.5) * 7;

    gsap.to(imageBackgroundRef.current, {
      left,
      top,
      rotateX,
      rotateY,
      perspective: 800,
      // transformPerspective: 800,
      ease: "power2",
      duration: 1,
    });
  }, [position, dimensions]);

  return (
    <div
      className={styles["img-bg-container"]}
      ref={imageBackgroundRef}
      style={{ position: "absolute" }} // Ensure absolute positioning
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
