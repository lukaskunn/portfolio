import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import HeroSection from './components/HeroSection'
import IntroSection from './components/IntroSection'
import BackgroundSection from './components/BackgroundSection'
import CertificationsSection from './components/CertificationsSection'
import ServicesSection from './components/ServicesSection'
import { getAboutMeContent, getServicesContent } from '@/sanity/lib/fetch'

export default async function AboutMePage() {
  const [aboutMe, servicesData] = await Promise.all([
    getAboutMeContent(),
    getServicesContent(),
  ]);

  return (
    <div className={styles.container}>
      <HeroSection data={aboutMe} />
      <IntroSection data={aboutMe} />
      <BackgroundSection data={aboutMe} />
      <CertificationsSection data={aboutMe.certifications} />
      <ServicesSection data={servicesData.services} />
    </div>
  )
}
