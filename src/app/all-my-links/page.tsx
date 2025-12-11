import React from "react";
import LinkItem from "./components/LinkItem/Index";
import styles from "@/styles/css/all-my-links.module.css";
import Image from "next/image";

const links = [
  {
    title: "Portfolio",
    hoverText: "Explore my work",
    link: "/home",
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
    hoverText: "Connect with me",
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
    hoverText: "Watch my videos",
    link: "https://www.youtube.com/@lucas-sio",
    openInNewPage: true,
  },
];

const AllMyLinks = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/assets/images/homepage/homepage_image_resized.jpg"
        alt="Profile picture"
        className={styles["image-icon"]}
        width={260}
        height={260}
        priority
      />
      <h1 className={styles["page-title"]}>
        All my links in one place - let&apos;s connect.
      </h1>
      <div className={styles["links-container"]}>
        {links.map((link, index) => {
          const { hoverText, title, link: url, openInNewPage } = link;

          return (
            <LinkItem
              link={url}
              textHover={hoverText}
              title={title}
              key={`${title}-${index}`}
              openInNewPage={openInNewPage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllMyLinks;
