'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import styles from "@/styles/css/about-me.module.css"
import { useLanguage } from '@/contexts/LanguageContext'

gsap.registerPlugin(ScrollTrigger, SplitText);

const CertificationsSection = () => {
  const { currentContent } = useLanguage();
  const { aboutMe } = currentContent;
  const sectionRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleBorderRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !borderRef.current || !titleRef.current || !tableRef.current) return;

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

    // Animate table rows
    const header = tableRef.current.querySelector(`.${styles["table-header"]}`);
    const rows = Array.from(tableRef.current.querySelectorAll(`.${styles["table-row"]}`));

    gsap.set([header, ...rows], {
      y: 50,
      opacity: 0
    });

    tl.to([header, ...rows], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.1
    }, '<0.4');
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles["certifications-section"]}>
      <div ref={borderRef} className={styles["border-top"]} />
      <div className={styles["section-layout"]}>
        <div className={styles["title-container"]}>
          <h2 ref={titleRef} className={styles["section-title"]} style={{ overflow: 'hidden' }}>
            {aboutMe.certifications.title}
          </h2>
          <div ref={titleBorderRef} className={styles["title-border-bottom"]} />
        </div>
        <div ref={tableRef} className={styles["certifications-table"]}>
          <div className={styles["table-header"]}>
            {aboutMe.certifications.tableHeaders.map((header, index) => (
              <span key={index} className={styles["header-cell"]}>{header}</span>
            ))}
          </div>

          {aboutMe.certifications.items.map((item, index) => (
            <div key={index} className={styles["table-row"]}>
              <ul className={styles["row-content"]}>
                {item.subjects.map((subject, subIndex) => (
                  <li key={subIndex} className={styles["cell-text"]}>{subject}</li>
                ))}
              </ul>
              <span className={styles["cell-text"]}>{item.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection
