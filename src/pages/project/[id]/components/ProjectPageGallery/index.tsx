import React from "react";
import styles from "../../ProjectPage.module.css";
import ProjectPageImage from "./components/ProjectPageGalleryImage";
import AnimatePosOpacity from "../../../../../utils/AnimatePosOpacity";
interface IProjectPageGallery {
  galleryImages: Array<
    Array<{ front: string; back: string; photoText: string }>
  >;
  dimensions: { width: number; height: number };
}

const textSizes = [42, 36, 30];

function ProjectPageGallery(props: IProjectPageGallery) {
  const { galleryImages, dimensions } = props;
  const { width, height } = dimensions;
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
                  width={width / row.length}
                  height={height / row.length}
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
