import React from "react";
import type { NextPage } from "next";

import ImageBackground from "./components/ImageBackground";
import NextPageButtonContainer from "./NextPageButtonContainer";
import NoiseFilter from "./components/NoiseFilter";
import LanguageSelector from "./LanguageSelector";
import LocationTime from "./LocationTime";
import Subtitle from "./Subtitle";
import Title from "./Title";
import CurrentPosition from "./CurrentPosition";
import SocialMediaLinks from "./SocialMediaLinks";
import AnimationContainer from "./AnimationContainer";
import Jobs from "./Jobs";
import styles from "./Home.module.css";

const Page: NextPage = () => {
  return (
    <AnimationContainer>
      <section className={styles.container}>
        <div className={styles["content-container"]}>
          <div className={styles["title-jobs-container"]}>
            <Title />
            <Jobs />
          </div>
          <Subtitle />
          <div className={styles["local-time-location-container"]}>
            <CurrentPosition />
            <LocationTime />
          </div>
        </div>

        <div className={styles["footer-row-container"]}>
          <div className={styles["footer-content"]}>
            <SocialMediaLinks />
            <LanguageSelector />
          </div>
        </div>

        <NextPageButtonContainer />
        <ImageBackground />
        <NoiseFilter />
      </section>
    </AnimationContainer>
  );
};

export default Page;
