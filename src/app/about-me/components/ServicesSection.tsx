'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import styles from "@/styles/css/about-me.module.css"
import { PortableText } from 'next-sanity'
gsap.registerPlugin(ScrollTrigger, SplitText);

interface ServicesSectionProps {
  data: any;
}

const ServicesSection = ({ data }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleBorderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !borderRef.current || !titleRef.current || !gridRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    });

    // Animate border from left to right
    tl.fromTo(
      borderRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power4.out',
        transformOrigin: 'left center'
      }
    );

    // Split and animate title
    const titleSplit = new SplitText(titleRef.current, {
      type: 'chars',
      charsClass: 'split-char',
    });

    tl.fromTo(
      titleSplit.chars,
      { y: '-100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.03
      },
      '<0.2'
    );

    // Animate mobile title border if it exists
    if (titleBorderRef.current) {
      tl.fromTo(
        titleBorderRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power4.out',
          transformOrigin: 'left center'
        },
        '<0.3'
      );
    }

    // Animate service cards
    const cards = gridRef.current.querySelectorAll(`.${styles["service-card"]}`);

    gsap.set(cards, {
      y: 50,
      opacity: 0
    });

    tl.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.15
    }, '<0.4');
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles["services-section"]}>
      <div ref={borderRef} className={styles["border-top"]} />
      <div className={styles["section-layout"]}>
        <div className={styles["title-container"]}>
          <h2 ref={titleRef} className={styles["section-title"]} style={{ overflow: 'hidden' }}>
            {data?.sectionTitle || 'Services'}
          </h2>
          <div ref={titleBorderRef} className={styles["title-border-bottom"]} />
        </div>
        <div ref={gridRef} className={styles["services-grid"]}>
          {data?.items?.map((service: any, index: number) => (
            <div key={index} className={styles["service-card"]}>
              <h3 className={styles["service-title"]}>{service.title}</h3>
              <p className={styles["service-subtitle"]}>{service.subtitle}</p>
              <span className={styles["service-description"]}>
                <PortableText value={service.description} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
