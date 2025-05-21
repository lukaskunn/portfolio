import React from "react";
import Link from "next/link";
import type { NextPage } from "next";

import ImageBackground from "../components/ImageBackground";
import Curve from "../Layouts/Curve";
import NextPageButton from "../components/NextPageButton";
import NoiseFilter from "../components/NoiseFilter";
import { useLanguage } from "../contexts/LanguageContext";

import styles from "./Home.module.scss";

const Home: NextPage = () => {
  const { currentLanguage } = useLanguage();
  const { landing } = currentLanguage;
  const { sectionTitle, nextPageText, menuItems } = landing;

  return (
    <Curve>
      <section className={styles.container}>
        <div className={styles["content-container"]}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
          <div className={styles["menu-container"]}>
            {menuItems.map((item: any, index: any) => {
              const { text, href } = item;
              return (
                <Link
                  href={href}
                  key={`${text}_${index}`}
                  className={styles["menu-container__item"]}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              );
            })}
          </div>
        </div>
        <ImageBackground />
        <NextPageButton
          link="/Works"
          text={nextPageText}
          type="forward"
          showBackground={false}
        />
        <NoiseFilter />
      </section>
    </Curve>
  );
};

export default Home;
