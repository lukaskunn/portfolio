import React from "react";
import styles from "../../styles/ImageBackground.module.scss";
import { useCursor } from "../../contexts/CursorContext";
import Image from "next/image";
function ImageBackground() {
    const [imagesLoaded, setImagesLoaded] = React.useState(0);
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

    const backgroundImageStyles = {
        left: `${-(position.x / dimensions.width - 0.5) * 30}px`,
        top: `${-(position.y / dimensions.height - 0.5) * 30 + 100}px`,
        transform: `rotateX(${(position.y / dimensions.height - 0.5) * -15
            }deg) rotateY(${(position.x / dimensions.width - 0.5) * 15}deg)`,
    };

    return (
        <div className={styles["img-bg-container"]} style={backgroundImageStyles}>
            {images.map((image: any, index: any) => {
                return (
                    <Image
                        alt={`image_${index + 1}`}
                        src={image}
                        className={`${styles[`image_${index + 1}`]} ${styles["single-image"]
                            }`}
                        width={200}
                        height={200}
                        key={index}
                        onLoad={() => setImagesLoaded(imagesLoaded + 1)}
                    />
                );
            })}
        </div>
    );
}

export default ImageBackground;

