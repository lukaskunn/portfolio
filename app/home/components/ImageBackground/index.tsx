'use client'
import gsap from "gsap";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { useTransition } from "../../../../src/contexts/TransitionContext";
import { useCursor } from "../../../../src/contexts/CursorContext";
import { useDeviceContext } from "../../../../src/contexts/DeviceContext";
import styles from "./ImageBackground.module.css";
import { usePageContext } from "../../../../src/contexts/PageContext";

const IMAGES = [
  "/images/general/20210803_031452-scaled.jpg",
  "/images/general/27159639._SX540_.jpg",
  "/images/general/4c7ff6256079957c2770ea922741815e.jpg",
  "/images/general/7108634.png",
  "/images/general/Ghost-in-the-shell_ButWhyTho.png",
  "/images/general/alita-.png",
  "/images/general/images.jpg",
];

const IMAGE_DESCRIPTIONS: Record<string, string> = {
  "20210803_031452-scaled.jpg": "Cyberpunk cityscape",
  "27159639._SX540_.jpg": "Sci-fi book cover",
  "4c7ff6256079957c2770ea922741815e.jpg": "Digital artwork",
  "7108634.png": "Futuristic character",
  "Ghost-in-the-shell_ButWhyTho.png": "Ghost in the Shell artwork",
  "alita-.png": "Alita Battle Angel character",
  "images.jpg": "Abstract digital composition"
};
const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resize, 100);
    };

    resize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
};

const ImageBackground = () => {
  const { isMobile } = useDeviceContext();
  const imageBackgroundRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { timeline } = useTransition();
  const { position } = useCursor();
  const dimensions = useWindowDimensions();
  const { isLoaded } = usePageContext();
  

  const getImageName = useMemo(() => (path: string): string => {
    const filename = path.split('/').pop() || '';
    return IMAGE_DESCRIPTIONS[filename] || `Image ${filename}`;
  }, []);

  useEffect(() => {
    if (
      !imageBackgroundRef.current ||
      dimensions.width === 0 ||
      dimensions.height === 0
    ) return;

    // const left = -(position.x / dimensions.width - 0.5) * 60 - 40;
    // const top = -(position.y / dimensions.height - 0.5) * 60 + (isMobile ? 100 : 170);
    const left = -(position.x / dimensions.width - 0.5) * 60;
    const top = -(position.y / dimensions.height - 0.5) * 60 + 70;
    const rotateX = (position.y / dimensions.height - 0.5) * -10;
    const rotateY = (position.x / dimensions.width - 0.5) * 7;

    gsap.to(imageBackgroundRef.current, {
      left,
      top,
      rotateX,
      rotateY,
      perspective: 800,
      transformOrigin: "center center",
      ease: "power2",
      duration: 1,
    });
  }, [position, dimensions, isMobile]);

  // Handle page transition animation
  useIsomorphicLayoutEffect(() => {
    const fadeAnimation = gsap.to(`.${styles["img-bg-container"]}`, {
      delay: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    timeline.add(fadeAnimation, 0);

    return () => {
      fadeAnimation.kill();
    };
  }, [timeline]);

  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((imageRef, index) => {
        if (imageRef) {
          gsap.fromTo(
            imageRef,
            {
              clipPath: "polygon(0% 0%, 0% 0%, 0% 0%)",
              opacity: 0,
              scale: 0.9,
            },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              opacity: 1,
              scale: 1,
              duration: 1.5,
              delay: 0.3 + (index * 0.1),
              ease: "power3.inOut",
            },
          );
        }
      });
    }, imageBackgroundRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div
      className={styles["img-bg-container"]}
      ref={imageBackgroundRef}
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      {IMAGES.map((image: string, index: number) => (
        <Image
          key={`bg-image-${index}`}
          alt={getImageName(image)}
          src={image}
          className={`${styles[`image_${index + 1}`]} ${styles["single-image"]}`}
          width={200}
          height={200}
          priority={index < 2}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};

export default ImageBackground;
