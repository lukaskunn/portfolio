'use client'
import React, { useRef } from 'react'
import styles from '@/styles/css/projects.module.css'
import ProjectItem from './ProjectItem'
import { useTransitionContext } from '@/contexts/TransitionContext'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import type { ProjectCard } from '@/types'

type ProjectListProps = {
  projects: ProjectCard[]
  updateModal: (index: number, modalIsActive: boolean) => void
}

const ProjectList = ({ projects, updateModal }: ProjectListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)
  const { isLoaded, isPageReady } = useTransitionContext()

  useGSAP(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('[data-project-item]')
    const overlays = containerRef.current.querySelectorAll('[data-project-overlay]')

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(items, { opacity: 0 })
      gsap.set(overlays, { yPercent: 100 })
      return
    }

    if (!isLoaded || !isPageReady || hasAnimatedRef.current) return

    hasAnimatedRef.current = true

    // Ensure initial state before animation starts
    gsap.set(overlays, { yPercent: 100 })

    // Create timeline for two-stage animation
    const tl = gsap.timeline({ delay: 0.5 })

    // Stage 1: Overlays slide up from bottom to cover items (items stay hidden)
    tl.to(
      overlays,
      {
        yPercent: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
      }
    )
      // Wait 0.2s after stage 1 completes
      .to({}, { duration: 0.2 })
      // Stage 2: Show items and slide overlays up to reveal them
      .set(
        items,
        {
          opacity: 1,
          stagger: 0.1,
        }
      )
      .to(
        overlays,
        {
          yPercent: -100,
          duration: 0.6,
          ease: 'power3.in',
          stagger: 0.1,
        },
        '<'
      )
  }, { dependencies: [isLoaded, isPageReady] })

  return (
    <div ref={containerRef} className={styles['project-list-container']}>
      {projects.map((project, index) => {
        const { overview } = project
        const { subtitle, projectId, technologies, cardTitle, goToExternalPage, urlToProject } = overview

        return (
          <div key={index} style={{ position: 'relative', overflow: 'hidden' }}>
            <ProjectItem
              project={{
                link: projectId,
                tech: technologies?.join(', ') || '',
                title: cardTitle || '',
                subtitle: subtitle || '',
                urlToProject
              }}
              index={index}
              updateModal={updateModal}
              openOnExternalPage={goToExternalPage}
            />
            <div
              data-project-overlay
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#1c1c1c',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProjectList
