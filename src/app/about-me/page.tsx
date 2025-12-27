import React from 'react'
import dynamic from 'next/dynamic'
import styles from "@/styles/css/about-me.module.css"
import HeroSection from './components/HeroSection'
import IntroSection from './components/IntroSection'
import { getAboutMeContent, getServicesContent } from '@/sanity/lib/fetch'
import generateMetadataUtil from '@/utils/generateMetadata'
import { generateProfilePageJsonLd } from '@/utils/generateJsonLd'

// Code-split below-the-fold sections
const BackgroundSection = dynamic(() => import('./components/BackgroundSection'));
const CertificationsSection = dynamic(() => import('./components/CertificationsSection'));
const ServicesSection = dynamic(() => import('./components/ServicesSection'));

export async function generateMetadata() {
  const aboutMe = await getAboutMeContent();
  return generateMetadataUtil(aboutMe.seo, undefined, undefined, undefined, "/about-me");
}

export default async function AboutMePage() {
  const [aboutMe, servicesData] = await Promise.all([
    getAboutMeContent(),
    getServicesContent(),
  ]);

  // Generate JSON-LD for About Me page
  const profileJsonLd = generateProfilePageJsonLd({
    name: "Lucas Oliveira",
    jobTitle: "Frontend Developer & Creative Web Designer",
    url: "https://lucasoliveira.io",
    description: aboutMe.intro || "Creative Frontend developer specializing in React, Next.js, and TypeScript.",
    sameAs: [
      "https://github.com/lucaskun",
      "https://linkedin.com/in/lucasoliveira",
    ]
  });

  return (
    <>
      {/* JSON-LD Structured Data for Profile */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <main id="main-content" role="main" aria-label="About me page content">
        <div className={styles.container}>
          <HeroSection data={aboutMe} />
          <IntroSection data={aboutMe} />
          <BackgroundSection data={aboutMe} />
          <CertificationsSection data={aboutMe.certifications} />
          <ServicesSection data={servicesData.services} />
        </div>
      </main>
    </>
  )
}
