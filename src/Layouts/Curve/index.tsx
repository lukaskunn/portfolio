import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "../../styles/Curve.module.scss";
import getAnimationProps from "../../utils/getAnimationProps";
import SVG from "../../components/SVGBackground";
import { useLanguage } from "../../contexts/LanguageContext";
import { useDeviceContext } from "../../contexts/DeviceContext";
interface ICurve {
    children: React.ReactNode;
    isProjectPage?: boolean;
}

const Curve = (props: ICurve) => {
    const { children, isProjectPage } = props;
    const { currentLanguage } = useLanguage()
    const { transitionsText } = currentLanguage;
    const { routesTexts, projectsTexts } = transitionsText;
    const router = useRouter();
    const { isMobile } = useDeviceContext();
    const [dimensions, setDimensions] = React.useState({
        height: 0,
        width: 0,
    });

    React.useEffect(() => {
        const resize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const text = {
        initial: {
            opacity: 1,
        },
        enter: {
            opacity: 0,
            top: -100,
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.75, 0, 0.24, 1],
            },
            transitionEnd: {
                top: "47.5%"
            },
        },
        exit: {
            opacity: 1,
            top: "40%",
            transition: {
                duration: 0.5,
                delay: 0.3,
                ease: [0.33, 1, 0.68, 1],
            },
        },
    };

    return (
        <div className={styles.curve}>
            <div
                className={styles["curve-background"]}
                style={{ opacity: dimensions.width > 0 ? "0" : "1" }}
            />

            <motion.p {...getAnimationProps(text)} className={styles["route-name"]}>
                {isProjectPage ? projectsTexts[Number(router.query.id) - 1] : routesTexts[router.route as keyof typeof routesTexts]}
            </motion.p>
            {dimensions.width > 0 && <SVG {...dimensions} isMobile={isMobile} />}
            {children}
        </div>
    );
};



export default Curve;
