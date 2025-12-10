import React from 'react'
import styles from "@/styles/css/about-me.module.css"

const ServicesSection = () => {
  return (
    <section className={styles["services-section"]}>
      <div className={styles["section-layout"]}>
        <h2 className={styles["section-title"]}>Services</h2>
        <div className={styles["services-grid"]}>

          <div className={styles["service-card"]}>
            <h3 className={styles["service-title"]}>Digital Interface Design</h3>
            <p className={styles["service-subtitle"]}>Beautiful, intuitive designs built to connect.</p>
            <p className={styles["service-description"]}>
              I design digital experiences that blend aesthetics and usability. Every interface is crafted to tell a story, guide
              users naturally, and feel visually alive across any screen.
            </p>
          </div>

          <div className={styles["service-card"]}>
            <h3 className={styles["service-title"]}>Interactive Web Experiences</h3>
            <p className={styles["service-subtitle"]}>Not just websites, immersive journeys.</p>
            <p className={styles["service-description"]}>
              I create interactive experiences that aren't just sites but ideas made tangible through modern frontend technology. Built with React
              and Next.js, they feel fluid, fast, and deeply engaging.
            </p>
          </div>

          <div className={styles["service-card"]}>
            <h3 className={styles["service-title"]}>High-Performance Web Systems</h3>
            <p className={styles["service-subtitle"]}>Speed, stability, and flow, built in.</p>
            <p className={styles["service-description"]}>
              I deliver optimized digital products that load instantly, perform flawlessly, and rank well. Every millisecond
              matters, because great performance is great design.
            </p>
          </div>

          <div className={styles["service-card"]}>
            <h3 className={styles["service-title"]}>Conversion-Driven Brand Experiences</h3>
            <p className={styles["service-subtitle"]}>Where storytelling meets results.</p>
            <p className={styles["service-description"]}>
              I build websites and landing pages that communicate clearly and convert effectively. Each project
              blends strong design, thoughtful content, and technical precision.
            </p>
          </div>

          <div className={styles["service-card"]}>
            <h3 className={styles["service-title"]}>Connected & Scalable Ecosystems</h3>
            <p className={styles["service-subtitle"]}>Experiences that grow with your brand.</p>
            <p className={styles["service-description"]}>
              I build integrated ecosystems, connecting frontends, APIs, and content platforms, designed to evolve as
              your business does, ensuring your digital platforms are seamless and scalable.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ServicesSection
