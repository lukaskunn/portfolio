'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import styles from "@/styles/css/about-me.module.css"
import { PortableText } from 'next-sanity'

gsap.registerPlugin(ScrollTrigger, SplitText);

interface BackgroundSectionProps {
  data: any;
}

const BackgroundSection = ({ data }: BackgroundSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleBorderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !borderRef.current || !titleRef.current || !contentRef.current) return;

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

    // Animate paragraphs
    const paragraphs = contentRef.current.querySelectorAll('p');

    paragraphs.forEach((paragraph, index) => {
      const split = new SplitText(paragraph, {
        type: 'lines',
        linesClass: 'split-line',
      });

      gsap.set(split.lines, {
        y: '100%',
        opacity: 0
      });

      gsap.to(split.lines, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: paragraph,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles["background-section"]}>
      <div ref={borderRef} className={styles["border-top"]} />
      <div className={styles["section-layout"]}>
        <div className={styles["title-container"]}>
          <h2 ref={titleRef} className={styles["section-title"]} style={{ overflow: 'hidden' }}>
            {data.background?.title}
          </h2>
          <div ref={titleBorderRef} className={styles["title-border-bottom"]} />
        </div>
        <div ref={contentRef} className={styles["section-content"]}>
            <p className={styles["content-paragraph"]} style={{ overflow: 'hidden' }}>
              <PortableText value={data.background?.paragraphs} />
            </p>
          {/* {data.background?.paragraphs?.map((paragraph: string, index: number) => (
            <p key={index} className={styles["content-paragraph"]} style={{ overflow: 'hidden' }}>
              {paragraph}
            </p>
          ))} */}
        </div>
      </div>
    </section>
  )
}

export default BackgroundSection
