'use client'
import React from 'react'
import styles from '@/styles/css/components/Inner.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTransitionContext } from '@/contexts/TransitionContext'
import { usePathname } from 'next/navigation'

type InnerProps = {
  children?: React.ReactNode
}

const Inner = ({
  children
}: InnerProps) => {
  const { isTransitioningIn, isTransitioningOut, nextPath, onTransitionOutComplete, onTransitionInComplete } = useTransitionContext()
  const pathname = usePathname()
  const backgroundTransitionRef = React.useRef<HTMLDivElement>(null)
  const firstBackgroundTransition = React.useRef<HTMLDivElement>(null)
  const transitionTextRef = React.useRef<HTMLDivElement>(null)
  const revealBlock = React.useRef<HTMLDivElement>(null)

  // Get page name from path
  const getPageName = React.useCallback((path: string) => {
    const segments = path.split('/').filter(Boolean)
    if (segments.length === 0) return 'Home'

    // Handle project routes - show project name from URL
    if (segments[0] === 'project' && segments[1]) {
      const projectName = segments[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return `[${projectName}]`
    }

    // Convert kebab-case to Title Case
    const pageName = segments[0]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return `[${pageName}]`
  }, [])

  useGSAP(() => {
    if (isTransitioningOut && nextPath) {
      gsap.timeline({ onComplete: onTransitionOutComplete })
        .fromTo(firstBackgroundTransition.current,
          { x: '100%', y: '8%', scaleY: 0.98 },
          { x: '0%', y: '0%', scaleY: 1, duration: 0.5, ease: 'expo.out' }
        )
        .fromTo(backgroundTransitionRef.current,
          { x: '100%', y: '4%', scaleY: 0.98 },
          { x: '0%', y: '0%', scaleY: 1, duration: 0.5, ease: 'expo.out' },
          "<+=0.25"
        )
    }
  }, [isTransitioningOut, nextPath, onTransitionOutComplete])

  useGSAP(() => {
    if (isTransitioningIn) {
      const pageName = getPageName(pathname)

      if (transitionTextRef.current) {
        transitionTextRef.current.textContent = pageName
      }

      gsap.timeline({ onComplete: onTransitionInComplete })
        // set initial states
        .set(transitionTextRef.current, { opacity: 0 })
        .set(revealBlock.current, { x: '102%' })

        // reveal text with wipe
        .to(revealBlock.current, { x: '0%', duration: 0.5, ease: 'power4.in', delay: 0.2 })
        .set(transitionTextRef.current, { opacity: 1 })
        .to(revealBlock.current, { x: '-102%', duration: 0.5, ease: 'power4.out' })
        .set(revealBlock.current, { x: '102%' })

        // hold text, then wipe away
        .to(revealBlock.current, { x: '0%', duration: 0.5, ease: 'power4.in', delay: 0.4 })
        .set(transitionTextRef.current, { opacity: 0 })
        .to(revealBlock.current, { x: '-102%', duration: 0.5, ease: 'power4.out' })

        // slide backgrounds out with stagger
        .to(backgroundTransitionRef.current, { x: '-100%', scaleY: 1, duration: 0.9, ease: 'power2.inOut' })
        .to(firstBackgroundTransition.current, { x: '-100%', scaleY: 1, duration: 0.9, ease: 'power2.inOut' }, "<+=0.2")
    }
  }, [isTransitioningIn, pathname, getPageName, onTransitionInComplete])

  return (
    <>
      {children}
      <div className={`${styles["background-transition"]} ${styles["first-background"]}`} ref={firstBackgroundTransition} />
      <div ref={backgroundTransitionRef} className={styles["background-transition"]}>
        <div className={styles["transition-text-container"]}>
          <div ref={transitionTextRef} className={styles["transition-text"]} />
          <div className={styles["show-block"]} ref={revealBlock} />
        </div>
      </div>
    </>
  )
}

export default Inner
