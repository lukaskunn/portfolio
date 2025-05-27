import React from "react";
import LinkItem from "./components/LinkItem/Index";
import styles from "../all-my-links/AllMyLinks.module.css";

const links = [
  {
    title: "Portfolio",
    hoverText: "See more...",
    link: "https://lucasoliveira.io",
    openInNewPage: false,
  },
  {
    title: "Github",
    hoverText: "/lukaskunn",
    link: "https://github.com/lukaskunn",
    openInNewPage: true,
  },
  {
    title: "Linkedin",
    hoverText: "Lucas Oliveira",
    link: "https://www.linkedin.com/in/lucas-oliveira-997810198/",
    openInNewPage: true,
  },
  {
    title: "X / Twitter",
    hoverText: "@http_lucaso",
    link: "https://x.com/http_lucaso",
    openInNewPage: true,
  },
  {
    title: "Instagram",
    hoverText: "@http.lucaso",
    link: "https://www.instagram.com/http.lucaso/",
    openInNewPage: true,
  },
  {
    title: "Youtube",
    hoverText: "Lucas シルバ",
    link: "https://www.youtube.com/@lucas-sio",
    openInNewPage: true,
  },
];

const AllMyLinks = () => {
  return (
    <div className={styles.container}>
      <img
        src="/images/general/6a0e989e927968f88f171e52418dafc6.jpg"
        alt="seki oyasumi punpun icon"
        className={styles["image-icon"]}
      />
      <h2 className={styles["page-title"]}>Hi, find out my links here...</h2>
      <div className={styles["links-container"]}>
        {links.map((link, index) => {
          const { hoverText, title, link: url, openInNewPage } = link;

          return (
            <LinkItem
              link={url}
              textHover={hoverText}
              title={title}
              key={index}
              openInNewPage={openInNewPage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllMyLinks;
