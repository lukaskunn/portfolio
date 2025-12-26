import type { Metadata } from "next";
import type { SEO } from "@/sanity/sanity-types";

/**
 * Generate Next.js Metadata from Sanity SEO data or default values
 *
 * @param sanityData - Optional Sanity SEO object containing metaTitle, metaDescription, keywords, ogImage
 * @param fallbackTitle - Fallback title if sanityData is not provided
 * @param fallbackDescription - Fallback description if sanityData is not provided
 * @param baseUrl - Base URL for the site (default: https://lucasoliveira.io)
 * @param pathname - Page pathname for canonical URL (default: empty string for homepage)
 * @returns Next.js Metadata object
 */
const generateMetadata = (
  sanityData?: SEO | null,
  fallbackTitle: string = "Lucas Oliveira - Frontend Developer & Creative Web Designer",
  fallbackDescription: string = "Creative Frontend developer specializing in React, Next.js, and TypeScript. Creating beautiful, accessible, and performant web experiences. View my portfolio and let's collaborate on your next project.",
  baseUrl: string = "https://lucasoliveira.io",
  pathname: string = "",
): Metadata => {
  // Use Sanity data if available, otherwise fall back to defaults
  const title = sanityData?.metaTitle || fallbackTitle;
  const description = sanityData?.metaDescription || fallbackDescription;
  const keywords = sanityData?.keywords || [
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
  ];

  // Construct the full URL
  const url = `${baseUrl}${pathname}`;

  // Handle OG Image from Sanity or use default
  const ogImageUrl = sanityData?.ogImage?.asset?.url || `${baseUrl}/website_open_graph_cover.png`;
  const ogImageAlt = sanityData?.ogImage?.alt || "Lucas Oliveira - Frontend Developer Portfolio";
  const ogImageWidth = sanityData?.ogImage?.asset?.metadata?.dimensions?.width || 1200;
  const ogImageHeight = sanityData?.ogImage?.asset?.metadata?.dimensions?.height || 630;

  return {
    title,
    description,
    authors: [{ name: "Lucas Oliveira", url: baseUrl }],
    referrer: "origin-when-cross-origin",
    keywords,
    creator: "Lucas Oliveira",
    publisher: "Lucas Oliveira",
    metadataBase: new URL(baseUrl),
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
      images: [ogImageUrl],
      creator: "@http_lucaso",
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
        },
      ],
      siteName: "Lucas Oliveira - Portfolio",
      locale: "en_US",
      type: "website",
    },
  };
};

export default generateMetadata;
