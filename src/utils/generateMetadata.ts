import type { Metadata } from "next";

const generateMetadata = (
  title = "Lucas Oliveira - Frontend Developer & Creative Web Designer",
  description = "Creative Frontend developer specializing in React, Next.js, and TypeScript. Creating beautiful, accessible, and performant web experiences. View my portfolio and let's collaborate on your next project.",
  url = "https://lucasoliveira.io",
  image = "/website_open_graph_cover.png",
): Metadata => {
  return {
    title,
    description,
    authors: [{ name: "Lucas Oliveira", url: "https://lucasoliveira.io" }],
    referrer: "origin-when-cross-origin",
    keywords: [
      "Lucas Oliveira",
      "Frontend Developer",
      "React Developer",
      "Next.js Developer",
      "TypeScript Developer",
      "Web Developer",
      "JavaScript",
      "SCSS",
      "Portfolio",
      "Web Design",
      "UI/UX Designer",
      "Creative Developer",
      "Responsive Design",
      "Web Development",
      "Full Stack",
      "Modern Web Apps",
    ],
    creator: "Lucas Oliveira",
    publisher: "Lucas Oliveira",
    metadataBase: new URL(url),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@http_lucaso",
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Lucas Oliveira - Frontend Developer Portfolio",
        },
      ],
      siteName: "Lucas Oliveira - Portfolio",
      locale: "en_US",
      type: "website",
    },
  };
};

export default generateMetadata;
