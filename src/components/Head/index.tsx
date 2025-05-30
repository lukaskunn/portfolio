import React from "react";
import Head from "next/head";

interface WebsiteHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const WebsiteHead: React.FC<WebsiteHeadProps> = ({
  title = "Lucas Oliveira - Frontend Developer",
  description = "Creative frontend developer passionate about building beautiful, responsive web experiences. Explore my projects, skills and let's create something amazing together!",
  url = "https://lucasoliveira.io",
  image = "https://lucasoliveira.io/images/cover.jpg",
}) => {
  return (
    <Head>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Favicon links */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      {/* Open Graph meta tags for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="preload" href="../../styles/scss/allFiles.css" as="style" />
      <noscript>
        <link rel="stylesheet" href="../../styles/scss/allFiles.css" />
      </noscript>
    </Head>
  );
};

export default WebsiteHead;
