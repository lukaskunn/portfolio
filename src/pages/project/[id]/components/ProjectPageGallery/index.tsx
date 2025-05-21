import React from "react";
import styles from "../../ProjectPage.module.scss";
import ProjectPageImage from "./components/ProjectPageGalleryImage";

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
      <h3 className={styles["gallery-title"]} dangerouslySetInnerHTML={{ __html: "Gallery" }} />
      <div className={styles["project-gallery"]}>
        {galleryImages.map((row, index) => (
          <div key={index} className={styles["gallery-row"]}>
            {row.map((images, index) => {
              const textSize = textSizes[row.length - 1];
              return (
                <ProjectPageImage
                  images={images}
                  key={index}
                  width={width / row.length}
                  height={height / row.length}
                  textSize={textSize}
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
