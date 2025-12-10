import React from 'react'
import styles from "@/styles/css/about-me.module.css"
import HeroSection from './components/HeroSection'
import IntroSection from './components/IntroSection'
import BackgroundSection from './components/BackgroundSection'
import CertificationsSection from './components/CertificationsSection'
import ServicesSection from './components/ServicesSection'

const page = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <IntroSection />
      <BackgroundSection />
      <CertificationsSection />
      <ServicesSection />
    </div>
  )
}

export default page
