import type { Metadata } from "next";

const generateMetadata = (
  title = "Lucas Oliveira - Frontend Developer",
  description = "Creative frontend developer passionate about building beautiful, responsive web experiences. Explore my projects, skills and let's create something amazing together!",
  url = "https://lucasoliveira.io",
  image = "https://opengraph.b-cdn.net/production/images/6e3350e6-cd34-4c03-b96c-9294fc220ca6.png?token=X01SWo1483Y5fLZzuI2PjatUsPQlxreHGdkIiMjbt_g&height=967&width=1200&expires=33295444329",
): Metadata => {
  return {
    title,
    description,
    authors: [{ name: "Lucas Oliveira" }],
    referrer: "no-referrer-when-downgrade",
    keywords: [
      "Lucas Oliveira",
      "Frontend Developer",
      "Web Developer",
      "React",
      "JavaScript",
      "TypeScript",
      "Portfolio",
      "Web Design",
      "UI/UX",
      "Creative Developer",
      "Web Development",
    ],
    creator: "Lucas Oliveira",
    // publisher: "Lucas Oliveira",
    metadataBase: new URL(url),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    openGraph: {
      // iamge url = website_open_graph_cover
      title,
      description,
      url,
      images: [
        {
          url: image,
        },
      ],
      siteName: "Lucas Oliveira - Portfolio",
      locale: "en_US",
      type: "website",
    },
  };
};

export default generateMetadata;
