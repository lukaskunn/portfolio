'use client';
import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import styles from '@/styles/css/projects.module.css';
import ProjectList from './ProjectList';
import { useProjectModalContext } from '@/contexts/ProjectsModalContext';
import { useTransitionContext } from '@/contexts/TransitionContext'
import type { ProjectsClientProps } from '@/types'

// Code-split ProjectModal (contains Framer Motion)
const ProjectModal = dynamic(() => import('@/app/projects/components/ProjectModal'), { ssr: false });

gsap.registerPlugin(SplitText);

const ProjectsClient = ({ works, projects }: ProjectsClientProps) => {
  const { updateModal } = useProjectModalContext();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hasAnimatedRef = useRef(false);
  const { isLoaded, isPageReady } = useTransitionContext();

  useGSAP(() => {
    if (!titleRef.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(titleRef.current, { opacity: 0 });
      return;
    }

    if (!isLoaded || !isPageReady) return;

    // Split text into characters
    const split = new SplitText(titleRef.current, {
      type: 'chars',
      charsClass: 'split-char',
    });

    // Set container visible
    gsap.set(titleRef.current, { opacity: 1 });

    // Mark as animated
    hasAnimatedRef.current = true;

    // Animate characters from top to bottom
    gsap.fromTo(
      split.chars,
      {
        y: '-100%',
        opacity: 0
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.03,
        delay: 0.2
      }
    );

    // Cleanup function to revert split
    return () => {
      split.revert();
    };

  }, { dependencies: [isLoaded, isPageReady] });

  return (
    <main id="main-content" className={styles["container"]} role="main" aria-label="Projects page content">
      <h1
        ref={titleRef}
        className={styles["title"]}
        style={{ overflow: 'hidden' }}
      >
        {works.sectionTitle} <span className={styles["project-counter"]}>({projects.length})</span>
      </h1>
      <ProjectList projects={projects} updateModal={updateModal} />
      <ProjectModal projects={projects} />
    </main >
  )
}

export default ProjectsClient
