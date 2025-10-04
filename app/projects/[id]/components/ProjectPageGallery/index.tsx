import React, { useEffect, useState } from "react";
import styles from "../../ProjectPage.module.css";
import ProjectPageImage from "./components/ProjectPageGalleryImage";
import AnimatePosOpacity from "../../../../../src/utils/AnimatePosOpacity";
import { useProjectContext } from "../../../Contexts/ProjectContext";

interface Dimensions {
  height: number;
  width: number;
}

const textSizes = [42, 36, 30];

function ProjectPageGallery() {
  const { project } = useProjectContext();
  
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!project) return null;
  const { galleryImages } = project;
  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <div className={styles["project-page-gallery"]}>
      <AnimatePosOpacity
        from={{ y: "-100%", opacity: 0 }}
        to={{ y: 0, opacity: 1 }}
        durationIn={1}
        durationOut={0.6}
        delay={0.6}
        set={{ opacity: 0, y: 100 }}
      >
        <h3
          className={styles["gallery-title"]}
          dangerouslySetInnerHTML={{ __html: "Gallery" }}
        />
      </AnimatePosOpacity>
      <div className={styles["project-gallery"]}>
        {galleryImages.map((row, rowIndex) => (
          <div key={rowIndex} className={styles["gallery-row"]}>
            {row.map((images, index) => {
              const textSize = textSizes[row.length - 1];
              return (
                <ProjectPageImage
                  images={images}
                  key={index}
                  width={dimensions.width / row.length}
                  height={dimensions.height / row.length}
                  textSize={textSize}
                  imageIndex={rowIndex * row.length + index}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPageGallery;
